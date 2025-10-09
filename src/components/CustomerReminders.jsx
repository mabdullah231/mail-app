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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">Reminders</h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900">Reminders</h2>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" />
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
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders set</h3>
              <p className="text-gray-500 mb-4">
                Create automated reminders to notify this customer about important dates
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={16} className="mr-2" />
                Create First Reminder
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {reminder.template?.title || 'Untitled Template'}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {formatFrequency(reminder.recurrence_rule?.frequency || 'one-time')}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            Starts: {new Date(reminder.start_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Bell className="w-4 h-4 mr-2" />
                          <span>
                            Notifications: {formatNotificationRules(reminder.recurrence_rule?.notification_rules)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerReminders;