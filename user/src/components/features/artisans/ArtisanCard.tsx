import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { SHIMMER_DATA_URL } from '@/lib/imagePlaceholder';
import { Artisan } from '@/types/artisan.types';
import { cn } from '@/lib/utils';

interface ArtisanCardProps {
  artisan: Artisan;
}

// Editorial, not a product-grid card: the portrait dominates, every
// other field is genuinely optional and simply omitted when absent —
// never a placeholder, never an empty row. No link to a profile page
// yet (that's Phase 8C); adding one here would ship a link to a route
// that 404s, which this project treats as a hard rule.
const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  const portraitSrc = artisan.portraitImage || artisan.logo || null;
  const location = [artisan.city, artisan.state].filter(Boolean).join(', ');

  return (
    <article className="group mb-10 break-inside-avoid">
      {portraitSrc ? (
        <div className="relative aspect-4/5 overflow-hidden rounded-card bg-warm-beige/15">
          <Image
            src={portraitSrc}
            alt={artisan.owner.name}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={SHIMMER_DATA_URL}
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {(artisan.featured || artisan.verified) && (
            <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-1.5">
              {artisan.featured && (
                <span className="rounded-full bg-cream/90 px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-primary backdrop-blur-sm">
                  Featured
                </span>
              )}
              {artisan.verified && (
                <span className="flex items-center gap-1 rounded-full bg-cream/90 px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-forest backdrop-blur-sm">
                  <BadgeCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        (artisan.featured || artisan.verified) && (
          <div className="mb-3 flex items-center gap-1.5">
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
        )
      )}

      <div className={cn('flex flex-col gap-2', portraitSrc ? 'mt-5' : 'border-t border-warm-beige/40 pt-5')}>
        {artisan.craft && (
          <span className="font-body text-xs font-medium uppercase tracking-[0.14em] text-text/40">
            {artisan.craft}
            {artisan.subCraft ? ` · ${artisan.subCraft}` : ''}
          </span>
        )}

        <h3 className="font-heading text-2xl font-light leading-tight text-text transition-colors group-hover:text-primary">
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
          <blockquote className="mt-1 font-heading text-lg font-light italic leading-snug text-text/75">
            &ldquo;{artisan.shortQuote}&rdquo;
          </blockquote>
        )}

        {!!artisan.productCount && (
          <p className="mt-1 font-body text-xs text-text/40">
            {artisan.productCount} {artisan.productCount === 1 ? 'Piece' : 'Pieces'}
          </p>
        )}
      </div>
    </article>
  );
};

export { ArtisanCard };
