import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton variant="rect" className="aspect-square w-full rounded-card" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-20 w-20 rounded-input" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton variant="text" className="h-4 w-24" />
          <Skeleton variant="text" className="h-9 w-3/4" />
          <Skeleton variant="text" className="h-6 w-1/3" />
          <Skeleton variant="rect" className="h-24 w-full" />
          <Skeleton variant="rect" className="h-12 w-full rounded-button" />
        </div>
      </div>
    </Container>
  );
}
