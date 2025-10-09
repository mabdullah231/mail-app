import api from '../config/api';

export const customerService = {
  // Get all customers
  getAll: async (companyId) => {
    const response = await api.get('/customers', { params: { company_id: companyId } });
    return response.data;
  },

  // Get single customer
  get: async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  // Create customer
  create: async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
  },

  // Update customer
  update: async (id, customerData) => {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  },

  // Delete customer
  delete: async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  }
};
