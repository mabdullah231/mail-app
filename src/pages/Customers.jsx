import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Mail, 
  MessageSquare,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { customerService } from '../services/customerService';
import { companyService } from '../services/companyService';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, filterType]);

  const loadCustomers = async () => {
    try {
      const companyResponse = await companyService.getDetails();
      setCompany(companyResponse.company);
      
      if (companyResponse.company) {
        const response = await customerService.getAll(companyResponse.company.id);
        setCustomers(response);
      }
    } catch (error) {
      notyf.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(customer => {
        if (filterType === 'email') return customer.notification === 'email' || customer.notification === 'both';
        if (filterType === 'sms') return customer.notification === 'sms' || customer.notification === 'both';
        if (filterType === 'sms_opted') return customer.sms_opt_in;
        return true;
      });
    }

    setFilteredCustomers(filtered);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.delete(customerId);
        notyf.success('Customer deleted successfully');
        loadCustomers();
      } catch (error) {
        notyf.error('Failed to delete customer');
      }
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCustomers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedCustomers.length} customers?`)) {
      try {
        await Promise.all(selectedCustomers.map(id => customerService.delete(id)));
        notyf.success(`${selectedCustomers.length} customers deleted successfully`);
        setSelectedCustomers([]);
        loadCustomers();
      } catch (error) {
        notyf.error('Failed to delete customers');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Customers</h1>
          <p className="text-muted mb-0">Manage your customer database</p>
        </div>
        <Link
          to="/panel/customers/new"
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Customer</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="position-relative flex-grow-1">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control ps-5"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-select"
                  style={{ minWidth: '180px' }}
                >
                  <option value="all">All Customers</option>
                  <option value="email">Email Notifications</option>
                  <option value="sms">SMS Notifications</option>
                  <option value="sms_opted">SMS Opted In</option>
                </select>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex justify-content-md-end gap-2">
                {selectedCustomers.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="btn btn-danger d-flex align-items-center gap-2"
                  >
                    <Trash2 size={16} />
                    <span>Delete Selected ({selectedCustomers.length})</span>
                  </button>
                )}
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '40px' }}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="form-check-input"
                      />
                    </div>
                  </th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Notifications</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={(e) => handleSelectCustomer(customer.id, e.target.checked)}
                          className="form-check-input"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-semibold text-dark">{customer.name}</div>
                        <div className="text-muted small">{customer.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-dark">{customer.phone || 'N/A'}</div>
                    </td>
                    <td>
                      <div>
                        {customer.address && (
                          <div className="text-dark">{customer.address}</div>
                        )}
                        {customer.country && (
                          <div className="text-muted small">{customer.country}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        {(customer.notification === 'email' || customer.notification === 'both') && (
                          <span className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center gap-1">
                            <Mail size={12} />
                            Email
                          </span>
                        )}
                        {(customer.notification === 'sms' || customer.notification === 'both') && customer.sms_opt_in && (
                          <span className="badge bg-success bg-opacity-10 text-success d-flex align-items-center gap-1">
                            <MessageSquare size={12} />
                            SMS
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/panel/customer/${customer.id}/edit`}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="More">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-5">
              <div className="text-muted mb-3">
                {searchTerm || filterType !== 'all' ? 'No customers match your filters' : 'No customers yet'}
              </div>
              {!searchTerm && filterType === 'all' && (
                <Link
                  to="/panel/customers/new"
                  className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
                >
                  <Plus size={16} />
                  Add your first customer
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="h2 fw-bold text-dark mb-1">{customers.length}</div>
              <div className="text-muted">Total Customers</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="h2 fw-bold text-dark mb-1">
                {customers.filter(c => c.notification === 'email' || c.notification === 'both').length}
              </div>
              <div className="text-muted">Email Subscribers</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="h2 fw-bold text-dark mb-1">
                {customers.filter(c => c.sms_opt_in).length}
              </div>
              <div className="text-muted">SMS Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;