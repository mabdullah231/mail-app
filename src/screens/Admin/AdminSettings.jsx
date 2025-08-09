import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const AdminSettings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    country: '',
    timezone: '',
    profileImage: null,
    previewImage: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    setProfileData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      company: userData.company || '',
      address: userData.address || '',
      country: userData.country || '',
      timezone: userData.timezone || 'UTC',
      profileImage: null,
      previewImage: userData.profileImage || ''
    });
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: file,
        previewImage: URL.createObjectURL(file)
      });
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!profileData.name) newErrors.name = 'Name is required';
    if (!profileData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';
    if (!profileData.phone) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    else if (passwordData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      // Save to localStorage (simulating API call)
      const updatedUser = {
        ...JSON.parse(localStorage.getItem('user')),
        ...profileData
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // Simulate password change
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Admin Settings</h3>
      
      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}

      <Row className="g-4">
        {/* Profile Details Card */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <h4 className="card-title mb-0">Profile Details</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleProfileSubmit}>
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <img
                      src={profileData.previewImage || '/default-avatar.png'}
                      alt="Profile"
                      className="rounded-circle"
                      width="120"
                      height="120"
                    />
                    <label className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0">
                      <i className="ri-camera-line"></i>
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <Row>
                  <Form.Group as={Col} md={12} className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={12} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Change Password Card */}
        <Col md={6}>
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
                    Change Password
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

export default AdminSettings;