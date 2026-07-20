import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProfileLoading() {
  return (
    <Container className="py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Skeleton variant="rect" className="h-28 w-full rounded-card" />
        <Skeleton variant="rect" className="h-48 w-full rounded-card" />
        <Skeleton variant="rect" className="h-64 w-full rounded-card" />
        <Skeleton variant="rect" className="h-56 w-full rounded-card" />
      </div>
    </Container>
  );
}
