import React, { useState, useEffect } from "react";
import axios from "axios";
import Helpers from "../../config/Helpers";
import { useNavigate } from "react-router-dom";
const CompanyDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    signature: null,
    logo: null,
  });

  const [preview, setPreview] = useState({
    logo: null,
    signature: null,
  });

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      if (formData.signature) data.append("signature", formData.signature);
      if (formData.logo) data.append("logo", formData.logo);

      const response = await axios.post(
        `${Helpers.apiUrl}company/store-or-update`,
        data,
        {
          ...Helpers.getAuthFileHeaders(),
        }
      );

      Helpers.toast(
        "success",
        response.data.message || "Company details saved."
      );
      
      // Get current user from localStorage
      let currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      
      // Merge updated company data
      if (currentUser) {
        currentUser.company_detail = {
          ...currentUser.company_detail,
          ...response.data.company, // Merge new data
        };
      
        // Save updated user back to localStorage
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
      
      // Clear previews
      setPreview({ logo: null, signature: null });
      
      // Redirect to panel
      navigate("/panel");
      
    } catch (error) {
      Helpers.toast(
        "error",
        error.response?.data?.message || "Failed to save company details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Helpers.removeItem("user");
    Helpers.removeItem("token");
    Helpers.toast("success", "Logged out successfully");
    window.location.href = "/";
  };

  return (
    <section className="company-details-content mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Company Details</h2>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              
              {/* Name */}
              <div className="form-group mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Address */}
              <div className="form-group mb-3">
                <label className="form-label">Company Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* File Uploads Row */}
              <div className="row mb-3">
                {/* Logo Upload */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Company Logo</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      name="logo"
                      id="logo-upload"
                      className="d-none"
                      accept=".png,.jpg,.jpeg,.gif"
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label 
                      htmlFor="logo-upload" 
                      className="file-upload-area d-block"
                      style={{
                        border: '2px dashed #dee2e6',
                        borderRadius: '6px',
                        padding: '1rem',
                        textAlign: 'center',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        backgroundColor: '#f8f9fa',
                        transition: 'all 0.2s ease',
                        minHeight: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {preview.logo  ? (
                        <>
                          <img
                            src={preview.logo}
                            alt="Logo"
                            style={{ maxHeight: '60px', maxWidth: '120px' }}
                            className="mb-1"
                          />
                          <small className="text-muted">
                            <i className="fas fa-edit me-1"></i>
                            Click to change
                          </small>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-image mb-1" style={{ fontSize: '1.5rem', color: '#6c757d' }}></i>
                          <small className="fw-semibold">Upload Logo</small>
                          <small className="text-muted mx-2">PNG, JPG • Max 2MB</small>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Signature Upload */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Digital Signature</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      name="signature"
                      id="signature-upload"
                      className="d-none"
                      accept=".png,.jpg,.jpeg,.gif"
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <label 
                      htmlFor="signature-upload" 
                      className="file-upload-area d-block"
                      style={{
                        border: '2px dashed #dee2e6',
                        borderRadius: '6px',
                        padding: '1rem',
                        textAlign: 'center',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        backgroundColor: '#f8f9fa',
                        transition: 'all 0.2s ease',
                        minHeight: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {preview.signature ? (
                        <>
                          <img
                            src={preview.signature}
                            alt="Signature"
                            style={{ maxHeight: '50px', maxWidth: '120px' }}
                            className="mb-1"
                          />
                          <small className="text-muted">
                            <i className="fas fa-edit me-1"></i>
                            Click to change
                          </small>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-signature mb-1" style={{ fontSize: '1.5rem', color: '#6c757d' }}></i>
                          <small className="fw-semibold">Upload Signature</small>
                          <small className="text-muted mx-2">PNG, JPG • Max 2MB</small>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Company Details"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .file-upload-area:hover:not(.disabled) {
          border-color: #0d6efd !important;
          background-color: #e7f3ff !important;
        }
        
        .file-upload-area.disabled {
          opacity: 0.6;
          cursor: not-allowed !important;
        }
      `}</style>
    </section>
  );
};

export default CompanyDetails;