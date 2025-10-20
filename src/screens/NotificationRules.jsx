// src/screens/NotificationRules.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Calendar, Mail, MessageSquare } from 'react-feather';
import { notificationRuleService } from '../services/notificationRuleService';
import { customerService } from './../services/customerService';
import { templateService } from './../services/templateService';
import { companyService } from '../services/companyService';
import Helpers from '../config/Helpers';

const NotificationRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchCompanyAndRules();
  }, []);

  const fetchCompanyAndRules = async () => {
    try {
      setLoading(true);
      
      // Fetch company details first
      const companyResponse = await companyService.getDetails();
      if (companyResponse.success && companyResponse.company) {
        setCompany(companyResponse.company);
        
        // Then fetch notification rules
        const rulesData = await notificationRuleService.getAll();
        console.log('Fetched rules:', rulesData);
        setRules(rulesData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Helpers.toast('error', 'Failed to load notification rules');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    if (!window.confirm('Are you sure you want to delete this notification rule?')) {
      return;
    }

    try {
      await notificationRuleService.delete(ruleId);
      Helpers.toast('success', 'Notification rule deleted successfully');
      // Refresh the list
      fetchCompanyAndRules();
    } catch (error) {
      console.error('Error deleting rule:', error);
      Helpers.toast('error', 'Failed to delete notification rule');
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email':
        return <Mail size={16} className="text-primary" />;
      case 'sms':
        return <MessageSquare size={16} className="text-success" />;
      default:
        return <Mail size={16} />;
    }
  };

  const getEventTypeBadge = (eventType) => {
    const types = {
      birthday: 'success',
      anniversary: 'info',
      appointment: 'warning',
      payment_due: 'danger',
      custom: 'secondary'
    };
    
    return `badge bg-${types[eventType] || 'secondary'}`;
  };

  const getStatusBadge = (active) => {
    return active 
      ? 'badge bg-success'
      : 'badge bg-secondary';
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading notification rules...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Notification Rules</h5>
              <Link to="/panel/notification-rules/create" className="btn btn-primary btn-sm">
                <Plus size={16} className="me-1" />
                Create New Rule
              </Link>
            </div>
            <div className="card-body">
              {rules.length === 0 ? (
                <div className="text-center py-5">
                  <Calendar size={48} className="text-muted mb-3" />
                  <h5>No Notification Rules Found</h5>
                  <p className="text-muted mb-4">
                    You haven't created any notification rules yet. Create your first rule to start automating reminders.
                  </p>
                  <Link to="/panel/notification-rules/create" className="btn btn-primary">
                    <Plus size={16} className="me-1" />
                    Create Your First Rule
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Template</th>
                        <th>Event Type</th>
                        <th>Timing</th>
                        <th>Channel</th>
                        <th>Rules</th>
                        <th>Status</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {rules.map((rule) => (
                        <tr key={rule.id}>
                          <td>
                            <div>
                              <strong>{rule.customer?.name}</strong>
                              <br />
                              <small className="text-muted">{rule.customer?.email}</small>
                            </div>
                          </td>
                          <td>
                            {rule.template ? (
                              <div>
                                <strong>{rule.template.title}</strong>
                                <br />
                                <small className="text-muted">({rule.template.type})</small>
                              </div>
                            ) : (
                              <span className="text-muted">No template</span>
                            )}
                          </td>
                          <td>
                            <span className={getEventTypeBadge(rule.event_type)}>
                              {rule.event_type}
                            </span>
                          </td>
                          <td>
                            <div>
                              <strong>{rule.timing}</strong>
                              {rule.days_offset && (
                                <br />
                              )}
                              {rule.days_offset > 0 && (
                                <small className="text-muted">{rule.days_offset} days after</small>
                              )}
                              {rule.days_offset < 0 && (
                                <small className="text-muted">{Math.abs(rule.days_offset)} days before</small>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {getChannelIcon(rule.channel)}
                              <span className="ms-2 text-capitalize">{rule.channel}</span>
                            </div>
                          </td>
                          <td>
                            {rule.rules && rule.rules.length > 0 ? (
                              <div>
                                {rule.rules.slice(0, 2).map((ruleText, index) => (
                                  <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                    {ruleText}
                                  </span>
                                ))}
                                {rule.rules.length > 2 && (
                                  <span className="badge bg-light text-dark">
                                    +{rule.rules.length - 2} more
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted">No rules</span>
                            )}
                          </td>
                          <td>
                            <span className={getStatusBadge(rule.active)}>
                              {rule.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          {/* <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => }
                                title="View Rule"
                              >
                                <Eye size={14} />
                              </button>
                              <button 
                                className="btn btn-outline-secondary"
                                onClick={() => }
                                title="Edit Rule"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteRule(rule.id)}
                                title="Delete Rule"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {rules.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h4 className="card-title">{rules.length}</h4>
                <p className="card-text">Total Rules</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h4 className="card-title">{rules.filter(r => r.active).length}</h4>
                <p className="card-text">Active Rules</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h4 className="card-title">{rules.filter(r => r.channel === 'email').length}</h4>
                <p className="card-text">Email Rules</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <h4 className="card-title">{rules.filter(r => r.channel === 'sms').length}</h4>
                <p className="card-text">SMS Rules</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationRules;