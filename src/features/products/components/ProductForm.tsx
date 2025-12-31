import { useState } from 'react';
import type { PCComponent } from '../types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onSubmit: (product: Omit<PCComponent, 'id'>) => void;
  initialData?: Partial<PCComponent>;
  submitButtonText?: string;
}

const AVAILABLE_TAGS = ["CPU", "GPU", "RAM", "SSD", "Motherboard", "PSU", "Case", "Cooler"];

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

  const handleTagToggle = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ej: AMD Ryzen 7 5800X"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Precio ($) *</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="Ej: 299.99"
        />
      </div>

      <div className="space-y-3">
        <Label>Categorías *</Label>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_TAGS.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={formData.tags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm font-normal cursor-pointer">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe las características del producto..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isOnSale"
          checked={formData.isOnSale}
          onCheckedChange={(checked) => 
            setFormData({ ...formData, isOnSale: checked as boolean })
          }
        />
        <Label htmlFor="isOnSale" className="text-sm font-normal cursor-pointer">
          Este producto está en oferta
        </Label>
      </div>

      <Button type="submit" className="w-full">
        {submitButtonText}
      </Button>
    </form>
  );
};