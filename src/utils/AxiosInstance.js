import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://backend-kolotemari-1.onrender.com/api/",
  withCredentials: true, // ✅ important for cookies
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken") || localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("➡️ Sending token in header:", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { token } = response.data || {};
    if (token) {
      Cookies.set("authToken", token, {
        expires: 7,
        secure: window.location.protocol === "https:",
        sameSite: window.location.protocol === "https:" ? "None" : "Lax",
      });
      localStorage.setItem("authToken", token);
      console.log("📥 Access token saved in cookie:", token);
    }
    return response;
  },
  (error) => {
    console.error("❌ Axios response error:", error.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
