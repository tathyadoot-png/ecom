'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Category } from '@/types/category.types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'featured' | 'compact';
  // Optional exhibition-style index shown as a small kicker (e.g. "01")
  // — used by the homepage showcase, omitted on the /categories listing
  // page where a running index across pagination wouldn't mean anything.
  index?: number;
  className?: string;
}

const CategoryCard = ({ category, variant = 'default', index, className }: CategoryCardProps) => {
  const { name, slug, image, description, featured } = category;

  // A true aspect ratio (not a fixed pixel height) so proportions hold
  // steady as column width changes across breakpoints, instead of
  // drifting — the previous h-72/h-80 fixed heights didn't scale with
  // the column, so the same card read as a different shape at every
  // breakpoint.
  const aspectClasses = {
    default: 'aspect-[4/5]',
    featured: 'aspect-[16/10]',
    compact: 'aspect-square',
  };

  return (
    <Link href={`/categories/${slug}`} className="group block">
      <Card
        hoverable
        padding="none"
        className={cn('relative w-full overflow-hidden', aspectClasses[variant], className)}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-text/75 via-text/15 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-7">
          {index !== undefined && (
            <span className="mb-2 block font-body text-xs font-medium tracking-[0.2em] text-cream/50">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className="font-heading text-3xl font-light leading-tight text-cream">{name}</h3>
          {description && (
            <p className="mt-1.5 line-clamp-1 font-body text-sm text-cream/70">{description}</p>
          )}
          {/* No labeled CTA — an arrow that appears on interaction reads
              as an invitation to browse a collection, not a button. */}
          <ArrowRight className="mt-4 h-4 w-4 -translate-x-1 text-cream/70 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>

        {featured && (
          <div className="absolute right-4 top-4 z-10">
            <Badge variant="featured">Featured</Badge>
          </div>
        )}
      </Card>
    </Link>
  );
};

export { CategoryCard };
