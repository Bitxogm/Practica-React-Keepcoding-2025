import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { filterProducts } from '../utils/filterProducts';
import type { ProductFilters as Filters } from '../types/filters';
import { Button } from '@/components/ui/button';

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
    return <div className="text-center py-12">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-destructive">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Componentes PC</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tu inventario de componentes
          </p>
        </div>
        <Link to="/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <ProductFilters 
        onFilterChange={setFilters} 
        availableTags={AVAILABLE_TAGS}
      />
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron productos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;