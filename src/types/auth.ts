export type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
  setTempAuthToken: () => void;
};

export type SigninValues = {
  email: string;
  password: string;
};

export type SignupValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export type ForgotPasswordValues = {
  email: string;
};
