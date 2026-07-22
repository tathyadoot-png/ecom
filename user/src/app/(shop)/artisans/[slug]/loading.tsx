import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ArtisanProfileLoading() {
  return (
    <Container className="py-10 lg:py-14">
      <Skeleton variant="text" className="mb-10 h-4 w-64 lg:mb-14" />

      <div className="mx-auto max-w-4xl">
        <Skeleton variant="rect" className="mx-auto aspect-4/5 w-full max-w-xl rounded-card sm:aspect-16/10 sm:max-w-none" />
        <div className="mt-10 flex flex-col items-center gap-4">
          <Skeleton variant="text" className="h-3 w-24" />
          <Skeleton variant="text" className="h-12 w-72" />
          <Skeleton variant="text" className="h-4 w-48" />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-2xl space-y-4">
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
      </div>
    </Container>
  );
}
