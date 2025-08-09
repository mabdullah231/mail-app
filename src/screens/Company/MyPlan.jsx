import React, { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';

const plans = [
  {
    name: 'Basic',
    price: 19,
    features: {
      customers: 'Up to 100',
      emails: '1,000/month',
      sms: '100/month',
      templates: '5',
      rules: '1 Automation Rule',
      support: 'Email Support',
    },
  },
  {
    name: 'Standard',
    price: 39,
    features: {
      customers: 'Up to 1,000',
      emails: '10,000/month',
      sms: '1,000/month',
      templates: '20',
      rules: '5 Automation Rules',
      support: 'Priority Email Support',
    },
  },
  {
    name: 'Platinum',
    price: 119,
    features: {
      customers: 'Up to 10,000',
      emails: '100,000/month',
      sms: '10,000/month',
      templates: 'Unlimited',
      rules: 'Unlimited Rules',
      support: '24/7 Chat Support',
    },
  },
  {
    name: 'Premium',
    price: 219,
    features: {
      customers: 'Unlimited',
      emails: '500,000/month',
      sms: '50,000/month',
      templates: 'Unlimited',
      rules: 'Unlimited + A/B Testing',
      support: 'Dedicated Account Manager',
    },
  },
];

const currentPlan = 'Standard';

const MyPlan = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);

  const current = plans.find((p) => p.name === currentPlan);

  const renderFeatureValue = (value) => {
    if (value === true || value.toLowerCase().includes('unlimited') || value.toLowerCase().includes('yes')) {
      return <i className="ri-check-line ri-2x text-success"></i>;
    }
    if (value === false || value.toLowerCase().includes('no')) {
      return <i className="ri-close-line ri-2x text-danger"></i>;
    }
    return value;
  };

  return (
    <div className="container py-4">
      {!showUpgrade ? (
        <>
          <h3 className="mb-4">My Current Plan</h3>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4>{current.name} Plan - ${current.price}/month</h4>
                  <ul className="mt-3">
                    {Object.entries(current.features).map(([key, value]) => (
                      <li key={key}><strong>{key.replace(/^\w/, (c) => c.toUpperCase())}:</strong> {value}</li>
                    ))}
                  </ul>
                </div>
                <Button variant="primary" onClick={() => setShowUpgrade(true)}>
                  Upgrade Plan
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Upgrade Options</h3>
            <Button variant="outline-secondary" onClick={() => setShowUpgrade(false)}>
              <i className="ri-arrow-left-line me-1"></i> Back to Current Plan
            </Button>
          </div>
          
          <Card>
            <Card.Body>
              <div className="table-responsive pricing pt-2">
                <Table bordered hover className="text-center align-middle">
                  <thead>
                    <tr>
                      <th className="text-center prc-wrap"></th>
                      {plans.map((plan) => (
                        <th 
                          key={plan.name} 
                          className={`text-center prc-wrap ${plan.name === currentPlan ? 'active' : ''}`}
                        >
                          <div className={`prc-box ${plan.name === currentPlan ? 'active' : ''}`}>
                            <div className="h3 pt-4">${plan.price}<small> / Per month</small></div>
                            <span className="type">{plan.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(plans[0].features).map((feature) => (
                      <tr key={feature}>
                        <th className="text-start" scope="row">
                          {feature.replace(/^\w/, (c) => c.toUpperCase())}
                        </th>
                        {plans.map((plan) => (
                          <td 
                            key={`${plan.name}-${feature}`} 
                            className={`child-cell ${plan.name === currentPlan ? 'active' : ''}`}
                          >
                            {renderFeatureValue(plan.features[feature])}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      {plans.map((plan) => (
                        <td key={plan.name}>
                          {plan.name === currentPlan ? (
                            <Button variant="secondary" disabled>
                              <i className="ri-check-line me-1"></i> Current Plan
                            </Button>
                          ) : (
                            <Button variant="primary" className="mt-3">
                              Choose Plan
                            </Button>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default MyPlan;