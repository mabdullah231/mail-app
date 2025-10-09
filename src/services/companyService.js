import api from '../config/api';

export const companyService = {
  // Get company details
  getDetails: async () => {
    const response = await api.get('/company/details');
    return response.data;
  },

  // Store or update company details
  storeOrUpdate: async (companyData) => {
    const response = await api.post('/company/store-or-update', companyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};