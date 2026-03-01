import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_GATEWAY_URL ||
  "https://api.biotech.159.54.176.254.nip.io/api";

// API client configured for the Gateway
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token and Farm ID in each request
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const state = parsed.state;

        // 1. Inyectar Token
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }

        // 2. Inyectar Farm ID (Contexto de granja)
        const selectedFarm = state?.selectedFarm;
        if (selectedFarm && selectedFarm.id) {
          // Como header
          config.headers["X-Farm-Id"] = selectedFarm.id;

          // Como param para peticiones GET (muchos endpoints lo piden así)
          if (config.method === "get") {
            config.params = {
              ...config.params,
              farmId: selectedFarm.id,
            };
          }
        }
      } catch (error) {
        console.error("Error parsing auth storage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.dispatchEvent(new Event("auth-change"));
    }
    return Promise.reject(error);
  },
);

export default apiClient;
