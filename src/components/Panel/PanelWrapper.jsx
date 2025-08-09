import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./Wrapper.css";
import Helpers from "../../config/Helpers";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import allRoutes from "../../Routes";

const PanelWrapper = () => {
  const location = useLocation();
  const user = Helpers.getItem("user", true);
  const ROLE_MAP = {
    0: "admin",
    1: "company",
    2: "user",
  };
  const role = ROLE_MAP[user?.user_type];
  const filterRoutesByRole = (routes, role) => {
    return routes
      .filter(route => {
        // Keep route if it has no roles or if role matches
        return !route.roles || route.roles.includes(role);
      })
      .map(route => {
        if (route.children) {
          const filteredChildren = filterRoutesByRole(route.children, role);
          return {
            ...route,
            children: filteredChildren,
          };
        }
        return route;
      })
      .filter(route => {
        // Remove empty parent routes with no visible children
        if (route.children && route.children.length === 0) return false;
        return true;
      });
  };
  
  const roleBasedRoutes = filterRoutesByRole(allRoutes, role);

  console.log(roleBasedRoutes);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  // Navbar dropdown states
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [messagesDropdownOpen, setMessagesDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] =
    useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    const checkDarkMode = () => {
      const hasDarkClass = document.body.classList.contains("dark");
      const hasDarkTheme = document.body.getAttribute("data-theme") === "dark";
      setIsDarkMode(hasDarkClass || hasDarkTheme);
    };

    handleResize();
    checkDarkMode();

    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      // Check if the click is outside dropdown areas
      if (
        !event.target.closest(".nav-item.dropdown") &&
        !event.target.closest(".nav-item.search-content") &&
        !event.target.closest(".caption-content")
      ) {
        setSearchDropdownOpen(false);
        setMessagesDropdownOpen(false);
        setNotificationsDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
    setOpenMenu(""); // Collapse all submenus when toggling
  };

  const toggleSubMenu = (menuId) => {
    if (isSidebarCollapsed) return;
    setOpenMenu((prev) => (prev === menuId ? "" : menuId));
  };

  const toggleDropdown = (dropdownName, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Store current state
    const currentStates = {
      search: searchDropdownOpen,
      messages: messagesDropdownOpen,
      notifications: notificationsDropdownOpen,
      profile: profileDropdownOpen,
    };

    // Close all dropdowns first
    setSearchDropdownOpen(false);
    setMessagesDropdownOpen(false);
    setNotificationsDropdownOpen(false);
    setProfileDropdownOpen(false);

    // Then open the selected one if it was closed
    if (!currentStates[dropdownName]) {
      switch (dropdownName) {
        case "search":
          setSearchDropdownOpen(true);
          break;
        case "messages":
          setMessagesDropdownOpen(true);
          break;
        case "notifications":
          setNotificationsDropdownOpen(true);
          break;
        case "profile":
          setProfileDropdownOpen(true);
          break;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Helper function to check if a route is active
  const isRouteActive = (routePath) => {
    const currentPath = location.pathname.replace(/^\/+/, ""); // Remove leading slashes
    const routePathClean = routePath?.replace(/^\/+/, ""); // Remove leading slashes
    console.log("Current Path ", currentPath);
    console.log("Route Path Clean ", routePathClean);
    console.log("Current Path ", currentPath);
    return (
      currentPath === "panel/" + routePathClean ||
      currentPath.startsWith(routePathClean + "/")
    );
  };

  return (
    <>
      <style>{`
        /* Layout styles */
        .iq-sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .iq-top-navbar {
    width: -webkit-fill-available;
  }
  
  /* Desktop collapsed state */
  @media (min-width: 992px) {
    .iq-sidebar.collapsed {
      width: 80px;
    }
  
    .iq-top-navbar {
      margin-left: 250px;
      transition: margin-left 0.3s ease;
    }
  
    .iq-top-navbar.sidebar-collapsed {
      margin-left: 80px;
    }
  }
  
  /* Mobile styles */
  @media (max-width: 991.98px) {
    .iq-sidebar {
      transform: translateX(-100%);
      width: 250px;
    }
  
    .iq-sidebar:not(.collapsed) {
      transform: translateX(0);
    }
  
    .iq-top-navbar {
      margin-left: 0 !important;
    }
  }
  
  .iq-top-navbar {
    margin-left: 250px;
    transition: margin-left 0.3s ease;
    position: sticky;
    top: 0;
    z-index: 999;
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .iq-top-navbar.sidebar-collapsed {
    margin-left: 80px;
  }
  
  /* Sidebar styles */
  .iq-sidebar-logo .logo {
    height: 50px;
    transition: all 0.3s;
  }
  
  .iq-sidebar.collapsed .logo {
    display: none;
  }

  /* Sidebar Menu Styles */
  .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-menu .menu-item {
    margin: 0;
    padding: 0;
  }

  .sidebar-menu .menu-item a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    position: relative;
  }

  .sidebar-menu .menu-item a:hover {
    background-color: #f8f9fa;
    color: #007bff;
    border-left-color: #007bff;
  }

  .sidebar-menu .menu-item.active a {
    // background-color: #007bff;
    color: #007bff;
    // border-left-color: #0056b3;
    font-weight: 500;
  }

  .sidebar-menu .menu-item a i {
    font-size: 18px;
    margin-right: 12px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .sidebar-menu .menu-item a .menu-text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Collapsed sidebar styles */
  .iq-sidebar.collapsed .sidebar-menu .menu-item a {
    justify-content: center;
    padding: 12px 8px;
  }

  .iq-sidebar.collapsed .sidebar-menu .menu-item a i {
    margin-right: 0;
  }

  .iq-sidebar.collapsed .menu-text {
    display: none;
  }

  .iq-sidebar.collapsed .arrow-toggle {
    display: none;
  }
  
  .iq-menu > li > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .iq-submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding-left: 1.5rem;
    list-style-type:none !important;
  }
  
  .iq-sidebar.collapsed .iq-submenu {
    display: none;
  }
  
  .iq-submenu.show {
    max-height: 500px;
  }
  
  .iq-submenu li a {
    display: flex;
    align-items: center;
    padding: 10px 0;
    color: #555;
  }
  
  .arrow-toggle {
    transition: transform 0.3s ease;
  }
  
  .arrow-toggle.rotated {
    transform: rotate(180deg);
  }
  
  .iq-menu-bt-sidebar {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .data-scrollbar {
    overflow: hidden;
    height: calc(100vh - 60px);
  }

  /* Dark mode styles */
  .dark .iq-sidebar {
    background-color: #1a1a1a;
  }

  .dark .sidebar-menu .menu-item a {
    color: #e0e0e0;
  }

  .dark .sidebar-menu .menu-item a:hover {
    background-color: #2a2a2a;
    color: #4fc3f7;
  }

  .dark .sidebar-menu .menu-item.active a {
    background-color: #4fc3f7;
    color: #1a1a1a;
  }

  /* Dropdown styles */
  .dropdown-menu {
    display: block;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 300px;
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }

  .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-item {
    position: relative;
  }

  .navbar-collapse {
    transition: all 0.3s ease;
  }

  .navbar-collapse.show {
    display: block !important;
  }

  @media (max-width: 991.98px) {
    .navbar-collapse {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid #dee2e6;
      padding: 1rem;
    }
  }

  .iq-user-dropdown {
    display: block;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    position: absolute;
    top: 100%;
    right: 0;
    width: 350px;
    z-index: 1000;
  }

  .iq-user-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
    .main-content {
  margin-left: 250px; /* default sidebar width */
  padding: 20px;
  padding-top:20px; /* adjust for navbar height */
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  // background-color: #f9f9f9;
}

.main-content.sidebar-collapsed {
  margin-left: 80px; /* collapsed sidebar width */
}

@media (max-width: 991.98px) {
  .main-content,
  .main-content.sidebar-collapsed {
    margin-left: 0;
    padding-top: 20px;
  }
}

      `}</style>

      {/* Sidebar */}
      <div
        className={classNames("iq-sidebar sidebar-default", {
          collapsed: isSidebarCollapsed,
        })}
      >
        <div className="iq-sidebar-logo d-flex align-items-center justify-content-between">
          <a href="index.html" className="header-logo">
            <img
              src={
                isDarkMode
                  ? "/imagesDashboard/logo-white.png"
                  : "/imagesDashboard/logo.png"
              }
              className="img-fluid logo"
              alt="logo"
            />
          </a>
          <div className="iq-menu-bt-sidebar" onClick={toggleSidebar}>
            <i className="las la-bars wrapper-menu"></i>
          </div>
        </div>

        <div className="data-scrollbar">
          <nav className="iq-sidebar-menu">
            <ul className="sidebar-menu">
              <ul className="sidebar-menu">
  {roleBasedRoutes.map((route, index) => {
    const isActive = isRouteActive(route.path);
    const hasChildren = route.children && route.children.length > 0;
    const isOpen = openMenu === route.label;

    return (
      <React.Fragment key={index}>
        {hasChildren ? (
          <li className={classNames('menu-item', { open: isOpen })}>
            <a
              style={{cursor:"pointer"}}
              className={classNames('collapsed', { open: isOpen })}
              onClick={() => toggleSubMenu(route.label)}
            >
              <i className={route.icon}></i>
              <span className="menu-text">{route.label}</span>
              <i
                className={classNames(
                  'las la-angle-right iq-arrow-right arrow-toggle',
                  { rotated: isOpen }
                )}
              ></i>
            </a>
            <ul
              id={route.label}
              className={classNames('iq-submenu', { show: isOpen })}
            >
              {route.children.map((child, childIdx) => {
                  const isChildActive = isRouteActive(child.path);
              return (
                
                <li key={childIdx} className={classNames('menu-item', { active: isChildActive })}>
                  <Link to={`/panel/${child.path}`}>
                    <i className={child.icon}></i>
                    <span className="menu-text">{child.label}</span>
                  </Link>
                </li>
              )})}
            </ul>
          </li>
        ) : (
          <li className={classNames('menu-item', { active: isActive })}>
            <Link to={`/panel/${route.path}`}>
              <i className={route.icon}></i>
              <span className="menu-text">{route.label}</span>
            </Link>
          </li>
        )}
      </React.Fragment>
    );
  })}
</ul>


              {/* <li>
                <a
                  href="#auth"
                  className={classNames("collapsed", {
                    open: openMenu === "auth",
                  })}
                  onClick={() => toggleSubMenu("auth")}
                >
                  <i className="las la-torah"></i>
                  <span className="menu-text">Authentication</span>
                  <i
                    className={classNames(
                      "las la-angle-right iq-arrow-right arrow-toggle",
                      {
                        rotated: openMenu === "auth",
                      }
                    )}
                  ></i>
                </a>
                <ul
                  id="auth"
                  className={classNames("iq-submenu", {
                    show: openMenu === "auth",
                  })}
                >
                  <li>
                    <a href="auth-sign-in.html">
                      <i className="las la-sign-in-alt"></i>
                      <span className="menu-text">Login</span>
                    </a>
                  </li>
                  <li>
                    <a href="auth-sign-up.html">
                      <i className="las la-registered"></i>
                      <span className="menu-text">Register</span>
                    </a>
                  </li>
                  <li>
                    <a href="auth-recoverpw.html">
                      <i className="las la-unlock-alt"></i>
                      <span className="menu-text">Recover Password</span>
                    </a>
                  </li>
                  <li>
                    <a href="auth-confirm-mail.html">
                      <i className="las la-envelope-square"></i>
                      <span className="menu-text">Confirm Mail</span>
                    </a>
                  </li>
                  <li>
                    <a href="auth-lock-screen.html">
                      <i className="las la-lock"></i>
                      <span className="menu-text">Lock Screen</span>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
      {/* Navbar */}
      <div
        className={classNames("iq-top-navbar", {
          "sidebar-collapsed": isSidebarCollapsed,
        })}
      >
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
              <i
                className="ri-menu-line wrapper-menu"
                onClick={toggleSidebar}
              ></i>
              <a href="index.html" className="header-logo">
                <img
                  src="/imagesDashboard/logo.png"
                  className="img-fluid rounded-normal light-logo"
                  alt="logo"
                />
                <img
                  src="/imagesDashboard/logo-white.png"
                  className="img-fluid rounded-normal darkmode-logo"
                  alt="logo"
                />
              </a>
            </div>

            <div className="iq-search-bar device-search">
              <div className="searchbox">
                <a className="search-link" href="#">
                  <i className="ri-search-line"></i>
                </a>
                <input
                  type="text"
                  className="text search-input"
                  placeholder="Search here..."
                />
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="change-mode">
                <div className="custom-control custom-switch custom-switch-icon custom-control-inline">
                  <div className="custom-switch-inner">
                    <p className="mb-0"></p>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="dark-mode"
                      data-active="true"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="dark-mode"
                      data-mode="toggle"
                    >
                      <span className="switch-icon-left">
                        <i className="a-left ri-moon-clear-line"></i>
                      </span>
                      <span className="switch-icon-right">
                        <i className="a-right ri-sun-line"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-controls="navbarSupportedContent"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line"></i>
              </button>

              <div
                className={classNames("collapse navbar-collapse", {
                  show: mobileNavOpen,
                })}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto navbar-list align-items-center">
                  {/* Search Dropdown */}
                  <li className="nav-item nav-icon search-content">
                    <a
                      href="#"
                      className="search-toggle rounded"
                      onClick={(e) => toggleDropdown("search", e)}
                    >
                      <i className="ri-search-line"></i>
                    </a>
                    <div
                      className={classNames(
                        "iq-search-bar iq-sub-dropdown dropdown-menu",
                        {
                          show: searchDropdownOpen,
                        }
                      )}
                    >
                      <form action="#" className="searchbox p-2">
                        <div className="form-group mb-0 position-relative">
                          <input
                            type="text"
                            className="text search-input font-size-12"
                            placeholder="type here to search..."
                          />
                          <a href="#" className="search-link">
                            <i className="las la-search"></i>
                          </a>
                        </div>
                      </form>
                    </div>
                  </li>

                  {/* Messages Dropdown */}
                  <li className="nav-item nav-icon dropdown">
                    <a
                      href="#"
                      className="search-toggle dropdown-toggle"
                      onClick={(e) => toggleDropdown("messages", e)}
                    >
                      <i className="ri-mail-line bg-orange p-2 rounded-small"></i>
                      <span className="bg-primary"></span>
                    </a>
                    <div
                      className={classNames("iq-sub-dropdown dropdown-menu", {
                        show: messagesDropdownOpen,
                      })}
                    >
                      <div className="card shadow-none m-0">
                        <div className="card-body p-0">
                          <div className="cust-title p-3">
                            <h5 className="mb-0">All Messages</h5>
                          </div>
                          <div className="p-3">
                            {/* <a href="#" className="iq-sub-card">
                              <div className="media align-items-center">
                                <div className="">
                                  <img
                                    className="avatar-40 rounded-small"
                                    src="/public/imagesDashboard/user/01.jpg"
                                    alt="01"
                                  />
                                </div>
                                <div className="media-body ml-3 rtl-mr-3 rtl-ml-0">
                                  <h6 className="mb-0">
                                    Barry Emma Watson
                                    <small className="badge badge-success float-right rtl-mr-1">
                                      New
                                    </small>
                                  </h6>
                                  <small className="float-left font-size-12">
                                    12:00 PM
                                  </small>
                                </div>
                              </div>
                            </a> */}
                          </div>
                          <a
                            className="right-ic btn btn-primary btn-block position-relative p-2"
                            href="#"
                            role="button"
                          >
                            <div className="dd-icon">
                              <i className="las la-arrow-right mr-0"></i>
                            </div>
                            View All
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* Notifications Dropdown */}
                  <li className="nav-item nav-icon dropdown">
                    <a
                      href="#"
                      className="search-toggle dropdown-toggle"
                      onClick={(e) => toggleDropdown("notifications", e)}
                    >
                      <i className="ri-notification-line bg-info p-2 rounded-small"></i>
                      <span className="bg-primary"></span>
                    </a>
                    <div
                      className={classNames("iq-sub-dropdown dropdown-menu", {
                        show: notificationsDropdownOpen,
                      })}
                    >
                      <div className="card shadow-none m-0">
                        <div className="card-body p-0">
                          <div className="cust-title p-3">
                            <h5 className="mb-0">All Notifications</h5>
                          </div>
                          <div className="p-3">
                            {/* <a href="#" className="iq-sub-card">
                              <div className="media align-items-center">
                                <div className="">
                                  <img
                                    className="avatar-40 rounded-small"
                                    src="/public/imagesDashboard/user/01.jpg"
                                    alt="01"
                                  />
                                </div>
                                <div className="media-body ml-3 rtl-ml-0 rtl-mr-3">
                                  <h6 className="mb-0">
                                    Emma Watson Barry
                                    <small className="badge badge-success float-right rtl-mr-1">
                                      New
                                    </small>
                                  </h6>
                                  <p className="mb-0">95 MB</p>
                                </div>
                              </div>
                            </a> */}
                          </div>
                          <a
                            className="right-ic btn btn-primary btn-block position-relative p-2"
                            href="#"
                            role="button"
                          >
                            <div className="dd-icon">
                              <i className="las la-arrow-right mr-0"></i>
                            </div>
                            View All
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* Fullscreen Toggle */}
                  <li className="nav-item iq-full-screen">
                    <a
                      href="#"
                      className=""
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFullscreen();
                      }}
                    >
                      <i className="ri-fullscreen-line"></i>
                    </a>
                  </li>

                  {/* Profile Dropdown */}
                  <li className="caption-content">
                    <a
                      href="#"
                      className="iq-user-toggle"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("profile");
                      }}
                    >
                      <i className="ri-user-line"></i>
                    </a>
                    <div
                      className={classNames("iq-user-dropdown", {
                        show: profileDropdownOpen,
                      })}
                    >
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center mb-0">
                          <div className="header-title">
                            <h4 className="card-title mb-0">Profile</h4>
                          </div>
                          <div
                            className="close-data text-right badge badge-primary cursor-pointer"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <i className="ri-close-fill"></i>
                          </div>
                        </div>
                        <div className="data-scrollbar" data-scroll="2">
                          <div className="card-body">
                            <div className="profile-header">
                              <div className="cover-container">
                                <div className="media align-items-center mb-4">
                                  {/* <img
                                    src="/public/imagesDashboard/user/1.jpg"
                                    alt="profile-bg"
                                    className="rounded img-fluid avatar-80"
                                  /> */}
                                  <i className="ri-user-line"></i>
                                  <div className="media-body profile-detail ml-3 rtl-mr-3 rtl-ml-0">
                                    <h3>{user.name ?? "User"}</h3>
                                    <div className="d-flex flex-wrap">
                                      <p className="mb-1">
                                        {user.user_type == "0"
                                          ? "Admin"
                                          : user.user_type == "1"
                                          ? "Company"
                                          : "User"}
                                      </p>
                                      <button
                                        className="ml-3 rounded btn-primary rtl-mr-3 rtl-ml-0"
                                        onClick={handleSignOut}
                                      >
                                        Sign Out
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                {user.user_type == 1 && (
                                <div className="col-lg-6 col-md-6 col-6 pr-0">
                                  <div className="profile-details text-center">
                                    <a
                                      href=""
                                      className="iq-sub-card bg-primary-light rounded-small p-2"
                                    >
                                      <div className="rounded iq-card-icon-small">
                                        <i className="ri-file-user-line"></i>
                                      </div>
                                      <h6 className="mb-0">My Profile</h6>
                                    </a>
                                  </div>
                                </div>
                                )}
                                <div className={user.user_type == 0 ? "col-lg-12 col-md-12 col-12" : "col-lg-6 col-md-6 col-6"}>
                                  <div className="profile-details text-center">
                                    <Link
                                      to={user.user_type == 0 ? '/panel/admin-edit-profile' :'edit-profile'}
                                      className="iq-sub-card bg-danger-light rounded-small p-2"
                                    >
                                      <div className="rounded iq-card-icon-small">
                                        <i className="ri-profile-line"></i>
                                      </div>
                                      <h6 className="mb-0">Edit Profile</h6>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="personal-details">
                                <h5 className="card-title mb-3 mt-3">
                                  Personal Details
                                </h5>
                                {/* <div className="row align-items-center mb-2">
                                  <div className="col-sm-6">
                                    <h6>Birthday</h6>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="mb-0">3rd March</p>
                                  </div>
                                </div> */}
                                <div className="row align-items-center mb-2">
                                  <div className="col-sm-6">
                                    <h6>Email</h6>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="mb-0">{user.email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={classNames("main-content", {
          "sidebar-collapsed": isSidebarCollapsed,
        })}
      >
        <Outlet />
      </div>
    </>
  );
};

export default PanelWrapper;
