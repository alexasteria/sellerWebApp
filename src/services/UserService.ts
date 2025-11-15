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
      photoURL: user.photo_url,
      is_bot: user.is_bot,
      tenant: this.getTenantId(user),
    };

    try {
      const response = await apiClient.auth.tgWebAppCreate(userData);
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
    // In a real application, the tenant might be part of the user object from the backend
    // or could be derived from the hostname or another piece of initData.
    // For now, we'll use the value that was previously hardcoded.
    // The `user` parameter is there for future extension.
    if (user) {
      // Future logic could go here, e.g. return user.tenant;
    }
    return "SELL_DEPARTMENT";
  }

  /**
   * Returns the current authentication token.
   */
  public getAuthToken(): string | null {
    return this.authToken;
  }
}

export const userService = UserService.getInstance();
