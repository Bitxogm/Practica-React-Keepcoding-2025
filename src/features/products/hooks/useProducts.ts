import { useEffect, useState } from 'react';
import type { PCComponent } from '../types/product';
import * as productsService from '../services/products.service';
import { getErrorMessage } from '@core/utils/http-errors';

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
         setError(getErrorMessage(err));
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
      setError(getErrorMessage(err));
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await productsService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    deleteProduct,
  };
};