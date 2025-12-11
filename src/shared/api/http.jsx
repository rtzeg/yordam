import axios from "axios";

export const api = axios.create({
  baseURL: "/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    throw error;
  }
);

export default api;
