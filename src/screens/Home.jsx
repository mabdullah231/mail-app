import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold text-dark mb-4">
                Email Marketing Made Simple
              </h1>
              <p className="lead text-muted mb-4">
                Automate your customer communications with powerful email and SMS campaigns. 
                Send reminders, birthday wishes, and subscription notifications effortlessly.
              </p>
              <div className="d-flex gap-3">
                <Link to="/sign-in">
                  <Button variant="primary" size="lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline-primary" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <div className="bg-primary rounded-3 p-5 text-white">
                  <h3>Email Zus Platform</h3>
                  <p>Professional Email Automation</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Powerful Features</h2>
              <p className="text-muted">Everything you need for effective customer communication</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <i className="las la-envelope la-3x"></i>
                  </div>
                  <h5>Email Automation</h5>
                  <p className="text-muted">
                    Set up automated email sequences for subscriptions, reminders, and customer follow-ups.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <i className="las la-sms la-3x"></i>
                  </div>
                  <h5>SMS Notifications</h5>
                  <p className="text-muted">
                    Send automated SMS messages to customers with phone numbers for important alerts.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <i className="las la-chart-bar la-3x"></i>
                  </div>
                  <h5>Advanced Analytics</h5>
                  <p className="text-muted">
                    Track your campaign performance with detailed analytics and reporting.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;