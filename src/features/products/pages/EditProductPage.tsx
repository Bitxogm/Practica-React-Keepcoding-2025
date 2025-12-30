import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductForm } from '../components/ProductForm';
import * as productsService from '../services/products.service';
import type { PCComponent } from '../types/product';

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));

  const handleSubmit = async (updatedProduct: Omit<PCComponent, 'id'>) => {
    try {
      console.log('Intentando actualizar producto:', updatedProduct);
      await productsService.updateProduct(Number(id), updatedProduct);
      console.log('Producto actualizado correctamente');
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <Link to={`/products/${id}`}>← Volver al detalle</Link>
      
      <h2>Editar: {product.name}</h2>
      
      <ProductForm 
        onSubmit={handleSubmit}
        initialData={product}
        submitButtonText="Guardar Cambios"
      />
    </div>
  );
};

export default EditProductPage;