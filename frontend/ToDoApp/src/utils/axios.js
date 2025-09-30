import axios from "axios";
import { getAccessToken, setAccessToken, logout } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.get("/auth/refresh");
        setAccessToken(res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch {
        logout();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
