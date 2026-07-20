'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function RegisterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-screen items-center justify-center py-24">
      <EmptyState
        icon={<AlertTriangle className="mx-auto h-12 w-12" />}
        title="Something went wrong"
        description="We couldn't load the registration page. Please try again."
        action={
          <Button variant="primary" size="medium" onClick={reset}>
            Try Again
          </Button>
        }
      />
    </Container>
  );
}
