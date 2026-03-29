import { useMemo } from "react";
import { apiClient } from "@/apiClient";

/**
 * Хук для доступа к API-клиенту из React-компонентов.
 * Использует единый синглтон из apiClient.ts.
 */
export const useApiClient = () => {
  return useMemo(() => apiClient, []);
};
