import Hero from '@/components/features/home/Hero';
import TrustStrip from '@/components/features/home/TrustStrip';
import FeaturedProducts from '@/components/features/home/FeaturedProducts';
import CategoryShowcase from '@/components/features/home/CategoryShowcase';
import WhyChoose from '@/components/features/home/WhyChoose';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyChoose />
    </>
  );
}
