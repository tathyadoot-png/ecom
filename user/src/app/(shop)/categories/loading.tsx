import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CategoriesLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-10 w-64" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rect" className="h-72 w-full rounded-card" />
        ))}
      </div>
    </Container>
  );
}
