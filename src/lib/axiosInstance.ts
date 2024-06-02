// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token =
//       "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN1cGFfaGF2ZW5AZ21haWwuY29tIiwic3ViIjoic3VwYV9oYXZlbkBnbWFpbC5jb20iLCJpYXQiOjE3MTcwMDA5NDksImV4cCI6MTcxNzAzNjk0OX0._rqqNYHzlgOV-5coB1NqCz6OVo5qudZFpeYjxqe61zw";
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
