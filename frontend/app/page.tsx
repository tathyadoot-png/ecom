import CategoryGrid from "@/components/categories/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/home/Hero";
import WhyChoose from "@/components/home/WhyChoose";
import ProductGrid from "@/components/products/ProductGrid";
export default function Home() {
  return (
    <>
      <Hero />
       <CategoryGrid />
      <ProductGrid/>
        <FeaturedProducts />
  <WhyChoose />
    </>
  );
}