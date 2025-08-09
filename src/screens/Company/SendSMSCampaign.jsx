import React, { useState } from "react";
import { Form, Modal, Button, Table, Card } from "react-bootstrap";

const initialSMSCampaigns = [
  {
    id: 1,
    name: "Flash Sale Alert",
    audience: "Active Users",
    message: "Hurry! 50% off today only…",
    schedule: "Aug 6, 2025 5:00 PM",
    status: "Sent",
  },
  {
    id: 2,
    name: "OTP Reminder",
    audience: "Incomplete Signups",
    message: "Your OTP is 1234",
    schedule: "Aug 7, 2025 9:00 AM",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Thank You Note",
    audience: "Recent Buyers",
    message: "Thanks for shopping with us!",
    schedule: "Aug 10, 2025 4:00 PM",
    status: "Draft",
  },
];

const SendSMSCampaign = () => {
  const [campaigns, setCampaigns] = useState(initialSMSCampaigns);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewCampaign, setViewCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    audience: "All Customers",
    message: "",
    schedule: "",
    status: "Draft",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleAddCampaign = () => {
    setCampaigns([...campaigns, { id: Date.now(), ...newCampaign }]);
    setNewCampaign({
      name: "",
      audience: "All Customers",
      message: "",
      schedule: "",
      status: "Draft",
    });
    setShowAddForm(false);
  };

  const toggleStatus = (id) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Scheduled" ? "Paused" : "Scheduled",
            }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <div className="container-fluid mt-4">
      {!showAddForm ? (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">SMS Campaigns</h4>
            <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
              <i className="ri-add-fill me-1"></i>Add SMS Campaign
            </Button>
          </div>
          <div className="card-body">
            <Table striped bordered responsive className="text-center">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Audience</th>
                  <th>Message</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.audience}</td>
                    <td>{c.message}</td>
                    <td>{c.schedule}</td>
                    <td>
                      <span className={`badge ${c.status === "Sent" ? "bg-success" : c.status === "Draft" ? "bg-secondary" : "bg-warning"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{display:"flex", gap:"10px", justifyContent:"center",flexWrap:"wrap"}}>
                      <Button variant="info" size="sm"  onClick={() => setViewCampaign(c)}>
                        <i className="ri-eye-line "></i>View
                      </Button>
                      {c.status !== "Sent" && (
                        <Button variant="secondary" size="sm"  onClick={() => toggleStatus(c.id)}>
                          {c.status === "Scheduled" ? <i className="ri-pause-line "></i> : <i className="ri-play-line me-1"></i>}
                          {c.status === "Scheduled" ? "Pause" : "Resume"}
                        </Button>
                      )}
                      {c.status !== "Sent" && (
                        <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
                          <i className="ri-delete-bin-line "></i>Delete
                        </Button>
                      )}
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
            <h4 className="card-title mb-0">Add SMS Campaign</h4>
            <Button variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>
              <i className="ri-arrow-left-line me-1"></i>Back
            </Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <div className="row">
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Campaign Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={newCampaign.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Flash Sale Alert"
                  />
                </Form.Group>
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Audience</Form.Label>
                  <Form.Control
                    as="select"
                    name="audience"
                    className="form-select"
                    value={newCampaign.audience}
                    onChange={handleInputChange}
                  >
                    <option value="All Customers">All Customers</option>
                    <option value="New Signups">New Signups</option>
                    <option value="Recent Buyers">Recent Buyers</option>
                    <option value="VIP Customers">VIP Customers</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-12 mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={newCampaign.message}
                    onChange={handleInputChange}
                    placeholder="Write your SMS message here..."
                  />
                </Form.Group>
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Schedule</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="schedule"
                    value={newCampaign.schedule}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleAddCampaign}>
              <i className="ri-send-plane-line me-1"></i>Save SMS Campaign
            </Button>
          </Card.Footer>
        </Card>
      )}

      <Modal show={!!viewCampaign} onHide={() => setViewCampaign(null)} size="lg">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title>Campaign Details</Modal.Title>
          <i
            className="ri-close-line"
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#6c757d' }}
            onClick={() => setViewCampaign(null)}
          ></i>
        </Modal.Header>
        <Modal.Body>
          {viewCampaign && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6>Campaign Name</h6>
                <p>{viewCampaign.name}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Audience</h6>
                <p>{viewCampaign.audience}</p>
              </div>
              <div className="col-md-12 mb-3">
                <h6>Message</h6>
                <p>{viewCampaign.message}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Schedule</h6>
                <p>{viewCampaign.schedule}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Status</h6>
                <p>
                  <span className={`badge ${viewCampaign.status === "Sent" ? "bg-success" : viewCampaign.status === "Draft" ? "bg-secondary" : "bg-warning"}`}>
                    {viewCampaign.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewCampaign(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SendSMSCampaign;
