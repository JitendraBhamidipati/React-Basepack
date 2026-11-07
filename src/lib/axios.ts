import axios from 'axios';

/**
 * Pre-configured Axios instance.
 * Set VITE_API_BASE_URL (or any env var you expose via rspack DefinePlugin) to
 * point at your real API; falls back to a placeholder during development.
 */
const api = axios.create({
  baseURL: (process.env.API_BASE_URL as string | undefined) ?? 'https://jsonplaceholder.typicode.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Attach auth token if present (replace localStorage key as needed)
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        // Handle unauthenticated — redirect to login or clear token
        localStorage.removeItem('auth_token');
      }
    }
    return Promise.reject(error);
  },
);

export default api;
