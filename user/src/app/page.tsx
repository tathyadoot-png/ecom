import Header from '@/components/layout/Header';
import Hero from '@/components/features/home/Hero';
import TrustStrip from '@/components/features/home/TrustStrip';
import FeaturedProducts from '@/components/features/home/FeaturedProducts';
import CategoryShowcase from '@/components/features/home/CategoryShowcase';
import Collections from '@/components/features/home/Collections';
import WhyChoose from '@/components/features/home/WhyChoose';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <Collections />
      <WhyChoose />
      {/* Newsletter section will be added in Phase 5 */}
    </>
  );
}