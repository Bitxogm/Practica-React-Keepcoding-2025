import type { PCComponent } from '../types/product';

const API_URL = import.meta.env.VITE_API_URL + '/products';

export const getAllProducts = async (): Promise<PCComponent[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al cargar productos');
  }
  return response.json();
};

export const getProductById = async (id: number): Promise<PCComponent> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Producto no encontrado');
  }
  return response.json();
};

export const createProduct = async (
  product: Omit<PCComponent, 'id'>
): Promise<PCComponent> => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error al crear producto');
  }
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar producto');
  }
};