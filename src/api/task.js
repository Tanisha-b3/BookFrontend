// client/src/api/tasks.js
import axios from 'axios';

const API_BASE_URL =  'https://user-backend-eta.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tasksAPI = {
  // Get tasks with pagination, search and filter
  getTasks: async (page = 1, limit = 10, search = '', status = 'all') => {
    return api.get(`/tasks?page=${page}&limit=${limit}&search=${search}&status=${status}`)
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  },

  // Create a new task
  createTask: async (taskData) => {
    return api.post('/tasks', taskData)
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  },

  // Update a task
  updateTask: async (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData)
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  },

  // Delete a task
  deleteTask: async (id) => {
    return api.delete(`/tasks/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  }
};