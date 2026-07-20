// types/auth.types.ts
export interface Address {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'VENDOR' | 'SUPER_ADMIN';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  isBlocked: boolean;
  storeId?: string | null;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}