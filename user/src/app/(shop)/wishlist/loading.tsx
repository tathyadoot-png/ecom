import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function WishlistLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-8 w-48" />
      <Skeleton variant="text" className="mt-2 h-4 w-32" />

      <div className="mt-8 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rect" className="h-32 w-full rounded-card" />
        ))}
      </div>
    </Container>
  );
}
