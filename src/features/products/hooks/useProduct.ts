import { useEffect, useState } from 'react';
import type { PCComponent } from '../types/product';
import * as productsService from '../services/products.service';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<PCComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};