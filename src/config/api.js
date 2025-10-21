import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// DEV: initialize global API logs buffer
if (import.meta.env.DEV) {
  window.__API_LOGS__ = window.__API_LOGS__ || [];
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // DEV: mark start time for latency tracking
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors and log requests
api.interceptors.response.use(
  (response) => {
    // DEV: log successful responses
    try {
      const duration = Date.now() - (response.config?.metadata?.startTime || Date.now());
      if (import.meta.env.DEV && Array.isArray(window.__API_LOGS__)) {
        window.__API_LOGS__.unshift({
          url: response.config?.url,
          method: (response.config?.method || 'GET').toUpperCase(),
          status: response.status,
          duration,
          time: new Date().toISOString(),
        });
        window.__API_LOGS__ = window.__API_LOGS__.slice(0, 50);
      }
    } catch (_) {}
    return response;
  },
  (error) => {
    const status = error.response?.status;
    // DEV: log error responses
    try {
      const duration = Date.now() - (error.config?.metadata?.startTime || Date.now());
      if (import.meta.env.DEV && Array.isArray(window.__API_LOGS__)) {
        window.__API_LOGS__.unshift({
          url: error.config?.url,
          method: (error.config?.method || 'GET').toUpperCase(),
          status: status || 0,
          duration,
          time: new Date().toISOString(),
          error: error.response?.data || error.message,
        });
        window.__API_LOGS__ = window.__API_LOGS__.slice(0, 50);
      }
    } catch (_) {}

    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);

export default api;
