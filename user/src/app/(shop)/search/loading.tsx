import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-8 w-56" />
      <Skeleton variant="text" className="mt-2 h-4 w-40" />

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <div className="w-full flex-shrink-0 space-y-2 lg:w-64">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-10 w-full rounded-input" />
          ))}
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-72 w-full rounded-card" />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
