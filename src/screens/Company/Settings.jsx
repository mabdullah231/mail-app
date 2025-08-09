import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import Helpers from '../../config/Helpers';

const CompanySettings = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [companyData, setCompanyData] = useState({
    name: '',
    logo: null,
    logoPreview: '',
    address: '',
    signature: null,
    signaturePreview: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const companyDetail = storedUser.company_detail || {};
    
    setUserData({
      name: storedUser.name || '',
      email: storedUser.email || '',
      phone: storedUser.phone || '',
    });

    setCompanyData({
      name: companyDetail.name || '',
      logo: companyDetail.logo || null,
      logoPreview: companyDetail.logo || '',
      address: companyDetail.address || '',
      signature: companyDetail.signature || null,
      signaturePreview: companyDetail.signature || ''
    });
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyData({
        ...companyData,
        logo: file,
        logoPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyData({
        ...companyData,
        signature: file,
        signaturePreview: URL.createObjectURL(file)
      });
    }
  };

  const validateUserInfo = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = 'Name is required';
    if (!userData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    else if (passwordData.newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCompanyInfo = () => {
    const newErrors = {};
    if (!companyData.name) newErrors.companyName = 'Company name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (validateUserInfo()) {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = {
        ...storedUser,
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccessMessage('User information saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // In a real app, you would send this to your backend for verification
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Clear password fields after successful change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleCompanyInfoSubmit = (e) => {
    e.preventDefault();
    if (validateCompanyInfo()) {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const updatedUser = {
        ...storedUser,
        company_detail: {
          ...storedUser.company_detail,
          name: companyData.name,
          address: companyData.address,
          logo: companyData.logoPreview || storedUser.company_detail?.logo,
          signature: companyData.signaturePreview || storedUser.company_detail?.signature
        }
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccessMessage('Company information saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Company Settings</h3>
      
      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}

      <Row className="g-4">
        {/* Left Column - User and Password Cards */}
        <Col md={6}>
          {/* User Information Card */}
          <Card className="mb-4">
            <Card.Header>
              <h4 className="card-title mb-0">User Information</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUserInfoSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={userData.name}
                    onChange={handleUserChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    value={userData.phone}
                    onChange={handleUserChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    <i className="ri-save-line me-1"></i> Save User Info
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Password Card */}
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Change Password</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.currentPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.newPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    <i className="ri-save-line me-1"></i> Change Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Company Card */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Company Information</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleCompanyInfoSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={companyData.name}
                    onChange={handleCompanyChange}
                    isInvalid={!!errors.companyName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company Logo</Form.Label>
                  <div className="d-flex align-items-center">
                    {companyData.logoPreview ? (
                      <img 
                        src={Helpers.basePath+'/'+companyData.logoPreview} 
                        alt="Company Logo" 
                        className="img-thumbnail me-3" 
                        style={{ maxHeight: '80px' }}
                      />
                    ) : (
                      <div className="bg-light border rounded d-flex align-items-center justify-content-center me-3" 
                        style={{ width: '120px', height: '80px' }}>
                        No logo
                      </div>
                    )}
                    <div className='mx-2'>
                      <label className="btn btn-sm btn-primary ">
                        <i className="ri-upload-line me-1"></i> Upload Logo
                        <input
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <div className="small text-muted mt-1">Recommended size: 200x80px</div>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={companyData.address}
                    onChange={handleCompanyChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Signature</Form.Label>
                  <div className="d-flex align-items-center">
                    {companyData.signaturePreview ? (
                      <img 
                        src={Helpers.basePath+'/'+companyData.signaturePreview} 
                        alt="Signature" 
                        className="img-thumbnail me-3" 
                        style={{ maxHeight: '80px' }}
                      />
                    ) : (
                      <div className="bg-light border rounded d-flex align-items-center justify-content-center me-3" 
                        style={{ width: '120px', height: '80px' }}>
                        No signature
                      </div>
                    )}
                    <div className='mx-2'>
                      <label className="btn btn-sm btn-primary">
                        <i className="ri-upload-line me-1"></i> Upload Signature
                        <input
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleSignatureChange}
                        />
                      </label>
                      <div className="small text-muted mt-1">Recommended size: 200x80px</div>
                    </div>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    <i className="ri-save-line me-1"></i> Save Company Info
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CompanySettings;