import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Category } from '@/types/category.types';

interface CategoryBannerProps {
  category: Category;
  productCount: number;
}

const CategoryBanner = ({ category, productCount }: CategoryBannerProps) => {
  return (
    <div className="relative h-64 w-full overflow-hidden bg-warm-beige/30 sm:h-80">
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          placeholder="blur"
          blurDataURL={SHIMMER_DATA_URL}
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/20 to-transparent" />

      <Container className="relative flex h-full flex-col justify-end pb-8 text-cream">
        <h1 className="font-heading text-3xl sm:text-5xl">{category.name}</h1>
        {category.description && (
          <p className="mt-2 max-w-xl font-body text-sm text-cream/80 sm:text-base">
            {category.description}
          </p>
        )}
        <p className="mt-3 font-body text-xs uppercase tracking-wider text-cream/60">
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
      </Container>
    </div>
  );
};

export { CategoryBanner };
