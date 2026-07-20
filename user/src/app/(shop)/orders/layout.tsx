import type { Metadata } from 'next';

// Covers /orders and /orders/[id] — both client components.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
