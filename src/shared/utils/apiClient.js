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

// Interceptor: inject JWT token and farmId query param for GET requests.
// The Herd Service Animals endpoint accepts farmId as a query parameter.
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const state = parsed.state;

        // 1. Inject JWT Token
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }

        // 2. Inject farmId as query param for GET requests.
        //    The Animals endpoint needs farmId as a query param.
        //    Catalog endpoints (breeds, categories, etc.) ignore unknown params.
        const selectedFarm = state?.selectedFarm;
        if (selectedFarm?.id && config.method === "get") {
          config.params = {
            ...config.params,
            farmId: selectedFarm.id,
          };
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

// Interceptor: handle authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear session if there is genuinely no token.
      // Resource-level 401s (farm context issues) must NOT log the user out.
      try {
        const parsed = JSON.parse(localStorage.getItem("auth-storage") || "{}");
        if (!parsed?.state?.token) {
          localStorage.removeItem("auth-storage");
          window.dispatchEvent(new Event("auth-change"));
        }
      } catch {
        localStorage.removeItem("auth-storage");
        window.dispatchEvent(new Event("auth-change"));
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
