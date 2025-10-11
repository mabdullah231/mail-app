// Authentication utilities
import Helpers from '../config/Helpers';

export const getAuthToken = () => {
  return localStorage.getItem('token'); // Changed from 'auth_token' to 'token'
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token); // Changed from 'auth_token' to 'token'
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  Helpers.removeItem('token');
};

export const getUserData = () => {
  try {
    // Try to get user data from localStorage first (as stored by authService)
    let user = localStorage.getItem('user');
    
    if (user) {
      user = JSON.parse(user);
    } else {
      // Fallback to Helpers if not found in localStorage
      user = Helpers.getItem('user', true);
    }
    
    const token = getAuthToken();
    
    console.log('Retrieved user data:', { user, token }); // Debug log
    
    if (!user || !token || typeof user !== 'object' || !user.id) {
      return null;
    }
    
    return { user, token };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const setUserData = (user) => {
  // Store in both localStorage and Helpers for compatibility
  localStorage.setItem('user', JSON.stringify(user));
  Helpers.setItem('user', user);
};

export const isAuthenticated = () => {
  const userData = getUserData();
  return userData !== null;
};

export const isSuperAdmin = () => {
  const userData = getUserData();
  return userData && userData.user.user_type === 0;
};

export const isBusinessAdmin = () => {
  const userData = getUserData();
  return userData && userData.user.user_type === 1;
};

export const logout = () => {
  // Clear from both localStorage and Helpers
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  Helpers.removeItem('user');
  Helpers.removeItem('token');
  window.location.href = '/login';
};

export const clearInvalidAuth = () => {
  try {
    const userData = getUserData();
    
    // Clear if data is corrupted or invalid
    if (!userData || !userData.user || !userData.token) {
      logout();
    }
  } catch (error) {
    console.error('Error validating auth data:', error);
    logout();
  }
};