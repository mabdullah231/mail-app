import api from '../config/api';
import Helpers from '../config/Helpers';

export const templateService = {
  // Get all templates for a company
  getAll: async (companyId = null) => {
    try {
      // If no companyId provided, get from current user
      if (!companyId) {
        const user = Helpers.getItem('user', true);
        companyId = user?.company_detail?.id;
      }

      if (!companyId) {
        console.error('No company ID available');
        return [];
      }

      console.log('Fetching templates for company:', companyId);
      
      const response = await api.get('/templates', {
        params: { company_id: companyId }
      });
      
      console.log('Templates API response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      Helpers.toast('error', 'Failed to load templates');
      return [];
    }
  },

  // Get single template
  get: async (id) => {
    try {
      const response = await api.get(`/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  // Create template
  create: async (templateData) => {
    try {
      const response = await api.post('/templates', templateData);
      Helpers.toast('success', 'Template created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      Helpers.toast('error', 'Failed to create template');
      throw error;
    }
  },

  // Update template
  update: async (id, templateData) => {
    try {
      const response = await api.put(`/templates/${id}`, templateData);
      Helpers.toast('success', 'Template updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating template:', error);
      Helpers.toast('error', 'Failed to update template');
      throw error;
    }
  },

  // Delete template
  delete: async (id) => {
    try {
      const response = await api.delete(`/templates/${id}`);
      Helpers.toast('success', 'Template deleted successfully');
      return response.data;
    } catch (error) {
      console.error('Error deleting template:', error);
      Helpers.toast('error', 'Failed to delete template');
      throw error;
    }
  }
};