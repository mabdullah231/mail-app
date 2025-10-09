import api from '../config/api';

export const automationService = {
  // Create automated reminder
  createAutomatedReminder: async (data) => {
    const response = await api.post('/automation/create-reminder', data);
    return response.data;
  },

  // Process due reminders
  processDueReminders: async () => {
    const response = await api.post('/automation/process-due-reminders');
    return response.data;
  }
};
