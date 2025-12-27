import type { PCComponent } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL + '/products';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getAllProducts = async (): Promise<PCComponent[]> => {
  const response = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Error al cargar productos');
  }
  return response.json();
};

export const getProductById = async (id: number): Promise<PCComponent> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Producto no encontrado');
  }
  return response.json();
};

export const createProduct = async (
  product: Omit<PCComponent, 'id'>
): Promise<PCComponent> => {
  console.log('📤 Enviando producto:', product);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  
  console.log('📥 Response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Error response:', errorText);
    throw new Error('Error al crear producto');
  }
  
  const data = await response.json();
  console.log('✅ Producto creado:', data);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar producto');
  }
};