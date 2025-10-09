import React, { useState } from "react";
import { Button, Table, Card, Form } from "react-bootstrap";

const initialCompanies = [
  {
    id: 1,
    name: "MetricSoft",
    email: "admin@metricsoft.com",
    phone: "9876543210",
    country: "USA",
    status: "active",
    stats: {
      emailTemplates: 12,
      smsTemplates: 7,
      notificationRules: 5,
    },
  },
  {
    id: 2,
    name: "CloudWaves",
    email: "info@cloudwaves.com",
    phone: "1234567890",
    country: "UK",
    status: "inactive",
    stats: {
      emailTemplates: 4,
      smsTemplates: 2,
      notificationRules: 1,
    },
  },
];

const AdminCompanies = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [viewCompany, setViewCompany] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusToggle = (id) => {
    setCompanies((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              status: comp.status === "active" ? "inactive" : "active",
            }
          : comp
      )
    );
  };

  const filteredCompanies =
    filterStatus === "all"
      ? companies
      : companies.filter((c) => c.status === filterStatus);

  return (
    <div className="container-fluid mt-4">
      {!viewCompany ? (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title mb-0">Companies</h4>
            <div className="d-flex gap-2">
              <Form.Group className="mb-0 position-relative">
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="form-select pe-5"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
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
              </Form.Group>
            </div>
          </div>

          <div className="card-body">
            <Table striped bordered responsive className="text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((comp) => (
                  <tr key={comp.id}>
                    <td>{comp.name}</td>
                    <td>{comp.email}</td>
                    <td>{comp.phone}</td>
                    <td>{comp.country}</td>
                    <td>
                      <span
                        style={{
                          background:
                            comp.status === "active" ? "green" : "gray",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }}
                      >
                        {comp.status}
                      </span>
                    </td>

                    <td style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => setViewCompany(comp)}
                      >
                        <i className="ri-eye-line me-1"></i> View
                      </Button>
                      <Button
                        variant={
                          comp.status === "active" ? "secondary" : "success"
                        }
                        size="sm"
                        onClick={() => handleStatusToggle(comp.id)}
                      >
                        <i
                          className={`ri-$
                            {comp.status === "active" ? "pause-line" : "play-line"} me-1`}
                        ></i>
                        {comp.status === "active" ? "Deactivate" : "Activate"}
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
            <h4 className="mb-0">{viewCompany.name} - Overview</h4>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setViewCompany(null)}
            >
              <i className="ri-arrow-left-line me-1"></i>Back
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="row mb-4">
              <div className="col-md-4">
                <strong>Email:</strong>
                <p>{viewCompany.email}</p>
              </div>
              <div className="col-md-4">
                <strong>Phone:</strong>
                <p>{viewCompany.phone}</p>
              </div>
              <div className="col-md-4">
                <strong>Country:</strong>
                <p>{viewCompany.country}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Card className="text-center">
                  <Card.Body>
                    <h5 className="mb-1">Email Templates</h5>
                    <h3>{viewCompany.stats.emailTemplates}</h3>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card className="text-center">
                  <Card.Body>
                    <h5 className="mb-1">SMS Templates</h5>
                    <h3>{viewCompany.stats.smsTemplates}</h3>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card className="text-center">
                  <Card.Body>
                    <h5 className="mb-1">Notification Rules</h5>
                    <h3>{viewCompany.stats.notificationRules}</h3>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AdminCompanies;
