import React, { useState } from "react";
import { Form, Modal, Button, Table, Card } from "react-bootstrap";

const initialCampaigns = [
  {
    id: 1,
    name: "August Promo Blast",
    audience: "All Customers",
    template: "Promo_August2025",
    schedule: "Aug 6, 2025 3:00 PM",
    status: "Sent",
  },
  {
    id: 2,
    name: "Welcome Series",
    audience: "New Signups",
    template: "Welcome_Template_01",
    schedule: "Aug 7, 2025 10:00 AM",
    status: "Scheduled",
  },
  {
    id: 3,
    name: "Feedback Request",
    audience: "Recent Buyers",
    template: "Feedback_01",
    schedule: "Aug 10, 2025 12:00 PM",
    status: "Draft",
  },
];

const EmailCampaignPage = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewCampaign, setViewCampaign] = useState(null);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    audience: "All Customers",
    template: "",
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
      template: "",
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
            <h4 className="card-title mb-0">Email Campaigns</h4>
            <Button variant="primary" size="sm" onClick={() => setShowAddForm(true)}>
              <i className="ri-add-fill me-1"></i>Add Campaign
            </Button>
          </div>
          <div className="card-body">
            <Table striped bordered responsive className="text-center">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Audience</th>
                  <th>Template</th>
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
                    <td>{c.template}</td>
                    <td>{c.schedule}</td>
                    <td >
                      <span className={`badge ${c.status === "Sent" ? "bg-success" : c.status === "Draft" ? "bg-secondary" : "bg-warning"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{display:"flex", gap:"10px", justifyContent:"center",flexWrap:"wrap"}}>
                      <Button variant="info" size="sm" onClick={() => setViewCampaign(c)}>
                        <i className="ri-eye-line me-1"></i>View
                      </Button>
                      {c.status !== "Sent" && (
                        <Button variant="secondary" size="sm" onClick={() => toggleStatus(c.id)}>
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
            <h4 className="card-title mb-0">Add Email Campaign</h4>
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
                    placeholder="e.g., August Promo"
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
                <Form.Group className="col-md-6 mb-3 position-relative">
  <Form.Label>Template</Form.Label>
  <div className="position-relative">
    <Form.Control
      as="select"
      name="template"
      className="form-select pe-5"
      value={newCampaign.template}
      onChange={handleInputChange}
    >
      <option value="">Select Template</option>
      <option value="Welcome_Template_01">Welcome Template</option>
      <option value="Promo_August2025">Promo Template</option>
      <option value="Feedback_01">Feedback Template</option>
      <option value="Newsletter_2025">Newsletter Template</option>
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
              <i className="ri-send-plane-line me-1"></i>Save Campaign
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
              <div className="col-md-6 mb-3">
                <h6>Template</h6>
                <p>{viewCampaign.template}</p>
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

export default EmailCampaignPage;