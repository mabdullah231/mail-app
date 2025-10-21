import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Card, Spinner, Alert } from "react-bootstrap";
import { emailService } from "../../services/emailService";

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewLog, setViewLog] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await emailService.getLogs();
        const mapped = (data || []).map((item) => ({
          id: item.id,
          recipient: item.customer?.email || "",
          subject: item.subject || "",
          status:
            item.status === "sent"
              ? "Delivered"
              : item.status === "failed"
              ? "Failed"
              : item.status || "Pending",
          sentAt: item.sent_at || item.created_at,
          template: item.template?.name || "",
        }));
        setLogs(mapped);
      } catch (e) {
        setError(e?.response?.data?.message || e.message || "Failed to load logs");
      } finally {
        setLoading(false);
      }
    };
    loadLogs();
  }, []);

  const handleExportCsv = async () => {
    try {
      const blob = await emailService.exportLogs();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `email_logs_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export email logs CSV', err);
      alert('Failed to export CSV. Please try again.');
    }
  };

  return (
    <div className="container-fluid mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Email Logs</h5>
          <Button variant="primary" onClick={handleExportCsv}>Export CSV</Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" />
              <p className="mt-3 text-muted">Loading logs...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Sent At</th>
                  <th>Template</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.recipient}</td>
                    <td>{log.subject}</td>
                    <td>{log.status}</td>
                    <td>{log.sentAt}</td>
                    <td>{log.template}</td>
                    <td>
                      <Button size="sm" onClick={() => setViewLog(log)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={!!viewLog} onHide={() => setViewLog(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Log Details</Modal.Title>
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
                  <span className={`badge ${
                    viewLog.status === "Delivered"
                      ? "bg-success"
                      : viewLog.status === "Failed"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}>{viewLog.status}</span>
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
              <div className="col-md-12 mb-3">
                <h6>Subject</h6>
                <div className="p-3 bg-light rounded">
                  <p className="mb-0">{viewLog.subject}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewLog(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailLogs;