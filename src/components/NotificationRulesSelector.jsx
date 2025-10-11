import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'react-feather';

const NotificationRulesSelector = ({ value = [], onChange }) => {
  const [newRule, setNewRule] = useState({ type: 'before', value: 1, unit: 'days' });

  const handleAddRule = () => {
    let ruleText = '';
    
    if (newRule.type === 'on') {
      ruleText = 'on date';
    } else {
      ruleText = `${newRule.value} ${newRule.value === 1 ? newRule.unit.slice(0, -1) : newRule.unit} ${newRule.type}`;
    }
    
    if (!value.includes(ruleText)) {
      const updatedRules = [...value, ruleText];
      onChange(updatedRules);
    }
    
    setNewRule({ type: 'before', value: 1, unit: 'days' });
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...value];
    updatedRules.splice(index, 1);
    onChange(updatedRules);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title mb-3">Notification Rules</h6>
        
        {/* Current Rules Display */}
        {value.length > 0 ? (
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {value.map((rule, index) => (
                <div key={index} className="badge bg-primary d-flex align-items-center p-2">
                  <span className="me-2">{rule}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveRule(index)}
                    className="btn btn-sm p-0 text-white"
                    style={{ background: 'none', border: 'none' }}
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="alert alert-light border mb-4">
            <small className="text-muted">No notification rules added yet.</small>
          </div>
        )}

        {/* Add Rule Form */}
        <div className="border rounded p-3 bg-light">
          <div className="row g-2 align-items-center">
            {newRule.type !== 'on' && (
              <>
                <div className="col-auto">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={newRule.value}
                    onChange={(e) => setNewRule({ ...newRule, value: parseInt(e.target.value) || 1 })}
                    className="form-control form-control-sm"
                    style={{ width: '80px' }}
                  />
                </div>
                <div className="col-auto">
                  <select
                    value={newRule.unit}
                    onChange={(e) => setNewRule({ ...newRule, unit: e.target.value })}
                    className="form-select form-select-sm"
                    style={{ width: '100px' }}
                  >
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="col-auto">
              <select
                value={newRule.type}
                onChange={(e) => setNewRule({ ...newRule, type: e.target.value })}
                className="form-select form-select-sm"
                style={{ width: '120px' }}
              >
                <option value="before">before</option>
                <option value="after">after</option>
                <option value="on">on date</option>
                
              </select>
            </div>
            
            <div className="col-auto">
              <button
                type="button"
                onClick={handleAddRule}
                className="btn btn-primary btn-sm d-flex align-items-center"
              >
                <PlusCircle size={16} className="me-1" />
                <span>Add Rule</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="mt-3">
          <small className="text-muted">
            Add multiple notification rules to send reminders at different times relative to the event date.
            Set multiple notification times relative to the event date (e.g., "2 days before", "on date", "1 week after")
          </small>
        </div>

        {/* Unsubscribe Note */}
        <div className="mt-2">
          <small className="text-info">
            📌 Include unsubscribe option in emails
          </small>
        </div>
      </div>
    </div>
  );
};

export default NotificationRulesSelector;