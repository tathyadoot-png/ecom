import CategoryGrid from "@/components/categories/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/products/ProductGrid";
export default function Home() {
  return (
    <>
      <Hero />
       <CategoryGrid />
      <ProductGrid/>
        <FeaturedProducts />

    </>
  );
}