import api from '../config/api';

export const emailService = {
  // Send email to single customer
  sendSingle: async (data) => {
    const response = await api.post('/email/send-single', data);
    return response.data;
  },

  // Send email to multiple customers
  sendBulk: async (data) => {
    const response = await api.post('/email/send-bulk', data);
    return response.data;
  },

  // Send email to all customers
  sendToAll: async (data) => {
    const response = await api.post('/email/send-to-all', data);
    return response.data;
  },

  // Get email statistics
  getStats: async () => {
    const response = await api.get('/email/stats');
    return response.data;
  }
};
