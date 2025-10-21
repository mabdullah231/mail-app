import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  FileText, 
  TrendingUp,
  Plus,
  BarChart3,
  Calendar,
  AlertCircle,
  ArrowRight,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge, Alert } from 'react-bootstrap';
import { getUserData } from '../utils/auth';
import { dashboardService } from '../services/dashboardService';
import { companyService } from '../services/companyService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    templates: 0,
    emailsSent: 0,
    emailsThisMonth: 0,
    monthlyLimit: 100
  });
  const [company, setCompany] = useState({ id: null, name: '', logo: null });
  const [loading, setLoading] = useState(true);
  const userData = getUserData();
  const user = userData?.user;
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsData = await dashboardService.getDashboardStats();
        const companyData = await companyService.getDetails();
        
        setStats(statsData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const quickActions = [
    {
      name: 'Add Customer',
      href: '/panel/customers/new',
      icon: Users,
      variant: 'primary',
      description: 'Add a new customer to your list'
    },
    {
      name: 'Create Template',
      href: '/panel/templates/new',
      icon: FileText,
      variant: 'success',
      description: 'Design a new email template'
    },
    {
      name: 'Send Campaign',
      href: '/panel/send-email-campaign',
      icon: Mail,
      variant: 'info',
      description: 'Send emails to your customers'
    },
    {
      name: 'View Analytics',
      href: '/panel/analytics',
      icon: BarChart3,
      variant: 'warning',
      description: 'Check your campaign performance'
    }
  ];

  const emailUsagePercentage = stats.monthlyLimit > 0 
    ? Math.round((stats.emailsThisMonth / stats.monthlyLimit) * 100) 
    : 0;

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading dashboard...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Welcome Header */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="py-4">
              <Row className="align-items-center">
                <Col md={8}>
                  <h2 className="fw-bold text-dark mb-2">
                    Welcome back, {user?.name || 'User'}!
                  </h2>
                  <p className="text-muted mb-0">
                    {company.name ? `Managing ${company.name}` : 'Ready to grow your business with email marketing'}
                  </p>
                </Col>
                <Col md={4} className="text-md-end">
                  {company.logo && (
                    <img 
                      src={company.logo} 
                      alt="Company Logo" 
                      className="rounded"
                      style={{ maxHeight: '60px' }}
                    />
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="fw-bold text-dark mb-1">{stats.customers}</h3>
              <p className="text-muted mb-0">Total Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                <FileText className="text-success" size={24} />
              </div>
              <h3 className="fw-bold text-dark mb-1">{stats.templates}</h3>
              <p className="text-muted mb-0">Email Templates</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center bg-info bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                <Mail className="text-info" size={24} />
              </div>
              <h3 className="fw-bold text-dark mb-1">{stats.emailsSent}</h3>
              <p className="text-muted mb-0">Emails Sent</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                <TrendingUp className="text-warning" size={24} />
              </div>
              <h3 className="fw-bold text-dark mb-1">{stats.emailsThisMonth}</h3>
              <p className="text-muted mb-0">This Month</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Email Usage Alert */}
      {emailUsagePercentage > 80 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="warning" className="border-0">
              <AlertCircle size={20} className="me-2" />
              <strong>Email Limit Warning:</strong> You've used {emailUsagePercentage}% of your monthly email limit ({stats.emailsThisMonth}/{stats.monthlyLimit}).
              {emailUsagePercentage >= 100 && ' Consider upgrading your plan.'}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Email Usage Progress */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0">
              <h5 className="mb-0">
                <Activity size={20} className="me-2" />
                Monthly Email Usage
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Used this month</span>
                <Badge bg={emailUsagePercentage > 80 ? 'warning' : 'primary'}>
                  {stats.emailsThisMonth} / {stats.monthlyLimit}
                </Badge>
              </div>
              <ProgressBar 
                now={emailUsagePercentage} 
                variant={emailUsagePercentage > 80 ? 'warning' : 'primary'}
                className="mb-2"
                style={{ height: '8px' }}
              />
              <small className="text-muted">
                {stats.monthlyLimit - stats.emailsThisMonth} emails remaining this month
                    </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0">
              <h5 className="mb-0">
                <Zap size={20} className="me-2" />
                Quick Actions
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {quickActions.map((action, index) => (
                  <Col md={3} key={index} className="mb-3">
                    <Card className="h-100 border-0 bg-light">
                      <Card.Body className="text-center p-3">
                        <div className={`d-inline-flex align-items-center justify-content-center bg-${action.variant} bg-opacity-10 rounded-circle mb-3`} style={{width: '50px', height: '50px'}}>
                          <action.icon className={`text-${action.variant}`} size={20} />
                  </div>
                        <h6 className="fw-bold text-dark mb-2">{action.name}</h6>
                        <p className="text-muted small mb-3">{action.description}</p>
                        <Button 
                          variant={action.variant} 
                          size="sm" 
                          className="w-100"
                          href={action.href}
                        >
                          <Plus size={16} className="me-1" />
                          Get Started
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent border-0">
              <h5 className="mb-0">
                <Calendar size={20} className="me-2" />
                Recent Activity
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                  <Mail className="text-primary" size={16} />
                </div>
                <div>
                  <p className="mb-1 fw-medium">Email campaign sent</p>
                  <small className="text-muted">2 hours ago</small>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <Users className="text-success" size={16} />
                </div>
                <div>
                  <p className="mb-1 fw-medium">New customer added</p>
                  <small className="text-muted">5 hours ago</small>
            </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                  <FileText className="text-info" size={16} />
              </div>
                <div>
                  <p className="mb-1 fw-medium">Template created</p>
                  <small className="text-muted">1 day ago</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-transparent border-0">
              <h5 className="mb-0">
                <Star size={20} className="me-2" />
                Tips & Features
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="fw-bold text-dark mb-2">💡 Pro Tip</h6>
                <p className="text-muted small mb-0">
                  Use personalized templates to increase email engagement by up to 30%.
                </p>
          </div>
              <div className="mb-3">
                <h6 className="fw-bold text-dark mb-2">🚀 New Feature</h6>
                <p className="text-muted small mb-0">
                  Try our new WYSIWYG editor with drag-and-drop image support.
                </p>
              </div>
              <div>
                <h6 className="fw-bold text-dark mb-2">📊 Analytics</h6>
                <p className="text-muted small mb-0">
                  Track your email performance with detailed analytics and reports.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;