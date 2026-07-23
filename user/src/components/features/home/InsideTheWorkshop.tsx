'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { artisanService } from '@/services/artisan.service';
import { hasEnoughContent } from '@/lib/artisanHelpers';
import { Artisan } from '@/types/artisan.types';
import { cn } from '@/lib/utils';

const GALLERY_LIMIT = 5;
const OTHERS_LIMIT = 3;

// Phase 8D.4 — replaces the old "Behind the Craft" section, which was
// a second portrait-and-quote block right after Featured Artisan and
// read as a repeat rather than a new idea. This answers a different
// question — how is it made, not who made it — using only the same
// lead artisan's own uploaded gallery photos, never a stock or
// invented "process step" illustration.
//
// It also carries the homepage's closing artisan beat: a "meet other
// artisans" teaser + link to the full directory, moved here from
// Featured Artisan so that invitation lands after this artisan's full
// story (introduction, then workshop) instead of interrupting it. That
// teaser is independent of whether this specific artisan has gallery
// photos yet — it renders whenever any other real artisans exist, so
// the closing beat never silently vanishes just because one person's
// profile is still incomplete.
const InsideTheWorkshop = () => {
  const [artisans, setArtisans] = useState<Artisan[] | null>(null);

  useEffect(() => {
    artisanService
      .getHomepageArtisans(8)
      .then((data) => setArtisans(data.filter(hasEnoughContent)))
      .catch(() => setArtisans([]));
  }, []);

  if (!artisans || artisans.length === 0) return null;

  const [lead, ...rest] = artisans;
  const gallery = (lead.gallery || []).slice(0, GALLERY_LIMIT);
  const others = rest.slice(0, OTHERS_LIMIT);

  if (gallery.length === 0 && others.length === 0) return null;

  return (
    <section className="bg-background py-14 md:py-20">
      <Container>
        {gallery.length > 0 && (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-body text-xs font-medium uppercase tracking-[0.14em] text-text/40">
                  Inside the Workshop
                </span>
                <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-text sm:text-4xl">
                  Where {lead.owner.name}&rsquo;s work takes shape
                </h3>
              </div>

              {lead.craftPhilosophy && (
                <p className="max-w-sm font-heading text-lg font-light italic leading-snug text-text/60">
                  &ldquo;{lead.craftPhilosophy}&rdquo;
                </p>
              )}
            </div>

            <WorkshopGallery images={gallery} name={lead.owner.name} />
          </>
        )}

        {others.length > 0 && (
          <div
            className={cn(
              'flex flex-col items-center gap-6 sm:flex-row sm:justify-between',
              gallery.length > 0 ? 'mt-14 border-t border-warm-beige/40 pt-10' : ''
            )}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-32 gap-y-4">
              {others.map((artisan, index) => {
                const avatar = artisan.portraitImage || artisan.logo || null;
                return (
                  <Reveal key={artisan._id} delay={index * 80}>
                    <Link href={`/artisans/${artisan.slug}`} className="group flex items-center gap-3">
                      {avatar ? (
                        <div className="relative h-11 w-11 overflow-hidden rounded-full bg-warm-beige/20">
                          <Image
                            src={avatar}
                            alt={artisan.owner.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="44px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-warm-beige/20 font-heading text-lg text-text/50">
                          {artisan.owner.name.charAt(0)}
                        </div>
                      )}
                      <span className="font-body text-sm text-text/60 transition-colors group-hover:text-primary">
                        {artisan.owner.name}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Link
              href="/artisans"
              className="group flex w-fit items-center gap-2 font-body text-sm font-medium uppercase tracking-[0.1em] text-text transition-colors hover:text-primary"
            >
              Meet All Our Artisans
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

// A hand-arranged asymmetric mosaic rather than a uniform grid — the
// first photo always reads as the "hero" of the set (wider, taller),
// the rest stagger up/down slightly so the section feels composed
// rather than tiled. Scales from 1 to GALLERY_LIMIT real photos.
const WorkshopGallery = ({ images, name }: { images: string[]; name: string }) => {
  if (images.length === 1) {
    return (
      <Reveal
        variant="mask"
        delay={100}
        className="relative mt-10 aspect-video w-full overflow-hidden rounded-card bg-warm-beige/15"
      >
        <Image
          src={images[0]}
          alt={`Inside ${name}'s workshop`}
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
      </Reveal>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
      {images.map((src, index) => (
        <Reveal
          key={src + index}
          variant="mask"
          delay={100 + index * 90}
          className={cn(
            'relative overflow-hidden rounded-card bg-warm-beige/15',
            index === 0 ? 'col-span-2 aspect-16/10 sm:aspect-4/3' : 'aspect-square',
            index > 0 && index % 2 === 1 && 'sm:mt-10'
          )}
        >
          <Image
            src={src}
            alt={`Inside ${name}'s workshop`}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </Reveal>
      ))}
    </div>
  );
};

export default InsideTheWorkshop;
