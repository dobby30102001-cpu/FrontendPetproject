import axios from "axios";

// Normalize the API base URL so common env-var mistakes still work:
//   - trim whitespace
//   - if the value looks like a Markdown link "[url](url)" (a real bug
//     we hit when a URL was pasted from a rendered chat), extract the
//     first http(s) URL out of it.
//   - if scheme is missing, prepend https://.
//   - drop trailing slash so paths like "/auth/login" don't become "//auth/login".
function normalizeBaseURL(raw) {
  if (!raw) return "";
  let url = String(raw).trim();
  if (/[\[\]()]/.test(url)) {
    const match = url.match(/https?:\/\/[^\s\])]+/i);
    if (match) url = match[0];
  }
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url.replace(/\/+$/, "");
}

const baseURL = normalizeBaseURL(import.meta.env.VITE_API_URL);
if (!baseURL) {
  throw new Error(
    "VITE_API_URL is not set. Copy .env.example to .env and set VITE_API_URL to your backend URL (e.g. http://localhost:8080/api)."
  );
}
// Log once so it's easy to verify what actually got baked into the bundle
// at build time (Vite inlines env vars during `npm run build`).
console.info("[apiClient] baseURL =", baseURL);

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
