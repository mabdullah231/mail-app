import api from '../config/api';

export const smsService = {
  sendSingle: async (data) => {
    const response = await api.post('/sms/send-single', data);
    return response.data;
  },
  sendBulk: async (data) => {
    const response = await api.post('/sms/send-bulk', data);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/sms/stats');
    return response.data;
  },
  getLogs: async (params = {}) => {
    const response = await api.get('/sms/logs', { params });
    return response.data;
  },
  exportLogs: async (params = {}) => {
    const response = await api.get('/sms/export', { params, responseType: 'blob' });
    return response.data;
  },
};
