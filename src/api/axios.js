// File: src/api/axios.js
import axios from "axios";

// Mengambil URL dari file .env yang sudah kita buat di awal
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Menambahkan Token secara otomatis ke setiap request (jika sudah login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("wealthwise_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
