import { Skeleton } from '@/components/ui/Skeleton';

interface ArtisanSkeletonGridProps {
  count?: number;
}

// Mirrors ArtisanCard's actual proportions (4:5 portrait, meta row,
// name, location line) in the same masonry columns layout, so the
// loading state never causes a shift once real cards replace it.
const ArtisanSkeletonGrid = ({ count = 6 }: ArtisanSkeletonGridProps) => {
  return (
    <div className="columns-1 gap-x-10 md:columns-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="mb-10 break-inside-avoid space-y-4">
          <Skeleton variant="rect" className="aspect-4/5 w-full rounded-card" />
          <div className="space-y-2.5">
            <Skeleton variant="text" className="h-3 w-1/4" />
            <Skeleton variant="text" className="h-7 w-2/3" />
            <Skeleton variant="text" className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export { ArtisanSkeletonGrid };
