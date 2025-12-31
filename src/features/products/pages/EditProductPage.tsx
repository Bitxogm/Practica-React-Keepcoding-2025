import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductForm } from '../components/ProductForm';
import * as productsService from '../services/products.service';
import type { PCComponent } from '../types/product';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));

  const handleSubmit = async (updatedProduct: Omit<PCComponent, 'id'>) => {
    try {
      await productsService.updateProduct(Number(id), updatedProduct);
      toast.success('Producto actualizado correctamente');
      navigate(`/products/${id}`);
    } catch {
      toast.error('Error al actualizar el producto');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-destructive">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to={`/products/${id}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al detalle
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Editar Producto</CardTitle>
          <CardDescription>
            Modifica los datos de: {product.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm 
            onSubmit={handleSubmit}
            initialData={product}
            submitButtonText="Guardar Cambios"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductPage;