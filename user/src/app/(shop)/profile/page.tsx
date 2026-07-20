'use client';

import { Container } from '@/components/ui/Container';
import { Spinner } from '@/components/ui/Spinner';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ProfileCard } from '@/components/features/profile/ProfileCard';
import { ProfileInfo } from '@/components/features/profile/ProfileInfo';
import { AddressForm } from '@/components/features/profile/AddressForm';
import { SecuritySection } from '@/components/features/profile/SecuritySection';
import { useAuthStore } from '@/store/auth.store';

function ProfileContent() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <Container className="py-10">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <ProfileCard user={user} />
        <ProfileInfo user={user} />
        <AddressForm user={user} />
        <SecuritySection />
      </div>
    </Container>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard
      fallback={
        <Container className="flex min-h-[50vh] items-center justify-center py-24">
          <Spinner size="lg" />
        </Container>
      }
    >
      <ProfileContent />
    </AuthGuard>
  );
}
