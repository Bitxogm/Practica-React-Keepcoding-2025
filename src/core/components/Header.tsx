import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Package } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout: () => void = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity">
            <Package className="h-8 w-8" />
            <span>PC Components</span>
          </Link>

          <nav className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="text-sm font-medium hover:underline">
                  Productos
                </Link>
                <span className="text-sm text-muted-foreground">
                  {user?.username}
                </span>
                <Button onClick={handleLogout} variant="destructive" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};