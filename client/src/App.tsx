import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@core/components/Header';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="border-t mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 PC Components Dashboard</p>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default App;