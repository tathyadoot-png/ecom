import type { Metadata } from 'next';

// page.tsx here is a client component (cookie-authenticated data),
// which can't export `metadata` itself — this sibling layout is the
// mechanism for that without restructuring the page.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
