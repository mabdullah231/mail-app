// src/services/templateService.js
import api from '../config/api';

export const templateService = {
  // Get all templates for a company
  getAll: async (companyId) => {
   
    const response = await api.get(`/templates?company_id=${companyId}`);
    console.log('data of templates',response.data);
    
    return response.data;
  },

  // Get single template
  get: async (id) => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  // Create template
  create: async (templateData) => {
    const response = await api.post('/templates', templateData);
    return response.data;
  },

  // Update template
  update: async (id, templateData) => {
    const response = await api.put(`/templates/${id}`, templateData);
    return response.data;
  },

  // Delete template
  delete: async (id) => {
    const response = await api.delete(`/templates/${id}`);
    return response.data;
  }
};