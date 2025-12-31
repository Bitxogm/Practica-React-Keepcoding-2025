import { Outlet } from 'react-router-dom';
import { Header } from '@core/components/Header';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      
      <footer style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
        <p>© 2025 PC Components Dashboard</p>
      </footer>
    </div>
  );
};

export default App;