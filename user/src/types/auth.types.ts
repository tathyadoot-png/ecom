export type UserRole =
  | "CUSTOMER"
  | "VENDOR"
  | "ADMIN"
  | "SUPER_ADMIN";

export interface UserAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;

  avatar: string;

  address: UserAddress;

  storeId: string | null;

  isBlocked: boolean;

  createdAt: string;

  updatedAt: string;
}