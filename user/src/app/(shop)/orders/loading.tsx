import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function OrdersLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-8 w-40" />
      <Skeleton variant="text" className="mt-2 h-4 w-24" />

      <div className="mt-8 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rect" className="h-24 w-full rounded-card" />
        ))}
      </div>
    </Container>
  );
}
