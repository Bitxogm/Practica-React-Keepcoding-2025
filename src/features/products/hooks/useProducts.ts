import { useEffect, useState } from 'react';
import type { PCComponent } from '../types/product';
import * as productsService from '../services/products.service';

export const useProducts = () => {
  const [products, setProducts] = useState<PCComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const createProduct = async (product: Omit<PCComponent, 'id'>) => {
    try {
      const newProduct = await productsService.createProduct(product);
      setProducts([...products, newProduct]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
  };
};