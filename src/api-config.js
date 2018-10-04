let backendHost;

const hostname = window && window.location && window.location.hostname;
console.log("HOSTNAME", hostname);
if (hostname === "https://soyum.herokuapp.com") {
  backendHost = "https://soyumapi.herokuapp.com";
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3001";
}

export const API_ROOT = `${backendHost}/api/`;
