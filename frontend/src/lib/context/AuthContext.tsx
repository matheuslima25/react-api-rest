import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import type { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const login = async (username: string, password: string) => {
    await api.post("/api/token/", { username, password });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    const validateSession = async () => {
      try {
        await api.get("/api/v1/products/");
        setIsAuthenticated(true);
      } catch (error: any) {
        setIsAuthenticated(false);
        // Redireciona uma única vez, evita múltiplas redireções
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    };
  
    validateSession();
  }, []);

  if (isAuthenticated === null) {
    return <div>Verificando sessão...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
