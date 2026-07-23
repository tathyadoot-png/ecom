import { Skeleton } from '@/components/ui/Skeleton';

interface ProductSkeletonGridProps {
  count?: number;
}

// Matches the redesigned ProductCard's actual proportions — a square
// image, then a category/rating row, title, and a bottom-anchored
// price row — so the loading state doesn't shift layout once real
// cards replace it.
const ProductSkeletonGrid = ({ count = 12 }: ProductSkeletonGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton variant="rect" className="aspect-square w-full rounded-card" />
          <div className="space-y-2 px-1">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="h-3 w-1/4" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} variant="circle" className="h-3.5 w-3.5" />
                ))}
              </div>
            </div>
            <Skeleton variant="text" className="h-5 w-4/5" />
            <Skeleton variant="text" className="h-5 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export { ProductSkeletonGrid };
