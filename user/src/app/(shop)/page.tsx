import type { Metadata } from 'next';
import Hero from '@/components/features/home/Hero';
import TrustStrip from '@/components/features/home/TrustStrip';
import FeaturedProducts from '@/components/features/home/FeaturedProducts';
import CategoryShowcase from '@/components/features/home/CategoryShowcase';
import ArtisanSection from '@/components/features/home/ArtisanSection';
import WhyChoose from '@/components/features/home/WhyChoose';
import { SITE } from '@/constants/site';

// Title deliberately omitted so it inherits the root layout's clean
// `default` title (just the site name) instead of getting the
// "Home | Sitename" template suffix. Description is grounded in the
// same claims Hero/WhyChoose already make on the page itself, not
// invented copy.
export const metadata: Metadata = {
  description:
    'Shop handcrafted pottery, textiles, and decor from artisans across India — authentic, sustainable, and made with care.',
  alternates: { canonical: '/' },
  openGraph: {
    url: SITE.url,
    images: [{ url: '/logo.png' }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <ArtisanSection />
      <FeaturedProducts />
      <WhyChoose />
    </>
  );
}
