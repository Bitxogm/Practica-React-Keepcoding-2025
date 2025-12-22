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

  if (products.length === 0) {
    return (
      <div>
        <h2>No hay productos</h2>
        <p>Todavía no has añadido ningún componente de PC.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Listado de Componentes PC</h2>
      <p>Total: {products.length} productos</p>
      
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;