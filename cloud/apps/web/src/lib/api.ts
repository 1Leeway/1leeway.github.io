import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
  withCredentials: true
});

let csrfToken: string | null = null;

export const ensureCsrfToken = async () => {
  if (csrfToken) return csrfToken;
  const response = await api.get<{ csrfToken: string | null }>("/auth/csrf-token");
  csrfToken = response.data.csrfToken;
  return csrfToken;
};

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  if (method && ["post", "put", "patch", "delete"].includes(method)) {
    const token = await ensureCsrfToken();
    if (token) {
      config.headers["x-csrf-token"] = token;
    }
  }
  return config;
});
