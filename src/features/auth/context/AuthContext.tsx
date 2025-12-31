import { createContext, useContext, useState, useEffect } from 'react';
import type { User, LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialToken = (): string | null => {
  return localStorage.getItem('token');
};

const getInitialUser = (): User | null => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser || savedUser === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(getInitialToken);

  const login = async (credentials: LoginCredentials) => {
    const data = await authService.login(credentials);

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};