import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import { templateService } from '../../services/templateService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const TemplateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body_html: '',
    placeholders: [],
    type: 'email',
    is_default: false,
    company_id: null
  });

  // Function to extract placeholders from content
  const extractPlaceholders = (content) => {
    if (!content) return [];
    
    // Regex to find {{placeholder}} patterns
    const placeholderRegex = /\{\{([^}]+)\}\}/g;
    const matches = content.match(placeholderRegex);
    
    if (!matches) return [];
    
    // Extract unique placeholder names without the {{ }}
    const placeholders = [...new Set(matches.map(match => 
      match.replace(/\{\{/g, '').replace(/\}\}/g, '').trim()
    ))];
    
    console.log('Extracted placeholders:', placeholders);
    return placeholders;
  };

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'align',
    'link', 'image',
    'blockquote', 'code-block'
  ];

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        console.log('Fetching company details...');
        // Use companyService instead of direct axios call
        const response = await companyService.getDetails();
        console.log('Company details response:', response);
        
        // Extract company ID from the response structure
        if (response.success && response.company && response.company.id) {
          const extractedCompanyId = response.company.id;
          setCompanyId(extractedCompanyId);
          setFormData(prev => ({
            ...prev,
            company_id: extractedCompanyId
          }));
          console.log('Company ID set successfully:', extractedCompanyId);
        } else {
          console.error('Company ID not found in response:', response);
          toast.error('Could not retrieve company information');
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
        console.error('Error response:', error.response);
        toast.error('Failed to load company details. Please check your connection.');
      }
    };

    const fetchTemplate = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        console.log('Fetching template with ID:', id);
        // Use templateService for consistency
        const response = await templateService.get(id);
        console.log('Template response:', response);
        
        setFormData({
          ...response,
          company_id: response.company_id || companyId
        });
        
      } catch (error) {
        console.error('Error fetching template:', error);
        console.error('Error details:', error.response?.data);
        toast.error('Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyId();
    fetchTemplate();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (value) => {
    // Extract placeholders whenever content changes
    const extractedPlaceholders = extractPlaceholders(value);
    
    setFormData(prev => ({
      ...prev,
      body_html: value,
      placeholders: extractedPlaceholders
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form data being submitted:', formData);
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error('Template title is required');
      return;
    }

    if (!formData.body_html.trim()) {
      toast.error('Template content is required');
      return;
    }

    if (!formData.company_id) {
      toast.error('Company information is missing. Please refresh the page and try again.');
      console.error('Company ID is still missing:', formData);
      return;
    }
    
    // Final placeholder extraction before submission (in case content changed after last edit)
    const finalPlaceholders = extractPlaceholders(formData.body_html);
    
    try {
      setLoading(true);
      
      const submissionData = {
        title: formData.title,
        body_html: formData.body_html,
        type: formData.type,
        is_default: formData.is_default,
        company_id: formData.company_id,
        placeholders: finalPlaceholders // Use the freshly extracted placeholders
      };
      
      console.log('Final submission data:', submissionData);

      if (isEditMode) {
        console.log('Updating template with ID:', id);
        await templateService.update(id, submissionData);
        toast.success('Template updated successfully');
      } else {
        console.log('Creating new template');
        await templateService.create(submissionData);
        toast.success('Template created successfully');
      }
      
      navigate('/panel/templates');
    } catch (error) {
      console.error('Error saving template:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.title?.[0] ||
                          error.response?.data?.errors?.body_html?.[0] ||
                          error.response?.data?.errors?.company_id?.[0] ||
                          'Failed to save template';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">{isEditMode ? 'Edit Template' : 'Create New Template'}</h5>
          {companyId && (
            <div className="text-success small">Company ID loaded: {companyId}</div>
          )}
          {!companyId && (
            <div className="text-warning small">Loading company information...</div>
          )}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Template Title *</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter template title"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Template Type *</label>
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div className="col-md-6 mb-3 d-flex align-items-end">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_default"
                    name="is_default"
                    checked={formData.is_default}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="is_default">
                    Set as default template
                  </label>
                </div>
              </div>
            </div>
          
            <div className="mb-3">
              <label className="form-label">Content *</label>
              <div className="editor-container">
                <ReactQuill
                  value={formData.body_html}
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  placeholder="Write your template content here..."
                  style={{ 
                    height: '300px', 
                    marginBottom: '50px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                      <i className="ri-information-line me-1"></i>
                      Available placeholders: {'{{name}}'}, {'{{email}}'}, {'{{company}}'}, {'{{logo}}'}, {'{{signature}}'}
                    </div>
                    {formData.placeholders.length > 0 && (
                      <div className="text-success small">
                        <i className="ri-check-line me-1"></i>
                        Detected placeholders: {formData.placeholders.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => navigate('/panel/templates')}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !companyId}
              >
                {loading ? 'Saving...' : 'Save Template'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;