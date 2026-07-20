'use client';

import { Toaster } from 'sonner';
import { AuthProvider } from './AuthProvider';

// Single composition root for app-wide providers. Add new providers
// here (theme, query client, etc.) rather than growing the tree in
// layout.tsx directly.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
