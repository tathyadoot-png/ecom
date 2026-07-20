'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getRecentSearches } from '@/lib/recentSearches';

// localStorage-only, read on mount (client component — nothing to
// render during SSR since there's no server-side notion of "recent").
const RecentSearches = () => {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  if (recent.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="flex items-center gap-1 font-body text-xs font-medium text-text/50">
        <Clock className="h-3.5 w-3.5" /> Recent:
      </span>
      {recent.map((query) => (
        <Link
          key={query}
          href={`/search?q=${encodeURIComponent(query)}`}
          className="rounded-full border border-warm-beige px-3 py-1 font-body text-xs text-text/70 transition-colors hover:border-primary hover:text-primary"
        >
          {query}
        </Link>
      ))}
    </div>
  );
};

export { RecentSearches };
