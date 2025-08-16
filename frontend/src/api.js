import axios from "axios";

// Log all env variables to confirm they loaded
console.log("ENV:", import.meta.env);

// const baseURL = import.meta.env.VITE_LIVE_API_URL; // fallback
const baseURL = import.meta.env.VITE_API_URL; // fallback

const API = axios.create({
  baseURL,
});

// Debug log
console.log("Base URL being used:", API.defaults.baseURL);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;