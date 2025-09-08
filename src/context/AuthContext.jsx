// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from "../api/Auth.js"

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token on mount
      authAPI.verifyToken()
        .then(data => setUser(data.user))   // ✅ only set the user object
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    if (response.success) {
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const register = async (email, password) => {
    const response = await authAPI.register(email, password);
    if (response.success) {
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated: !!user,  // ✅ easy check
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
