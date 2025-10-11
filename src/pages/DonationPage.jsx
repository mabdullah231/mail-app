import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Heart, CreditCard, DollarSign, MessageCircle } from 'lucide-react';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const DonationPage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donor_name: '',
    donor_email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setFormData({
      ...formData,
      amount: amount
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create donation payment session
      const response = await fetch('/api/payment/donation/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        notyf.success('Thank you for your donation! Redirecting to payment...');
        // Here you would redirect to PayPal/Stripe payment page
        // For now, we'll just show success
      } else {
        notyf.error(data.message || 'Donation failed');
      }
    } catch (error) {
      notyf.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-danger rounded-circle mb-3" style={{width: '60px', height: '60px'}}>
                  <Heart className="text-white" size={24} />
                </div>
                <h2 className="fw-bold text-dark">Support Email Zus</h2>
                <p className="text-muted">
                  Help us keep Email Zus free and improve our services. Every donation makes a difference!
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Donation Amount</Form.Label>
                  <Row className="g-2 mb-3">
                    {presetAmounts.map((amount) => (
                      <Col key={amount}>
                        <Button
                          variant={selectedAmount === amount ? 'primary' : 'outline-primary'}
                          className="w-100"
                          onClick={() => handleAmountSelect(amount)}
                          type="button"
                        >
                          ${amount}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="Enter custom amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    max="1000"
                    required
                  />
                  <Form.Text className="text-muted">
                    Minimum $1, Maximum $1000
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="donor_name"
                        placeholder="Enter your name"
                        value={formData.donor_name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Email (Optional)</Form.Label>
                      <Form.Control
                        type="email"
                        name="donor_email"
                        placeholder="Enter your email"
                        value={formData.donor_email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <MessageCircle size={16} className="me-2" />
                    Message (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    placeholder="Leave a message of support..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                  />
                  <Form.Text className="text-muted">
                    {formData.message.length}/500 characters
                  </Form.Text>
                </Form.Group>

                <Alert variant="info" className="mb-4">
                  <DollarSign size={16} className="me-2" />
                  <strong>Your donation helps us:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Keep Email Zus free for everyone</li>
                    <li>Improve our email and SMS services</li>
                    <li>Add new features and templates</li>
                    <li>Maintain server infrastructure</li>
                  </ul>
                </Alert>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    disabled={loading || !formData.amount}
                  >
                    <CreditCard size={20} className="me-2" />
                    {loading ? 'Processing...' : `Donate $${formData.amount || '0'}`}
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />
              
              <div className="text-center">
                <p className="text-muted small mb-0">
                  <strong>Payment Methods:</strong> PayPal, Credit Card, Debit Card
                </p>
                <p className="text-muted small">
                  All donations are processed securely and are tax-deductible.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DonationPage;
