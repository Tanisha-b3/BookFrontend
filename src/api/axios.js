import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: `${baseURL}/bookings`,
  headers: { "Content-Type": "application/json" }
});

export default instance;
