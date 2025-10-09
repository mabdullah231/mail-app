import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Upload,
  Save,
  Eye,
  EyeOff,
  Key,
  Bell
} from 'lucide-react';
import { companyService } from '../services/companyService';
import authService from '../services/authService';
import { subscriptionService } from '../services/subscriptionService';
import { getUserData } from '../utils/auth';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    logo: null,
    business_email: '',
    business_email_password: '',
    smtp_host: '',
    smtp_port: '',
    smtp_encryption: 'tls'
  });
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [subscription, setSubscription] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    business_email: false,
    current: false,
    new: false,
    confirm: false
  });

  const user = getUserData();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [companyResponse, profileResponse, subscriptionResponse] = await Promise.all([
        companyService.getDetails(),
        authService.getProfile(),
        subscriptionService.getCurrent()
      ]);

      if (companyResponse.company) {
        setCompany(companyResponse.company);
      }

      setProfile({
        name: profileResponse.name || '',
        email: profileResponse.email || '',
        current_password: '',
        new_password: '',
        confirm_password: ''
      });

      setSubscription(subscriptionResponse);
    } catch (error) {
      console.error('Failed to load settings data:', error);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(company).forEach(key => {
        if (company[key] !== null && company[key] !== '') {
          formData.append(key, company[key]);
        }
      });

      await companyService.storeOrUpdate(formData);
      notyf.success('Company details updated successfully');
      loadData();
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Failed to update company details');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (profile.new_password && profile.new_password !== profile.confirm_password) {
      notyf.error('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: profile.name,
        email: profile.email
      };

      if (profile.new_password) {
        updateData.current_password = profile.current_password;
        updateData.password = profile.new_password;
        updateData.password_confirmation = profile.confirm_password;
      }

      await authService.updateProfile(updateData);
      notyf.success('Profile updated successfully');
      
      // Reset password fields
      setProfile(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompany(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubscribeBrandingRemoval = async () => {
    if (!window.confirm('Subscribe to branding removal for $9.99/month?')) {
      return;
    }

    try {
      setLoading(true);
      await subscriptionService.subscribeBrandingRemoval({
        payment_method: 'paypal' // In real app, integrate with PayPal
      });
      notyf.success('Successfully subscribed to branding removal');
      loadData();
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
      <div className="mb-4">
        <h1 className="h2 fw-bold text-dark mb-1">Settings</h1>
        <p className="text-muted mb-0">Manage your account and company settings</p>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => setActiveTab('company')}
          >
            <Building size={16} className="me-2" />
            Company Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Key size={16} className="me-2" />
            Profile & Security
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            <Bell size={16} className="me-2" />
            Subscription
          </button>
        </li>
      </ul>

      {/* Company Details Tab */}
      {activeTab === 'company' && (
        <form onSubmit={handleCompanySubmit}>
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Company Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Company Email *
                  </label>
                  <input
                    type="email"
                    value={company.email}
                    onChange={(e) => setCompany(prev => ({ ...prev, email: e.target.value }))}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={company.phone}
                    onChange={(e) => setCompany(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Country
                  </label>
                  <select
                    value={company.country}
                    onChange={(e) => setCompany(prev => ({ ...prev, country: e.target.value }))}
                    className="form-select"
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Address
                  </label>
                  <textarea
                    value={company.address}
                    onChange={(e) => setCompany(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">
                    Company Logo
                  </label>
                  <div className="d-flex align-items-center gap-3">
                    {company.logo && typeof company.logo === 'string' && (
                      <img 
                        src={`http://localhost:8000/${company.logo}`} 
                        alt="Company Logo" 
                        className="img-thumbnail"
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Email Configuration</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Business Email
                  </label>
                  <input
                    type="email"
                    value={company.business_email}
                    onChange={(e) => setCompany(prev => ({ ...prev, business_email: e.target.value }))}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Email Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.business_email ? 'text' : 'password'}
                      value={company.business_email_password}
                      onChange={(e) => setCompany(prev => ({ ...prev, business_email_password: e.target.value }))}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('business_email')}
                      className="btn btn-outline-secondary"
                    >
                      {showPasswords.business_email ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={company.smtp_host}
                    onChange={(e) => setCompany(prev => ({ ...prev, smtp_host: e.target.value }))}
                    className="form-control"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={company.smtp_port}
                    onChange={(e) => setCompany(prev => ({ ...prev, smtp_port: e.target.value }))}
                    className="form-control"
                    placeholder="587"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Encryption
                  </label>
                  <select
                    value={company.smtp_encryption}
                    onChange={(e) => setCompany(prev => ({ ...prev, smtp_encryption: e.target.value }))}
                    className="form-select"
                  >
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Save size={16} />
              <span>{loading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit}>
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Change Password</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">
                    Current Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={profile.current_password}
                      onChange={(e) => setProfile(prev => ({ ...prev, current_password: e.target.value }))}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="btn btn-outline-secondary"
                    >
                      {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={profile.new_password}
                      onChange={(e) => setProfile(prev => ({ ...prev, new_password: e.target.value }))}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="btn btn-outline-secondary"
                    >
                      {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Confirm New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={profile.confirm_password}
                      onChange={(e) => setProfile(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="btn btn-outline-secondary"
                    >
                      {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Save size={16} />
              <span>{loading ? 'Updating...' : 'Update Profile'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div>
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Subscription Status</h5>
            </div>
            <div className="card-body">
              {subscription ? (
                <div className="alert alert-success">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="alert-heading mb-1">Branding Removal Active</h6>
                      <p className="mb-0">
                        Your subscription is active until {new Date(subscription.expires_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="badge bg-success">Active</span>
                  </div>
                </div>
              ) : (
                <div className="vstack gap-3">
                  <div className="alert alert-warning">
                    <h6 className="alert-heading mb-1">Free Plan</h6>
                    <p className="mb-0">Your emails include "Powered by Email Zus" branding</p>
                  </div>
                  
                  <div className="card border">
                    <div className="card-body">
                      <h6 className="card-title">Remove Branding</h6>
                      <p className="card-text text-muted mb-3">
                        Subscribe to remove "Powered by Email Zus" from your emails
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="h4 fw-bold text-dark">$9.99</span>
                          <span className="text-muted">/month</span>
                        </div>
                        <button
                          onClick={handleSubscribeBrandingRemoval}
                          disabled={loading}
                          className="btn btn-primary"
                        >
                          {loading ? 'Processing...' : 'Subscribe Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;