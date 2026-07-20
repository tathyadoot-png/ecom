'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';

// Restores the session (via the backend's httpOnly cookie) once on
// app startup. The ref guard, plus the in-flight dedupe inside
// fetchUser itself, keep this to a single request even under
// React's dev-mode double-effect-invoke.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const resetCart = useCartStore((state) => state.reset);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const resetWishlist = useWishlistStore((state) => state.reset);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    fetchUser();
  }, [fetchUser]);

  // Cart/wishlist are both login-gated on the backend, so only fetch
  // them once we know who the user is — keeps the header badges
  // synced app-wide. On logout, reset them locally (no API call) —
  // otherwise the header keeps showing the previous session's stale
  // counts, since neither store is touched by router.refresh().
  useEffect(() => {
    if (user) {
      fetchCart();
      fetchWishlist();
    } else {
      resetCart();
      resetWishlist();
    }
  }, [user, fetchCart, fetchWishlist, resetCart, resetWishlist]);

  return <>{children}</>;
}
