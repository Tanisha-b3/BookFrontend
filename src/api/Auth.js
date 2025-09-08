// client/src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'https://user-backend-ten.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  // Register new user
  register: async (email, password) => {
    return api.post('/auth/register', { email, password })
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  },

  // Login user
  login: async (email, password) => {
    return api.post('/auth/login', { email, password })
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  },

  // Verify token
  verifyToken: async () => {
    return api.get('/auth/verify', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.data)
      .catch(error => {
        throw error.response?.data || { error: 'Network error' };
      });
  }
};