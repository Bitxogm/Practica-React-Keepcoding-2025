import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(Number(id));

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
        <button style={{ marginRight: '1rem' }}>✏️ Editar</button>
        <button style={{ background: 'red', color: 'white' }}>🗑️ Eliminar</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;