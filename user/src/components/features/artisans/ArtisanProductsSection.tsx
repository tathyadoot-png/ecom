import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { Product } from '@/types/product.types';

interface ArtisanProductsSectionProps {
  name: string;
  products: Product[];
}

// Reuses ProductGrid/ProductCard exactly, unmodified (both frozen) —
// the same reuse pattern the PDP's own RelatedProducts already
// establishes. Omitted entirely when this artisan has no products
// yet, rather than an apologetic "no products" empty state — this is
// a documentary page, not a storefront waiting to be stocked.
const ArtisanProductsSection = ({ name, products }: ArtisanProductsSectionProps) => {
  if (products.length === 0) return null;

  return (
    <div>
      <SectionHeading title={`From ${name}'s Hands`} align="left" className="text-left" />
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export { ArtisanProductsSection };
