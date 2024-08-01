import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gaming-haven-backend.up.railway.app",
});

export const rawgInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
});

export const googleApiInstance = axios.create({
  baseURL:"https://www.googleapis.com/youtube/v3"
})

export default axiosInstance;
