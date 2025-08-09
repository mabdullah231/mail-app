import React, { useState } from 'react';
import { Button, Card, Modal, Form, Row, Col } from 'react-bootstrap';

const dummySmsTemplates = [
  {
    id: 1,
    name: 'Welcome SMS',
    category: 'Onboarding',
    content: 'Hi {{name}}, welcome to EmailZus!',
  },
  {
    id: 2,
    name: 'Reminder SMS',
    category: 'Transactional',
    content: 'Hey {{name}}, your appointment is tomorrow at 3 PM.',
  },
];

const SmsTemplates = () => {
  const [templates, setTemplates] = useState(dummySmsTemplates);
  const [showEditor, setShowEditor] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    content: '',
  });

  const handleView = (template) => {
    setSelectedTemplate(template);
    setShowViewModal(true);
  };

  const handleEdit = (template) => {
    setFormData(template);
    setIsEditMode(true);
    setShowEditor(true);
    setShowViewModal(false);
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter((t) => t.id !== id));
    setShowViewModal(false);
  };

  const handleSave = () => {
    if (isEditMode) {
      setTemplates(
        templates.map((t) => (t.id === formData.id ? { ...formData } : t))
      );
    } else {
      setTemplates([...templates, { ...formData, id: Date.now() }]);
    }
    setShowEditor(false);
    setIsEditMode(false);
    setFormData({ name: '', category: '', content: '' });
  };

  return (
    <div>
      {!showEditor && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>SMS Templates</h4>
          <Button onClick={() => setShowEditor(true)}>+ Add New Template</Button>
        </div>
      )}

      {!showEditor ? (
        <Row>
          {templates.map((template) => (
            <Col md={4} key={template.id} className="mb-3">
              <Card onClick={() => handleView(template)} className="cursor-pointer shadow-sm">
                <Card.Body>
                  <Card.Title>{template.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{template.category}</Card.Subtitle>
                  <Card.Text className="text-truncate">{template.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
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
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write SMS content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => {
                setShowEditor(false);
                setIsEditMode(false);
                setFormData({ name: '', category: '', content: '' });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>{isEditMode ? 'Update' : 'Save'}</Button>
          </div>
        </div>
      )}

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title>{selectedTemplate?.name}</Modal.Title>
          <i
            className="ri-close-line"
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#6c757d',
            }}
            onClick={() => setShowViewModal(false)}
          ></i>
        </Modal.Header>
        <Modal.Body>
          <h6>Category:</h6>
          <p>{selectedTemplate?.category}</p>
          <hr />
          <h6>Content:</h6>
          <p>{selectedTemplate?.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(selectedTemplate.id)}>
            Delete
          </Button>
          <Button onClick={() => handleEdit(selectedTemplate)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SmsTemplates;
