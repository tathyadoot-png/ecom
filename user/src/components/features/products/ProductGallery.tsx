'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const gallery = images && images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-warm-beige/20">
        {gallery.length > 0 ? (
          <Image
            src={gallery[activeIndex]}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <ImagePlaceholder className="absolute inset-0" />
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {gallery.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-input border-2 transition-colors',
                index === activeIndex ? 'border-primary' : 'border-transparent'
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductGallery };
