import type { Metadata } from 'next';
import { SITE } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Register',
  description: `Create a ${SITE.name} account to shop handcrafted products from Indian artisans.`,
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
