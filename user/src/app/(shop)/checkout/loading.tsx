import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CheckoutLoading() {
  return (
    <Container className="py-10">
      <Skeleton variant="text" className="h-8 w-40" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Skeleton variant="rect" className="h-64 w-full rounded-card" />
          <Skeleton variant="rect" className="h-40 w-full rounded-card" />
        </div>
        <Skeleton variant="rect" className="h-96 w-full rounded-card" />
      </div>
    </Container>
  );
}
