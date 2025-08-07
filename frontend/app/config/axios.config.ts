import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // ✅ Critical to send cookies
});

export default api;
