import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { User, LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';
import { AuthContext } from './AuthContextDefinition';

type JwtPayload = {
  userId: number;
  username: string;
  iat: number;
  exp: number;
};

const getInitialToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const getInitialUser = (): User | null => {
  const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
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

  const login = async (credentials: LoginCredentials, rememberMe: boolean = false) => {
    console.log('🔐 Login iniciado, rememberMe:', rememberMe);
    const data = await authService.login(credentials);
    console.log('✅ Datos recibidos:', data);

    // Decodificar el JWT para extraer el user
    const decoded = jwtDecode<JwtPayload>(data.accessToken);
    const user: User = {
      id: decoded.userId,
      username: decoded.username,
    };

    console.log('👤 Usuario decodificado:', user);

    if (rememberMe) {
      console.log('💾 Guardando en localStorage');
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('💾 Guardando en sessionStorage');
      sessionStorage.setItem('token', data.accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    setToken(data.accessToken);
    setUser(user);

    console.log('🎯 Estado actualizado - token:', data.accessToken ? 'SÍ' : 'NO');
    console.log('🎯 Estado actualizado - user:', user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};