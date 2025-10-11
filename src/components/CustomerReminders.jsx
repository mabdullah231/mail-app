import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit, Trash2, Clock, Bell } from 'react-feather';
import { reminderService } from '../services/reminderService';
import AutomatedReminderForm from './AutomatedReminderForm';

const CustomerReminders = ({ customerId }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadReminders();
  }, [customerId]);

  const loadReminders = async () => {
    try {
      setLoading(true);
      const data = await reminderService.getByCustomer(customerId);
      setReminders(data);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReminder = async (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      try {
        await reminderService.delete(id);
        setReminders(reminders.filter(reminder => reminder.id !== id));
      } catch (error) {
        console.error('Error deleting reminder:', error);
      }
    }
  };

  const handleReminderCreated = () => {
    setShowAddForm(false);
    loadReminders();
  };

  const formatFrequency = (frequency) => {
    return frequency === 'one-time' ? 'One-time only' : `Every ${frequency}`;
  };

  const formatNotificationRules = (rules) => {
    if (!rules || rules.length === 0) {
      return 'On date';
    }
    return rules.join(', ');
  };

  if (loading && reminders.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <Calendar className="me-2 text-muted" size={20} />
              <h5 className="card-title mb-0">Reminders</h5>
            </div>
          </div>
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <Calendar className="me-2 text-muted" size={20} />
            <h5 className="card-title mb-0">Reminders</h5>
          </div>
          {!showAddForm && reminders.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary btn-sm d-flex align-items-center"
            >
              <Plus size={16} className="me-1" />
              <span>Add Reminder</span>
            </button>
          )}
        </div>

        {showAddForm ? (
          <AutomatedReminderForm
            customerId={customerId}
            onSuccess={handleReminderCreated}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <>
            {reminders.length === 0 ? (
              <div className="text-center py-5">
                <Bell className="text-muted mb-3" size={48} />
                <h5 className="text-muted mb-3">No reminders set</h5>
                <p className="text-muted mb-4">
                  Create automated reminders to notify this customer about important dates
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary d-inline-flex align-items-center"
                >
                  <Plus size={16} className="me-2" />
                  Create First Reminder
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="col-12">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="card-subtitle mb-2 text-primary">
                              {reminder.template?.title || 'Untitled Template'}
                            </h6>
                            <div className="row mt-3">
                              <div className="col-md-4">
                                <div className="d-flex align-items-center text-muted mb-2">
                                  <Clock size={14} className="me-2" />
                                  <small>
                                    {formatFrequency(reminder.recurrence_rule?.frequency || 'one-time')}
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="d-flex align-items-center text-muted mb-2">
                                  <Calendar size={14} className="me-2" />
                                  <small>
                                    Starts: {new Date(reminder.start_at).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="d-flex align-items-center text-muted mb-2">
                                  <Bell size={14} className="me-2" />
                                  <small>
                                    Notifications: {formatNotificationRules(reminder.recurrence_rule?.notification_rules)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ms-3">
                            <button
                              onClick={() => handleDeleteReminder(reminder.id)}
                              className="btn btn-outline-danger btn-sm"
                              title="Delete reminder"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerReminders;