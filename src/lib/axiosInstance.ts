import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gaming-haven-backend.up.railway.app",
});

export default axiosInstance;
