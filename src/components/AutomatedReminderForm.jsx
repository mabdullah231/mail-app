import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'react-feather';
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Create Automated Reminder</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="template_id" className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              id="template_id"
              name="template_id"
              value={formData.template_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <div className="relative">
                <DatePicker
                  id="start_date"
                  selected={formData.start_date}
                  onChange={(date) => setFormData({...formData, start_date: date})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  dateFormat="yyyy-MM-dd"
                />
                <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Daily">Daily</option>
                <option value="3 days">Every 3 days</option>
                <option value="Weekly">Weekly</option>
                <option value="2 weeks">Every 2 weeks</option>
                <option value="one-time">One-time only</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700 mb-1">
              End Date (Optional)
            </label>
            <div className="relative">
              <DatePicker
                id="expires_at"
                selected={formData.expires_at}
                onChange={(date) => setFormData({...formData, expires_at: date})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                dateFormat="yyyy-MM-dd"
                placeholderText="Never expires"
                isClearable
              />
              <Clock className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notification Rules
            </label>
            <NotificationRulesSelector
              value={formData.notification_rules}
              onChange={(rules) => setFormData({...formData, notification_rules: rules})}
            />
            <p className="mt-1 text-xs text-gray-500">
              Set when notifications should be sent relative to the event date
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Reminder'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AutomatedReminderForm;