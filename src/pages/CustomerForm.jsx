import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Bell, Calendar, Clock, AlertCircle } from 'lucide-react';
import { customerService } from '../services/customerService';
import { companyService } from '../services/companyService';
import { templateService } from '../services/templateService';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NotificationRulesSelector from '../components/NotificationRulesSelector';
import CustomerReminders from '../components/CustomerReminders';

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    sms_opt_in: false,
    notification: 'email',
    template_id: null, // Changed from '' to null
    frequency: 'weekly',
    reminder_start_date: new Date(),
    reminder_days_before: 7,
    reminder_days_after: 7,
    unsubscribe_option: true,
    notification_rules: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      loadCustomer();
    }
  }, [isEdit, id]);

  const loadInitialData = async () => {
    try {
      const companyResponse = await companyService.getDetails();
      setCompany(companyResponse.company);
      
      if (companyResponse.company) {
        const templatesResponse = await templateService.getAll(companyResponse.company.id);
        setTemplates(templatesResponse);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load initial data');
    }
  };

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const response = await customerService.get(id);
      console.log('Customer data:', response);
      
      setFormData({
        name: response.name || '',
        email: response.email || '',
        phone: response.phone || '',
        address: response.address || '',
        country: response.country || '',
        sms_opt_in: response.sms_opt_in || false,
        notification: response.notification || 'email',
        template_id: response.template_id || null, // Handle null properly
        frequency: response.frequency || 'weekly',
        reminder_start_date: response.reminder_start_date ? new Date(response.reminder_start_date) : new Date(),
        reminder_days_before: response.reminder_days_before || 7,
        reminder_days_after: response.reminder_days_after || 7,
        unsubscribe_option: response.unsubscribe_option !== undefined ? response.unsubscribe_option : true,
        notification_rules: response.notification_rules || []
      });
    } catch (error) {
      console.error('Error loading customer:', error);
      toast.error('Failed to load customer');
      navigate('/panel/customers');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle template_id conversion from string to number/null
    let processedValue = value;
    if (name === 'template_id') {
      processedValue = value === '' ? null : parseInt(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if ((formData.notification === 'sms' || formData.notification === 'both') && !formData.phone) {
      newErrors.phone = 'Phone number is required for SMS notifications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    if (!validateForm()) {
      return;
    }

    if (!company) {
      toast.error('Company information not found');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for submission
      const customerData = {
        ...formData,
        company_id: company.id,
        reminder_start_date: formData.reminder_start_date.toISOString().split('T')[0],
        // Ensure template_id is properly formatted (null or integer)
        template_id: formData.template_id || null
      };

      console.log('Submitting customer data:', customerData);

      if (isEdit) {
        await customerService.update(id, customerData);
        toast.success('Customer updated successfully');
      } else {
        await customerService.create(customerData);
        toast.success('Customer created successfully');
      }
      
      navigate('/panel/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data?.message || 'Failed to save customer';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'India', 'China', 'Japan', 'South Korea', 'Singapore', 'Malaysia',
    'Brazil', 'Mexico', 'Argentina', 'South Africa', 'Nigeria', 'Kenya'
  ];

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button
          onClick={() => navigate('/panel/customers')}
          className="btn btn-outline-secondary btn-sm me-3"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">
            {isEdit ? 'Edit Customer' : 'Add New Customer'}
          </h1>
          <p className="text-muted mb-0">
            {isEdit ? 'Update customer information' : 'Add a new customer to your database'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Basic Information */}
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-light">
                <div className="d-flex align-items-center">
                  <User className="text-muted me-2" size={18} />
                  <h5 className="card-title mb-0">Basic Information</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter customer's full name"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-control"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-light">
                <div className="d-flex align-items-center">
                  <Bell className="text-muted me-2" size={18} />
                  <h5 className="card-title mb-0">Notification Settings</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="notification" className="form-label">
                      Notification Type
                    </label>
                    <select
                      id="notification"
                      name="notification"
                      value={formData.notification}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="email">Email Only</option>
                      <option value="sms">SMS Only</option>
                      <option value="both">Email & SMS</option>
                      <option value="none">No Notifications</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="frequency" className="form-label">
                      Frequency
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="daily">Daily</option>
                      <option value="3 days">Every 3 Days</option>
                      <option value="weekly">Weekly</option>
                      <option value="2 weeks">Every 2 Weeks</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="template_id" className="form-label">
                      Default Template
                    </label>
                    <select
                      id="template_id"
                      name="template_id"
                      value={formData.template_id || ''}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Template</option>
                      {templates.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.title} ({template.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <div className="form-check mt-4">
                      <input
                        type="checkbox"
                        id="sms_opt_in"
                        name="sms_opt_in"
                        checked={formData.sms_opt_in}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="sms_opt_in" className="form-check-label">
                        Customer has opted in to SMS notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reminder Schedule */}
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-header bg-light">
                <div className="d-flex align-items-center">
                  <Calendar className="text-muted me-2" size={18} />
                  <h5 className="card-title mb-0">Reminder Schedule</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="reminder_start_date" className="form-label">
                      Reminder Start Date
                    </label>
                    <DatePicker
                      id="reminder_start_date"
                      selected={formData.reminder_start_date}
                      onChange={(date) => setFormData({...formData, reminder_start_date: date})}
                      className="form-control"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label">
                      Notification Rules
                    </label>
                    <NotificationRulesSelector 
                      value={formData.notification_rules}
                      onChange={(rules) => setFormData({...formData, notification_rules: rules})}
                    />
                    <div className="form-text">
                      Set multiple notification times relative to the event date (e.g., "2 days before", "on date", "1 week after")
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="unsubscribe_option"
                        name="unsubscribe_option"
                        checked={formData.unsubscribe_option}
                        onChange={handleInputChange}
                        className="form-check-input"
                      />
                      <label htmlFor="unsubscribe_option" className="form-check-label">
                        Include unsubscribe option in emails
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reminders Section - Only shown when editing an existing customer */}
          {isEdit && id && (
            <div className="col-12 mb-4">
              <CustomerReminders customerId={id} />
            </div>
          )}

          {/* Actions */}
          <div className="col-12">
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => navigate('/panel/customers')}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : (isEdit ? 'Update Customer' : 'Create Customer')}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;