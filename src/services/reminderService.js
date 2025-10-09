import api from '../config/api';

export const reminderService = {
  // Get all reminders
  getAll: async () => {
    const response = await api.get('/reminders');
    return response.data;
  },

  // Get single reminder
  get: async (id) => {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  },

  // Get reminders by customer
  getByCustomer: async (customerId) => {
    const response = await api.get(`/reminders/customer/${customerId}`);
    return response.data;
  },

  // Create reminder
  create: async (reminderData) => {
    const response = await api.post('/reminders', reminderData);
    return response.data;
  },

  // Update reminder
  update: async (id, reminderData) => {
    const response = await api.put(`/reminders/${id}`, reminderData);
    return response.data;
  },

  // Delete reminder
  delete: async (id) => {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  }
};
