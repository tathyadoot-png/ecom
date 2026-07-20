'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  className?: string;
}

// Single-action logout — not a dropdown, Phase 1 deliberately left
// the account menu unbuilt. Just a direct, reachable icon button.
const LogoutButton = ({ className }: LogoutButtonProps) => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      toast.success('Logged out');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-label="Logout"
      className={cn(
        'text-text/70 transition-colors hover:text-primary disabled:opacity-50',
        className
      )}
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
};

export { LogoutButton };
