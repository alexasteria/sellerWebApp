import { Api, ModelsTgUser, ModelsLoginRequest } from "@/backendApi";
import { WebAppUser } from "telegram-web-app";

const TOKEN_KEY = "authToken";

export class AuthService {
  constructor(private api: Api<unknown>) {}

  async authenticateTelegram(user: WebAppUser): Promise<string> {
    const userData: ModelsTgUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      language_code: user.language_code,
      photo_url: user.photo_url,
      is_bot: user.is_bot,
    };

    try {
      const response = await this.api.auth.tgWebAppCreate(userData);
      const token = response.data?.token;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        return token;
      }
      throw new Error("No token received");
    } catch (error) {
      console.error("Failed to authenticate Telegram user:", error);
      throw error;
    }
  }

  async loginByPassword(login: string, password: string): Promise<string> {
    try {
      const response = await this.api.auth.loginCreate({ login, password } as ModelsLoginRequest);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const token = response.data?.token || (response.data as any)?.token;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        return token;
      }
      throw new Error("No token received");
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
