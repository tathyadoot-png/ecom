'use client';

import { RouteGuard } from './RouteGuard';

interface GuestGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

// Wrap page content that should only be reachable when logged out,
// e.g. <GuestGuard><LoginForm /></GuestGuard> — sends an already
// logged-in user elsewhere instead of showing them the login page.
export function GuestGuard({
  children,
  redirectTo = '/',
  fallback,
}: GuestGuardProps) {
  return (
    <RouteGuard
      isAllowed={(user) => !user}
      redirectTo={redirectTo}
      fallback={fallback}
    >
      {children}
    </RouteGuard>
  );
}
