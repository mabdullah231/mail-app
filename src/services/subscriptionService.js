import api from '../config/api';

export const subscriptionService = {
  // Get current subscription
  getCurrent: async () => {
    const response = await api.get('/subscription/current');
    return response.data;
  },

  // Subscribe to branding removal
  subscribeBrandingRemoval: async (paymentData) => {
    const response = await api.post('/subscription/subscribe-branding-removal', paymentData);
    return response.data;
  },

  // Cancel subscription
  cancel: async () => {
    const response = await api.post('/subscription/cancel');
    return response.data;
  },

  // Get pricing information
  getPricing: async () => {
    const response = await api.get('/subscription/pricing');
    return response.data;
  },

  // Check subscription expiration
  checkExpiration: async () => {
    const response = await api.get('/subscription/check-expiration');
    return response.data;
  }
};
