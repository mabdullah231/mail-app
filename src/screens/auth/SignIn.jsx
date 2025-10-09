import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helpers from "../../config/Helpers";
import authService from "../../services/authService";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      Helpers.toast("error", "Email and Password are required.");
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
  
      const data = await authService.login(formData);
  
      Helpers.toast("success", "Login successful.");
  
      const userType = parseInt(data.user.user_type);
  
      // Redirect logic
      if (userType === 1) { // Company
        if (!data.user.company_detail) {
          navigate("/company-details");
          return;
        }
      }
  
      navigate("/panel");
  
    } catch (error) {
      const data = error.response?.data;
  
      if (data?.code === "EMAIL_NOT_VERIFIED") {
        navigate(`/code-verification?type=login&user_id=${data.user_id}`);
        return;
      }
  
      const errorMessage = data?.message || "Invalid credentials.";
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
                <h2 className="mb-2">Sign In</h2>
                <p>
                  To keep connected with us please login with your personal
                  info.
                </p>

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
                    <div className="col-lg-12">
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
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6 rtl-left">
                      <Link
                        to="/forget-password"
                        className="text-primary float-right"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="btn btn-outline-danger w-100"
                      disabled={isLoading}
                    >
                      <i className="fab fa-google me-2"></i>Sign in with Google
                    </button>
                  </div>

                  <p className="mt-3">
                    Create an Account{" "}
                    <Link to="/sign-up" className="text-primary">
                      Sign Up
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

export default SignIn;
