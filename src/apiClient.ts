import { Api } from "@/backendApi";

/**
 * A singleton instance of the Api class.
 * This ensures that all parts of the application share the same API client,
 * which can be configured with authentication tokens or other settings.
 */
export const apiClient = new Api({ baseURL: "/api" });
