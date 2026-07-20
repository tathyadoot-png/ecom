'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
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
    default: 'h-64 md:h-72',
    featured: 'h-80 md:h-96',
    compact: 'h-48 md:h-56',
  };

  return (
    <Link href={`/categories/${slug}`} className="block group">
      <Card
        hoverable
        padding="none"
        className={cn(
          'relative overflow-hidden rounded-card',
          cardClasses[variant],
          className
        )}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <ImagePlaceholder className="absolute inset-0" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-text/60 via-text/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-cream">
          <h3 className="font-heading text-2xl font-medium leading-tight">{name}</h3>
          {description && (
            <p className="mt-1 text-sm text-cream/80 font-body line-clamp-1">{description}</p>
          )}
          <div className="mt-3 flex items-center gap-1 text-sm font-medium text-cream/80 transition-transform group-hover:translate-x-2">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-text">
            Featured
          </div>
        )}
      </Card>
    </Link>
  );
};

export { CategoryCard };