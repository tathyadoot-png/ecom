'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { cn } from '@/lib/utils';

interface ArtisanGalleryProps {
  images: string[];
  name: string;
}

// A small, purpose-built lightbox — no library. Matches the same
// overlay/backdrop/Escape/focus conventions already established by
// FilterSheet elsewhere in this project.
const ArtisanGallery = ({ images, name }: ArtisanGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 gap-4',
          images.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-3'
        )}
      >
        {images.map((image, index) => (
          <button
            key={image + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open workshop image ${index + 1} of ${images.length}`}
            className={cn(
              'group relative aspect-square overflow-hidden rounded-card bg-warm-beige/15',
              images.length === 1 && 'aspect-16/10'
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-text/90 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${name}'s workshop gallery`}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-full w-full max-w-4xl">
            <Image
              key={activeIndex}
              src={images[activeIndex]}
              alt=""
              fill
              className="object-contain transition-opacity duration-300 ease-out"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
};

export { ArtisanGallery };
