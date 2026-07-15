import { Skeleton } from '@/components/ui/Skeleton';

interface ProductSkeletonGridProps {
  count?: number;
}

const ProductSkeletonGrid = ({ count = 12 }: ProductSkeletonGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton variant="rect" className="h-64 w-full rounded-card" />
          <Skeleton variant="text" className="h-4 w-3/4" />
          <Skeleton variant="text" className="h-4 w-1/2" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} variant="circle" className="h-4 w-4" />
            ))}
          </div>
          <Skeleton variant="text" className="h-6 w-1/3" />
          <Skeleton variant="rect" className="h-10 w-full rounded-button" />
        </div>
      ))}
    </div>
  );
};

export { ProductSkeletonGrid };