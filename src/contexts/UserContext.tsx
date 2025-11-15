import React, { createContext, useContext, useMemo, useEffect, useState } from "react";
import { WebAppUser } from "telegram-web-app";
import { userService } from "@/services/UserService";

interface UserContextType {
  user: WebAppUser | undefined;
  token: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const tg = (window as any).Telegram?.WebApp;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const user = useMemo(() => tg?.initDataUnsafe?.user, []);

  useEffect(() => {
    const authenticate = async () => {
      if (user) {
        const authToken = await userService.authenticateUser(user);
        setToken(authToken);
      }
    };
    authenticate();
  }, [user]);

  const value = useMemo(() => ({
    user,
    token,
  }), [user, token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
