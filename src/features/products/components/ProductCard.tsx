import type { PCComponent } from '../types/product';

interface Props {
  product: PCComponent;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article style={{ 
      border: '1px solid #ccc', 
      padding: '1rem', 
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      <h3>{product.name}</h3>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
      {product.isOnSale && <span style={{ color: 'red' }}>🔥 OFERTA</span>}
      <p>{product.description}</p>
    </article>
  );
};