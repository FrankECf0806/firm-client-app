"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false); // Default to true for testing

  const setTempAuthToken = () => {
    const token = `test_token_${Date.now()}`;
    document.cookie = `auth_token=${token}; path=/; max-age=86400; samesite=lax`;
  };

  return (
    <AuthContext
      value={{ isAuthenticated, setAuthenticated, setTempAuthToken }}
    >
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
