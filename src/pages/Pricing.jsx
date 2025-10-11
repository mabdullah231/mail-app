import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '100 emails per month',
        '3 email templates',
        'Basic customer management',
        'Email support',
        'Powered by Email Zus branding'
      ],
      limitations: [
        'Limited to 100 emails/month',
        'Basic templates only',
        'Email Zus branding visible'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonVariant: 'outline-primary'
    },
    {
      name: 'Professional',
      price: 5,
      period: 'month',
      description: 'Best for growing businesses',
      features: [
        '1,000 emails per month',
        '20 email templates',
        'Advanced customer management',
        'SMS notifications (100/month)',
        'Priority support',
        'Remove branding',
        'Analytics dashboard',
        'Automated reminders'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary'
    },
    {
      name: 'Business',
      price: 15,
      period: 'month',
      description: 'For established businesses',
      features: [
        '5,000 emails per month',
        'Unlimited templates',
        'Advanced segmentation',
        'SMS notifications (500/month)',
        '24/7 support',
        'Remove branding',
        'Advanced analytics',
        'API access',
        'White-label options'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Start Free Trial',
      buttonVariant: 'outline-primary'
    },
    {
      name: 'Enterprise',
      price: 50,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Unlimited emails',
        'Unlimited templates',
        'Advanced automation',
        'Unlimited SMS',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'Custom domain',
        'Team collaboration'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'outline-secondary'
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'What happens if I exceed my email limit?',
      answer: 'We\'ll notify you when you\'re approaching your limit. You can upgrade your plan or wait for the next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings.'
    }
  ];

  return (
    <Container fluid className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="lead text-muted mb-4">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
          <Badge bg="success" className="fs-6 mb-4">
            <Gift size={16} className="me-1" />
            14-day free trial on all paid plans
          </Badge>
        </Col>
      </Row>

      {/* Pricing Cards */}
      <Row className="g-4 mb-5">
        {plans.map((plan, index) => (
          <Col lg={3} md={6} key={index}>
            <Card className={`h-100 border-0 shadow-sm ${plan.popular ? 'border-primary border-2' : ''}`}>
              {plan.popular && (
                <div className="position-absolute top-0 start-50 translate-middle">
                  <Badge bg="primary" className="px-3 py-2">
                    <Star size={14} className="me-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-dark mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="display-4 fw-bold text-primary">${plan.price}</span>
                    <span className="text-muted">/{plan.period}</span>
                  </div>
                  <p className="text-muted">{plan.description}</p>
                </div>

                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="mb-2">
                      <Check size={16} className="text-success me-2" />
                      <span className="text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="d-grid">
                  <Button 
                    variant={plan.buttonVariant} 
                    size="lg"
                    className="w-100"
                    as={Link}
                    to="/register"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Features Comparison */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 text-center">
              <h3 className="fw-bold text-dark mb-0">Feature Comparison</h3>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Features</th>
                      <th className="text-center">Free</th>
                      <th className="text-center">Professional</th>
                      <th className="text-center">Business</th>
                      <th className="text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Emails</td>
                      <td className="text-center">100</td>
                      <td className="text-center">1,000</td>
                      <td className="text-center">5,000</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td>Email Templates</td>
                      <td className="text-center">3</td>
                      <td className="text-center">20</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td>SMS Notifications</td>
                      <td className="text-center">-</td>
                      <td className="text-center">100/month</td>
                      <td className="text-center">500/month</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td>Remove Branding</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>
                    <tr>
                      <td>Analytics</td>
                      <td className="text-center">Basic</td>
                      <td className="text-center">Advanced</td>
                      <td className="text-center">Advanced</td>
                      <td className="text-center">Advanced</td>
                    </tr>
                    <tr>
                      <td>Support</td>
                      <td className="text-center">Email</td>
                      <td className="text-center">Priority</td>
                      <td className="text-center">24/7</td>
                      <td className="text-center">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mb-5">
        <Col>
          <h3 className="fw-bold text-dark text-center mb-4">Frequently Asked Questions</h3>
          <Row>
            {faqs.map((faq, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold text-dark mb-3">{faq.question}</h5>
                    <p className="text-muted mb-0">{faq.answer}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* CTA Section */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm bg-primary text-white">
            <Card.Body className="text-center py-5">
              <h3 className="fw-bold mb-3">Ready to Get Started?</h3>
              <p className="lead mb-4">
                Join thousands of businesses already using Email Zus to grow their customer base.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="light" size="lg" as={Link} to="/register">
                  <Zap size={20} className="me-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">
                  <Crown size={20} className="me-2" />
                  Contact Sales
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Pricing;
