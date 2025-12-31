import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import type { LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (credentials: LoginCredentials) => {
    try {
      await authService.register(credentials);
      toast.success('Usuario registrado correctamente');
      navigate('/login');
    } catch {
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para empezar a gestionar tu inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleRegister} />
          
          <p className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium underline underline-offset-4 hover:text-primary">
              Inicia sesión aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;