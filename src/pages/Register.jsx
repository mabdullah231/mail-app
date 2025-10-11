import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { authService } from '../services/authService';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    userType: '1', // Default to Business Admin
    company_logo: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      notyf.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await authService.register(submitData);
      notyf.success('Registration successful! Please check your email for verification.');
      navigate('/verify-email', { 
        state: { 
          userId: response.user_id,
          email: formData.email 
        } 
      });
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 mb-3" style={{width: '48px', height: '48px'}}>
                    <span className="text-white fw-bold fs-5">EZ</span>
                  </div>
                  <h2 className="fw-bold text-dark">Create your account</h2>
                  <p className="text-muted">
                    Or{' '}
                    <Link to="/login" className="text-primary text-decoration-none fw-medium">
                      sign in to your existing account
                    </Link>
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <User size={16} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <Mail size={16} />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Account Type</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <Building size={16} />
                          </InputGroup.Text>
                          <Form.Select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                          >
                            <option value="1">Business Account</option>
                            <option value="2">Individual Account</option>
                          </Form.Select>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company Logo (Optional)</Form.Label>
                        <Form.Control
                          type="file"
                          name="company_logo"
                          accept="image/*"
                          onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                          PNG, JPG, GIF up to 2MB
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <Lock size={16} />
                          </InputGroup.Text>
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <Lock size={16} />
                          </InputGroup.Text>
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            placeholder="Confirm your password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </Button>
                </Form>

                <hr className="my-4" />
                
                <div className="text-center">
                  <p className="text-muted small mb-3">Already have an account?</p>
                  <Link
                    to="/login"
                    className="btn btn-outline-secondary w-100"
                  >
                    Sign in instead
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Register;