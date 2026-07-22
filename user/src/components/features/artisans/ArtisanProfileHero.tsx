import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Artisan } from '@/types/artisan.types';

interface ArtisanProfileHeroProps {
  artisan: Artisan;
}

// Three-tier fallback, largest to smallest presence: portrait image →
// logo → text-only. Never a broken-image glyph, never a fabricated
// photo. Text sits below the image (not overlaid) — safer for
// legibility against an arbitrary, uncontrolled real photo than a
// gradient-and-overlay treatment would be.
const ArtisanProfileHero = ({ artisan }: ArtisanProfileHeroProps) => {
  const portraitSrc = artisan.portraitImage || artisan.logo || null;
  const location = [artisan.city, artisan.state].filter(Boolean).join(', ');

  return (
    <div className="mx-auto max-w-4xl">
      {portraitSrc && (
        <div className="relative mx-auto aspect-4/5 w-full max-w-xl overflow-hidden rounded-card bg-warm-beige/15 sm:aspect-16/10 sm:max-w-none">
          <Image
            src={portraitSrc}
            alt={artisan.owner.name}
            fill
            priority
            placeholder="blur"
            blurDataURL={SHIMMER_DATA_URL}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
      )}

      <div className={portraitSrc ? 'mt-10 text-center' : 'text-center'}>
        {(artisan.featured || artisan.verified) && (
          <div className="mb-4 flex items-center justify-center gap-2">
            {artisan.featured && (
              <span className="rounded-full border border-primary/30 px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-primary">
                Featured
              </span>
            )}
            {artisan.verified && (
              <span className="flex items-center gap-1 rounded-full border border-forest/30 px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-forest">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
        )}

        {artisan.craft && (
          <span className="block font-body text-xs font-medium uppercase tracking-[0.16em] text-text/40">
            {artisan.craft}
            {artisan.subCraft ? ` · ${artisan.subCraft}` : ''}
          </span>
        )}

        <h1 className="mt-3 font-heading text-5xl font-light leading-tight text-text sm:text-6xl">
          {artisan.owner.name}
        </h1>

        {(location || artisan.yearsOfExperience) && (
          <p className="mt-4 font-body text-base text-text/50">
            {location}
            {location && artisan.yearsOfExperience ? ' · ' : ''}
            {artisan.yearsOfExperience
              ? `${artisan.yearsOfExperience} ${artisan.yearsOfExperience === 1 ? 'Year' : 'Years'} of Craft`
              : ''}
          </p>
        )}

        {artisan.shortQuote && (
          <blockquote className="mx-auto mt-8 max-w-lg font-heading text-2xl font-light italic leading-snug text-text/80 sm:text-3xl">
            &ldquo;{artisan.shortQuote}&rdquo;
          </blockquote>
        )}
      </div>
    </div>
  );
};

export { ArtisanProfileHero };
