import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    if (email === "teste@teste.com" && password === "123456") {
      setIsAuthenticated(true);
      setError(null);
      Cookies.set("auth", "true");
    } else {
      setError("Email ou senha inválidos");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setError(null);
    Cookies.remove("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
