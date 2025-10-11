import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Shield, Lock, Eye, Database, Mail, Phone } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                  <Shield className="text-primary" size={24} />
                </div>
                <h1 className="display-5 fw-bold text-dark mb-3">Privacy Policy</h1>
                <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Lock size={20} className="me-2" />
                  Information We Collect
                </h2>
                <p className="text-muted mb-3">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="text-muted">
                  <li><strong>Account Information:</strong> Name, email address, company details</li>
                  <li><strong>Customer Data:</strong> Information about your customers for email marketing</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform</li>
                  <li><strong>Payment Information:</strong> Billing details (processed securely by third parties)</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Eye size={20} className="me-2" />
                  How We Use Your Information
                </h2>
                <p className="text-muted mb-3">We use the information we collect to:</p>
                <ul className="text-muted">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze usage and trends</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Database size={20} className="me-2" />
                  Data Security
                </h2>
                <p className="text-muted mb-3">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="text-muted">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security audits and monitoring</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Mail size={20} className="me-2" />
                  Email Marketing Data
                </h2>
                <p className="text-muted mb-3">
                  When you use our email marketing services, we process customer data on your behalf. 
                  You are responsible for ensuring you have proper consent from your customers.
                </p>
                <ul className="text-muted">
                  <li>We act as a data processor for your customer data</li>
                  <li>You retain ownership of your customer lists</li>
                  <li>We provide tools for unsubscribe management</li>
                  <li>We comply with anti-spam regulations</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Phone size={20} className="me-2" />
                  Your Rights
                </h2>
                <p className="text-muted mb-3">You have the right to:</p>
                <ul className="text-muted">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Cookies and Tracking</h2>
                <p className="text-muted mb-3">
                  We use cookies and similar technologies to enhance your experience, 
                  analyze usage, and provide personalized content.
                </p>
                <ul className="text-muted">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies (with your consent)</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Third-Party Services</h2>
                <p className="text-muted mb-3">
                  We may use third-party services for payment processing, analytics, 
                  and email delivery. These services have their own privacy policies.
                </p>
                <ul className="text-muted">
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Email delivery services</li>
                  <li>Analytics providers (Google Analytics)</li>
                  <li>Cloud hosting providers</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Data Retention</h2>
                <p className="text-muted">
                  We retain your information for as long as your account is active 
                  or as needed to provide services. You can request deletion at any time.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Changes to This Policy</h2>
                <p className="text-muted">
                  We may update this privacy policy from time to time. We will notify you 
                  of any changes by posting the new policy on this page.
                </p>
              </div>

              <div className="text-center">
                <h2 className="h4 fw-bold text-dark mb-3">Contact Us</h2>
                <p className="text-muted">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <p className="text-muted">
                  <strong>Email:</strong> privacy@emailzus.com<br />
                  <strong>Address:</strong> Email Zus Privacy Team, 123 Business St, City, State 12345
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
