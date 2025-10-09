import React, { useState, useEffect } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Form, 
  Row, 
  Col,
  Badge,
  Spinner,
  Modal,
  Pagination,
  Accordion,
  Toast,
  ToastContainer,
  ProgressBar
} from "react-bootstrap";
import { 
  Users, 
  Mail, 
  Building, 
  TrendingUp, 
  Download, 
  Ban, 
  CheckCircle, 
  Trash2, 
  Search,
  Calendar,
  Eye,
  Building2,
  UserCheck
} from "lucide-react";
import { superAdminService } from "../services/superAdminService";
import { getUserData } from "../utils/auth";

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total_users: 0,
    active_companies: 0,
    total_customers: 0,
    emails_sent_today: 0,
    active_subscriptions: 0,
  });
  
  // Users state with pagination
  const [usersData, setUsersData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0
  });
  
  const [emails, setEmails] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const user = getUserData();

  // Toast notification helper
  const showNotification = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  useEffect(() => {
    if (Number(user?.user?.user_type) !== 0) {
      showNotification("Access denied. Super admin privileges required.", "danger");
      return;
    }
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    } else if (activeTab === "emails") {
      loadEmails();
    } else if (activeTab === "templates") {
      loadTemplates();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await superAdminService.getDashboardStats();
      setStats(response);
      showNotification("Dashboard data loaded successfully");
    } catch (error) {
      showNotification("Failed to load dashboard stats", "danger");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await superAdminService.getAllUsers(page);
      
      // Handle both array and paginated response
      if (response && response.data) {
        // Paginated response
        setUsersData({
          data: response.data,
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          from: response.from,
          to: response.to
        });
      } else if (Array.isArray(response)) {
        // Array response (fallback)
        setUsersData({
          data: response,
          current_page: 1,
          last_page: 1,
          total: response.length,
          from: 1,
          to: response.length
        });
      } else {
        setUsersData({
          data: [],
          current_page: 1,
          last_page: 1,
          total: 0,
          from: 0,
          to: 0
        });
      }
    } catch (error) {
      showNotification("Failed to load users", "danger");
      setUsersData({
        data: [],
        current_page: 1,
        last_page: 1,
        total: 0,
        from: 0,
        to: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const loadEmails = async () => {
    try {
      setLoading(true);
      const response = await superAdminService.getAllEmails();
      setEmails(response);
      showNotification("Emails data loaded successfully");
    } catch (error) {
      showNotification("Failed to load emails", "danger");
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await superAdminService.getAllTemplates();
      setTemplates(response);
      showNotification("Templates data loaded successfully");
    } catch (error) {
      showNotification("Failed to load templates", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await superAdminService.toggleUserStatus(userId);
      showNotification("User status updated successfully");
      loadUsers(usersData.current_page);
    } catch (error) {
      showNotification("Failed to update user status", "danger");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await superAdminService.deleteUser(userId);
      showNotification("User deleted successfully");
      loadUsers(usersData.current_page);
    } catch (error) {
      showNotification("Failed to delete user", "danger");
    }
  };

  const handleExportEmails = async () => {
    try {
      const blob = await superAdminService.exportEmails();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "emails-export.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showNotification("Emails exported successfully");
    } catch (error) {
      showNotification("Failed to export emails", "danger");
    }
  };

  // Filter users based on search and filters
  const filteredUsers = usersData.data.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    // Since your API doesn't have is_active field, we'll assume all are active
    // You might need to adjust this based on your actual data structure
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && !user.deleted_at) ||
      (filterStatus === "inactive" && user.deleted_at);

    const matchesType =
      filterType === "all" ||
      (filterType === "super_admin" && Number(user.user_type) === 0) ||
      (filterType === "business_admin" && Number(user.user_type) === 1) ||
      (filterType === "user" && Number(user.user_type) === 2);

    // Date filtering
    const userDate = new Date(user.created_at);
    const matchesDate =
      (!startDate || userDate >= new Date(startDate)) &&
      (!endDate || userDate <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    loadUsers(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    const { current_page, last_page } = usersData;

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={current_page === 1}
        onClick={() => handlePageChange(current_page - 1)}
      />
    );

    // Page numbers
    for (let page = 1; page <= last_page; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === current_page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        disabled={current_page === last_page}
        onClick={() => handlePageChange(current_page + 1)}
      />
    );

    return items;
  };

  const getUserTypeBadge = (userType) => {
    const type = Number(userType);
    switch (type) {
      case 0:
        return <Badge bg="danger">Super Admin</Badge>;
      case 1:
        return <Badge bg="primary">Business Admin</Badge>;
      case 2:
        return <Badge bg="secondary">User</Badge>;
      default:
        return <Badge bg="light" text="dark">Unknown</Badge>;
    }
  };

  const getUserStatusBadge = (user) => {
    if (user.deleted_at) {
      return <Badge bg="danger">Inactive</Badge>;
    }
    return <Badge bg="success">Active</Badge>;
  };

  if (Number(user?.user?.user_type) !== 0) {
    return (
      <div className="container-fluid mt-4">
        <div className="d-flex align-items-center justify-content-center min-vh-50">
          <Card className="text-center border-0 shadow">
            <Card.Body className="py-5">
              <Ban className="w-16 h-16 text-danger mx-auto mb-3" />
              <h2 className="h4 fw-semibold text-gray-900">Access Denied</h2>
              <p className="text-muted mb-0">
                Super admin privileges required to access this page.
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 fw-bold text-gray-900 mb-1">Super Admin Dashboard</h1>
        <p className="text-muted mb-0">Platform-wide management and analytics</p>
      </div>

      {/* Tabs */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white border-bottom-0 py-3">
          <ul className="nav nav-tabs card-header-tabs mb-0">
            <li className="nav-item">
              <button
                className={`nav-link d-flex align-items-center ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <TrendingUp className="w-4 h-4 me-2" />
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link d-flex align-items-center ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="w-4 h-4 me-2" />
                Users
                {usersData.total > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {usersData.total}
                  </Badge>
                )}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link d-flex align-items-center ${activeTab === "emails" ? "active" : ""}`}
                onClick={() => setActiveTab("emails")}
              >
                <Mail className="w-4 h-4 me-2" />
                Emails
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link d-flex align-items-center ${activeTab === "templates" ? "active" : ""}`}
                onClick={() => setActiveTab("templates")}
              >
                <Building className="w-4 h-4 me-2" />
                Templates
              </button>
            </li>
          </ul>
        </Card.Header>

        <Card.Body className="p-4">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              {/* Stats Cards */}
              <Row className="g-3 mb-4">
                <Col md={6} lg={3}>
                  <Card className="h-100 border-primary border-2">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-muted mb-1">Total Users</p>
                          <h4 className="mb-0 fw-semibold">{stats.total_users || usersData.total}</h4>
                          <small className="text-success">
                            <TrendingUp className="w-3 h-3 me-1" />
                            +12% from last month
                          </small>
                        </div>
                      </div>
                      <ProgressBar now={75} variant="primary" className="mt-2" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="h-100 border-success border-2">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <Building2 className="h-8 w-8 text-success" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-muted mb-1">Active Companies</p>
                          <h4 className="mb-0 fw-semibold">{stats.active_companies}</h4>
                          <small className="text-success">
                            <TrendingUp className="w-3 h-3 me-1" />
                            +8% from last month
                          </small>
                        </div>
                      </div>
                      <ProgressBar now={60} variant="success" className="mt-2" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="h-100 border-info border-2">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <Mail className="h-8 w-8 text-info" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-muted mb-1">Sent Emails Today</p>
                          <h4 className="mb-0 fw-semibold">{stats.emails_sent_today}</h4>
                          <small className="text-success">
                            <TrendingUp className="w-3 h-3 me-1" />
                            +25% from yesterday
                          </small>
                        </div>
                      </div>
                      <ProgressBar now={85} variant="info" className="mt-2" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="h-100 border-warning border-2">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <UserCheck className="h-8 w-8 text-warning" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-muted mb-1">Active Subscriptions</p>
                          <h4 className="mb-0 fw-semibold">{stats.active_subscriptions}</h4>
                          <small className="text-success">
                            <TrendingUp className="w-3 h-3 me-1" />
                            +5% from last month
                          </small>
                        </div>
                      </div>
                      <ProgressBar now={70} variant="warning" className="mt-2" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Recent Activity */}
              <Row>
                <Col lg={8}>
                  <Card>
                    <Card.Header>
                      <h5 className="card-title mb-0">Platform Overview</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="space-y-3">
                        <div className="d-flex align-items-center justify-content-between p-3 bg-primary bg-opacity-10 rounded">
                          <div>
                            <h6 className="fw-medium text-primary mb-1">User Growth</h6>
                            <p className="text-primary mb-0 small">+15% increase this month with {usersData.total} total users</p>
                          </div>
                          <TrendingUp className="w-8 h-8 text-primary" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between p-3 bg-success bg-opacity-10 rounded">
                          <div>
                            <h6 className="fw-medium text-success mb-1">System Performance</h6>
                            <p className="text-success mb-0 small">All systems operational with 99.9% uptime</p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card>
                    <Card.Header>
                      <h5 className="card-title mb-0">Quick Actions</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="outline-primary" 
                          className="d-flex align-items-center justify-content-start"
                          onClick={() => setActiveTab("users")}
                        >
                          <Users className="w-4 h-4 me-2" />
                          Manage Users
                        </Button>
                        <Button variant="outline-success" className="d-flex align-items-center justify-content-start">
                          <Mail className="w-4 h-4 me-2" />
                          Email Reports
                        </Button>
                        <Button variant="outline-info" className="d-flex align-items-center justify-content-start">
                          <Building className="w-4 h-4 me-2" />
                          Template Management
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div>
              {/* Filters */}
              <Card className="mb-4">
                <Card.Body>
                  <Row className="g-3 align-items-end">
                    <Col md={6} lg={3}>
                      <Form.Label className="form-label">Search Users</Form.Label>
                      <div className="position-relative">
                        <Search className="w-4 h-4 text-muted position-absolute top-50 start-3 translate-middle-y" />
                        <Form.Control
                          type="text"
                          placeholder="Search by name or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="ps-5"
                        />
                      </div>
                    </Col>
                   
                    <Col md={6} lg={2}>
                      <Form.Label className="form-label">User Type</Form.Label>
                      <Form.Select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="super_admin">Super Admin</option>
                        <option value="business_admin">Business Admin</option>
                        <option value="user">User</option>
                      </Form.Select>
                    </Col>
                    
                    <Col md={6} lg={2}>
                      <Button 
                        variant="outline-secondary" 
                        className="w-100"
                        onClick={() => {
                          setSearchTerm("");
                 
                          setFilterType("all");
                   
                        }}
                      >
                        Clear Filters
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Users Table */}
              <Card>
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Users Management</h5>
                    <Badge bg="primary" className="fs-6">
                      Showing {usersData.from}-{usersData.to} of {usersData.total} users
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table striped hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>User</th>
                          <th>Type</th>
                          <th>Company</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div>
                                  <div className="fw-medium text-gray-900">
                                    {user.name || 'N/A'}
                                  </div>
                                  <div className="text-muted small">
                                    {user.email || 'N/A'}
                                  </div>
                                  {user.code && (
                                    <div className="text-muted small">
                                      Code: {user.code}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td>
                                {getUserTypeBadge(user.user_type)}
                              </td>
                              <td>
                                {user.company_detail ? (
                                  <Badge bg="info" className="text-capitalize">
                                    {user.company_detail.name}
                                  </Badge>
                                ) : (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td>
                                {getUserStatusBadge(user)}
                              </td>
                              <td className="text-muted">
                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="outline-info"
                                    size="sm"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant={user.deleted_at ? "outline-success" : "outline-warning"}
                                    size="sm"
                                    onClick={() => handleToggleUserStatus(user.id)}
                                    title={user.deleted_at ? "Activate" : "Deactivate"}
                                  >
                                    {user.deleted_at ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <Ban className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                    title="Delete"
                                    disabled={Number(user.user_type) === 0} // Disable delete for super admins
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-5 text-muted">
                              <Users className="w-12 h-12 text-muted mx-auto mb-3" />
                              <h5>No users found</h5>
                              <p className="mb-0">Try adjusting your search filters</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                {usersData.last_page > 1 && (
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div className="text-muted">
                      Showing {usersData.from} to {usersData.to} of {usersData.total} entries
                    </div>
                    <Pagination className="mb-0">
                      {renderPaginationItems()}
                    </Pagination>
                  </Card.Footer>
                )}
              </Card>
            </div>
          )}

          {/* Emails Tab */}
          {activeTab === "emails" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="card-title mb-1">Email Management</h5>
                  <p className="text-muted mb-0">Manage and monitor all platform email activities</p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleExportEmails}
                  className="d-flex align-items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export All Emails
                </Button>
              </div>

              <Row className="g-4">
                <Col md={4}>
                  <Card className="text-center border-primary">
                    <Card.Body>
                      <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h3>{stats.emails_sent_today}</h3>
                      <p className="text-muted mb-0">Emails Sent Today</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center border-success">
                    <Card.Body>
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                      <h3>98%</h3>
                      <p className="text-muted mb-0">Delivery Rate</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center border-info">
                    <Card.Body>
                      <TrendingUp className="w-12 h-12 text-info mx-auto mb-3" />
                      <h3>+25%</h3>
                      <p className="text-muted mb-0">Growth This Month</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mt-4">
                <Card.Body className="text-center py-5">
                  <Mail className="w-16 h-16 text-muted mx-auto mb-3" />
                  <h5 className="card-title">Email Logs & Analytics</h5>
                  <p className="text-muted mb-4">
                    Comprehensive email tracking and analytics dashboard coming soon
                  </p>
                  <Button variant="outline-primary">
                    View Detailed Reports
                  </Button>
                </Card.Body>
              </Card>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="card-title mb-1">Template Management</h5>
                  <p className="text-muted mb-0">Manage all email and SMS templates across the platform</p>
                </div>
                <Button variant="success" className="d-flex align-items-center gap-2">
                  <Building className="w-4 h-4" />
                  Create New Template
                </Button>
              </div>

              <Row className="g-4">
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <h3>24</h3>
                      <p className="text-muted mb-0">Email Templates</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <Building className="w-8 h-8 text-success" />
                      </div>
                      <h3>12</h3>
                      <p className="text-muted mb-0">SMS Templates</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="text-center">
                    <Card.Body>
                      <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                        <CheckCircle className="w-8 h-8 text-info" />
                      </div>
                      <h3>8</h3>
                      <p className="text-muted mb-0">Notification Rules</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mt-4">
                <Card.Body className="text-center py-5">
                  <Building className="w-16 h-16 text-muted mx-auto mb-3" />
                  <h5 className="card-title">Template Library</h5>
                  <p className="text-muted mb-4">
                    Centralized template management system for all platform users
                  </p>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button variant="primary">Browse Templates</Button>
                    <Button variant="outline-secondary">Import Templates</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Loading Modal */}
      <Modal show={loading} centered backdrop="static">
        <Modal.Body className="text-center py-4">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <h5 className="mb-1">Loading...</h5>
          <p className="text-muted mb-0">Please wait while we fetch the data</p>
        </Modal.Body>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto text-capitalize">
              {toastVariant === 'danger' ? 'Error' : toastVariant === 'warning' ? 'Warning' : 'Success'}
            </strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === 'light' ? 'text-dark' : 'text-white'}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default SuperAdmin;