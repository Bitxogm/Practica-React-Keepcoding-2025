import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No hay token, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};