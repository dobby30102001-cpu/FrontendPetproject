import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) {
  throw new Error(
    "VITE_API_URL is not set. Copy .env.example to .env and set VITE_API_URL to your backend URL (e.g. http://localhost:8080/api)."
  );
}

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
