import api from '../config/api';

export const superAdminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/super-admin/dashboard-stats');
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/super-admin/users');
    return response.data.data;
  },

  // Toggle user status (active/inactive)
  toggleUserStatus: async (userId) => {
    const response = await api.put(`/super-admin/users/${userId}/toggle-status`);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/super-admin/users/${userId}`);
    return response.data;
  },

  // Get all emails
  getAllEmails: async () => {
    const response = await api.get('/super-admin/emails');
    return response.data;
  },

  // Export emails
  exportEmails: async () => {
    const response = await api.get('/super-admin/emails/export', {
      responseType: 'blob'
    });
    return response.data;
  },

  // Get all templates
  getAllTemplates: async () => {
    const response = await api.get('/super-admin/templates');
    return response.data;
  },

  // Set company limits
  setCompanyLimits: async (companyId, limits) => {
    const response = await api.put(`/super-admin/companies/${companyId}/limits`, limits);
    return response.data;
  },

  // Get email logs
  getEmailLogs: async () => {
    const response = await api.get('/super-admin/email-logs');
    return response.data;
  }
};
