import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/context/AuthContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          🖥️ PC Components
        </Link>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>
              Productos
            </Link>
            <span style={{ color: '#aaa' }}>Usuario: {user?.username}</span>
            <button 
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};