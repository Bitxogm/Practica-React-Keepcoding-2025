import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import type { LoginCredentials } from '../types/user';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      console.log('Intentando login con:', credentials);
      await login(credentials);
      console.log('Login exitoso');
      navigate('/products');
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error: Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <LoginForm onSubmit={handleLogin} />
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        Hint: Primero debes registrarte si no tienes usuario
      </p>
            <p style={{ marginTop: '1rem' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default LoginPage;