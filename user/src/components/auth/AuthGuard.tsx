'use client';

import { RouteGuard } from './RouteGuard';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

// Wrap page content that requires a logged-in user, e.g.
// <AuthGuard><ProfileContent /></AuthGuard>
export function AuthGuard({
  children,
  redirectTo = '/login',
  fallback,
}: AuthGuardProps) {
  return (
    <RouteGuard
      isAllowed={(user) => !!user}
      redirectTo={redirectTo}
      fallback={fallback}
    >
      {children}
    </RouteGuard>
  );
}
