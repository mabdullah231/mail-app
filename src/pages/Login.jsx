import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { authService } from '../services/authService';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      notyf.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
        notyf.error('Please verify your email first');
        navigate('/verify-email', { 
          state: { 
            userId: error.response.data.user_id,
            email: formData.email 
          } 
        });
      } else {
        notyf.error(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 mb-3" style={{width: '48px', height: '48px'}}>
                    <span className="text-white fw-bold fs-5">EZ</span>
                  </div>
                  <h2 className="fw-bold text-dark">Sign in to your account</h2>
                  <p className="text-muted">
                    Or{' '}
                    <Link to="/register" className="text-primary text-decoration-none fw-medium">
                      create a new account
                    </Link>
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
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

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/forgot-password" className="text-primary text-decoration-none small">
                      Forgot your password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </Form>

                <hr className="my-4" />
                
                <div className="text-center">
                  <p className="text-muted small mb-3">New to Email Zus?</p>
                  <Link
                    to="/register"
                    className="btn btn-outline-secondary w-100"
                  >
                    Create new account
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

export default Login;
