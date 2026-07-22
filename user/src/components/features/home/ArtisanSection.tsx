'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Skeleton } from '@/components/ui/Skeleton';
import { artisanService } from '@/services/artisan.service';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Artisan } from '@/types/artisan.types';
import { cn } from '@/lib/utils';

// An artisan is only worth a large editorial spread if there's
// actually enough real content to fill one — otherwise the spread
// looks unfinished rather than restrained. Matches the product
// owner's explicit visibility rule for Phase 8A.
const hasEnoughContent = (artisan: Artisan) =>
  Boolean(artisan.portraitImage || artisan.logo || artisan.craft || artisan.shortQuote);

const HOMEPAGE_ARTISAN_LIMIT = 4;

// One editorial "spread" per artisan, alternating portrait side —
// deliberately not a grid of cards, so it reads as a small curated
// sequence rather than a directory listing (that's Phase 8B). Every
// piece of copy is real: no field here is ever defaulted to placeholder
// text, and an artisan with no portrait/quote/craft/location simply
// renders fewer elements, never an empty gap or a "coming soon" note.
//
// No "Read Story"/"View Collection" links yet — /artisans/[slug]
// doesn't exist until Phase 8C, and this section must never ship a
// link to a route that 404s.
const ArtisanSpread = ({ artisan, reversed }: { artisan: Artisan; reversed: boolean }) => {
  const portraitSrc = artisan.portraitImage || artisan.logo || null;
  const location = [artisan.city, artisan.state].filter(Boolean).join(', ');

  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {portraitSrc && (
        <div
          className={cn(
            'group relative aspect-4/5 overflow-hidden rounded-card bg-warm-beige/15',
            reversed && 'lg:order-2'
          )}
        >
          <Image
            src={portraitSrc}
            alt={artisan.owner.name}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={SHIMMER_DATA_URL}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-5',
          reversed && 'lg:order-1',
          !portraitSrc && 'mx-auto max-w-2xl text-center lg:col-span-2'
        )}
      >
        {artisan.craft && (
          <span className="font-body text-xs font-medium uppercase tracking-[0.14em] text-text/40">
            {artisan.craft}
            {artisan.subCraft ? ` · ${artisan.subCraft}` : ''}
          </span>
        )}

        <h3 className="font-heading text-4xl font-light leading-tight text-text sm:text-5xl">
          {artisan.owner.name}
        </h3>

        {(location || artisan.yearsOfExperience) && (
          <p className="font-body text-sm text-text/50">
            {location}
            {location && artisan.yearsOfExperience ? ' · ' : ''}
            {artisan.yearsOfExperience
              ? `${artisan.yearsOfExperience} ${artisan.yearsOfExperience === 1 ? 'Year' : 'Years'} of Craft`
              : ''}
          </p>
        )}

        {artisan.shortQuote && (
          <blockquote
            className={cn(
              'max-w-md font-heading text-2xl font-light italic leading-snug text-text/80',
              !portraitSrc && 'mx-auto'
            )}
          >
            &ldquo;{artisan.shortQuote}&rdquo;
          </blockquote>
        )}
      </div>
    </article>
  );
};

const ArtisanSectionSkeleton = () => (
  <section className="bg-cream py-20 md:py-28">
    <Container>
      <Skeleton variant="text" className="mx-auto h-10 w-96 max-w-full" />
      <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton variant="rect" className="aspect-4/5 w-full rounded-card" />
        <div className="space-y-4">
          <Skeleton variant="text" className="h-3 w-24" />
          <Skeleton variant="text" className="h-10 w-64" />
          <Skeleton variant="text" className="h-4 w-40" />
          <Skeleton variant="text" className="h-16 w-full max-w-md" />
        </div>
      </div>
    </Container>
  </section>
);

const ArtisanSection = () => {
  const [artisans, setArtisans] = useState<Artisan[] | null>(null);

  useEffect(() => {
    // Fetches a slightly larger pool than the render cap so the
    // content-richness filter below has real headroom to pick from —
    // the section still never RENDERS more than HOMEPAGE_ARTISAN_LIMIT,
    // this just avoids showing fewer than that simply because a
    // sparser profile happened to sort ahead of a richer one.
    artisanService
      .getHomepageArtisans(12)
      .then((data) => setArtisans(data.filter(hasEnoughContent).slice(0, HOMEPAGE_ARTISAN_LIMIT)))
      .catch(() => setArtisans([]));
  }, []);

  if (artisans === null) {
    return <ArtisanSectionSkeleton />;
  }

  // A curated section with nothing curated yet is correctly absent —
  // same reasoning FeaturedProducts already applies when there's
  // nothing to feature, not an apologetic empty state.
  if (artisans.length === 0) {
    return null;
  }

  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Meet the Hands Behind Every Creation"
          subtitle="Behind every handcrafted piece is an artisan carrying years of tradition, patience, and passion. Meet the makers preserving India's craft heritage."
        />

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {artisans.map((artisan, index) => (
            <ArtisanSpread key={artisan._id} artisan={artisan} reversed={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ArtisanSection;
