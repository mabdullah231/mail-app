import React, { useState } from "react";
import { Form, Modal, Button, Table, Card } from "react-bootstrap";

const initialRules = [
  {
    id: 1,
    name: "Welcome Email",
    triggerEvent: "New Signup",
    notificationType: "Email",
    template: "Welcome Template",
    targetCustomers: "All Customers",
    delay: "Immediate",
    status: "Active",
  },
  {
    id: 2,
    name: "Donation Thank You",
    triggerEvent: "Successful Donation",
    notificationType: "SMS",
    template: "Thank You Template",
    targetCustomers: "Donors Only",
    delay: "After 1 hour",
    status: "Active",
  },
  {
    id: 3,
    name: "Inactivity Reminder",
    triggerEvent: "30 Days Inactive",
    notificationType: "Both",
    template: "Reminder Template",
    targetCustomers: "Inactive Customers",
    delay: "After 30 days",
    status: "Paused",
  },
];

const NotificationRules = () => {
  const [rules, setRules] = useState(initialRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewRule, setViewRule] = useState(null);
  const [newRule, setNewRule] = useState({
    name: "",
    triggerEvent: "New Signup",
    notificationType: "Email",
    template: "",
    targetCustomers: "All Customers",
    delay: "Immediate",
    status: "Active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRule({
      ...newRule,
      [name]: value,
    });
  };

  const handleAddRule = () => {
    setRules([...rules, { id: Date.now(), ...newRule }]);
    setNewRule({
      name: "",
      triggerEvent: "New Signup",
      notificationType: "Email",
      template: "",
      targetCustomers: "All Customers",
      delay: "Immediate",
      status: "Active",
    });
    setShowAddForm(false);
  };

  const handleRemove = (id) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const toggleStatus = (id) => {
    setRules(
      rules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "Active" ? "Paused" : "Active",
            }
          : rule
      )
    );
  };

  return (
    <div className="container-fluid mt-4">
      {!showAddForm ? (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">Notification Rules</h4>
            <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
              <i className="ri-add-fill me-1"></i>Add New Rule
            </Button>
          </div>

          <div className="card-body">
            <Table striped bordered responsive className="text-center">
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Trigger Event</th>
                  <th>Notification Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{rule.name}</td>
                    <td>{rule.triggerEvent}</td>
                    <td>{rule.notificationType}</td>
                    <td>
                      <span
                        className={`badge ${
                          rule.status === "Active" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td style={{display:"flex", gap:"10px", justifyContent:"center",flexWrap:"wrap"}}>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => setViewRule(rule)}
                      >
                        <i className="ri-eye-line me-1"></i>View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className=""
                        onClick={() => toggleStatus(rule.id)}
                      >
                        {rule.status === "Active" ? (
                          <i className="ri-pause-line me-1"></i>
                        ) : (
                          <i className="ri-play-line me-1"></i>
                        )}
                        {rule.status === "Active" ? "Pause" : "Resume"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(rule.id)}
                      >
                        <i className="ri-delete-bin-line me-1"></i>Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">Add New Notification Rule</h4>
            <Button variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>
              <i className="ri-arrow-left-line me-1"></i>Back to Rules
            </Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <div className="row">
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Rule Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={newRule.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Welcome Email"
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Trigger Event</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="triggerEvent"
                      className="form-select pe-5"
                      value={newRule.triggerEvent}
                      onChange={handleInputChange}
                    >
                      <option value="New Signup">New Signup</option>
                      <option value="Successful Donation">Successful Donation</option>
                      <option value="30 Days Inactive">30 Days Inactive</option>
                      <option value="Weekly Newsletter">Weekly Newsletter</option>
                      <option value="Monthly Report">Monthly Report</option>
                    </Form.Control>
                    <i
                      className="ri-arrow-down-s-line position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Notification Type</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="notificationType"
                      className="form-select pe-5"
                      value={newRule.notificationType}
                      onChange={handleInputChange}
                    >
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Both">Both</option>
                    </Form.Control>
                    <i
                      className="ri-arrow-down-s-line position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Template</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="template"
                      className="form-select pe-5"
                      value={newRule.template}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Template</option>
                      <option value="Welcome Template">Welcome Template</option>
                      <option value="Thank You Template">Thank You Template</option>
                      <option value="Reminder Template">Reminder Template</option>
                      <option value="Newsletter Template">Newsletter Template</option>
                    </Form.Control>
                    <i
                      className="ri-arrow-down-s-line position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Target Customers</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="targetCustomers"
                      className="form-select pe-5"
                      value={newRule.targetCustomers}
                      onChange={handleInputChange}
                    >
                      <option value="All Customers">All Customers</option>
                      <option value="Donors Only">Donors Only</option>
                      <option value="Inactive Customers">Inactive Customers</option>
                      <option value="Specific Category">Specific Category</option>
                      <option value="Specific Region">Specific Region</option>
                    </Form.Control>
                    <i
                      className="ri-arrow-down-s-line position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Delay/Timing</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="delay"
                      className="form-select pe-5"
                      value={newRule.delay}
                      onChange={handleInputChange}
                    >
                      <option value="Immediate">Immediate</option>
                      <option value="After 1 hour">After 1 hour</option>
                      <option value="After 24 hours">After 24 hours</option>
                      <option value="After 7 days">After 7 days</option>
                      <option value="After 30 days">After 30 days</option>
                    </Form.Control>
                    <i
                      className="ri-arrow-down-s-line position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "1.2rem",
                        color: "#6c757d",
                      }}
                    ></i>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label className="d-block">Status</Form.Label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="active"
                      value="Active"
                      checked={newRule.status === "Active"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="active">
                      Active
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="paused"
                      value="Paused"
                      checked={newRule.status === "Paused"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="paused">
                      Paused
                    </label>
                  </div>
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleAddRule}>
              <i className="ri-save-line me-1"></i>Save Rule
            </Button>
          </Card.Footer>
        </Card>
      )}

      {/* Modal for Viewing Rule Details */}
      <Modal show={!!viewRule} onHide={() => setViewRule(null)} size="lg">
      <Modal.Header className="d-flex justify-content-between align-items-center">
  <Modal.Title>Rule Details</Modal.Title>
  <i
    className="ri-close-line"
    style={{
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#6c757d',
    }}
    onClick={() => setViewRule(null)} // or your close handler
  ></i>
</Modal.Header>
        <Modal.Body>
          {viewRule && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6>Rule Name</h6>
                <p>{viewRule.name}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Trigger Event</h6>
                <p>{viewRule.triggerEvent}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Notification Type</h6>
                <p>{viewRule.notificationType}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Template</h6>
                <p>{viewRule.template}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Target Customers</h6>
                <p>{viewRule.targetCustomers}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Delay/Timing</h6>
                <p>{viewRule.delay}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Status</h6>
                <p>
                  <span
                    className={`badge ${
                      viewRule.status === "Active" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {viewRule.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewRule(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationRules;