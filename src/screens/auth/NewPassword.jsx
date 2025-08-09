import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Helpers from "../../config/Helpers";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordData, setPasswordData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      navigate("/sign-in");
      return;
    }

    setUserId(user_id);
  }, [location, navigate]);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.password || !passwordData.password_confirmation) {
      Helpers.toast("error", "Both password fields are required.");
      return;
    }

    if (passwordData.password !== passwordData.password_confirmation) {
      Helpers.toast("error", "Passwords do not match.");
      return;
    }

    if (passwordData.password.length < 8) {
      Helpers.toast("error", "Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${Helpers.apiUrl}auth/reset-password`,
        {
          user_id: userId,
          password: passwordData.password,
          password_confirmation: passwordData.password_confirmation,
        },
        Helpers.getAuthHeaders()
      );

      Helpers.toast("success", "Password reset successfully!");
      navigate("/confirm-mail");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Password reset failed.";
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
                <h2 className="mb-2">Create New Password</h2>
                <p>
                  Enter your new password below. Make sure it's strong and
                  secure.
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
                          type="password"
                          name="password"
                          className="floating-input form-control"
                          placeholder=" "
                          value={passwordData.password}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>New Password</label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="floating-label form-group">
                        <input
                          type="password"
                          name="password_confirmation"
                          className="floating-input form-control"
                          placeholder=" "
                          value={passwordData.password_confirmation}
                          onChange={handleChange}
                          disabled={isLoading}
                        />
                        <label>Confirm New Password</label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Password"}
                  </button>
                </form>
              </div>
              <div className="col-lg-6 rmb-30">
                <img
                  src="/imagesDashboard/login/02.png"
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

export default NewPassword;
