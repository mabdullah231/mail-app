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

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, filterType]);

  const loadTemplates = async () => {
    try {
      const companyResponse = await companyService.getDetails();
      setCompany(companyResponse.company);
      
      if (companyResponse.company) {
        const response = await templateService.getAll(companyResponse.company.id);
        setTemplates(response);
      }
    } catch (error) {
      notyf.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.body_html.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(template => template.type === filterType);
    }

    setFilteredTemplates(filtered);
  };

  const handleDelete = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templateService.delete(templateId);
        notyf.success('Template deleted successfully');
        loadTemplates();
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
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
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

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Email Templates</h1>
          <p className="text-muted mb-0">Create and manage your email templates</p>
        </div>
        <Link
          to="/panel/templates/new"
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          <Plus size={16} />
          <span>New Template</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="position-relative flex-grow-1">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control ps-5"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-select"
                  style={{ minWidth: '150px' }}
                >
                  <option value="all">All Types</option>
                  <option value="email">Email Templates</option>
                  <option value="sms">SMS Templates</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="row g-4 mb-4">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm hover-shadow transition-all">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="flex-grow-1 me-2">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="card-title text-truncate mb-0">
                        {template.title}
                      </h5>
                      {template.is_default && (
                        <span className="badge bg-warning text-dark">Default</span>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className={`badge d-flex align-items-center gap-1 ${getTypeColor(template.type)}`}>
                        {getTypeIcon(template.type)}
                        <span className="text-capitalize">{template.type}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex-grow-1">
                  <p className="card-text text-muted small line-clamp-3">
                    {stripHtml(template.body_html)}
                  </p>
                </div>

                {template.placeholders && template.placeholders.length > 0 && (
                  <div className="mb-3">
                    <p className="text-muted small mb-2">Placeholders:</p>
                    <div className="d-flex flex-wrap gap-1">
                      {template.placeholders.slice(0, 3).map((placeholder, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark small"
                        >
                          {placeholder}
                        </span>
                      ))}
                      {template.placeholders.length > 3 && (
                        <span className="text-muted small">
                          +{template.placeholders.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="text-muted small">
                    {new Date(template.created_at).toLocaleDateString()}
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(template)}
                      className="btn btn-sm btn-outline-secondary"
                      title="Duplicate"
                    >
                      <Copy size={14} />
                    </button>
                    
                    <Link
                      to={`/panel/templates/preview/${template.id}`}
                      className="btn btn-sm btn-outline-secondary"
                      title="Preview"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      to={`/panel/templates/edit/${template.id}`}
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-5">
          <FileText className="mx-auto text-muted mb-3" size={48} />
          <div className="text-muted mb-3">
            {searchTerm || filterType !== 'all' ? 'No templates match your filters' : 'No templates yet'}
          </div>
          {!searchTerm && filterType === 'all' && (
            <Link
              to="/panel/templates/new"
              className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
            >
              <Plus size={16} />
              Create your first template
            </Link>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-dark mb-1">{templates.length}</div>
              <div className="text-muted">Total Templates</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-dark mb-1">
                {templates.filter(t => t.type === 'email').length}
              </div>
              <div className="text-muted">Email Templates</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-dark mb-1">
                {templates.filter(t => t.type === 'sms').length}
              </div>
              <div className="text-muted">SMS Templates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;