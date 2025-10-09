import api from '../config/api';

export const smsService = {
  // Send SMS to single customer
  sendSingle: async (data) => {
    const response = await api.post('/sms/send-single', data);
    return response.data;
  },

  // Send SMS to multiple customers
  sendBulk: async (data) => {
    const response = await api.post('/sms/send-bulk', data);
    return response.data;
  },

  // Get SMS statistics
  getStats: async () => {
    const response = await api.get('/sms/stats');
    return response.data;
  }
};
