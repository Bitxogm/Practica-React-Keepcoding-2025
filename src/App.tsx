import { Outlet } from 'react-router-dom';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>🖥️ PC Components Dashboard</h1>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <p>© 2025 PC Components Dashboard</p>
      </footer>
    </div>
  );
};

export default App;