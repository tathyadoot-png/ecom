import { MapPin, ArrowUpRight } from 'lucide-react';
import { Artisan } from '@/types/artisan.types';

interface ArtisanLocationProps {
  artisan: Artisan;
}

// Only the location fields that actually exist are listed — a map
// link is shown only when the artisan actually provided one, never a
// generic "find us" placeholder.
const ArtisanLocation = ({ artisan }: ArtisanLocationProps) => {
  const parts = [artisan.village, artisan.city, artisan.state].filter(Boolean);

  if (parts.length === 0 && !artisan.googleMap) return null;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {parts.length > 0 && (
        <p className="flex items-center gap-2 font-body text-base text-text/70">
          <MapPin className="h-4 w-4 text-text/40" />
          {parts.join(', ')}
        </p>
      )}
      {artisan.googleMap && (
        <a
          href={artisan.googleMap}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 font-body text-sm text-text/50 transition-colors hover:text-primary"
        >
          View on Google Maps
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
    </div>
  );
};

export { ArtisanLocation };
