import { useEffect, useState } from 'react';
import type { PCComponent } from '../types/product';
import * as productsService from '../services/products.service';
import { getErrorMessage } from '@core/utils/http-errors';

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
        setError(getErrorMessage(err));
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