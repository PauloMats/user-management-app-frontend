export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string; // Ou Date, dependendo de como você trata
  updatedAt?: string; // Ou Date
  lastLoginAt?: string | null; // Ou Date
}
