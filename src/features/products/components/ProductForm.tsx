import { useState } from 'react';
import type { PCComponent } from '../types/product';

interface Props {
  onSubmit: (product: Omit<PCComponent, 'id'>) => void;
  initialData?: Partial<PCComponent>;
  submitButtonText?: string;
}

export const ProductForm: React.FC<Props> = ({ 
  onSubmit, 
  initialData,
  submitButtonText = 'Crear Producto'
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    tags: initialData?.tags || [] as string[],
    image: initialData?.image || '',
    isOnSale: initialData?.isOnSale || false,
    description: initialData?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? checked 
        : type === 'number' 
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div>
        <label>Tags (selecciona uno o varios):</label>
        <div>
          {['CPU', 'GPU', 'RAM', 'SSD', 'Motherboard', 'PSU', 'Case', 'Cooler'].map((tag) => (
            <label key={tag} style={{ marginRight: '1rem' }}>
              <input
                type="checkbox"
                value={tag}
                checked={formData.tags.includes(tag)}
                onChange={(e) => {
                  const newTags = e.target.checked
                    ? [...formData.tags, tag]
                    : formData.tags.filter((t) => t !== tag);
                  setFormData({ ...formData, tags: newTags });
                }}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="isOnSale"
            checked={formData.isOnSale}
            onChange={handleChange}
          />
          ¿Es una oferta?
        </label>
      </div>

      <button type="submit">{submitButtonText}</button>
    </form>
  );
};