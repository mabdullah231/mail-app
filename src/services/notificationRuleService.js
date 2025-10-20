// src/services/notificationRuleService.js
import api from '../config/api';
import Helpers from '../config/Helpers';

export const notificationRuleService = {
  // Create a notification rule
  create: async (ruleData) => {
    try {
      const response = await api.post('/notification-rules', ruleData);
      Helpers.toast('success', 'Notification rule created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating notification rule:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create notification rule';
      Helpers.toast('error', errorMessage);
      throw error;
    }
  },
  
  // Get all notification rules
  getAll: async () => {
    try {
      const response = await api.get('/notification-rules');
      return response.data;
    } catch (error) {
      console.error('Error fetching notification rules:', error);
      Helpers.toast('error', 'Failed to load notification rules');
      return [];
    }
  },
  
  // Get a single notification rule
  get: async (id) => {
    try {
      const response = await api.get(`/notification-rules/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notification rule:', error);
      Helpers.toast('error', 'Failed to load notification rule');
      throw error;
    }
  },
  
  // Update a notification rule
  update: async (id, ruleData) => {
    try {
      const response = await api.put(`/notification-rules/${id}`, ruleData);
      Helpers.toast('success', 'Notification rule updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating notification rule:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update notification rule';
      Helpers.toast('error', errorMessage);
      throw error;
    }
  },
  
  // Delete a notification rule
  delete: async (id) => {
    try {
      const response = await api.delete(`/notification-rules/${id}`);
      Helpers.toast('success', 'Notification rule deleted successfully');
      return response.data;
    } catch (error) {
      console.error('Error deleting notification rule:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete notification rule';
      Helpers.toast('error', errorMessage);
      throw error;
    }
  }
};