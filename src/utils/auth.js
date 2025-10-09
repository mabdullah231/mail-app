// Authentication utilities
import Helpers from '../config/Helpers';
export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
  Helpers.removeItem('token');
};

export const getUserData = () => {
  try {
    const user = Helpers.getItem('user', true);
    const token = Helpers.getItem('token');
    // console.log('user',user);
    
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
  Helpers.removeItem('user');
  Helpers.removeItem('token');
  window.location.href = '/login';
};

export const clearInvalidAuth = () => {
  try {
    const user = Helpers.getItem('user', true);
    const token = Helpers.getItem('token');
    
    // Clear if data is corrupted or invalid
    if ((user && typeof user !== 'object') || (token && typeof token !== 'string')) {
      logout();
    }
  } catch (error) {
    console.error('Error validating auth data:', error);
    logout();
  }
};
