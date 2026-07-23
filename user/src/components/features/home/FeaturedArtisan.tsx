'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Skeleton } from '@/components/ui/Skeleton';
import { artisanService } from '@/services/artisan.service';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { hasEnoughContent } from '@/lib/artisanHelpers';
import { Artisan } from '@/types/artisan.types';

// A short, honest excerpt of the artisan's own story field — never
// invented copy, never a hard mid-word cut (breaks on the last whole
// word before the limit, matching how a human would trim a pull-quote).
const excerpt = (text: string, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
};

const FeaturedArtisanSkeleton = () => (
  <section className="bg-cream py-14 md:py-20">
    <Container>
      <Skeleton variant="text" className="mx-auto h-10 w-96 max-w-full" />
      <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-64">
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

// Phase 8D.4: this section's one job is "who made this" — a focused
// introduction to a single artisan. It used to also carry a gallery
// thumbnail row and a "meet other artisans" teaser; both moved to the
// new Inside the Workshop section that follows, so a visitor isn't
// shown the same person's photos twice in two consecutive sections,
// and isn't offered an exit toward other artisans before this one's
// story has actually finished.
const FeaturedArtisan = () => {
  const [artisans, setArtisans] = useState<Artisan[] | null>(null);

  useEffect(() => {
    artisanService
      .getHomepageArtisans(8)
      .then((data) => setArtisans(data.filter(hasEnoughContent)))
      .catch(() => setArtisans([]));
  }, []);

  if (artisans === null) return <FeaturedArtisanSkeleton />;
  if (artisans.length === 0) return null;

  const [lead] = artisans;
  const portraitSrc = lead.portraitImage || lead.logo || null;
  const location = [lead.city, lead.state].filter(Boolean).join(', ');

  return (
    <section className="bg-cream py-14 md:py-20">
      <Container>
        <SectionHeading
          title="Meet the Hands Behind Every Creation"
          subtitle="Behind every handcrafted piece is an artisan carrying years of tradition, patience, and passion."
        />

        <article className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-64">
          {portraitSrc && (
            <Reveal variant="mask" className="relative aspect-4/5 overflow-hidden rounded-card bg-warm-beige/15">
              <Image
                src={portraitSrc}
                alt={lead.owner.name}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={SHIMMER_DATA_URL}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          )}

          <Reveal
            delay={150}
            className={!portraitSrc ? 'mx-auto max-w-2xl text-center lg:col-span-2' : undefined}
          >
            <div className="flex flex-col gap-4">
              {lead.craft && (
                <span className="font-body text-xs font-medium uppercase tracking-[0.14em] text-text/40">
                  {lead.craft}
                  {lead.subCraft ? ` · ${lead.subCraft}` : ''}
                </span>
              )}

              <h3 className="font-heading text-4xl font-light leading-tight text-text sm:text-5xl">
                {lead.owner.name}
              </h3>

              {(location || lead.yearsOfExperience) && (
                <p className="font-body text-sm text-text/50">
                  {location}
                  {location && lead.yearsOfExperience ? ' · ' : ''}
                  {lead.yearsOfExperience
                    ? `${lead.yearsOfExperience} ${lead.yearsOfExperience === 1 ? 'Year' : 'Years'} of Craft`
                    : ''}
                </p>
              )}

              {lead.shortQuote && (
                <blockquote className="max-w-md font-heading text-2xl font-light italic leading-snug text-text/80">
                  &ldquo;{lead.shortQuote}&rdquo;
                </blockquote>
              )}

              {lead.story && (
                <p className="max-w-md font-body text-sm leading-relaxed text-text/60">
                  {excerpt(lead.story)}
                </p>
              )}

              <Link
                href={`/artisans/${lead.slug}`}
                className="group mt-2 flex w-fit items-center gap-1.5 font-body text-sm text-primary transition-colors hover:text-primary/70"
              >
                Read {lead.owner.name}&rsquo;s Story
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </article>
      </Container>
    </section>
  );
};

export default FeaturedArtisan;
