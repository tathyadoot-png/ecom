export interface Address {
  fullName?: string;

  phone?: string;

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  postalCode?: string;
}

export interface User {
  _id: string;

  name: string;

  email: string;

  role: string;

  avatar?: string;

  address?: Address;
}