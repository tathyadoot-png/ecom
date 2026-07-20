import Link from 'next/link';
import { FolderX } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function CategoryNotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        icon={<FolderX className="mx-auto h-12 w-12" />}
        title="Category not found"
        description="This category may have been removed, or the link is incorrect."
        action={
          <Link href="/categories">
            <Button variant="primary" size="medium">
              Browse Categories
            </Button>
          </Link>
        }
      />
    </Container>
  );
}
