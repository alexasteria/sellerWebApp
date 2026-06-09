import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { WebAppUser } from "telegram-web-app";
import { useServices } from "@/hooks/useServices";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tg = (window as any).Telegram?.WebApp;

interface AuthContextType {
  token: string | null;
  user: WebAppUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  authenticateTelegram: (user: WebAppUser, initData: string) => Promise<void>;
  loginByPassword: (login: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { auth: authService } = useServices();
  const [token, setToken] = useState<string | null>(authService.getToken());
  const [user, setUser] = useState<WebAppUser | null>(tg?.initDataUnsafe?.user || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = !!token;

  const authenticateTelegram = useCallback(async (telegramUser: WebAppUser, initData: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newToken = await authService.authenticateTelegram(initData);
      setToken(newToken);
      setUser(telegramUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const loginByPassword = useCallback(async (login: string, pass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newToken = await authService.loginByPassword(login, pass);
      setToken(newToken);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, [authService]);

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, isLoading, error, authenticateTelegram, loginByPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
