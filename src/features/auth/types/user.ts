export type User = {
  id: number;
  name: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};