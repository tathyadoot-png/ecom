// Plain validation helpers — no form library. Rules mirror the
// backend's Zod schemas (auth.validation.ts, order.validation.ts) so
// client and server agree on what "valid" means.

import { ShippingAddress } from '@/types/order.types';

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export function validateRegisterForm(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ChangePasswordFormErrors = Partial<Record<keyof ChangePasswordFormValues, string>>;

// Mirrors the backend's changePasswordSchema (auth.validation.ts) min
// length, plus a client-only "passwords match" check that has no
// backend equivalent since the backend never sees confirmPassword.
export function validateChangePasswordForm(
  values: ChangePasswordFormValues
): ChangePasswordFormErrors {
  const errors: ChangePasswordFormErrors = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  } else if (values.currentPassword.length < 6) {
    errors.currentPassword = 'Current password must be at least 6 characters';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'New password must be at least 6 characters';
  }

  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export type ShippingAddressErrors = Partial<Record<keyof ShippingAddress, string>>;

export function validateShippingAddress(values: ShippingAddress): ShippingAddressErrors {
  const errors: ShippingAddressErrors = {};

  if (values.fullName.trim().length < 2) errors.fullName = 'Enter the recipient’s full name';
  if (values.phone.trim().length < 10) errors.phone = 'Enter a valid 10-digit phone number';
  if (values.address.trim().length < 5) errors.address = 'Enter a complete address';
  if (values.city.trim().length < 2) errors.city = 'Enter a city';
  if (values.state.trim().length < 2) errors.state = 'Enter a state';
  if (values.country.trim().length < 2) errors.country = 'Enter a country';
  if (values.postalCode.trim().length < 4) errors.postalCode = 'Enter a valid postal code';

  return errors;
}
