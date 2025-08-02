// import { Notyf } from "notyf";
// import "notyf/notyf.min.css";

class Helpers {
  static localhost = "127.0.0.1:8000";
  static server = "emailapi.macodes.dev";
  static basePath = `//${this.server}`;
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
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
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

// static loadScripts(target_script) {
//   return new Promise((resolve, reject) => {
//     if (document.getElementById(target_script.id)) {
//       // console.log(`Script ${target_script.id} already loaded.`);
//       return resolve();
//     }

//     const script = document.createElement('script');
//     script.src = target_script.src;
//     script.id = target_script.id;
//     script.async = true;

//     script.onload = () => {
//       // console.log(`Loaded: ${target_script.src}`);
//       resolve();
//     };
//     script.onerror = () => {
//       console.error(`Failed to load: ${target_script.src}`);
//       reject(new Error(`Failed to load: ${target_script.src}`));
//     };

//     document.body.appendChild(script);
//   });
// }

// static loadScriptSequential(scriptObj) {
//   return new Promise((resolve, reject) => {
//     const existing = document.getElementById(scriptObj.id);
//     if (existing) {
//       resolve();
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = scriptObj.src;
//     script.id = scriptObj.id;
//     script.async = false; 
//     script.onload = () => {
//       setTimeout(resolve, 20);
//     };
//     script.onerror = () => {
//       reject(new Error(`Failed to load: ${scriptObj.id}`));
//     };
//     document.body.appendChild(script);
//   });
// }

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
