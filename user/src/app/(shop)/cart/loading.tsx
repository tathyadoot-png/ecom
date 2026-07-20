import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CartLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-8 w-48" />
      <Skeleton variant="text" className="mt-2 h-4 w-32" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-32 w-full rounded-card" />
          ))}
        </div>
        <Skeleton variant="rect" className="h-72 w-full rounded-card" />
      </div>
    </Container>
  );
}
