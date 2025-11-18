import { ModelsTgBotUser } from "@/backendApi";
import { WebAppUser } from "telegram-web-app";
import { apiClient } from "@/apiClient";


/**
 * Service class for handling user-related operations, such as authentication.
 * This class follows the Singleton pattern.
 */
class UserService {
  private static instance: UserService;
  private authToken: string | null = null;

  private constructor() {}

  /**
   * Returns the singleton instance of the UserService.
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Authenticates the user with the backend using their Telegram data.
   * @param user - The user object from the Telegram Web App.
   * @returns A promise that resolves to the authentication token or response string.
   */
  public async authenticateUser(user: WebAppUser): Promise<string | null> {
    // The backend expects a ModelsTgBotUser object. We map the WebAppUser to it.
    const userData: ModelsTgBotUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      language_code: user.language_code,
      photo_url: user.photo_url, // Changed from photoURL to photo_url
      is_bot: user.is_bot,
      // New fields from the refactored tg_user table, can be undefined initially
      contact_info: undefined,
      delivery_address: undefined,
      email: undefined,
      role: undefined,
    };

    try {
      const response = await apiClient.auth.tgWebAppCreate(
        userData,
        {
          headers: {
            "Tenant-Code": import.meta.env.VITE_TENANT_CODE,
          },
        }
      );
      this.authToken = response.data.token;

      // Configure the shared API client to use the token for all subsequent requests.
      apiClient.instance.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;

      console.log("User authenticated successfully.");
      return this.authToken;
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      return null;
    }
  }

  /**
   * Retrieves the tenant ID from the user's data.
   * This is a placeholder implementation. In a real app, this might come from the auth response or user object.
   * @param user - The user object from the Telegram Web App.
   * @returns The tenant ID string.
   */
  public getTenantId(user?: WebAppUser): string {
    return import.meta.env.VITE_TENANT_CODE;
  }

  /**
   * Returns the current authentication token.
   */
  public getAuthToken(): string | null {
    return this.authToken;
  }
}

export const userService = UserService.getInstance();
