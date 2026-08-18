import axios from "axios";
import { appConfig } from "../../app/config/appConfig.js";
import { getToken } from "../auth/authStorage.js";

// Real HTTP client, pre-wired for when a live backend exists. While
// appConfig.useMockApi is true, the feature api/*.js files call
// core/api/mockClient.js instead of this — flip the flag and point
// VITE_API_URL at your Spring Boot service to go live without touching
// components, hooks, or pages.
export const axiosClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(apiErrorHandler(error))
);

export function apiErrorHandler(error) {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || error.message || "Something went wrong";
  return { status, message, raw: error };
}
