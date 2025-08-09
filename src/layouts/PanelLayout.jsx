import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Helpers from "../config/Helpers";
import { PanelWrapper } from "../components/Panel";
import Loader from "../components/Loader";

const PanelLayout = () => {
  const location = useLocation();
  
  // Check if current route is an auth route
  const isAuthRoute = location.pathname.startsWith('/auth');
  
  const cssPaths = [
    "/assets/dashboard/css/backend-plugin.min28b5.css",
    "/assets/dashboard/css/backend28b5.css",
    "https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.min.css",
  ];

  const jsPaths = [
    { src: "/assets/dashboard/js/jquery-3.7.1.min.js", id: "jquery" },
    { src: "/assets/dashboard/js/customizer.js", id: "customizer" },
    // {
    //   src: "/src/assets/dashboard/js/backend-bundle.min.js",
    //   id: "backend-bundle",
    // },
    { src: "/assets/dashboard/js/app.js", id: "app" },
  ];


  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    // Load CSS files
    const linkElements = cssPaths.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    const loadScriptsInOrder = async () => {
      try {
        for (const script of jsPaths) {
          await Helpers.loadScriptSequential(script);

          // Wait for jQuery global if loading jQuery
          if (script.id === "jquery") {
            while (!window.jQuery) {
              await new Promise((r) => setTimeout(r, 10));
            }
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Script loading failed:', err);
        setIsLoading(false);
      }
    };

    loadScriptsInOrder();


    return () => {
      linkElements.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className={`wrapper ${isAuthRoute ? 'auth-wrapper' : ''}`}>
      {/* Conditionally render sidebar and navbar */}
      {!isAuthRoute && (
        <>
          <PanelWrapper />
        </>
      )}
    </div>
  );
};

export default PanelLayout;