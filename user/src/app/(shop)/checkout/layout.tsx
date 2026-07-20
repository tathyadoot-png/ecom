import type { Metadata } from 'next';

// Covers /checkout, /checkout/success, and /checkout/failure — all
// three are client components under this one route segment.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
