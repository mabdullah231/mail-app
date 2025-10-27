import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  static localhost = "localhost:8000";
  static server = "emailzusapi.macodes.dev";
  static basePath = `http://${this.localhost}`;
  static apiUrl = `${this.basePath}/api/`;
  static googleUrl = `${this.basePath}/`;
  static ASSETS_IMAGES_PATH = "/assets/img";
  static DASHBOARD_IMAGES_PATH = "/dashboard/images";

  static authUser = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : {};
    } catch (error) {
      console.warn("Invalid JSON in localStorage for 'user':", error);
      localStorage.removeItem("user");
      return {};
    }
  })();

  static serverFile = (name) => {
    return `${this.basePath}/${name}`;
  };

  static refresh() {
    this.authUser = this.getItem("user", true) ?? {};
  }

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static getAuthHeaders() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

  static getAuthFileHeaders() {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  }

 // In Helpers.js - IMPROVED getItem method
static getItem = (key, isJson = false) => {
  try {
    const item = localStorage.getItem(key);
    
    if (!item || item === 'null' || item === 'undefined') {
      return null;
    }

    // Auto-detect JSON or explicitly parse as JSON
    if (isJson || (item.startsWith('{') && item.endsWith('}')) || (item.startsWith('[') && item.endsWith(']'))) {
      return JSON.parse(item);
    }
    
    return item;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    // Clean up corrupted data
    localStorage.removeItem(key);
    return null;
  }
};
  static scrollToTop(smooth = true) {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }

  static removeItem = (name) => {
    localStorage.removeItem(name);
  };

// In Helpers.js - SIMPLIFIED setItem method
static setItem = (key, data) => {
  try {
    if (data === null || data === undefined) {
      localStorage.removeItem(key);
      return;
    }
    
    // Always stringify if it's an object or array
    const value = typeof data === 'object' ? JSON.stringify(data) : data;
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
};

  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 2000,
    });
  };

  static loadCSS(hrefs) {
    hrefs.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  static loadScriptSequential = ({ src, id }) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
}

export default Helpers;