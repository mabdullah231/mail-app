import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Shield, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download
} from 'lucide-react';
import { Container, Row, Col, Card, Button, Badge, Nav, Navbar } from 'react-bootstrap';

const Home = () => {
  const features = [
    {
      icon: Mail,
      title: 'Email Marketing',
      description: 'Send beautiful, personalized emails to your customers with our drag-and-drop editor.'
    },
    {
      icon: MessageSquare,
      title: 'SMS Campaigns',
      description: 'Reach customers instantly with SMS notifications and reminders.'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Organize and segment your customers for targeted campaigns.'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track campaign performance with detailed analytics and insights.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee.'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Set up automated email sequences and reminders to save time.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      content: 'Email Zus has transformed our customer communication. The automation features save us hours every week.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      company: 'E-commerce Plus',
      content: 'The template editor is incredibly intuitive. We\'ve seen a 40% increase in email engagement.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      company: 'Creative Agency',
      content: 'Best email marketing platform we\'ve used. The customer support is outstanding.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <div className="bg-primary rounded-3 me-2 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
              <span className="text-white fw-bold">EZ</span>
            </div>
            <span className="fs-4 fw-bold text-dark">Email Zus</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Button as={Link} to="/register" variant="primary" className="ms-2">
                Get Started
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-4 fw-bold text-dark mb-4">
                Professional Email Marketing Made Simple
              </h1>
              <p className="lead text-muted mb-4">
                Create, send, and track beautiful email campaigns that drive results. 
                Perfect for businesses of all sizes.
              </p>
              <div className="d-flex gap-3 mb-4">
                <Button as={Link} to="/register" variant="primary" size="lg">
                  <Zap size={20} className="me-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline-primary" size="lg">
                  <Play size={20} className="me-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="d-flex align-items-center text-muted">
                <CheckCircle size={16} className="text-success me-2" />
                <span className="small">No credit card required • 14-day free trial</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 rounded-3 p-5">
                  <Mail size={80} className="text-primary mb-3" />
                  <h4 className="fw-bold text-dark">Email Marketing Dashboard</h4>
                  <p className="text-muted">Manage all your campaigns from one place</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold text-dark mb-3">Everything You Need</h2>
              <p className="lead text-muted">
                Powerful features to grow your business with email marketing
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                      <feature.icon className="text-primary" size={24} />
                    </div>
                    <h5 className="fw-bold text-dark mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold text-dark mb-3">Loved by Businesses</h2>
              <p className="lead text-muted">
                See what our customers say about Email Zus
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-warning me-1" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted mb-3">"{testimonial.content}"</p>
                    <div>
                      <h6 className="fw-bold text-dark mb-1">{testimonial.name}</h6>
                      <p className="text-muted small mb-0">{testimonial.company}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col className="text-center">
              <Card className="border-0 shadow-sm bg-primary text-white">
                <Card.Body className="py-5">
                  <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
                  <p className="lead mb-4">
                    Join thousands of businesses already using Email Zus to grow their customer base.
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <Button variant="light" size="lg" as={Link} to="/register">
                      <Zap size={20} className="me-2" />
                      Start Free Trial
                    </Button>
                    <Button variant="outline-light" size="lg" as={Link} to="/pricing">
                      <Download size={20} className="me-2" />
                      View Pricing
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary rounded-3 me-2 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                  <span className="text-white fw-bold">EZ</span>
                </div>
                <span className="fs-4 fw-bold">Email Zus</span>
              </div>
              <p className="text-muted">
                Professional email marketing platform for businesses of all sizes.
              </p>
            </Col>
            <Col md={2}>
              <h6 className="fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                <li><Link to="/pricing" className="text-muted text-decoration-none">Pricing</Link></li>
                <li><Link to="/features" className="text-muted text-decoration-none">Features</Link></li>
                <li><Link to="/templates" className="text-muted text-decoration-none">Templates</Link></li>
              </ul>
            </Col>
            <Col md={2}>
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><Link to="/about" className="text-muted text-decoration-none">About</Link></li>
                <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
                <li><Link to="/careers" className="text-muted text-decoration-none">Careers</Link></li>
              </ul>
            </Col>
            <Col md={2}>
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-muted text-decoration-none">Cookie Policy</Link></li>
              </ul>
            </Col>
            <Col md={2}>
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></li>
                <li><Link to="/docs" className="text-muted text-decoration-none">Documentation</Link></li>
                <li><Link to="/status" className="text-muted text-decoration-none">Status</Link></li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4" />
          <Row className="align-items-center">
            <Col md={6}>
              <p className="text-muted mb-0">&copy; 2024 Email Zus. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex gap-3 justify-content-md-end">
                <Link to="/twitter" className="text-muted">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="/facebook" className="text-muted">
                  <i className="fab fa-facebook"></i>
                </Link>
                <Link to="/linkedin" className="text-muted">
                  <i className="fab fa-linkedin"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;