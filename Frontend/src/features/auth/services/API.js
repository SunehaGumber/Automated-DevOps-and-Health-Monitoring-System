import axios from "axios";
import { toast } from "react-toastify";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message || "Internal Server Error";

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.get("/api/auth/refresh-token");

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        if (localStorage.getItem("isLoggedIn")) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("isLoggedIn");
          window.location.href = "/login";
        }
        const message = error.response?.data?.message || "Something went wrong";
        if (error.response?.status !== 401) {
          toast.error(message);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
