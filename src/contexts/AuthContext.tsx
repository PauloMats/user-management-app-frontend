import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types/user'; // Supondo que você tenha tipos definidos
import api from '../services/api'; // Para buscar perfil ao carregar

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUserContext: (updatedUserData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Para verificar o token inicial

  const verifyTokenAndLoadUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Você pode querer validar o token com um endpoint /auth/verify ou /users/profile
        // Aqui, vamos assumir que se o token existe, tentamos carregar o usuário
        // Se você armazenou o usuário no localStorage, pode carregá-lo diretamente
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
        } else {
            // Se não tem usuário no localStorage mas tem token, buscar perfil
            // Esta é uma abordagem mais segura do que confiar cegamente no localStorage para dados do usuário
            const response = await api.get('/users/profile'); // Ajuste o endpoint conforme sua API
            if (response.data) {
                const userFromApi: User = response.data as User;
                setUser(userFromApi);
                setIsAuthenticated(true);
                localStorage.setItem('authUser', JSON.stringify(userFromApi));
            } else {
                throw new Error("Falha ao buscar perfil do usuário");
            }
        }
      } catch (error) {
        console.error('Falha ao verificar token ou carregar usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    verifyTokenAndLoadUser();
  }, [verifyTokenAndLoadUser]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    // O interceptor do Axios já está configurado para usar o token do localStorage
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
    setIsAuthenticated(false);
    // O token será removido das futuras requisições pelo interceptor
    // Redirecionar para login é geralmente feito no componente que chama logout
  };

  const updateUserContext = (updatedUserData: Partial<User>) => {
    setUser((prevUser: User | null): User | null => {
        if (prevUser) {
            const newUser: User = { ...prevUser, ...updatedUserData };
            localStorage.setItem('authUser', JSON.stringify(newUser));
            return newUser;
        }
        return null;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};