// client/src/components/TaskList.jsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"

function TaskList({ tasks, onDelete, currentUserId }) {
  const navigate = useNavigate()

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks found. Create your first task!
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card key={task._id} className="shadow-sm">
          <CardHeader className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-white">{task.title}</CardTitle>
              <p className="text-white mt-2">{task.description}</p>
              <div className="flex items-center mt-3 space-x-4">
                <Badge
                  variant={task.status === "done" ? "success" : "warning"}
                  className="capitalize"
                >
                  {task.status}
                </Badge>
                <span className="text-sm text-gray-500">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* ✅ Only show Edit/Delete if user is the creator */}
            {task.creator === currentUserId && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => navigate(`/tasks/edit/${task._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent />
        </Card>
      ))}
    </div>
  )
}

export default TaskList
