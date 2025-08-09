import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helpers from "../../config/Helpers";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Helpers.toast("error", "Email is required.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${Helpers.apiUrl}auth/forgot-password`,
        { email },
        Helpers.getAuthHeaders()
      );

      Helpers.toast("success", "Password reset code sent to your email!");
      navigate(
        `/code-verification?type=forgot-password&user_id=${response.data.user_id}`
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Email not found.";
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
                <h2 className="mb-2">Reset Password</h2>
                <p>
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
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
                          placeholder=" "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                        <label>Email</label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Reset"}
                  </button>

                  <p className="mt-3">
                    Remember your password?{" "}
                    <Link to="/sign-in" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
              <div className="col-lg-6 rmb-30">
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

export default ForgetPassword;
