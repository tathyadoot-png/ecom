'use client';

import { useEffect } from 'react';

// The only error boundary that can catch a failure in the root layout
// itself (fonts, Providers, AuthProvider) — every other error.tsx in
// this app only covers its own route segment. Must render its own
// <html>/<body> since it replaces the root layout when active, so it
// deliberately doesn't depend on globals.css, fonts, or Providers.
export default function GlobalError({
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
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#666' }}>Please try again, or come back later.</p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              background: '#8B2C1D',
              color: '#FDF8F2',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
