'use client';

import { RouteGuard } from './RouteGuard';
import { UserRole } from '@/types/auth.types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

// Wrap page content restricted to specific roles, e.g. a future
// vendor dashboard: <RoleGuard allowedRoles={['VENDOR']}>...</RoleGuard>
export function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/',
  fallback,
}: RoleGuardProps) {
  return (
    <RouteGuard
      isAllowed={(user) => !!user && allowedRoles.includes(user.role)}
      redirectTo={redirectTo}
      fallback={fallback}
    >
      {children}
    </RouteGuard>
  );
}
