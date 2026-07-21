import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <Container className="py-10 lg:py-14">
      <Skeleton variant="text" className="mb-8 h-4 w-56 lg:mb-12" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <Skeleton variant="rect" className="aspect-4/5 w-full rounded-card" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-20 w-20 rounded-input" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton variant="text" className="h-3 w-24" />
          <Skeleton variant="text" className="h-10 w-4/5" />
          <Skeleton variant="text" className="h-4 w-32" />
          <Skeleton variant="text" className="h-8 w-40" />
          <Skeleton variant="text" className="h-4 w-28" />
          <Skeleton variant="rect" className="h-16 w-full max-w-md" />
          <div className="space-y-3 pt-2">
            <Skeleton variant="rect" className="h-10 w-40 rounded-button" />
            <div className="flex gap-3">
              <Skeleton variant="rect" className="h-11 flex-1 rounded-button" />
              <Skeleton variant="rect" className="h-11 flex-1 rounded-button" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
