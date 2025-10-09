import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Send, 
  Users, 
  Mail, 
  MessageSquare,
  Calendar,
  Filter,
  BarChart3
} from 'lucide-react';
import { emailService } from '../services/emailService';
import { smsService } from '../services/smsService';
import { customerService } from '../services/customerService';
import { templateService } from '../services/templateService';
import { companyService } from '../services/companyService';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [campaignType, setCampaignType] = useState('email');
  const [customers, setCustomers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [stats, setStats] = useState({
    emailsSent: 0,
    smsSent: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const companyResponse = await companyService.getDetails();
      setCompany(companyResponse.company);
      
      if (companyResponse.company) {
        const [customersResponse, templatesResponse, emailStatsResponse, smsStatsResponse] = await Promise.all([
          customerService.getAll(companyResponse.company.id),
          templateService.getAll(companyResponse.company.id),
          emailService.getStats(),
          smsService.getStats()
        ]);

        setCustomers(customersResponse);
        setTemplates(templatesResponse);
        setStats({
          emailsSent: emailStatsResponse.total_sent || 0,
          smsSent: smsStatsResponse.total_sent || 0,
          totalCustomers: customersResponse.length || 0
        });
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const eligibleCustomers = customers.filter(customer => {
        if (campaignType === 'email') {
          return customer.notification === 'email' || customer.notification === 'both';
        } else {
          return (customer.notification === 'sms' || customer.notification === 'both') && customer.sms_opt_in;
        }
      });
      setSelectedCustomers(eligibleCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const handleSendCampaign = async () => {
    if (selectedCustomers.length === 0) {
      notyf.error('Please select at least one customer');
      return;
    }

    if (campaignType === 'email' && !subject.trim()) {
      notyf.error('Please enter an email subject');
      return;
    }

    if (!selectedTemplate && !customMessage.trim()) {
      notyf.error('Please select a template or enter a custom message');
      return;
    }

    try {
      setLoading(true);
      
      const campaignData = {
        customer_ids: selectedCustomers,
        template_id: selectedTemplate || null,
        custom_message: customMessage || null,
        subject: campaignType === 'email' ? subject : null
      };

      let response;
      if (campaignType === 'email') {
        response = await emailService.sendBulk(campaignData);
      } else {
        response = await smsService.sendBulk(campaignData);
      }

      notyf.success(`${campaignType.toUpperCase()} campaign sent successfully to ${selectedCustomers.length} customers`);
      
      // Reset form
      setSelectedCustomers([]);
      setSelectedTemplate('');
      setCustomMessage('');
      setSubject('');
      
      // Reload stats
      loadInitialData();
      
    } catch (error) {
      notyf.error(error.response?.data?.message || `Failed to send ${campaignType} campaign`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToAll = async () => {
    if (campaignType === 'email' && !subject.trim()) {
      notyf.error('Please enter an email subject');
      return;
    }

    if (!selectedTemplate && !customMessage.trim()) {
      notyf.error('Please select a template or enter a custom message');
      return;
    }

    if (!window.confirm(`Are you sure you want to send this ${campaignType} to ALL eligible customers?`)) {
      return;
    }

    try {
      setLoading(true);
      
      const campaignData = {
        template_id: selectedTemplate || null,
        custom_message: customMessage || null,
        subject: campaignType === 'email' ? subject : null
      };

      let response;
      if (campaignType === 'email') {
        response = await emailService.sendToAll(campaignData);
      } else {
        // For SMS, we'll send to all SMS-eligible customers
        const smsCustomers = customers.filter(c => 
          (c.notification === 'sms' || c.notification === 'both') && c.sms_opt_in
        );
        campaignData.customer_ids = smsCustomers.map(c => c.id);
        response = await smsService.sendBulk(campaignData);
      }

      notyf.success(`${campaignType.toUpperCase()} campaign sent successfully to all eligible customers`);
      
      // Reset form
      setSelectedTemplate('');
      setCustomMessage('');
      setSubject('');
      
      // Reload stats
      loadInitialData();
      
    } catch (error) {
      notyf.error(error.response?.data?.message || `Failed to send ${campaignType} campaign`);
    } finally {
      setLoading(false);
    }
  };

  const getEligibleCustomers = () => {
    return customers.filter(customer => {
      if (campaignType === 'email') {
        return customer.notification === 'email' || customer.notification === 'both';
      } else {
        return (customer.notification === 'sms' || customer.notification === 'both') && customer.sms_opt_in;
      }
    });
  };

  const eligibleCustomers = getEligibleCustomers();

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Campaigns</h1>
          <p className="text-muted mb-0">Send emails and SMS to your customers</p>
        </div>
        <Link
          to="/analytics"
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
        >
          <BarChart3 size={16} />
          <span>View Analytics</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Mail className="text-primary" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Emails Sent</p>
                  <h3 className="fw-bold text-dark mb-0">{stats.emailsSent}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="text-success" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">SMS Sent</p>
                  <h3 className="fw-bold text-dark mb-0">{stats.smsSent}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Users className="text-purple" size={32} />
                </div>
                <div className="ms-3">
                  <p className="text-muted mb-1">Total Customers</p>
                  <h3 className="fw-bold text-dark mb-0">{stats.totalCustomers}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Form */}
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title mb-0">Send Campaign</h5>
            <div className="btn-group" role="group">
              <button
                type="button"
                onClick={() => setCampaignType('email')}
                className={`btn btn-sm ${campaignType === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                <Mail size={14} className="me-1" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setCampaignType('sms')}
                className={`btn btn-sm ${campaignType === 'sms' ? 'btn-success' : 'btn-outline-success'}`}
              >
                <MessageSquare size={14} className="me-1" />
                SMS
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {/* Message Content */}
            <div className="col-lg-6">
              <div className="vstack gap-3">
                {campaignType === 'email' && (
                  <div>
                    <label className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-control"
                      placeholder="Enter email subject"
                    />
                  </div>
                )}

                <div>
                  <label className="form-label">
                    Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select a template (optional)</option>
                    {templates
                      .filter(t => t.type === campaignType)
                      .map(template => (
                        <option key={template.id} value={template.id}>
                          {template.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    Custom Message
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={6}
                    className="form-control"
                    placeholder={`Enter your custom ${campaignType} message...`}
                  />
                </div>
              </div>
            </div>

            {/* Customer Selection */}
            <div className="col-lg-6">
              <div className="vstack gap-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label mb-0">
                    Recipients ({eligibleCustomers.length} eligible)
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === eligibleCustomers.length && eligibleCustomers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="form-check-input"
                    />
                    <label className="form-check-label small">Select All</label>
                  </div>
                </div>

                <div className="border rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {eligibleCustomers.map(customer => (
                    <div key={customer.id} className="p-3 border-bottom hover-bg">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={(e) => handleSelectCustomer(customer.id, e.target.checked)}
                          className="form-check-input"
                        />
                        <label className="form-check-label w-100">
                          <div className="ms-2">
                            <div className="fw-semibold text-dark">{customer.name}</div>
                            <div className="text-muted small">{customer.email}</div>
                            {campaignType === 'sms' && customer.phone && (
                              <div className="text-muted small">{customer.phone}</div>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                  
                  {eligibleCustomers.length === 0 && (
                    <div className="text-center py-4 text-muted">
                      No customers eligible for {campaignType} campaigns.
                      {campaignType === 'sms' && ' Make sure customers have opted in for SMS.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
            <button
              onClick={handleSendToAll}
              disabled={loading || eligibleCustomers.length === 0}
              className="btn btn-secondary d-flex align-items-center gap-2"
            >
              <Send size={16} />
              <span>Send to All Eligible</span>
            </button>
            <button
              onClick={handleSendCampaign}
              disabled={loading || selectedCustomers.length === 0}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Send size={16} />
              <span>
                {loading ? 'Sending...' : `Send to Selected (${selectedCustomers.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;