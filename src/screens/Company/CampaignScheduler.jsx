import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const CampaignScheduler = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Email Series',
      type: 'Email',
      audience: 'New Users',
      scheduledAt: '2025-08-07 10:00 AM',
      status: 'Scheduled',
    },
    {
      id: 2,
      name: 'Flash Sale SMS',
      type: 'SMS',
      audience: 'All Users',
      scheduledAt: '2025-08-06 06:00 PM',
      status: 'Paused',
    },
    {
      id: 3,
      name: 'Holiday Promotion',
      type: 'Email',
      audience: 'VIP Customers',
      scheduledAt: '2025-12-15 09:00 AM',
      status: 'Scheduled',
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filters, setFilters] = useState({ type: '', status: '', audience: '' });

  const handleView = (campaign) => {
    setSelectedCampaign(campaign);
    setShowViewModal(true);
  };

  const handleToggleStatus = (id) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === 'Scheduled' ? 'Paused' : 'Scheduled',
            }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const clearFilters = () => {
    setFilters({ type: '', status: '', audience: '' });
  };

  const filteredCampaigns = campaigns.filter(
    (c) =>
      (!filters.type || c.type === filters.type) &&
      (!filters.status || c.status === filters.status) &&
      (!filters.audience || c.audience === filters.audience)
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-success';
      case 'Paused': return 'bg-warning';
      case 'Sent': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Campaign Scheduler</h4>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <div className="row">
            <Form.Group className="col-md-4 mb-3 position-relative">
  <Form.Label>Campaign Type</Form.Label>
  <div className="position-relative">
    <Form.Control
      as="select"
      name="type"
      className="form-select pe-5"
      value={filters.type}
      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
    >
      <option value="">All Types</option>
      <option value="Email">Email</option>
      <option value="SMS">SMS</option>
      <option value="Push">Push Notification</option>
    </Form.Control>
    {/* <i
      className="ri-arrow-down-s-line position-absolute"
      style={{
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        fontSize: "1.2rem",
        color: "#6c757d",
      }}
    ></i> */}
  </div>
</Form.Group>

<Form.Group className="col-md-4 mb-3 position-relative">
  <Form.Label>Status</Form.Label>
  <div className="position-relative">
    <Form.Control
      as="select"
      name="status"
      className="form-select pe-5"
      value={filters.status}
      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
    >
      <option value="">All Statuses</option>
      <option value="Scheduled">Scheduled</option>
      <option value="Paused">Paused</option>
      <option value="Sent">Sent</option>
      <option value="Draft">Draft</option>
    </Form.Control>
    {/* <i
      className="ri-arrow-down-s-line position-absolute"
      style={{
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        fontSize: "1.2rem",
        color: "#6c757d",
      }}
    ></i> */}
  </div>
</Form.Group>

<Form.Group className="col-md-4 mb-3 position-relative">
  <Form.Label>Audience</Form.Label>
  <div className="position-relative">
    <Form.Control
      as="select"
      name="audience"
      className="form-select pe-5"
      value={filters.audience}
      onChange={(e) => setFilters({ ...filters, audience: e.target.value })}
    >
      <option value="">All Audiences</option>
      <option value="All Users">All Users</option>
      <option value="New Users">New Users</option>
      <option value="VIP Customers">VIP Customers</option>
      <option value="Inactive Users">Inactive Users</option>
    </Form.Control>
    {/* <i
      className="ri-arrow-down-s-line position-absolute"
      style={{
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        fontSize: "1.2rem",
        color: "#6c757d",
      }}
    ></i> */}
  </div>
</Form.Group>

            </div>
            <div className="text-end mb-3">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={clearFilters}
                disabled={!filters.type && !filters.status && !filters.audience}
              >
                <i className="ri-close-line me-1"></i> Clear Filters
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered table-responsive text-center">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Type</th>
                <th>Audience</th>
                <th>Scheduled At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No campaigns match your filters.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.type}</td>
                    <td>{campaign.audience}</td>
                    <td>{campaign.scheduledAt}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td style={{display:"flex", gap:"10px", justifyContent:"center",flexWrap:"wrap"}}>
                      <button className="btn btn-info btn-sm " onClick={() => handleView(campaign)}>
                        <i className="ri-eye-line "></i>View
                      </button>
                      {campaign.status !== "Sent" && (
                        <button 
                          className="btn btn-secondary btn-sm " 
                          onClick={() => handleToggleStatus(campaign.id)}
                        >
                          {campaign.status === "Scheduled" ? 
                            <><i className="ri-pause-line "></i>Pause</> : 
                            <><i className="ri-play-line "></i>Resume</>}
                        </button>
                      )}
                      {campaign.status !== "Sent" && (
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(campaign.id)}>
                          <i className="ri-delete-bin-line "></i>Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showViewModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Campaign Details</h5>
                <i
                  className="ri-close-line"
                  style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#6c757d' }}
                  onClick={() => setShowViewModal(false)}
                ></i>
              </div>
              <div className="modal-body">
                {selectedCampaign && (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <h6>Campaign Name</h6>
                      <p>{selectedCampaign.name}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <h6>Type</h6>
                      <p>{selectedCampaign.type}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <h6>Audience</h6>
                      <p>{selectedCampaign.audience}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <h6>Scheduled Time</h6>
                      <p>{selectedCampaign.scheduledAt}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <h6>Status</h6>
                      <p>
                        <span className={`badge ${getStatusBadgeClass(selectedCampaign.status)}`}>
                          {selectedCampaign.status}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignScheduler;