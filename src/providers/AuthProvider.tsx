"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthContextType } from "@/types/auth";
import Loading from "@/components/loading/Loading";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .some((c) => c.startsWith("auth_token="));

    // async boundary avoids cascading-render rule
    Promise.resolve().then(() => {
      setAuthenticated(hasToken);
    });
  }, [setAuthenticated]);

  const setTempAuthToken = () => {
    const token = `test_token_${Date.now()}`;
    document.cookie = `auth_token=${token}; path=/; max-age=86400; samesite=lax`;
    setAuthenticated(true);
  };

  const logout = () => {
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return <Loading size="lg" color="gradient" label="Loading App" centered />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, setTempAuthToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
