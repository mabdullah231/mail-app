import React, { useState } from 'react';
import { Button, Card, Table, Form } from 'react-bootstrap';

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

const PricingPlans = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    features: {
      customers: '',
      emails: '',
      sms: '',
      templates: '',
      rules: '',
      support: '',
    }
  });

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      features: { ...plan.features }
    });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      features: {
        customers: '',
        emails: '',
        sms: '',
        templates: '',
        rules: '',
        support: '',
      }
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.features) {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

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
      {!showForm ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Pricing Plans</h3>
            <Button variant="success" onClick={handleAddNew}>
              <i className="ri-add-line me-1"></i> Add New Plan
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
                        <th key={plan.name} className="text-center prc-wrap">
                          <div className="prc-box position-relative">
                            <div className="h3 pt-4">
                              ${plan.price}
                              <small> / Per month</small>
                            </div>
                            <span className="type">{plan.name}</span>
                            <div className="position-absolute top-0 end-0 m-2">
                              <Button
                                variant="light"
                                size="sm"
                                onClick={() => handleEdit(plan)}
                              >
                                <i className="ri-edit-line"></i>
                              </Button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(plans[0].features).map((feature) => (
                      <tr key={feature}>
                        <th className="text-start" scope="row">
                          {feature.replace(/\b\w/g, (c) => c.toUpperCase())}
                        </th>
                        {plans.map((plan) => (
                          <td key={`${plan.name}-${feature}`} className="child-cell">
                            {renderFeatureValue(plan.features[feature])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h4>
            <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>
              <i className="ri-arrow-left-line me-1"></i>Back to Plans
            </Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <div className="row">
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Price (per month)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Customers Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="customers"
                    value={formData.features.customers}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Email Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="emails"
                    value={formData.features.emails}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>SMS Limit</Form.Label>
                  <Form.Control
                    type="text"
                    name="sms"
                    value={formData.features.sms}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Templates</Form.Label>
                  <Form.Control
                    type="text"
                    name="templates"
                    value={formData.features.templates}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Rules</Form.Label>
                  <Form.Control
                    type="text"
                    name="rules"
                    value={formData.features.rules}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Support Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="support"
                    value={formData.features.support}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary">
              {editingPlan ? 'Update Plan' : 'Save Plan'}
            </Button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default PricingPlans;