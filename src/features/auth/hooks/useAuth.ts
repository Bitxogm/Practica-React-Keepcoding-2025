import { useState } from 'react';
import type { User, LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';

// Función helper para cargar datos iniciales
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

export const useAuth = () => {
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

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
};