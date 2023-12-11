import axios from "axios";

const baseURL = "https://staging-be-ecom.techserve4u.com";
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const api = {
  login: (loginData) => instance.post("/api/user/signin", loginData),
  register: (userData) => instance.post("/api/user/signup", userData),
  verifyEmail: (otpData) => instance.post("/api/user/verifyotp", otpData),
  getUserInfo: () => instance.post("/api/user/verify"),
  forgotPassword: (email) => instance.post("/api/user/forgotPassword", email),
  updateUser: (values) => instance.patch("/api/user/update", values),
};
