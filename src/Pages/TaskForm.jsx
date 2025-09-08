// client/src/pages/TaskForm.jsx
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { tasksAPI } from "../api/task.js"
import { useAuth } from "../context/AuthContext.jsx"

// shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"

function TaskForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  })

  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode) {
      fetchTask()
    }
  }, [id])

  const fetchTask = async () => {
    try {
      setLoading(true)
      const response = await tasksAPI.getTasks(1, 100, "", "all")

      if (response.success) {
        const task = response.tasks.find((t) => t._id === id)
        if (task) {
          setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
          })
        } else {
          setError("Task not found")
        }
      } else {
        setError("Failed to fetch task")
      }
    } catch (err) {
      setError("An error occurred while fetching the task")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      let response

      if (isEditMode) {
        response = await tasksAPI.updateTask(id, formData)
      } else {
        response = await tasksAPI.createTask(formData)
      }

      if (response.success) {
        setSuccess(isEditMode ? "Task updated successfully!" : "Task created successfully!")
        setTimeout(() => {
          navigate("/dashboard")
        }, 1000)
      } else {
        setError(response.error || `Failed to ${isEditMode ? "update" : "create"} task`)
      }
    } catch (err) {
      setError(`An error occurred while ${isEditMode ? "updating" : "creating"} the task`)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEditMode) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-lg">Loading task...</div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full h-full max-w-4xl shadow-md flex flex-col">
        <CardHeader className="flex justify-between items-center border-b">
          <CardTitle>{isEditMode ? "Edit Task" : "Create New Task"}</CardTitle>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            ← Back
          </Button>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter task title"
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description"
                className="h-full min-h-[150px]"
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskForm
