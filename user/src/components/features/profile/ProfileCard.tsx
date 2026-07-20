import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { User } from '@/types/auth.types';

interface ProfileCardProps {
  user: User;
}

// Read-only identity header — editing lives in ProfileInfo below it.
const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-warm-beige/30">
        <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="80px" />
      </div>
      <div>
        <h1 className="font-heading text-2xl text-text">{user.name}</h1>
        <p className="font-body text-sm text-text/60">{user.email}</p>
        <p className="mt-1 font-body text-xs text-text/40">Member since {formatDate(user.createdAt)}</p>
      </div>
    </Card>
  );
};

export { ProfileCard };
