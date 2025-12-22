export type User = {
  id: number;
  name: string;
};

export type LoginCredentials = {
  name: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};