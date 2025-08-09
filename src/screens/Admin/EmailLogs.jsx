import React, { useState } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";

const initialEmailLogs = [
  {
    id: 1,
    recipient: "user1@example.com",
    subject: "Welcome to Our Service",
    status: "Delivered",
    sentAt: "2023-05-15 10:30:45",
    template: "Welcome Email",
    openedAt: "2023-05-15 10:32:18",
  },
  {
    id: 2,
    recipient: "user2@example.com",
    subject: "Your Monthly Report",
    status: "Delivered",
    sentAt: "2023-05-14 09:15:22",
    template: "Monthly Report",
    openedAt: "2023-05-14 09:20:05",
  },
  {
    id: 3,
    recipient: "user3@example.com",
    subject: "Donation Receipt",
    status: "Failed",
    sentAt: "2023-05-13 14:45:10",
    template: "Receipt Template",
    openedAt: null,
  },
];

const EmailLogs = () => {
  const [viewLog, setViewLog] = useState(null);

  return (
    <div className="container-fluid mt-4">
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Email Logs</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered responsive className="text-center">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Sent At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialEmailLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.recipient}</td>
                  <td>{log.subject}</td>
                  <td>
                    <span
                      className={`badge ${
                        log.status === "Delivered"
                          ? "bg-success"
                          : log.status === "Failed"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td>{log.sentAt}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => setViewLog(log)}
                    >
                      <i className="ri-eye-line me-1"></i>View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* View Log Modal */}
      <Modal show={!!viewLog} onHide={() => setViewLog(null)} size="lg">
      <Modal.Header className="d-flex justify-content-between align-items-center">
  <Modal.Title>Email Log Details</Modal.Title>
  <i
    className="ri-close-line"
    style={{
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: '#6c757d',
    }}
    onClick={() => setViewLog(null)} // or your close handler
  ></i>
</Modal.Header>
        <Modal.Body>
          {viewLog && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <h6>Recipient</h6>
                <p>{viewLog.recipient}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Subject</h6>
                <p>{viewLog.subject}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Status</h6>
                <p>
                  <span
                    className={`badge ${
                      viewLog.status === "Delivered"
                        ? "bg-success"
                        : viewLog.status === "Failed"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {viewLog.status}
                  </span>
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Sent At</h6>
                <p>{viewLog.sentAt}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Template</h6>
                <p>{viewLog.template}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Opened At</h6>
                <p>{viewLog.openedAt || "Not opened"}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewLog(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailLogs;