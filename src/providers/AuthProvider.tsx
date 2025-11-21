import React, { createContext, useContext, useState, useEffect } from "react";
import { useApiClient } from "@/hooks/useApiClient";
import { ModelsLoginRequest, ModelsCreateTgBotUserRequest } from "@/backendApi";

interface AuthContextType {
  token: string | null;
  user: any; // You might want to define a more specific user type
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (credentials: ModelsLoginRequest | ModelsCreateTgBotUserRequest) => Promise<void>; // Adjust credentials type as needed
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const apiClient = useApiClient();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      // In a real app, you would validate the token and fetch user data
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: ModelsLoginRequest | ModelsCreateTgBotUserRequest) => {
    setIsLoading(true);
    try {
      let result;
      if ("login" in credentials && "password" in credentials) {
        result = await apiClient.auth.loginCreate(credentials as ModelsLoginRequest);
      } else if ("id" in credentials) {
        result = await apiClient.auth.tgWebAppCreate(credentials as ModelsCreateTgBotUserRequest);
      } else {
        throw new Error("Invalid login credentials provided.");
      }

      const receivedToken = result.data?.token;
      if (receivedToken) {
        localStorage.setItem("authToken", receivedToken);
        setToken(receivedToken);
        setIsLoggedIn(true);
        // In a real app, decode token or fetch user details
        setUser({ /* user details from token or separate API call */ });
      } else {
        throw new Error("No token received.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      logout();
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const authContextValue = {
    token,
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};