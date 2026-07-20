import Link from 'next/link';
import { Compass } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

// Root-level 404 for any unmatched route. Nested routes (products/[slug],
// categories/[slug]) already have their own not-found.tsx and inherit
// the (shop) layout automatically — this one is rendered outside any
// route group, so Header/Footer are composed directly.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-24">
          <EmptyState
            icon={<Compass className="mx-auto h-12 w-12" />}
            title="Page not found"
            description="The page you're looking for doesn't exist or has moved."
            action={
              <Link href="/">
                <Button variant="primary" size="medium">
                  Back to Home
                </Button>
              </Link>
            }
          />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
