import Link from 'next/link';
import { UserX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function ArtisanNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        icon={<UserX className="mx-auto h-12 w-12" />}
        title="Artisan not found"
        description="This artisan's profile may have been removed, or the link is incorrect."
        action={
          <Link href="/artisans">
            <Button variant="primary" size="medium">
              Meet the Makers
            </Button>
          </Link>
        }
      />
    </Container>
  );
}
