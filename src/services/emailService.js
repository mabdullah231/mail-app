import api from '../config/api';

export const emailService = {
  sendSingle: async (data) => {
    const response = await api.post('/email/send-single', data);
    return response.data;
  },
  sendBulk: async (data) => {
    const response = await api.post('/email/send-bulk', data);
    return response.data;
  },
  sendToAll: async (data) => {
    const response = await api.post('/email/send-to-all', data);
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/email/stats');
    return response.data;
  },
  getLogs: async (params = {}) => {
    const response = await api.get('/email/logs', { params });
    return response.data;
  },
  exportLogs: async (params = {}) => {
    const response = await api.get('/email/export', { params, responseType: 'blob' });
    return response.data;
  },
};
