import React from "react";
import { Link } from "react-router";

const ConfirmMail = () => {
  return (
    <section className="login-content">
      <div className="container-fluid h-100">
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-12">
            <div className="row align-items-center">
              <div className="col-lg-6 rmb-30">
                <img
                  src="/imagesDashboard/login/01.png"
                  className="img-fluid w-80"
                  alt=""
                />
              </div>
              <div className="col-lg-6">
                <img
                  src="/imagesDashboard/login/mail.png"
                  className="img-fluid"
                  width="80"
                  alt=""
                />
                <h2 className="mt-3 mb-0">Success!</h2>
                <p className="cnf-mail mb-1">
                  Your account has been successfully verified. You can now start
                  using our platform.
                </p>
                <div className="d-inline-block w-100">
                  <Link
                    className="btn btn-primary d-inline-flex align-items-center mt-3"
                    to="/"
                  >
                    <i className="ri-home-4-line rtl-ml-1"></i>Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmMail;
