// src/components/Template/TemplatePreview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { templateService } from '../../services/templateService';
import { toast } from 'react-toastify';
import { ArrowLeft, Eye, Mail, MessageSquare } from 'lucide-react';

const TemplatePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const response = await templateService.get(id);
        setTemplate(response);
      } catch (error) {
        console.error('Error fetching template:', error);
        toast.error('Failed to load template');
        navigate('/panel/templates');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, navigate]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'sms':
        return 'bg-success bg-opacity-10 text-success';
      default:
        return 'bg-secondary bg-opacity-10 text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">Template not found</div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <button
          onClick={() => navigate('/panel/templates')}
          className="btn btn-outline-secondary btn-sm me-3"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Template Preview</h1>
          <p className="text-muted mb-0">Preview your template content</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title mb-1">{template.title}</h5>
              <span className={`badge d-flex align-items-center gap-1 ${getTypeColor(template.type)}`}>
                {getTypeIcon(template.type)}
                <span className="text-capitalize">{template.type}</span>
              </span>
              {template.is_default && (
                <span className="badge bg-warning text-dark ms-2">Default</span>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <Eye className="text-muted" size={20} />
              <span className="text-muted">Preview Mode</span>
            </div>
          </div>
        </div>
        <div className="card-body">
          {/* For Email Templates */}
          {template.type === 'email' && (
            <div 
              className="email-preview-container"
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '0.375rem',
                padding: '2rem',
                minHeight: '400px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: template.body_html }}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '0.375rem',
                  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
                }}
              />
            </div>
          )}

          {/* For SMS Templates */}
          {template.type === 'sms' && (
            <div className="sms-preview-container">
              <div 
                className="bg-light p-4 rounded"
                style={{ 
                  maxWidth: '400px',
                  margin: '0 auto',
                  border: '1px solid #dee2e6'
                }}
              >
                <div className="text-muted small mb-2">SMS Preview:</div>
                <div className="bg-white p-3 rounded border">
                  {template.body_html ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: template.body_html }}
                      className="sms-content"
                    />
                  ) : (
                    <div className="text-muted">No content available</div>
                  )}
                </div>
                <div className="text-muted small mt-2">
                  Character count: {template.body_html ? template.body_html.replace(/<[^>]*>/g, '').length : 0}
                </div>
              </div>
            </div>
          )}

          {/* Template Info */}
          <div className="mt-4 pt-4 border-top">
            <h6 className="text-muted mb-3">Template Information</h6>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2">
                  <strong>Created:</strong>{' '}
                  {new Date(template.created_at).toLocaleDateString()}
                </div>
                <div className="mb-2">
                  <strong>Last Updated:</strong>{' '}
                  {new Date(template.updated_at).toLocaleDateString()}
                </div>
              </div>
              <div className="col-md-6">
                {template.placeholders && template.placeholders.length > 0 && (
                  <div>
                    <strong>Available Placeholders:</strong>
                    <div className="mt-1">
                      {template.placeholders.map((placeholder, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark me-1 mb-1"
                        >
                          {placeholder}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => navigate('/panel/templates')}
            >
              Back to Templates
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/panel/templates/edit/${template.id}`)}
            >
              Edit Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;