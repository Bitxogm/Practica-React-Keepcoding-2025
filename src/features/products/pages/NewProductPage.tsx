import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductForm } from '../components/ProductForm';
import type { PCComponent } from '../types/product';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct } = useProducts();

  const handleSubmit = async (product: Omit<PCComponent, 'id'>) => {
    try {
      console.log('Intentando crear producto:', product);
      await createProduct(product);
      console.log('Producto creado correctamente');
      navigate('/products');
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Componente PC</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewProductPage;