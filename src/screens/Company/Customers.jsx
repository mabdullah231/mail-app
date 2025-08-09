import React, { useState } from "react";
import { Form, Modal, Button, Table, Card } from "react-bootstrap";

const initialCustomers = [
  {
    id: 1,
    name: "Gio Metric",
    email: "gio@example.com",
    phone: "1234567890",
    address: "Madrid",
    country: "Spain",
    smsOptIn: true,
    notification: "email",
    template: "Subscription Reminder",
    startDate: "2025-12-01",
    frequency: "Weekly",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    smsOptIn: false,
    notification: "email",
    template: "",
    startDate: "",
    frequency: "Weekly",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddCustomer = () => {
    setCustomers([...customers, { id: Date.now(), ...newCustomer }]);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      smsOptIn: false,
      notification: "email",
      template: "",
      startDate: "",
      frequency: "Weekly",
    });
    setShowAddForm(false);
  };

  const handleRemove = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="container-fluid mt-4">
      {!showAddForm ? (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">Customers</h4>
            <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
              <i className="ri-add-fill me-1"></i>Add New
            </Button>
          </div>

          <div className="card-body">
            <Table striped bordered responsive className="text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust.id}>
                    <td>{cust.name}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phone}</td>
                    <td>{cust.country}</td>
                    <td style={{display:"flex", gap:"10px", justifyContent:"center",flexWrap:"wrap"}}>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => setViewCustomer(cust)}
                      >
                        View
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemove(cust.id)}
                      >
                        Remove
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
            <h4 className="card-title mb-0">Add New Customer</h4>
            <Button variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>
              <i className="ri-arrow-left-line me-1"></i>Back to Customers
            </Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <div className="row">
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={newCustomer.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={newCustomer.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={newCustomer.country}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label className="d-block">SMS Option</Form.Label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="smsOptIn"
                      name="smsOptIn"
                      checked={newCustomer.smsOptIn}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="smsOptIn">
                      Enable SMS Notifications
                    </label>
                  </div>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Notification Preference</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="notification"
                      className="form-select pe-5"
                      value={newCustomer.notification}
                      onChange={handleInputChange}
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="both">Both</option>
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
                  <Form.Label>Template</Form.Label>
                  <Form.Control
                    name="template"
                    value={newCustomer.template}
                    onChange={handleInputChange}
                    placeholder="e.g., Subscription Reminder"
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Reminder Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={newCustomer.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-6 mb-3 position-relative">
                  <Form.Label>Frequency</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      as="select"
                      name="frequency"
                      className="form-select pe-5"
                      value={newCustomer.frequency}
                      onChange={handleInputChange}
                    >
                      <option value="Daily">Daily</option>
                      <option value="3 Days">3 Days</option>
                      <option value="Weekly">Weekly</option>
                      <option value="2 Weeks">2 Weeks</option>
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
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleAddCustomer}>
              Save Customer
            </Button>
          </Card.Footer>
        </Card>
      )}

      {/* Modal for Viewing Customer Details */}
      <Modal show={!!viewCustomer} onHide={() => setViewCustomer(null)} size="lg">
      <Modal.Header className="d-flex justify-content-between align-items-center">
  <Modal.Title>Customer Details</Modal.Title>
  <i
    className="ri-close-line"
    style={{
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#6c757d',
    }}
    onClick={() => setViewCustomer(null)} // or your close handler
  ></i>
</Modal.Header>
        <Modal.Body>
          {viewCustomer && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6>Name</h6>
                <p>{viewCustomer.name}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Email</h6>
                <p>{viewCustomer.email}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Phone</h6>
                <p>{viewCustomer.phone}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Address</h6>
                <p>{viewCustomer.address}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Country</h6>
                <p>{viewCustomer.country}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>SMS Opt-In</h6>
                <p>{viewCustomer.smsOptIn ? "Yes" : "No"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Notification Preference</h6>
                <p>{viewCustomer.notification}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Template</h6>
                <p>{viewCustomer.template}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Start Date</h6>
                <p>{viewCustomer.startDate}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Frequency</h6>
                <p>{viewCustomer.frequency}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewCustomer(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customers;