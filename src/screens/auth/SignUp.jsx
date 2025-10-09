import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helpers from "../../config/Helpers";
import authService from "../../services/authService";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    userType: "1",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      Helpers.toast("success", "Redirecting to Google OAuth...");
      window.location.href = `${Helpers.basePath}/auth/google`;
    } catch (error) {
      Helpers.toast("error", "Google authentication failed");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    alert('test');
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      Helpers.toast("error", "Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      Helpers.toast("error", "Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append(
        "password_confirmation",
        formData.password_confirmation
      );
      formDataToSend.append("userType", formData.userType);


      const response = await axios.post(
        `${Helpers.apiUrl}auth/register`,
        formDataToSend,
        Helpers.getAuthFileHeaders()
      );

      Helpers.toast(
        "success",
        "Registration successful! Please check your email for verification."
      );
      navigate(
        `/code-verification?type=register&user_id=${response.data.user_id}`
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed.";
      setError(errorMessage);
      Helpers.toast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-content">
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-2">Sign Up</h2>
                <p>Enter your personal details and start journey with us.</p>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="floating-label form-group">
                        <input
                          className="floating-input form-control"
                          type="text"
                          name="name"
                          placeholder=" "
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>Name</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="floating-label form-group">
                        <input
                          className="floating-input form-control"
                          type="email"
                          name="email"
                          placeholder=" "
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>Email</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="floating-label form-group">
                        <input
                          className="floating-input form-control"
                          type="password"
                          name="password"
                          placeholder=" "
                          value={formData.password}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>Password</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="floating-label form-group">
                        <input
                          className="floating-input form-control"
                          type="password"
                          name="password_confirmation"
                          placeholder=" "
                          value={formData.password_confirmation}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>Confirm Password</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          I agree with the terms of use
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </button>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="btn btn-outline-danger w-100"
                      disabled={isLoading}
                    >
                      <i className="fab fa-google me-2"></i>Sign up with Google
                    </button>
                  </div>

                  <p className="mt-3">
                    Already have an Account{" "}
                    <Link to="/" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
              <div className="col-lg-6 mb-lg-0 mb-4 mt-lg-0 mt-4">
                <img
                  src="/imagesDashboard/login/01.png"
                  className="img-fluid w-80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
