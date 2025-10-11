import React, { useState, useEffect } from "react";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  Eye,
  EyeOff,
  Key,
  Bell,
  User,
  CreditCard,
} from "lucide-react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Nav,
  Tab,
  Alert,
  Badge,
} from "react-bootstrap";
import { companyService } from "../services/companyService";
import authService from "../services/authService";
import { subscriptionService } from "../services/subscriptionService";
import { getUserData } from "../utils/auth";
import { Notyf } from "notyf";

const notyf = new Notyf();

const Settings = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    logo: null,
    business_email: "",
    business_email_password: "",
    smtp_host: "",
    smtp_port: "",
    smtp_encryption: "tls",
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [subscription, setSubscription] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    business_email: false,
    current: false,
    new: false,
    confirm: false,
  });
  const user = getUserData();

  useEffect(() => {
    console.log('Current user from getUserData():', user);
    console.log('LocalStorage user:', localStorage.getItem('user'));
    console.log('LocalStorage token:', localStorage.getItem('token'));
    loadData();
  }, []);

  // Also add this to see the profile state
useEffect(() => {
  console.log('Profile state updated:', profile);
}, [profile]);

  const loadData = async () => {
    try {
      const [companyData, subscriptionData, profileData] = await Promise.all([
        companyService.getDetails(),
        subscriptionService.getCurrent(),
        authService.getProfile().catch(error => { 
          console.error('Error fetching profile:', error);
          return { user: user?.user || {} }; // Fallback to localStorage user
        })
      ]);
  
      // Make sure to set the company data properly
      if (companyData.company) {
        setCompany((prev) => ({
          ...prev,
          ...companyData.company,
          address: companyData.company.address || "",
          name: companyData.company.name || "",
          email: companyData.company.email || "",
          phone: companyData.company.phone || "",
          country: companyData.company.country || "",
          business_email: companyData.company.business_email || "",
          business_email_password: companyData.company.business_email_password || "",
          smtp_host: companyData.company.smtp_host || "",
          smtp_port: companyData.company.smtp_port || "",
          smtp_encryption: companyData.company.smtp_encryption || "tls",
        }));
      }
  
      setSubscription(subscriptionData);
  
      // Use profile data from API or fallback to localStorage
      const userProfile = profileData.user || user?.user || {};
      
      setProfile({
        name: userProfile.name || "",
        email: userProfile.email || "",
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
  
      console.log('Profile data loaded:', userProfile); // Debug log
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!company.name.trim()) {
      notyf.error("Company name is required");
      setLoading(false);
      return;
    }

    if (!company.address.trim()) {
      notyf.error("Company address is required");
      setLoading(false);
      return;
    }

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all company fields
      formData.append("name", company.name.trim());
      formData.append("email", company.email || "");
      formData.append("phone", company.phone || "");
      formData.append("address", company.address.trim());
      formData.append("country", company.country || "");
      formData.append("business_email", company.business_email || "");
      formData.append(
        "business_email_password",
        company.business_email_password || ""
      );
      formData.append("smtp_host", company.smtp_host || "");
      formData.append("smtp_port", company.smtp_port || "");
      formData.append("smtp_encryption", company.smtp_encryption || "tls");

      // Add logo file if exists
      if (company.logo && typeof company.logo !== "string") {
        formData.append("logo", company.logo);
      }

      // Add signature file if exists
      if (company.signature && typeof company.signature !== "string") {
        formData.append("signature", company.signature);
      }

      await companyService.storeOrUpdate(formData);
      notyf.success("Company details updated successfully");
      loadData();
    } catch (error) {
      console.error("Update error:", error);
      notyf.error(
        error.response?.data?.message || "Failed to update company details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (
      profile.new_password &&
      profile.new_password !== profile.confirm_password
    ) {
      notyf.error("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        name: profile.name,
        email: profile.email,
      };

      if (profile.new_password) {
        updateData.current_password = profile.current_password;
        updateData.password = profile.new_password;
        updateData.password_confirmation = profile.confirm_password;
      }

      await authService.updateProfile(updateData);
      notyf.success("Profile updated successfully");

      setProfile((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        confirm_password: "",
      }));
    } catch (error) {
      notyf.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompany((prev) => ({
        ...prev,
        logo: file,
        // Keep the existing logo URL for preview if needed
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubscribeBrandingRemoval = async () => {
    if (!window.confirm("Subscribe to branding removal for $5/month?")) {
      return;
    }

    try {
      setLoading(true);
      await subscriptionService.subscribeBrandingRemoval({
        payment_method: "paypal",
      });
      notyf.success("Successfully subscribed to branding removal");
      loadData();
    } catch (error) {
      notyf.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "India",
    "China",
    "Japan",
    "South Korea",
    "Singapore",
    "Malaysia",
    "Brazil",
    "Mexico",
    "Argentina",
    "South Africa",
    "Nigeria",
    "Kenya",
  ];
  const handleEmailSettingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Create FormData for file uploads
      const formData = new FormData();
  
      // Add all company fields including email settings
      formData.append("name", company.name || "");
      formData.append("email", company.email || "");
      formData.append("phone", company.phone || "");
      formData.append("address", company.address || "");
      formData.append("country", company.country || "");
      formData.append("business_email", company.business_email || "");
      formData.append(
        "business_email_password",
        company.business_email_password || ""
      );
      formData.append("smtp_host", company.smtp_host || "");
      formData.append("smtp_port", company.smtp_port || "");
      formData.append("smtp_encryption", company.smtp_encryption || "tls");
  
      // Add logo file if exists (to preserve it)
      if (company.logo && typeof company.logo !== "string") {
        formData.append("logo", company.logo);
      }
  
      // Add signature file if exists (to preserve it)
      if (company.signature && typeof company.signature !== "string") {
        formData.append("signature", company.signature);
      }
  
      await companyService.storeOrUpdate(formData);
      notyf.success("Email settings updated successfully");
      loadData();
    } catch (error) {
      console.error("Email settings update error:", error);
      notyf.error(
        error.response?.data?.message || "Failed to update email settings"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="h2 fw-bold text-dark mb-1">Settings</h1>
          <p className="text-muted mb-0">
            Manage your account and company settings
          </p>
        </Col>
      </Row>

      {/* Settings Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="company"
                      className="d-flex align-items-center"
                    >
                      <Building size={16} className="me-2" />
                      Company Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="profile"
                      className="d-flex align-items-center"
                    >
                      <User size={16} className="me-2" />
                      Profile Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="email"
                      className="d-flex align-items-center"
                    >
                      <Mail size={16} className="me-2" />
                      Email Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="subscription"
                      className="d-flex align-items-center"
                    >
                      <CreditCard size={16} className="me-2" />
                      Subscription
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Company Details Tab */}
              <Tab.Pane eventKey="company">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-transparent border-0">
                    <h5 className="mb-0">
                      <Building size={20} className="me-2" />
                      Company Details
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleCompanySubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Company Name *</Form.Label>
                            <Form.Control
                              type="text"
                              value={company.name}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={company.email}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              value={company.phone}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Select
                              value={company.country}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  country: e.target.value,
                                }))
                              }
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={company.address}
                          onChange={(e) =>
                            setCompany((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          required
                          placeholder="Enter your company address"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Company Logo</Form.Label>

                        {/* Show current logo if exists */}
                        {company.logo && typeof company.logo === "string" && (
                          <div className="mb-3">
                            <p className="text-muted small">Current Logo:</p>
                            <img
                              src={`http://localhost:8000/${company.logo}`}
                              alt="Company Logo"
                              style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                              }}
                              className="border rounded p-2"
                            />
                          </div>
                        )}

                        {/* Show preview of new logo if selected */}
                        {company.logoPreview && (
                          <div className="mb-3">
                            <p className="text-muted small">
                              New Logo Preview:
                            </p>
                            <img
                              src={company.logoPreview}
                              alt="New Logo Preview"
                              style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                objectFit: "cover",
                              }}
                              className="border rounded p-2"
                            />
                          </div>
                        )}

                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <Form.Text className="text-muted">
                          PNG, JPG, GIF up to 2MB
                        </Form.Text>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                      >
                        <Save size={16} className="me-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Profile Settings Tab */}
              <Tab.Pane eventKey="profile">
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-transparent border-0">
                    <h5 className="mb-0">
                      <User size={20} className="me-2" />
                      Profile Settings
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleProfileSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={profile.name}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={profile.email}
                              onChange={(e) =>
                                setProfile((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <hr className="my-4" />
                      <h6 className="fw-bold mb-3">Change Password</h6>

                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPasswords.current ? "text" : "password"}
                            value={profile.current_password}
                            onChange={(e) =>
                              setProfile((prev) => ({
                                ...prev,
                                current_password: e.target.value,
                              }))
                            }
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => togglePasswordVisibility("current")}
                          >
                            {showPasswords.current ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </Button>
                        </InputGroup>
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPasswords.new ? "text" : "password"}
                                value={profile.new_password}
                                onChange={(e) =>
                                  setProfile((prev) => ({
                                    ...prev,
                                    new_password: e.target.value,
                                  }))
                                }
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() => togglePasswordVisibility("new")}
                              >
                                {showPasswords.new ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </Button>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={
                                  showPasswords.confirm ? "text" : "password"
                                }
                                value={profile.confirm_password}
                                onChange={(e) =>
                                  setProfile((prev) => ({
                                    ...prev,
                                    confirm_password: e.target.value,
                                  }))
                                }
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  togglePasswordVisibility("confirm")
                                }
                              >
                                {showPasswords.confirm ? (
                                  <EyeOff size={16} />
                                ) : (
                                  <Eye size={16} />
                                )}
                              </Button>
                            </InputGroup>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                      >
                        <Save size={16} className="me-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Email Settings Tab */}
<Tab.Pane eventKey="email">
  <Card className="border-0 shadow-sm">
    <Card.Header className="bg-transparent border-0">
      <h5 className="mb-0">
        <Mail size={20} className="me-2" />
        Email Settings
      </h5>
    </Card.Header>
    <Card.Body>
      <Alert variant="info">
        <Bell size={16} className="me-2" />
        Configure your business email settings to send emails from your domain.
      </Alert>

      {/* Add onSubmit handler to the form */}
      <Form onSubmit={handleEmailSettingsSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Business Email</Form.Label>
              <Form.Control
                type="email"
                value={company.business_email}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    business_email: e.target.value,
                  }))
                }
                placeholder="support@yourcompany.com"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>SMTP Host</Form.Label>
              <Form.Control
                type="text"
                value={company.smtp_host}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    smtp_host: e.target.value,
                  }))
                }
                placeholder="smtp.gmail.com"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>SMTP Port</Form.Label>
              <Form.Control
                type="number"
                value={company.smtp_port}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    smtp_port: e.target.value,
                  }))
                }
                placeholder="587"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Encryption</Form.Label>
              <Form.Select
                value={company.smtp_encryption}
                onChange={(e) =>
                  setCompany((prev) => ({
                    ...prev,
                    smtp_encryption: e.target.value,
                  }))
                }
              >
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={
                showPasswords.business_email ? "text" : "password"
              }
              value={company.business_email_password}
              onChange={(e) =>
                setCompany((prev) => ({
                  ...prev,
                  business_email_password: e.target.value,
                }))
              }
              placeholder="App password or email password"
            />
            <Button
              variant="outline-secondary"
              onClick={() =>
                togglePasswordVisibility("business_email")
              }
            >
              {showPasswords.business_email ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </Button>
          </InputGroup>
          <Form.Text className="text-muted">
            Use app password for Gmail or your email password
          </Form.Text>
        </Form.Group>

        {/* Change to type="submit" */}
        <Button type="submit" variant="primary" disabled={loading}>
          <Save size={16} className="me-2" />
          {loading ? "Saving..." : "Save Email Settings"}
        </Button>
      </Form>
    </Card.Body>
  </Card>
</Tab.Pane>

              {/* Subscription Tab */}
              {/* Subscription Tab */}
<Tab.Pane eventKey="subscription">
  <Card className="border-0 shadow-sm">
    <Card.Header className="bg-transparent border-0 py-3">
      <div className="d-flex align-items-center">
        <CreditCard size={20} className="me-2 text-primary" />
        <h5 className="mb-0 fw-semibold">Subscription & Billing</h5>
      </div>
    </Card.Header>
    <Card.Body className="p-4">
      {subscription ? (
        <div className="row">
          <div className="col-12">
            <Alert variant="success" className="border-0 shadow-sm">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="success" className="me-2">
                      <i className="fas fa-crown me-1"></i>
                      ACTIVE
                    </Badge>
                    <h6 className="alert-heading mb-0 fw-bold text-success">Premium Subscription</h6>
                  </div>
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <CreditCard size={18} className="text-success" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Plan Type</small>
                          <strong className="text-dark">{subscription.plan_type || 'Premium'}</strong>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-dollar-sign text-success"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Monthly Cost</small>
                          <strong className="text-dark">${subscription.amount || '5'}/month</strong>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-calendar-check text-success"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Expires On</small>
                          <strong className="text-dark">
                            {new Date(subscription.expires_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </strong>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-sync text-success"></i>
                        </div>
                        <div>
                          <small className="text-muted d-block">Billing Cycle</small>
                          <strong className="text-dark">Monthly</strong>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Alert>
          </div>
          
          <div className="col-12 mt-4">
            <Card className="border">
              <Card.Header className="bg-light">
                <h6 className="mb-0 fw-semibold">Subscription Management</h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="d-grid">
                      <Button 
                        variant="outline-danger" 
                        size="lg"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="fas fa-times-circle me-2"></i>
                        Cancel Subscription
                      </Button>
                      <Form.Text className="text-muted text-center mt-1">
                        Cancel at the end of billing period
                      </Form.Text>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-grid">
                      <Button 
                        variant="outline-primary" 
                        size="lg"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <i className="fas fa-credit-card me-2"></i>
                        Update Payment Method
                      </Button>
                      <Form.Text className="text-muted text-center mt-1">
                        Change your payment details
                      </Form.Text>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 mb-4">
            <Alert variant="info" className="border-0">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="fas fa-info-circle fa-lg"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="alert-heading mb-2">Free Plan Active</h6>
                  <p className="mb-2">
                    You're currently enjoying our free plan with essential features. 
                    Upgrade to unlock premium capabilities and remove branding.
                  </p>
                  <hr />
                  <div className="row text-center">
                    <div className="col-md-4 mb-2">
                      <small className="text-muted d-block">Email Limits</small>
                      <strong>50/month</strong>
                    </div>
                    <div className="col-md-4 mb-2">
                      <small className="text-muted d-block">SMS Limits</small>
                      <strong>10/month</strong>
                    </div>
                    <div className="col-md-4 mb-2">
                      <small className="text-muted d-block">Branding</small>
                      <strong>Included</strong>
                    </div>
                  </div>
                </div>
              </div>
            </Alert>
          </div>

          <div className="col-lg-8 mx-auto">
            <Card className="border-primary shadow-sm">
              <Card.Header className="bg-primary text-white py-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0 fw-bold">
                    <i className="fas fa-crown me-2"></i>
                    Remove Branding & Premium Features
                  </h6>
                  <Badge bg="light" text="dark" className="fs-6">
                    RECOMMENDED
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="display-4 fw-bold text-primary mb-2">$5</div>
                  <div className="text-muted mb-3">per month</div>
                  <Badge bg="success" className="fs-6">
                    <i className="fas fa-check me-1"></i>
                    Cancel anytime
                  </Badge>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">What's Included:</h6>
                  <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <i className="fas fa-check text-success me-3"></i>
                      <span>Remove "Powered by Email Zus" branding</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <i className="fas fa-check text-success me-3"></i>
                      <span>Unlimited email campaigns</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <i className="fas fa-check text-success me-3"></i>
                      <span>Advanced analytics & reporting</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <i className="fas fa-check text-success me-3"></i>
                      <span>Priority email support</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center border-0 px-0 py-2">
                      <i className="fas fa-check text-success me-3"></i>
                      <span>Custom email templates</span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleSubscribeBrandingRemoval}
                    disabled={loading}
                    className="fw-semibold py-3"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={18} className="me-2" />
                        Subscribe Now - $5/month
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="fas fa-lock me-1"></i>
                    Secure payment processed by PayPal
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-12 mt-4">
            <Card className="border-0 bg-light">
              <Card.Body className="text-center py-4">
                <h6 className="fw-semibold mb-3">Need Help Deciding?</h6>
                <p className="text-muted mb-3">
                  Compare all features and choose the perfect plan for your business needs.
                </p>
                <Button variant="outline-secondary" size="sm">
                  <i className="fas fa-chart-bar me-2"></i>
                  Compare All Plans
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </Card.Body>
  </Card>
</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Settings;
