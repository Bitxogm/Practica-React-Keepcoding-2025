import { Navigate } from 'react-router-dom';
import { useAuth } from '@features/auth/hooks/useAuth';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log('No autenticado, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};