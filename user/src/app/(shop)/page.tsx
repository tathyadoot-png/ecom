import type { Metadata } from 'next';
import Hero from '@/components/features/home/Hero';
import EditorialDivider from '@/components/features/home/EditorialDivider';
import ManifestoBand from '@/components/features/home/ManifestoBand';
import FeaturedCrafts from '@/components/features/home/FeaturedCrafts';
import FeaturedArtisan from '@/components/features/home/FeaturedArtisan';
import InsideTheWorkshop from '@/components/features/home/InsideTheWorkshop';
import FeaturedProducts from '@/components/features/home/FeaturedProducts';
import AssuranceStrip from '@/components/features/home/AssuranceStrip';
import { SITE } from '@/constants/site';

// Title deliberately omitted so it inherits the root layout's clean
// `default` title (just the site name) instead of getting the
// "Home | Sitename" template suffix. Description is grounded in the
// same claims Hero/AssuranceStrip already make on the page itself, not
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

// Every section here earns its place as one beat in a single journey
// (arrival → point of view → craft → who made it → how it's made →
// the pieces → reassurance) rather than a stack of interchangeable
// modules. Featured Artisan and Inside the Workshop deliberately each
// answer a different question about the same lead artisan — who they
// are, then how they work — instead of repeating a portrait-and-quote
// format twice in a row (Phase 8D.4).
export default function HomePage() {
  return (
    <>
      <Hero />
      <EditorialDivider />
      <ManifestoBand />
      <FeaturedCrafts />
      <FeaturedArtisan />
      <InsideTheWorkshop />
      <FeaturedProducts />
      <AssuranceStrip />
    </>
  );
}
