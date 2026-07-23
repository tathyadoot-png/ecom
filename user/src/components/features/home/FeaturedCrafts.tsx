'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Skeleton } from '@/components/ui/Skeleton';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { useCategoryStore } from '@/store/category.store';
import { Category } from '@/types/category.types';
import { cn } from '@/lib/utils';

// Homepage always shows a curated set, never the full catalog of
// categories — this cap is what actually keeps the section scalable
// as the real category count grows from today's handful toward
// however many the marketplace eventually has (browsing the full set
// is /categories' job, not this section's).
const FEATURED_CRAFT_LIMIT = 10;

// Phase 8D.3: categories are navigation, not storytelling — the large
// editorial tiles from 8D.2 read beautifully at 4 categories but don't
// scale to 20+ without turning the homepage into a wall of photographs.
// Compact circular chips (Apple Store / Pinterest discovery pattern)
// scale to any count: they wrap on desktop and horizontally scroll on
// mobile, both from the same markup.
//
// Clicking a craft still goes straight to the filtered Product Listing
// Page (`/products?category={categoryId}`) — the backend's product
// filter matches on category _id, not slug, so the id is what has to
// travel here for the filter to return anything (fixed in Phase 8D.2).
const CraftChip = ({ category, index }: { category: Category; index: number }) => {
  const imageUrl =
    typeof category.image === 'string'
      ? category.image
      : (category.image as unknown as { asset?: { url?: string } })?.asset?.url;

  return (
    <Reveal delay={index * 60} className="shrink-0 snap-start sm:shrink">
      <Link
        href={`/products?category=${category._id}`}
        className="group flex w-20 flex-col items-center gap-3 text-center sm:w-[96px]"
      >
        <div className="relative h-18 w-18 overflow-hidden rounded-full bg-warm-beige/20 ring-1 ring-warm-beige/50 transition-all duration-300 ease-out group-hover:shadow-medium group-hover:ring-primary/50 sm:h-20 sm:w-20 lg:h-[96px] lg:w-[96px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={category.name}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={SHIMMER_DATA_URL}
              sizes="96px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-warm-beige/25" />
          )}
        </div>

        <span className="line-clamp-2 font-body text-xs font-medium capitalize leading-snug text-text/70 transition-colors group-hover:text-primary sm:text-sm">
          {category.name}
        </span>
      </Link>
    </Reveal>
  );
};

const FeaturedCraftsSkeleton = () => (
  <section className="bg-background py-14 md:py-20">
    <Container>
      <Skeleton variant="text" className="mx-auto h-10 w-80 max-w-full" />
      <div className="mt-10 flex justify-center gap-32">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <Skeleton variant="rect" className="h-20 w-20 rounded-full" />
            <Skeleton variant="text" className="h-3 w-14" />
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const FeaturedCrafts = () => {
  const { categories, isLoading, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (!categories || categories.length === 0) fetchCategories();
  }, [fetchCategories, categories]);

  if (isLoading && (!categories || categories.length === 0)) {
    return <FeaturedCraftsSkeleton />;
  }

  const displayCategories = (categories || [])
    .filter((cat) => cat.isActive !== false)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, FEATURED_CRAFT_LIMIT);

  if (displayCategories.length === 0) return null;

  return (
    <section className="bg-background py-14 md:py-20">
      <Container>
        <SectionHeading
          title="Featured Crafts"
          subtitle="Explore the marketplace by craft — textiles, pottery, and more, shaped by hand."
        />

        {/* Same markup does both jobs: a horizontally swipeable strip
            below `sm` (chips shrink-0, no-scrollbar, snap-x), and a
            centered wrapping row from `sm` up (chips shrink, wrap,
            never scroll) — no separate mobile/desktop implementation
            to keep in sync. */}
        <div
          className={cn(
            'mt-10 flex gap-x-32 gap-y-32 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory',
            'sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0'
          )}
        >
          {displayCategories.map((category, index) => (
            <CraftChip key={category._id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCrafts;
