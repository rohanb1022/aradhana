import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_BACKEND_URL,
  withCredentials: true,
});
 // Include credentials (cookies) in requests
