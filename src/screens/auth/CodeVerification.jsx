import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Helpers from "../../config/Helpers";
import axios from "axios";

const CodeVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [context, setContext] = useState("Verification");
  const [userId, setUserId] = useState(null);
  const [flowType, setFlowType] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    const user_id = searchParams.get("user_id");

    if (!type || !user_id) {
      navigate("/sign-in");
      return;
    }

    setUserId(user_id);
    setFlowType(type);

    switch (type) {
      case "register":
        setContext("Registration");
        break;
      case "login":
        setContext("Login");
        break;
      case "forgot-password":
        setContext("Password Reset");
        break;
      default:
        setContext("Verification");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      Helpers.toast("error", "Please enter a valid 6-digit code.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      let endpoint;
      if (flowType === "register" || flowType === "login") {
        endpoint = "auth/verify-email";
      } else if (flowType === "forgot-password") {
        endpoint = "auth/verify-forgot-password";
      }

      const response = await axios.post(
        `${Helpers.apiUrl}${endpoint}`,
        {
          code,
          user_id: userId,
        },
        Helpers.getAuthHeaders()
      );

      const data = response.data;

      if (flowType === "register" || flowType === "login") {
        Helpers.toast("success", "Email verified successfully!");

        if (data.token) {
          Helpers.setItem("token", data.token);
          Helpers.setItem("user", JSON.stringify(data.user));

          const userType = parseInt(data.user.user_type);

          // if (userType === 0) {
          //   navigate("/panel");
          // } else if (userType === 1) {
          //   navigate("/panel");
          // } else {
            navigate("/panel");
          // }
        } else {
          navigate("/confirm-mail");
        }
      } else if (flowType === "forgot-password") {
        navigate(`/new-password?user_id=${userId}`);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid verification code.";
      setError(errorMessage);
      Helpers.toast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${Helpers.apiUrl}auth/resend-email`,
        { user_id: userId },
        Helpers.getAuthHeaders()
      );

      Helpers.toast("success", "Verification code resent!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to resend code.";
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
                <h2 className="mb-2">{context} Code</h2>
                <p>Please enter the 6-digit code sent to your email address.</p>

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
                          type="text"
                          className="floating-input form-control"
                          placeholder=" "
                          maxLength="6"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          disabled={isLoading}
                        />
                        <label>6-Digit Code</label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleResend}
                      className="btn btn-link text-primary p-0"
                      disabled={isLoading}
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 rmb-30">
                <img
                  src="/imagesDashboard/login/03.png"
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

export default CodeVerification;
