import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AuthLayout = () => {
  const location = useLocation();
  
  // Check if current route is an auth route
  const isAuthRoute = location.pathname.startsWith('/auth');

  const cssPaths = [
    "/assets/dashboard/css/backend-plugin.min28b5.css",
    "/assets/dashboard/css/backend28b5.css",
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load CSS files and wait for them to load
    const loadCssFiles = cssPaths.map((href) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = resolve; // Resolve when CSS is loaded
        link.onerror = reject; // Reject if there's an error loading the file
        document.head.appendChild(link);
      });
    });

    // Wait for all CSS files to load before updating loading state
    Promise.all(loadCssFiles)
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error("Error loading CSS files:", err);
        setIsLoading(false); // Fallback to false if any file fails
      });

    // Cleanup function to remove the link elements when the component is unmounted
    return () => {
      const linkElements = document.head.querySelectorAll('link[rel="stylesheet"]');
      linkElements.forEach((link) => {
        document.head.removeChild(link);
      });
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`wrapper ${isAuthRoute ? 'auth-wrapper' : ''}`}>
      <div className={isAuthRoute ? 'auth-content' : 'content-wrapper'}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
