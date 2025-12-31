import { useState } from 'react';
import type { LoginCredentials } from '../types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onSubmit: (credentials: LoginCredentials) => void;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Ingresa tu contraseña"
        />
      </div>

      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  );
};