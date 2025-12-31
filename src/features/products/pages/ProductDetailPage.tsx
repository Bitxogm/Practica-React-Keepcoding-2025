import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ConfirmDialog } from '@core/components/ConfirmDialog';
import * as productsService from '../services/products.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Pencil, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getErrorMessage } from '@core/utils/http-errors';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(Number(id));
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await productsService.deleteProduct(Number(id));
      toast.success('Producto eliminado correctamente');
      navigate('/products');
    } catch (error) {
       toast.error(getErrorMessage(error));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando producto...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-destructive">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Producto no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <Link to="/products">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl">{product.name}</CardTitle>
              <CardDescription className="text-base mt-2">
                {product.description}
              </CardDescription>
            </div>
            {product.isOnSale && (
              <Badge variant="destructive" className="text-base px-3 py-1">
                Oferta
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {product.image && (
            <div className="rounded-lg overflow-hidden border">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-md mx-auto"
              />
            </div>
          )}

          <div className="grid gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Precio</p>
              <p className="text-3xl font-bold">${product.price}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Categorías</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <p className="text-base">
                {product.isOnSale ? '🔥 En oferta' : 'Precio normal'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Link to={`/products/${id}/edit`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
            <Button 
              onClick={() => setShowConfirm(true)}
              variant="destructive"
              className="flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>

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