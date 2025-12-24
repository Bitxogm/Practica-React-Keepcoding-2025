import type { LoginCredentials, AuthResponse } from '../types/user';

const API_URL = import.meta.env.VITE_BASE_URL;

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('📤 Enviando login:', credentials);
  
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log('📥 Response status:', response.status);
  console.log('📥 Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Error response:', errorText);
    throw new Error('Login fallido');
  }

  const data = await response.json();
  console.log('✅ Login exitoso:', data);
  return data;
};
export const register = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('📤 Enviando registro:', credentials);
  
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log('📥 Response status:', response.status);
  console.log('📥 Response ok:', response.ok);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Error response:', errorText);
    throw new Error('Registro fallido');
  }

  const data = await response.json();
  console.log('✅ Usuario registrado:', data);
  return data;
};