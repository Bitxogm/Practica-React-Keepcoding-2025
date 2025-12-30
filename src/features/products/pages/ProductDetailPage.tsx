import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ConfirmDialog } from '@core/components/ConfirmDialog';
import * as productsService from '../services/products.service';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await productsService.deleteProduct(Number(id));
      console.log('Producto eliminado');
      navigate('/products');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el producto');
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
      <Link to="/products">← Volver al listado</Link>

      <h2>{product.name}</h2>

      {product.image && (
        <img src={product.image} alt={product.name} style={{ maxWidth: '400px' }} />
      )}

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
        <p><strong>Estado:</strong> {product.isOnSale ? '🔥 EN OFERTA' : 'Precio normal'}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to={`/products/${id}/edit`}>
          <button style={{ marginRight: '1rem' }}>✏️ Editar</button>
        </Link>
        <button
          onClick={() => setShowConfirm(true)}
          style={{ background: 'red', color: 'white' }}
        >
          🗑️ Eliminar
        </button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar "${product.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default ProductDetailPage;