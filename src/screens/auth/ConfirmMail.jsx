import React from "react";

const ConfirmMail = () => {
  return (
    <section class="login-content">
      <div class="container-fluid h-100">
        <div class="row align-items-center justify-content-center h-100">
          <div class="col-12">
            <div class="row align-items-center">
              <div class="col-lg-6 rmb-30">
                <img
                  src="/imagesDashboard/login/01.png"
                  class="img-fluid w-80"
                  alt=""
                />
              </div>
              <div class="col-lg-6">
                <img
                  src="/imagesDashboard/login/mail.png"
                  class="img-fluid"
                  width="80"
                  alt=""
                />
                <h2 class="mt-3 mb-0">Success !</h2>
                <p class="cnf-mail mb-1">
                  A email has been send to youremail@domain.com. Please check
                  for an email from company and click on the included link to
                  reset your password.
                </p>
                <div class="d-inline-block w-100">
                  <a
                    class="btn btn-primary d-inline-flex align-items-center mt-3"
                    href="index.html"
                  >
                    <i class="ri-home-4-line rtl-ml-1"></i>Back to Home
                  </a>
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
