import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FileText, AlertTriangle, Shield, Users, Mail, CreditCard } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                  <FileText className="text-primary" size={24} />
                </div>
                <h1 className="display-5 fw-bold text-dark mb-3">Terms & Conditions</h1>
                <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Users size={20} className="me-2" />
                  Acceptance of Terms
                </h2>
                <p className="text-muted">
                  By accessing and using Email Zus, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Mail size={20} className="me-2" />
                  Use License
                </h2>
                <p className="text-muted mb-3">
                  Permission is granted to temporarily use Email Zus for personal and commercial 
                  email marketing purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="text-muted">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <Shield size={20} className="me-2" />
                  User Responsibilities
                </h2>
                <p className="text-muted mb-3">As a user of Email Zus, you agree to:</p>
                <ul className="text-muted">
                  <li>Provide accurate and complete information when creating your account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not send spam or unsolicited emails</li>
                  <li>Respect recipient privacy and unsubscribe requests</li>
                  <li>Not use the service for illegal or harmful purposes</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <CreditCard size={20} className="me-2" />
                  Payment Terms
                </h2>
                <p className="text-muted mb-3">
                  Subscription fees are billed in advance on a monthly or annual basis. 
                  All fees are non-refundable except as required by law.
                </p>
                <ul className="text-muted">
                  <li>Billing occurs automatically on your renewal date</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Cancellation takes effect at the end of your current billing period</li>
                  <li>No refunds for partial months or unused services</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">
                  <AlertTriangle size={20} className="me-2" />
                  Prohibited Uses
                </h2>
                <p className="text-muted mb-3">You may not use Email Zus:</p>
                <ul className="text-muted">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Service Availability</h2>
                <p className="text-muted">
                  We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. 
                  We may temporarily suspend the service for maintenance, updates, or technical issues.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Data and Privacy</h2>
                <p className="text-muted mb-3">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs 
                  your use of the service, to understand our practices.
                </p>
                <ul className="text-muted">
                  <li>You retain ownership of your customer data</li>
                  <li>We process data according to our Privacy Policy</li>
                  <li>You are responsible for obtaining proper consent from recipients</li>
                  <li>We provide tools for data export and deletion</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Limitation of Liability</h2>
                <p className="text-muted">
                  In no event shall Email Zus, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses, resulting from your use of the service.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Termination</h2>
                <p className="text-muted">
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Changes to Terms</h2>
                <p className="text-muted">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 fw-bold text-dark mb-3">Governing Law</h2>
                <p className="text-muted">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                  Email Zus operates, without regard to its conflict of law provisions.
                </p>
              </div>

              <div className="text-center">
                <h2 className="h4 fw-bold text-dark mb-3">Contact Information</h2>
                <p className="text-muted">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <p className="text-muted">
                  <strong>Email:</strong> legal@emailzus.com<br />
                  <strong>Address:</strong> Email Zus Legal Team, 123 Business St, City, State 12345
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
