import api from '../config/api';
import Helpers from '../config/Helpers';
import { setUserData } from '../utils/auth';

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  // In authService.js - FIXED login method
login: async (credentials) => {
  const response = await api.post('/auth/login', credentials);

  console.log('🔐 Login Response:', response.data);
  console.log('👤 User Object:', response.data.user);
  console.log('🎫 Token:', response.data.token);

  if (response.data.token) {
    // Use the fixed setItem method
    Helpers.setItem('token', response.data.token);
    Helpers.setItem('user', response.data.user); // This will now be properly stringified

    console.log('✅ Saved to localStorage:', {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user') // This should now show proper JSON
    });
  }

  return response.data;
},

  // Verify email
  verifyEmail: async (data) => {
    const response = await api.post('/auth/verify-email', data);

    if (response.data.token) {
      Helpers.setItem('token', response.data.token);
      Helpers.setItem('user', response.data.user);
      setUserData(response.data.user);
    }

    return response.data;
  },

  // Resend verification email
  resendEmail: async (userId) => {
    const response = await api.post('/auth/resend-email', { user_id: userId });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Verify forgot password code
  verifyForgotPassword: async (data) => {
    const response = await api.post('/auth/verify-forgot-password', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      Helpers.removeItem('token');
      Helpers.removeItem('user');
    }
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.post('/auth/update-profile', data);
    return response.data;
  },
};

export default authService;
