import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { filterProducts } from '../utils/filterProducts';
import type { ProductFilters as Filters } from '../types/filters';

const AVAILABLE_TAGS = ["CPU", "GPU", "RAM", "SSD", "Motherboard", "PSU", "Case", "Cooler"];

export const ProductsPage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState<Filters>({
    name: '',
    minPrice: 0,
    maxPrice: 10000,
    tags: [],
    isOnSale: null,
  });

  const filteredProducts = filterProducts(products, filters);

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

      <ProductFilters 
        onFilterChange={setFilters} 
        availableTags={AVAILABLE_TAGS}
      />
      
      <p>
        Mostrando {filteredProducts.length} de {products.length} productos
      </p>

      {filteredProducts.length === 0 ? (
        <div>
          <p>No se encontraron productos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;