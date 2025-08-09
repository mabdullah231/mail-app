import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  
  // Payment links
  const paymentLinks = {
    paypal: "https://www.paypal.com/your-donation-link",
    stripe: "https://buy.stripe.com/your-checkout-link"
  };

  const bankDetails = {
    name: "Your Organization Name",
    bank: "Your Bank Name",
    account: "1234567890",
    routing: "123456789",
    swift: "ABCDEFGH"
  };

  const donationAmounts = [10, 25, 50, 100, 250];

  const handleDonate = (method) => {
    const amount = selectedAmount === 'other' ? customAmount : selectedAmount;
    const url = method === 'paypal' 
      ? `${paymentLinks.paypal}?amount=${amount}`
      : `${paymentLinks.stripe}/${amount}`;
    window.open(url, '_blank');
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8} className="text-center">
          <h1 className="display-5 mb-3">Make a Difference</h1>
          <p className="lead text-muted">
            Your support enables us to continue our mission. Every contribution matters.
          </p>
        </Col>
      </Row>

      {/* Donation Amount Selection */}
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <h4 className="mb-4">Select Your Donation Amount</h4>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "primary" : "outline-primary"}
                    size="lg"
                    className="px-4 py-2"
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))}
                
                <Button
                  variant={selectedAmount === 'other' ? "primary" : "outline-primary"}
                  size="lg"
                  className="px-4 py-2"
                  onClick={() => setSelectedAmount('other')}
                >
                  Other Amount
                </Button>
              </div>

              {selectedAmount === 'other' && (
                <Form.Group className="mb-3">
                  <Form.Label>Enter Custom Amount</Form.Label>
                  <div className="d-flex align-items-center">
                    <span className="me-2 fs-4">$</span>
                    <Form.Control
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0.00"
                      size="lg"
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                </Form.Group>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Options */}
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h4 className="mb-4 text-center">Choose Payment Method</h4>
          
          <Row className="g-4">
            {/* PayPal Option */}
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 rounded-3">
                <Card.Body className="p-4 text-center">
                  <div className="mb-4">
                    <img 
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                      alt="PayPal" 
                      style={{ height: '50px' }}
                    />
                  </div>
                  <h5 className="mb-3">PayPal</h5>
                  <p className="text-muted mb-4">
                    Pay with your PayPal account or credit card
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => handleDonate('paypal')}
                    disabled={selectedAmount === 'other' && !customAmount}
                  >
                    Donate with PayPal
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Credit Card Option */}
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 rounded-3">
                <Card.Body className="p-4 text-center">
                  <div className="mb-4">
                    <i className="ri-bank-card-line ri-4x text-primary"></i>
                  </div>
                  <h5 className="mb-3">Credit/Debit Card</h5>
                  <p className="text-muted mb-4">
                    Secure payment processed via Stripe
                  </p>
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    className="w-100 py-3"
                    onClick={() => handleDonate('stripe')}
                    disabled={selectedAmount === 'other' && !customAmount}
                  >
                    Donate with Card
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Bank Transfer Option */}
      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <i className="ri-bank-line ri-3x me-3 text-primary"></i>
                <div>
                  <h5 className="mb-1">Bank Transfer</h5>
                  <p className="text-muted mb-0">Direct transfer to our account</p>
                </div>
              </div>
              
              <Card className="bg-light border-0">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Account Name</h6>
                        <p className="mb-0">{bankDetails.name}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Bank Name</h6>
                        <p className="mb-0">{bankDetails.bank}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Account Number</h6>
                        <p className="mb-0">{bankDetails.account}</p>
                      </div>
                      <div className="mb-3">
                        <h6 className="text-muted mb-1">Routing Number</h6>
                        <p className="mb-0">{bankDetails.routing}</p>
                      </div>
                      {bankDetails.swift && (
                        <div className="mb-3">
                          <h6 className="text-muted mb-1">SWIFT Code</h6>
                          <p className="mb-0">{bankDetails.swift}</p>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer Note */}
      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8} className="text-center">
          <p className="text-muted">
            <i className="ri-lock-fill me-2"></i> All transactions are secure and encrypted
          </p>
          <p className="text-muted small">
            Your donation may be tax deductible. Receipts will be provided for all contributions.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default DonationPage;