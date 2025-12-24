import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Listado de Componentes PC</h2>
        <Link to="/products/new">
          <button>➕ Nuevo Producto</button>
        </Link>
      </div>
      
      <p>Total: {products.length} productos</p>

      {products.length === 0 ? (
        <div>
          <p>Todavía no has añadido ningún componente de PC.</p>
          <Link to="/products/new">
            <button>Crear primer producto</button>
          </Link>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;