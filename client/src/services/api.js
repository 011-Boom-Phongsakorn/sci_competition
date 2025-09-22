import axios from "axios";
import ToKenService from "./token.service";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ดักจับ request object
// add interceptor to request object
// use = middleware
instance.interceptors.request.use(
  (config) => {
    // recieve after logged in
    const token = ToKenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
