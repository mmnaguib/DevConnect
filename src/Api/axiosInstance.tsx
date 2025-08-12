import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
