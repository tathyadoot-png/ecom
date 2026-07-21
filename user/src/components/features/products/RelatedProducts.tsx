import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductGrid } from './ProductGrid';
import { Product } from '@/types/product.types';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <section className="bg-cream py-16 pb-24 lg:pb-16">
      <Container>
        <SectionHeading
          title="You Might Also Like"
          subtitle="More handcrafted pieces from the same category"
          align="left"
          className="text-left"
        />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
};

export { RelatedProducts };
