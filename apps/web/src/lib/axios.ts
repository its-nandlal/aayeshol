import axios from "axios";
import { env } from "process";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: env.NODE_ENV || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// ✅ Response interceptor (clean version)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Session expired. Please sign in again.");

      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;