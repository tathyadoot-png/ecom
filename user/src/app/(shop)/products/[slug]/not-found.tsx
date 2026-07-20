import Link from 'next/link';
import { PackageX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function ProductNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        icon={<PackageX className="mx-auto h-12 w-12" />}
        title="Product not found"
        description="This product may have been removed, or the link is incorrect."
        action={
          <Link href="/products">
            <Button variant="primary" size="medium">
              Browse Products
            </Button>
          </Link>
        }
      />
    </Container>
  );
}
