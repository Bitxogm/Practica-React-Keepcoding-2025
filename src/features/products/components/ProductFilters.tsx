import { useState } from 'react';
import type { ProductFilters } from '../types/filters';

interface Props {
  onFilterChange: (filters: ProductFilters) => void;
  availableTags: string[];
}

export const ProductFilters: React.FC<Props> = ({ onFilterChange, availableTags }) => {
  const [filters, setFilters] = useState<ProductFilters>({
    name: '',
    minPrice: 0,
    maxPrice: 10000,
    tags: [],
    isOnSale: null,
  });

  const handleChange = (field: keyof ProductFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    handleChange('tags', newTags);
  };

return (
  <div style={{ 
    border: '1px solid #ccc', 
    padding: '1rem', 
    borderRadius: '8px',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    color: '#000',  // ⭐ Añadir
  }}>
    <h3 style={{ color: '#000' }}>Filtros</h3>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ color: '#000' }}>Buscar por nombre:</label>
      <input
        type="text"
        value={filters.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Nombre del producto..."
        style={{ width: '100%', padding: '0.5rem', color: '#000' }}
      />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ color: '#000' }}>Rango de precio:</label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) => handleChange('minPrice', Number(e.target.value))}
          placeholder="Min"
          style={{ width: '100px', padding: '0.5rem', color: '#000' }}
        />
        <span style={{ color: '#000' }}>-</span>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          placeholder="Max"
          style={{ width: '100px', padding: '0.5rem', color: '#000' }}
        />
      </div>
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ color: '#000' }}>Tags:</label>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {availableTags.map(tag => (
          <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#000' }}>
            <input
              type="checkbox"
              checked={filters.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ color: '#000' }}>Estado:</label>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <label style={{ color: '#000' }}>
          <input
            type="radio"
            name="isOnSale"
            checked={filters.isOnSale === null}
            onChange={() => handleChange('isOnSale', null)}
          />
          Todos
        </label>
        <label style={{ color: '#000' }}>
          <input
            type="radio"
            name="isOnSale"
            checked={filters.isOnSale === true}
            onChange={() => handleChange('isOnSale', true)}
          />
          Solo ofertas
        </label>
        <label style={{ color: '#000' }}>
          <input
            type="radio"
            name="isOnSale"
            checked={filters.isOnSale === false}
            onChange={() => handleChange('isOnSale', false)}
          />
          Sin ofertas
        </label>
      </div>
    </div>
  </div>
);
};