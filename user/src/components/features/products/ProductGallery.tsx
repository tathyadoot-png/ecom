'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

// 4:5 to echo the same ratio ProductCard and Hero already established
// elsewhere — one consistent image signature across the site rather
// than a PDP-specific crop. Switching the active image crossfades
// (opacity only) instead of an instant swap; a broken image URL
// (onError) falls back to the same placeholder used for a genuinely
// missing one, rather than a browser broken-image glyph.
const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const gallery = images && images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [brokenIndexes, setBrokenIndexes] = useState<Set<number>>(new Set());

  const isBroken = (index: number) => brokenIndexes.has(index);
  const showPlaceholder = gallery.length === 0 || isBroken(activeIndex);

  return (
    <div className="flex flex-col gap-4">
      <div
        data-testid="pdp-gallery"
        className="relative aspect-4/5 w-full overflow-hidden rounded-card bg-warm-beige/15"
      >
        {!showPlaceholder ? (
          gallery.map((image, index) => (
            <Image
              key={image + index}
              src={image}
              alt={title}
              fill
              priority={index === 0}
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              className={cn(
                'object-cover transition-opacity duration-500 ease-out',
                index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={() =>
                setBrokenIndexes((prev) => {
                  const next = new Set(prev);
                  next.add(index);
                  return next;
                })
              }
            />
          ))
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
              aria-label={`Show image ${index + 1} of ${gallery.length}`}
              aria-current={index === activeIndex}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-input border transition-colors duration-300',
                index === activeIndex ? 'border-primary' : 'border-transparent hover:border-warm-beige'
              )}
            >
              {isBroken(index) ? (
                <ImagePlaceholder className="absolute inset-0" />
              ) : (
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() =>
                    setBrokenIndexes((prev) => {
                      const next = new Set(prev);
                      next.add(index);
                      return next;
                    })
                  }
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { ProductGallery };
