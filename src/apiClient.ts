import { Api } from "@/backendApi";

/**
 * Единый синглтон API-клиента для всего приложения.
 * Настроен с baseURL, auth-токеном и Tenant-Code.
 */
export const apiClient = new Api({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

// Request interceptor — добавляет Authorization и Tenant-Code к каждому запросу
apiClient.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const demoTenantCode = localStorage.getItem("demoTenantCode");
  const tenantCode = demoTenantCode || import.meta.env.VITE_TENANT_CODE;
  if (tenantCode) {
    config.headers["Tenant-Code"] = tenantCode;
  }

  return config;
});
