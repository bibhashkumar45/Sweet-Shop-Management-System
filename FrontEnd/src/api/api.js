// Axios instance used to communicate with the backend API and
// automatically attach JWT token to requests for authenticated access.

import axios from "axios";

const api = axios.create({
  baseURL: "https://sweet-shop-management-system-jlue.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export default api;
