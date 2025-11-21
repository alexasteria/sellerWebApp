import { useMemo } from "react";
import { Api } from "@/backendApi";
import axios from "axios";

const createApiClient = () => {
  const apiClient = new Api({
    baseURL: import.meta.env.VITE_API_BASE_URL || "//localhost:8080",
  });

  // Add interceptors to the instance created by the Api class
  apiClient.instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const tenantCode = import.meta.env.VITE_TENANT_CODE;
    if (tenantCode) {
      config.headers["Tenant-Code"] = tenantCode;
    }
    return config;
  });

  return apiClient;
};

export const useApiClient = () => {
  return useMemo(() => createApiClient(), []);
};
