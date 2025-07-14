import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://aradhana-1.onrender.com/api",
  withCredentials: true,
});
 // Include credentials (cookies) in requests
