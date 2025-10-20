import React, { useState, useEffect } from 'react';
import NotificationRulesSelector from './NotificationRulesSelector';
import { customerService } from '../services/customerService';
import { templateService } from '../services/templateService';
import { notificationRuleService } from '../services/notificationRuleService';
import { companyService } from '../services/companyService'; // Import company service
import Helpers from '../config/Helpers';

const NotificationRuleForm = ({ onSuccess }) => {
  const [customers, setCustomers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [form, setForm] = useState({
    customer_id: '',
    template_id: '',
    event_type: 'birthday',
    timing: 'before',
    channel: 'email',
    recurring: false,
    recurrence_interval: '',
    active: true,
    days_offset: 0,
    rules: [],
  });

  // Fetch company details on component mount
  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // Load customers and templates when company is available
  useEffect(() => {
    if (company?.id) {
      loadData();
    }
  }, [company]);

 const fetchCompanyDetails = async () => {
  try {
    setCompanyLoading(true);
    console.log('Fetching company details...');
    
    const response = await companyService.getDetails();
    console.log('Company details response:', response);
    
    if (response.success && response.company) {
      setCompany(response.company);
      
      // Update user in localStorage with company details
      const user = Helpers.getItem('user', true);
      const updatedUser = {
        ...user,
        company_detail: response.company
      };
      Helpers.setItem('user', updatedUser, true);
      
      console.log('Updated user with company:', updatedUser);
    } else {
      console.error('No company details found:', response);
      Helpers.toast('error', 'Please complete company setup first');
    }
  } catch (error) {
    console.error('Error fetching company details:', error);
    Helpers.toast('error', 'Failed to load company details');
  } finally {
    setCompanyLoading(false);
  }
};

  const loadData = async () => {
    if (!company?.id) {
      console.error('No company ID available');
      return;
    }

    try {
      setLoading(true);
      console.log('Loading data for company:', company.id);
      
      const [customersData, templatesData] = await Promise.all([
        customerService.getAll(company.id),
        templateService.getAll(company.id)
      ]);
      
      console.log('Customers loaded:', customersData);
      console.log('Templates loaded:', templatesData);
      
      setCustomers(customersData || []);
      setTemplates(templatesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      Helpers.toast('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!company?.id) {
    Helpers.toast('error', 'Please complete company setup before creating notification rules');
    return;
  }

  try {
    setLoading(true);
    const payload = {
      ...form,
      days_offset: calculateDaysOffset(form.rules),
      rules: form.rules,
      company_id: company.id // Add company_id to payload
    };
    
    console.log('Submitting payload with company_id:', payload);
    await notificationRuleService.create(payload);
    Helpers.toast('success', 'Notification rule created successfully');
    onSuccess && onSuccess();
    
    // Reset form
    setForm({
      customer_id: '',
      template_id: '',
      event_type: 'birthday',
      timing: 'before',
      channel: 'email',
      recurring: false,
      recurrence_interval: '',
      active: true,
      days_offset: 0,
      rules: [],
    });
  } catch (error) {
    console.error('Error creating rule:', error);
  } finally {
    setLoading(false);
  }
};

  // Helper function to calculate days offset from rules
  const calculateDaysOffset = (rules) => {
    if (!rules || rules.length === 0) return 0;
    
    const rule = rules[0];
    if (rule.includes('before')) {
      return -parseInt(rule);
    } else if (rule.includes('after')) {
      return parseInt(rule);
    }
    return 0;
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Show loading while fetching company
  if (companyLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading company details...</span>
        </div>
        <span className="ms-2">Loading company details...</span>
      </div>
    );
  }

  // Show warning if no company
  if (!company?.id) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <div className="alert alert-warning">
                  <h5>Company Setup Required</h5>
                  <p>Please complete your company setup before creating notification rules.</p>
                  <a href="/company-details" className="btn btn-primary">
                    Complete Company Setup
                  </a>
                  <button 
                    className="btn btn-outline-secondary ms-2"
                    onClick={fetchCompanyDetails}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while fetching customers and templates
  if (loading && (customers.length === 0 || templates.length === 0)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading data...</span>
        </div>
        <span className="ms-2">Loading customers and templates...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Create Notification Rule</h5>
              <small className="text-muted">Company: {company.name}</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Customer Selection */}
                  <div className="col-md-6">
                    <label htmlFor="customer_id" className="form-label">
                      Customer <span className="text-danger">*</span>
                    </label>
                    <select 
                      id="customer_id"
                      className="form-select"
                      value={form.customer_id} 
                      onChange={e => handleInputChange('customer_id', e.target.value)}
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.email}
                        </option>
                      ))}
                    </select>
                    {customers.length === 0 && (
                      <div className="form-text text-warning">
                        No customers found. Please create customers first.
                      </div>
                    )}
                  </div>

                  {/* Template Selection */}
                  <div className="col-md-6">
                    <label htmlFor="template_id" className="form-label">
                      Template <span className="text-danger">*</span>
                    </label>
                    <select 
                      id="template_id"
                      className="form-select"
                      value={form.template_id} 
                      onChange={e => handleInputChange('template_id', e.target.value)}
                      required
                    >
                      <option value="">Select Template</option>
                      {templates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.title} ({template.type})
                        </option>
                      ))}
                    </select>
                    {templates.length === 0 && (
                      <div className="form-text text-warning">
                        No templates found. Please create templates first.
                      </div>
                    )}
                  </div>

                  {/* Event Type */}
                  <div className="col-md-6">
                    <label htmlFor="event_type" className="form-label">
                      Event Type <span className="text-danger">*</span>
                    </label>
                    <select 
                      id="event_type"
                      className="form-select"
                      value={form.event_type} 
                      onChange={e => handleInputChange('event_type', e.target.value)}
                      required
                    >
                      <option value="">Select Event Type</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="appointment">Appointment</option>
                      <option value="payment_due">Payment Due</option>
                      <option value="custom">Custom Event</option>
                    </select>
                  </div>

                  {/* Channel */}
                  <div className="col-md-6">
                    <label htmlFor="channel" className="form-label">
                      Channel <span className="text-danger">*</span>
                    </label>
                    <select 
                      id="channel"
                      className="form-select"
                      value={form.channel} 
                      onChange={e => handleInputChange('channel', e.target.value)}
                      required
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>

                  {/* Timing */}
                  <div className="col-md-6">
                    <label htmlFor="timing" className="form-label">
                      Timing <span className="text-danger">*</span>
                    </label>
                    <select 
                      id="timing"
                      className="form-select"
                      value={form.timing} 
                      onChange={e => handleInputChange('timing', e.target.value)}
                      required
                    >
                      <option value="before">Before Event</option>
                      <option value="after">After Event</option>
                      <option value="on">On Event Date</option>
                    </select>
                  </div>

                  {/* Active Status */}
                  <div className="col-md-6">
                    <div className="form-check form-switch mt-4">
                      <input 
                        className="form-check-input"
                        type="checkbox"
                        id="active"
                        checked={form.active}
                        onChange={e => handleInputChange('active', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="active">
                        Active Rule
                      </label>
                    </div>
                  </div>

                  {/* Recurring */}
                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input"
                        type="checkbox"
                        id="recurring"
                        checked={form.recurring}
                        onChange={e => handleInputChange('recurring', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="recurring">
                        Recurring Notification
                      </label>
                    </div>
                  </div>

                  {form.recurring && (
                    <div className="col-md-6">
                      <label htmlFor="recurrence_interval" className="form-label">
                        Recurrence Interval
                      </label>
                      <select 
                        id="recurrence_interval"
                        className="form-select"
                        value={form.recurrence_interval} 
                        onChange={e => handleInputChange('recurrence_interval', e.target.value)}
                      >
                        <option value="">Select Interval</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Notification Rules Selector */}
                <div className="row mt-4">
                  <div className="col-12">
                    <NotificationRulesSelector 
                      value={form.rules} 
                      onChange={rules => handleInputChange('rules', rules)} 
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="d-flex gap-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Creating...
                          </>
                        ) : (
                          'Create Notification Rule'
                        )}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => window.history.back()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default NotificationRuleForm;