import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  static localhost = "127.0.0.1:8000";
  static server = "emailzusapi.macodes.dev";
  static basePath = `//${this.localhost}`;
  static apiUrl = `${this.basePath}/api/`;
  static googleUrl = `${this.basePath}/`;
  static ASSETS_IMAGES_PATH = "/assets/img";
  static DASHBOARD_IMAGES_PATH = "/dashboard/images";

  static authUser = JSON.parse(localStorage.getItem("user")) ?? {};
  static serverFile = (name) => {
    return `${this.basePath}/${name}`;
  };

  static refresh() {
    this.authUser = JSON.parse(localStorage.getItem("user")) ?? {};
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

  static getItem = (data, isJson = false) => {
    try {
      if (isJson) {
        const item = localStorage.getItem(data);
        return item ? JSON.parse(item) : null;
      } else {
        return localStorage.getItem(data);
      }
    } catch (error) {
      console.error(`Error getting item ${data}:`, error);
      return null;
    }
  };

  static scrollToTop(smooth = true) {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }

  static removeItem = (name) => {
    localStorage.removeItem(name);
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
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
    hrefs.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  

static loadScriptSequential = ({ src, id }) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve(); // already loaded
      return;
    }
    const script = document.createElement('script');
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
