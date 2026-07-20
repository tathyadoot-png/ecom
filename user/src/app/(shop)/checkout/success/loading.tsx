import { Container } from '@/components/ui/Container';
import { Spinner } from '@/components/ui/Spinner';

export default function CheckoutSuccessLoading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center py-24">
      <Spinner size="lg" />
    </Container>
  );
}
