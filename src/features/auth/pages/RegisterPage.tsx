import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import type { LoginCredentials } from '../types/user';
import * as authService from '../services/auth.service';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (credentials: LoginCredentials) => {
    try {
      console.log('Intentando registro con:', credentials);
      await authService.register(credentials);
      console.log('Registro exitoso');
      alert('Usuario registrado. Ahora puedes hacer login');
      navigate('/login');
    } catch (error) {
      console.error('Error en registro:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <LoginForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;