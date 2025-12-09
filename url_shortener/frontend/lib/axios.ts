import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
