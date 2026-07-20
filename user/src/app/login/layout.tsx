import type { Metadata } from 'next';
import { SITE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Login',
  description: `Sign in to your ${SITE.name} account to track orders, manage your wishlist, and checkout faster.`,
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
