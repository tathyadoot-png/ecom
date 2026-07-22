import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArtisanCard } from './ArtisanCard';
import { Artisan } from '@/types/artisan.types';

interface RelatedArtisansProps {
  artisans: Artisan[];
}

// Reuses ArtisanCard exactly (frozen, Phase 8B) — a plain grid rather
// than the Directory's masonry columns, since a small bounded set
// (at most 4) reads more intentional evenly spaced than columned.
const RelatedArtisans = ({ artisans }: RelatedArtisansProps) => {
  if (artisans.length === 0) return null;

  return (
    <div>
      <SectionHeading title="More Makers to Meet" align="left" className="text-left" />
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan._id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
};

export { RelatedArtisans };
