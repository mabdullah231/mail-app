import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'react-feather';

const NotificationRulesSelector = ({ value = [], onChange }) => {
  const [newRule, setNewRule] = useState({ type: 'before', value: 1, unit: 'days' });

  const handleAddRule = () => {
    // Format the rule as a string like "1 day before" or "on date" or "2 days after"
    let ruleText = '';
    
    if (newRule.type === 'on') {
      ruleText = 'on date';
    } else {
      ruleText = `${newRule.value} ${newRule.value === 1 ? newRule.unit.slice(0, -1) : newRule.unit} ${newRule.type}`;
    }
    
    // Add the new rule if it doesn't already exist
    if (!value.includes(ruleText)) {
      const updatedRules = [...value, ruleText];
      onChange(updatedRules);
    }
    
    // Reset the form
    setNewRule({ type: 'before', value: 1, unit: 'days' });
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...value];
    updatedRules.splice(index, 1);
    onChange(updatedRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {value.map((rule, index) => (
          <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            <span>{rule}</span>
            <button 
              type="button"
              onClick={() => handleRemoveRule(index)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <XCircle size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {newRule.type !== 'on' && (
          <>
            <input
              type="number"
              min="1"
              max="90"
              value={newRule.value}
              onChange={(e) => setNewRule({ ...newRule, value: parseInt(e.target.value) })}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md"
            />
            
            <select
              value={newRule.unit}
              onChange={(e) => setNewRule({ ...newRule, unit: e.target.value })}
              className="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
            </select>
          </>
        )}
        
        <select
          value={newRule.type}
          onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value="before">before</option>
          <option value="after">after</option>
          <option value="on">on date</option>
        </select>
        
        <button
          type="button"
          onClick={handleAddRule}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={18} className="mr-1" />
          <span>Add Rule</span>
        </button>
      </div>
      
      <div className="text-xs text-gray-500">
        Add multiple notification rules to send reminders at different times relative to the event date.
      </div>
    </div>
  );
};

export default NotificationRulesSelector;