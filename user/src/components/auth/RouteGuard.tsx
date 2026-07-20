'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { User } from '@/types/auth.types';

interface RouteGuardProps {
  children: React.ReactNode;
  isAllowed: (user: User | null) => boolean;
  redirectTo: string;
  fallback?: React.ReactNode;
}

// Generic access primitive: renders children only once the session
// has resolved (initialized) and isAllowed(user) passes, otherwise
// redirects. AuthGuard/GuestGuard/RoleGuard are thin wrappers over
// this with a specific isAllowed predicate.
export function RouteGuard({
  children,
  isAllowed,
  redirectTo,
  fallback = null,
}: RouteGuardProps) {
  const { user, loading, initialized } = useAuthStore();
  const router = useRouter();

  const resolved = initialized && !loading;
  const allowed = resolved && isAllowed(user);

  useEffect(() => {
    if (resolved && !allowed) {
      router.replace(redirectTo);
    }
  }, [resolved, allowed, redirectTo, router]);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
