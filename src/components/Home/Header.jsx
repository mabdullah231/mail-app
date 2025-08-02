import React, { useState, useEffect } from 'react';

const Header = () => {
  return (
    <header id="header" className="tra-menu bg-gray-400 navbar-light white-scroll w-full block pt-0">
      <div className="header-wrapper fixed z-[1030] top-0 inset-x-0">

        <div className="wsmobileheader clearfix">
          <span className="smllogo md:!block md:!mt-[22px] md:!pl-[22px] sm:!block sm:!mt-[23px] sm:!pl-[18px] xsm:!block xsm:!mt-[23px] xsm:!pl-[16px]">
            <img
              className="md:w-auto md:max-w-[inherit] md:max-h-[34px] sm:!w-auto sm:!max-w-[inherit] sm:!max-h-[34px] xsm:!w-auto xsm:!max-w-[inherit] xsm:!max-h-[34px]"
              src="/images/logo-pink.png" 
              alt="mobile-logo"
            />
          </span>
          <a 
            id="wsnavtoggle" 
            className="wsanimated-arrow"
            href="#"
          >
            <span></span>
          </a>
        </div>

        <div className="wsmainfull menu clearfix text-[#b1b7cd] p-0 !bg-transparent shadow-none px-0 !py-[20px] w-full h-auto z-[1031] [transition:all_450ms_ease-in-out]">
          <div className="overlapblackbg"></div>
          
          <div className="wsmainwp clearfix">

            <div className="desktoplogo">
              <a href="#hero-1" className="logo-black">
                <img className="light-theme-img w-auto max-w-[inherit] max-h-[38px] lg:max-h-[34px] inline-block"
                  src="/images/logo-pink.png" alt="logo" />
                <img className="dark-theme-img w-auto max-w-[inherit] max-h-[38px] lg:max-h-[34px]"
                  src="/images/logo-blue-white.png" alt="logo" />
              </a>
            </div>

            <div className="desktoplogo">
              <a href="#hero-1" className="logo-white">
                <img className=" w-auto max-w-[inherit] max-h-[38px] lg:max-h-[34px] inline-block"
                  src="/images/logo-white.png" alt="logo" />
              </a>
            </div>

            <nav className="wsmenu clearfix">
              <ul className="wsmenu-list nav-theme">

                <li aria-haspopup="true">
                  <a href="#" className="h-link">About <span className="wsarrow"></span></a>
                  <ul className="sub-menu">
                    <li aria-haspopup="true"><a href="#lnk-1">Why Martex?</a></li>
                    <li aria-haspopup="true"><a href="#lnk-2">Integrations</a></li>
                    <li aria-haspopup="true"><a href="#lnk-3">How It Works</a></li>
                    <li aria-haspopup="true"><a href="#features-2">Best Solutions</a></li>
                    <li aria-haspopup="true"><a href="#reviews-1">Testimonials</a></li>
                  </ul>
                </li>

                <li className="nl-simple" aria-haspopup="true">
                  <a href="#features-6" className="h-link">Features</a>
                </li>

                <li aria-haspopup="true" className="mg_link">
                  <a href="#" className="h-link">Pages <span className="wsarrow"></span></a>
                  <div className="wsmegamenu w-75 clearfix">
                    <div className="container">
                      <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">

                        <ul className="lg:w-3/12 xl:w-3/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full link-list">
                          <li className="fst-li"><a href="about.html">About Us</a></li>
                          <li><a href="team.html">Our Team</a></li>
                          <li><a href="careers.html">Careers <span className="sm-info">4</span></a></li>
                          <li><a href="career-role.html">Career Details</a></li>
                          <li><a href="contacts.html">Contact Us</a></li>
                        </ul>

                        <ul className="lg:w-3/12 xl:w-3/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full link-list">
                          <li><a href="features.html">Core Features</a></li>
                          <li className="fst-li"><a href="projects.html">Our Projects</a></li>
                          <li><a href="project-details.html">Project Details</a></li>
                          <li><a href="reviews.html">Testimonials</a></li>
                          <li><a href="download.html">Download Page</a></li>
                        </ul>

                        <ul className="lg:w-3/12 xl:w-3/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full link-list">
                          <li className="fst-li"><a href="pricing-1.html">Pricing Page #1</a></li>
                          <li><a href="pricing-1.html">Pricing Page #2</a></li>
                          <li><a href="faqs.html">FAQs Page</a></li>
                          <li><a href="help-center.html">Help Center</a></li>
                          <li><a href="404.html">404 Page</a></li>
                        </ul>

                        <ul className="lg:w-3/12 xl:w-3/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full link-list">
                          <li className="fst-li"><a href="blog-listing.html">Blog Listing</a></li>
                          <li><a href="single-post.html">Single Blog Post</a></li>
                          <li><a href="login-2.html">Login Page</a></li>
                          <li><a href="signup-2.html">Signup Page</a></li>
                          <li><a href="reset-password.html">Reset Password</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nl-simple" aria-haspopup="true">
                  <a href="pricing-1.html" className="h-link">Pricing</a>
                </li>

                <li className="nl-simple" aria-haspopup="true">
                  <a href="#faqs-3" className="h-link">FAQs</a>
                </li>

                <li className="nl-simple reg-fst-link mobile-last-link" aria-haspopup="true">
                  <a href="login-2.html" className="h-link">Sign in</a>
                </li>

                <li className="nl-simple reg-fst-link mobile-last-link" aria-haspopup="true">
                  <a href="login-2.html" className="h-link">Sign Up</a>
                </li>
              </ul>
            </nav>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;