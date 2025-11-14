import React, { createContext, useContext, useMemo } from "react";
import { WebAppUser } from "telegram-web-app";

interface UserContextType {
  user: WebAppUser | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const tg = (window as any).Telegram?.WebApp;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const user = useMemo(() => tg?.initDataUnsafe?.user, []);

  const value = useMemo(() => ({
    user,
  }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
