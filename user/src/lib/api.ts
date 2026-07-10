import axios from "axios";
import { CONFIG } from "@/constants/config";

export const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
    }

    if (error.response?.status === 403) {
      console.warn("Forbidden");
    }

    return Promise.reject(error);
  }
);