import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Filter,
  FileText,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Modal, Alert } from 'react-bootstrap';
import { templateService } from '../services/templateService';
import { companyService } from '../services/companyService';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [company, setCompany] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanyId();
  }, []);

  useEffect(() => {
    if (companyId) {
      loadTemplates();
    }
  }, [companyId]);

  const fetchCompanyId = async () => {
    try {
      console.log('Fetching company details...');
      const response = await companyService.getDetails();
      console.log('Company details response:', response);
      
      if (response.success && response.company && response.company.id) {
        const extractedCompanyId = response.company.id;
        setCompanyId(extractedCompanyId);
        console.log('Company ID set successfully:', extractedCompanyId);
      } else {
        console.error('Company ID not found in response:', response);
        notyf.error('Could not retrieve company information');
      }
    } catch (error) {
      console.error('Error fetching company details:', error);
      console.error('Error response:', error.response);
      notyf.error('Failed to load company details. Please check your connection.');
    }
  };

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, filterType]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      console.log('Loading templates with companyId:', companyId);
      
      const [templatesData, companyData] = await Promise.all([
        templateService.getAll(companyId),
        companyService.getDetails()
      ]);
      
      console.log('Templates data:', templatesData);
      setTemplates(templatesData);
      setCompany(companyData);
    } catch (error) {
      console.error('Error loading templates:', error);
      notyf.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.body_html.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(template => template.type === filterType);
    }

    setFilteredTemplates(filtered);
  };

  const handleDelete = async () => {
    if (templateToDelete) {
      try {
        await templateService.delete(templateToDelete.id);
        notyf.success('Template deleted successfully');
        loadTemplates();
        setShowDeleteModal(false);
        setTemplateToDelete(null);
      } catch (error) {
        notyf.error('Failed to delete template');
      }
    }
  };

  const handleDuplicate = async (template) => {
    try {
      const duplicateData = {
        ...template,
        title: `${template.title} (Copy)`,
        is_default: false
      };
      delete duplicateData.id;
      delete duplicateData.created_at;
      delete duplicateData.updated_at;
      
      await templateService.create(duplicateData);
      notyf.success('Template duplicated successfully');
      loadTemplates();
    } catch (error) {
      notyf.error('Failed to duplicate template');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail size={16} />;
      case 'sms':
        return <MessageSquare size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'primary';
      case 'sms':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading templates...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 fw-bold text-dark mb-1">Email Templates</h1>
              <p className="text-muted mb-0">Create and manage your email templates</p>
            </div>
            <Link to="/panel/templates/new">
              <Button variant="primary">
                <Plus size={16} className="me-2" />
                Create Template
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="email">Email Templates</option>
            <option value="sms">SMS Templates</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center py-5">
                <FileText size={48} className="text-muted mb-3" />
                <h5 className="text-muted mb-2">No templates found</h5>
                <p className="text-muted mb-4">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first email template to get started'
                  }
                </p>
                {!searchTerm && filterType === 'all' && (
                  <Link to="/panel/templates/new">
                    <Button variant="primary">
                      <Plus size={16} className="me-2" />
                      Create Your First Template
                    </Button>
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {filteredTemplates.map((template) => (
            <Col md={6} lg={4} key={template.id} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className={`bg-${getTypeColor(template.type)} bg-opacity-10 rounded-circle p-2 me-2`}>
                      {getTypeIcon(template.type)}
                    </div>
                    <Badge bg={getTypeColor(template.type)} className="text-capitalize">
                      {template.type}
                    </Badge>
                  </div>
                  {template.is_default && (
                    <Badge bg="warning">Default</Badge>
                  )}
                </Card.Header>
                <Card.Body>
                  <h6 className="fw-bold text-dark mb-2">{template.title}</h6>
                  <p className="text-muted small mb-3">
                    {stripHtml(template.body_html).substring(0, 100)}
                    {stripHtml(template.body_html).length > 100 && '...'}
                  </p>
                  <small className="text-muted">
                    Created {new Date(template.created_at).toLocaleDateString()}
                  </small>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      as={Link}
                      to={`/panel/templates/edit/${template.id}`}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      as={Link}
                      to={`/panel/templates/preview/${template.id}`}
                    >
                      <Eye size={14} />
                    </Button>
                    {/* <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleDuplicate(template)}
                    >
                      <Copy size={14} />
                    </Button> */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setTemplateToDelete(template);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the template "{templateToDelete?.title}"?</p>
          <Alert variant="warning">
            <strong>Warning:</strong> This action cannot be undone.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Template
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Templates;