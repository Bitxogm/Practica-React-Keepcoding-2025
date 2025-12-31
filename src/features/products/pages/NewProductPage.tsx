import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductForm } from '../components/ProductForm';
import type { PCComponent } from '../types/product';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getErrorMessage } from '@core/utils/http-errors';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct } = useProducts();

  const handleSubmit = async (product: Omit<PCComponent, 'id'>) => {
    try {
      await createProduct(product);
      toast.success('Producto creado correctamente');
      navigate('/products');
    } catch (error) {
       toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Componente</CardTitle>
          <CardDescription>
            Añade un nuevo componente a tu inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewProductPage;