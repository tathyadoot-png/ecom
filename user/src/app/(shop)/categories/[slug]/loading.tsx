import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CategoryDetailLoading() {
  return (
    <>
      <Skeleton variant="rect" className="h-64 w-full rounded-none sm:h-80" />
      <Container className="py-10">
        <Skeleton variant="text" className="h-4 w-48" />
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="w-full flex-shrink-0 space-y-2 lg:w-64">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rect" className="h-10 w-full rounded-input" />
            ))}
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="rect" className="h-72 w-full rounded-card" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
