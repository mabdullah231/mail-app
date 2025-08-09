import React, { useState } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";

const initialDonationLogs = [
  {
    id: 1,
    donor: "John Doe",
    amount: 100,
    method: "PayPal",
    status: "Successful",
    donatedAt: "2025-08-01 14:25:00",
    email: "john@example.com",
    transactionId: "TXN12345678"
  },
  {
    id: 2,
    donor: "Jane Smith",
    amount: 50,
    method: "Stripe",
    status: "Successful",
    donatedAt: "2025-07-30 09:10:00",
    email: "jane@example.com",
    transactionId: "TXN87654321"
  },
  {
    id: 3,
    donor: "Michael Lee",
    amount: 200,
    method: "Bank Transfer",
    status: "Pending",
    donatedAt: "2025-07-29 16:40:00",
    email: "michael@example.com",
    transactionId: "BANKTXN00392"
  }
];

const DonationsLog = () => {
  const [viewLog, setViewLog] = useState(null);

  return (
    <div className="container-fluid mt-4">
      <Card>
        <Card.Header>
          <h4 className="card-title mb-0">Donations Log</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered responsive className="text-center">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Donated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialDonationLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.donor}</td>
                  <td>${log.amount}</td>
                  <td>{log.method}</td>
                  <td>
                    <span
                      className={`badge ${
                        log.status === "Successful"
                          ? "bg-success"
                          : log.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td>{log.donatedAt}</td>
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
  <Modal.Title>Donation Details</Modal.Title>
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
                <h6>Donor Name</h6>
                <p>{viewLog.donor}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Email</h6>
                <p>{viewLog.email}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Amount</h6>
                <p>${viewLog.amount}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Method</h6>
                <p>{viewLog.method}</p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Status</h6>
                <p>
                  <span
                    className={`badge ${
                      viewLog.status === "Successful"
                        ? "bg-success"
                        : viewLog.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {viewLog.status}
                  </span>
                </p>
              </div>
              <div className="col-md-6 mb-3">
                <h6>Donated At</h6>
                <p>{viewLog.donatedAt}</p>
              </div>
              <div className="col-md-12 mb-3">
                <h6>Transaction ID</h6>
                <p>{viewLog.transactionId}</p>
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

export default DonationsLog;
