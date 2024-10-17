import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:5000/api'; // Adjust this to your actual backend URL

// Helper function to set the auth token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Function to register a new user
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log in a user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to log out a user
export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

// Function to request a password reset
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgotpassword`, { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/resetpassword/${token}`, { password: newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get the current user's profile
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/me`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to load user data if a token exists
export const loadUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    try {
      const response = await axios.get(`${API_URL}/users/me`);
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      setAuthToken(null);
      throw error.response.data;
    }
  }
  return null;
};