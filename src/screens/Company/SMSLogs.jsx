import React, { useState } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";

const initialSmsLogs = [
  {
    id: 1,
    recipient: "+1234567890",
    message: "Thank you for your donation!",
    status: "Delivered",
    sentAt: "2023-05-15 11:45:30",
    template: "Thank You SMS",
    deliveredAt: "2023-05-15 11:45:35",
  },
  {
    id: 2,
    recipient: "+1987654321",
    message: "Your account has been created",
    status: "Delivered",
    sentAt: "2023-05-14 08:20:15",
    template: "Welcome SMS",
    deliveredAt: "2023-05-14 08:20:20",
  },
  {
    id: 3,
    recipient: "+1122334455",
    message: "Your subscription is expiring soon",
    status: "Failed",
    sentAt: "2023-05-13 16:10:45",
    template: "Reminder SMS",
    deliveredAt: null,
  },
];

const SMSLogs = () => {
  const [viewLog, setViewLog] = useState(null);

  return (
    <div className="container-fluid mt-4">
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">SMS Logs</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered responsive className="text-center">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Message Preview</th>
                <th>Status</th>
                <th>Sent At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialSmsLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.recipient}</td>
                  <td>{log.message.substring(0, 30)}...</td>
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
  <Modal.Title>SMS Log Details</Modal.Title>
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
                <h6>Delivered At</h6>
                <p>{viewLog.deliveredAt || "Not delivered"}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Template</h6>
                <p>{viewLog.template}</p>
              </div>
              <div className="col-md-12 mb-3">
                <h6>Full Message</h6>
                <div className="p-3 bg-light rounded">
                  <p className="mb-0">{viewLog.message}</p>
                </div>
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

export default SMSLogs;