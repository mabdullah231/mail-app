import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { templateService } from '../../services/templateService';

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    subject: '',
    category: '',
    content: '',
  });

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const allTemplates = await templateService.getAll();
        const emailTemplates = (allTemplates || []).filter(t => (t.type || 'email') === 'email');
        setTemplates(emailTemplates);
      } catch (err) {
        console.error('Failed to load templates', err);
      } finally {
        setLoading(false);
      }
    };
    loadTemplates();
  }, []);

  const openCreate = () => {
    setFormData({ id: null, name: '', subject: '', category: '', content: '' });
    setIsEditMode(false);
    setShowEditor(true);
  };

  const handleView = (template) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const handleEdit = (template) => {
    setFormData({
      id: template.id,
      name: template.name || template.title || '',
      subject: template.subject || '',
      category: template.category || '',
      content: template.content || '',
    });
    setIsEditMode(true);
    setShowEditor(true);
    setShowViewModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await templateService.delete(id);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setShowViewModal(false);
    }
  };

  const handleSave = async () => {
    const payload = {
      title: formData.name,
      subject: formData.subject,
      category: formData.category,
      content: formData.content,
      type: 'email',
    };

    try {
      setLoading(true);
      if (isEditMode && formData.id) {
        const updated = await templateService.update(formData.id, payload);
        setTemplates(prev => prev.map(t => (t.id === formData.id ? updated : t)));
      } else {
        const created = await templateService.create(payload);
        setTemplates(prev => [created, ...prev]);
      }
      setShowEditor(false);
      setIsEditMode(false);
      setFormData({ id: null, name: '', subject: '', category: '', content: '' });
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showEditor && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Email Templates</h4>
          <Button onClick={openCreate}>+ Add New Template</Button>
        </div>
      )}

      {loading && !showEditor ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Loading templates…</span>
        </div>
      ) : !showEditor ? (
        <Row>
          {templates.map((template) => (
            <Col md={4} key={template.id} className="mb-3">
              <Card onClick={() => handleView(template)} className="cursor-pointer shadow-sm">
                <Card.Body>
                  <Card.Title>{template.name || template.title}</Card.Title>
                  {template.category && (
                    <Card.Subtitle className="mb-2 text-muted">{template.category}</Card.Subtitle>
                  )}
                  {template.subject && <Card.Text>{template.subject}</Card.Text>}
                </Card.Body>
              </Card>
            </Col>
          ))}
          {templates.length === 0 && (
            <div className="text-muted">No email templates found.</div>
          )}
        </Row>
      ) : (
        <div className="p-3 border rounded bg-light">
          <h5>{isEditMode ? 'Edit Template' : 'Create New Template'}</h5>
          <Form className="mb-3">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Template Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="col-md-6 mb-3 position-relative">
                <Form.Label>Category</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    as="select"
                    name="category"
                    className="form-select pe-5"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Sales">Sales</option>
                    <option value="Transactional">Transactional</option>
                  </Form.Control>
                  <i
                    className="ri-arrow-down-s-line position-absolute"
                    style={{
                      top: '50%',
                      right: '15px',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      fontSize: '1.2rem',
                      color: '#6c757d',
                    }}
                  ></i>
                </div>
              </Form.Group>
            </Row>
            <Form.Group className="mt-3">
              <Form.Label>Template Content</Form.Label>
              <JoditEditor
                value={formData.content}
                config={{ readonly: false, placeholder: 'Write email content here...' }}
                onBlur={(newContent) => setFormData({ ...formData, content: newContent })}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => {
                setShowEditor(false);
                setIsEditMode(false);
                setFormData({ id: null, name: '', subject: '', category: '', content: '' });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>{isEditMode ? 'Update' : 'Save'}</Button>
          </div>
        </div>
      )}

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title>{selectedTemplate?.name || selectedTemplate?.title}</Modal.Title>
          <i
            className="ri-close-line"
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#6c757d' }}
            onClick={() => setShowViewModal(null)}
          ></i>
        </Modal.Header>
        <Modal.Body>
          <h6>Subject:</h6>
          <p>{selectedTemplate?.subject || '-'}</p>
          <h6>Category:</h6>
          <p>{selectedTemplate?.category || '-'}</p>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: selectedTemplate?.content || '' }} />
        </Modal.Body>
        <Modal.Footer>
          {selectedTemplate?.id && (
            <Button variant="danger" onClick={() => handleDelete(selectedTemplate.id)}>
              Delete
            </Button>
          )}
          <Button onClick={() => handleEdit(selectedTemplate)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmailTemplates;
