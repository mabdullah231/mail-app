import React from "react";

const Sidebar = () => {
  return (
    <div class="iq-sidebar rtl-iq-sidebar sidebar-default">
      <div class="iq-sidebar-logo d-flex align-items-center justify-content-between">
        <a href="index.html" class="header-logo">
          <img
            src="/imagesDashboard/logo.png"
            class="img-fluid rounded-normal light-logo"
            alt="logo"
          />
          <img
            src="/imagesDashboard/logo-white.png"
            class="img-fluid rounded-normal darkmode-logo"
            alt="logo"
          />
        </a>
        <div class="iq-menu-bt-sidebar">
          <i class="las la-bars wrapper-menu"></i>
        </div>
      </div>
      <div class="data-scrollbar" data-scroll="1">
        <nav class="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" class="iq-menu">
            <li class=" ">
              <a
                href="#Dashboards"
                class="collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i class="las la-home"></i>
                <span>Dashboards</span>
                <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
              </a>
              <ul
                id="Dashboards"
                class="iq-submenu collapse"
                data-parent="#iq-sidebar-toggle"
              >
                <li class="active">
                  <a href="index.html">
                    <i class="lab la-blogger-b"></i>
                    <span>Dashboard 1</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="dashboard-2.html">
                    <i class="las la-share-alt"></i>
                    <span>Dashboard 2</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="dashboard-3.html">
                    <i class="las la-icons"></i>
                    <span>Dashboard 3</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class=" ">
              <a
                href="#auth"
                class="collapsed"
                data-toggle="collapse"
                aria-expanded="false"
              >
                <i class="las la-torah iq-arrow-left"></i>
                <span>Authentication</span>
                <i class="las la-angle-right iq-arrow-right arrow-active"></i>
                <i class="las la-angle-down iq-arrow-right arrow-hover"></i>
              </a>
              <ul
                id="auth"
                class="iq-submenu collapse"
                data-parent="#iq-sidebar-toggle"
              >
                <li class=" ">
                  <a href="auth-sign-in.html">
                    <i class="las la-sign-in-alt"></i>
                    <span>Login</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="auth-sign-up.html">
                    <i class="las la-registered"></i>
                    <span>Register</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="auth-recoverpw.html">
                    <i class="las la-unlock-alt"></i>
                    <span>Recover Password</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="auth-confirm-mail.html">
                    <i class="las la-envelope-square"></i>
                    <span>Confirm Mail</span>
                  </a>
                </li>
                <li class=" ">
                  <a href="auth-lock-screen.html">
                    <i class="las la-lock"></i>
                    <span>Lock Screen</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div class="p-3"></div>
      </div>
    </div>
  );
};

export default Sidebar;
