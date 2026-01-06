export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "attorney" | "paralegal" | "admin";
  firmId?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// src/types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
