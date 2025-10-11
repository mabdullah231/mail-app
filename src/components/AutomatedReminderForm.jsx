import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Save, X } from 'react-feather';
import DatePicker from 'react-datepicker';
import NotificationRulesSelector from './NotificationRulesSelector';
import { reminderService } from '../services/reminderService';
import { templateService } from '../services/templateService';
import 'react-datepicker/dist/react-datepicker.css';

const AutomatedReminderForm = ({ customerId, onSuccess, onCancel }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: customerId,
    template_id: '',
    start_date: new Date(),
    frequency: 'Weekly',
    expires_at: null,
    notification_rules: ['on date', '1 day before', '2 days after']
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await templateService.getAll();
        setTemplates(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, template_id: data[0].id }));
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await reminderService.create({
        customer_id: formData.customer_id,
        template_id: formData.template_id,
        start_at: formData.start_date,
        recurrence_rule: {
          frequency: formData.frequency,
          expires_at: formData.expires_at,
          notification_rules: formData.notification_rules
        },
        next_run_at: formData.start_date,
        active: true
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating reminder:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">Create Automated Reminder</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Template Selection */}
            <div className="col-12">
              <label htmlFor="template_id" className="form-label">
                Template
              </label>
              <select
                id="template_id"
                name="template_id"
                value={formData.template_id}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.title} ({template.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date and Frequency */}
            <div className="col-md-6">
              <label htmlFor="start_date" className="form-label">
                Start Date
              </label>
              <div className="input-group">
                <DatePicker
                  id="start_date"
                  selected={formData.start_date}
                  onChange={(date) => setFormData({...formData, start_date: date})}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
                <span className="input-group-text">
                  <Calendar size={16} className="text-muted" />
                </span>
              </div>
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
                <option value="Daily">Daily</option>
                <option value="3 days">Every 3 days</option>
                <option value="Weekly">Weekly</option>
                <option value="2 weeks">Every 2 weeks</option>
                <option value="one-time">One-time only</option>
              </select>
            </div>

            {/* End Date */}
            <div className="col-12">
              <label htmlFor="expires_at" className="form-label">
                End Date <small className="text-muted">(Optional)</small>
              </label>
              <div className="input-group">
                <DatePicker
                  id="expires_at"
                  selected={formData.expires_at}
                  onChange={(date) => setFormData({...formData, expires_at: date})}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Never expires"
                  isClearable
                />
                <span className="input-group-text">
                  <Clock size={16} className="text-muted" />
                </span>
              </div>
            </div>

            {/* Notification Rules */}
            <div className="col-12">
              <label className="form-label">
                Notification Rules
              </label>
              <NotificationRulesSelector
                value={formData.notification_rules}
                onChange={(rules) => setFormData({...formData, notification_rules: rules})}
              />
              <div className="form-text">
                Set when notifications should be sent relative to the event date
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-12">
              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn btn-outline-secondary d-flex align-items-center"
                  disabled={loading}
                >
                  <X size={16} className="me-1" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="me-1" />
                      Create Reminder
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutomatedReminderForm;