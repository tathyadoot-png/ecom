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
  className?: string;
}

const CategoryCard = ({ category, variant = 'default', className }: CategoryCardProps) => {
  const { name, slug, image, description, featured } = category;

  const cardClasses = {
    default: 'h-72 md:h-80',
    featured: 'h-96 md:h-[28rem]',
    compact: 'h-52 md:h-60',
  };

  return (
    <Link href={`/categories/${slug}`} className="group block">
      <Card hoverable padding="none" className={cn('relative overflow-hidden', cardClasses[variant], className)}>
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
          <h3 className="font-heading text-3xl font-light leading-tight text-cream">{name}</h3>
          {description && (
            <p className="mt-1.5 line-clamp-1 font-body text-sm text-cream/70">{description}</p>
          )}
          <div className="mt-4 flex items-center gap-1.5 font-body text-xs font-medium uppercase tracking-[0.15em] text-cream/80 transition-transform duration-300 group-hover:translate-x-1.5">
            <span>Discover</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
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
