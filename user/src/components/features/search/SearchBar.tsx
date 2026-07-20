'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { saveRecentSearch } from '@/lib/recentSearches';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onSubmitted?: () => void;
}

// Self-contained: manages its own text, submits by navigating to
// /search?q=... — reused by the Header (desktop + mobile) and the
// search page itself. No suggestions dropdown — the backend doesn't
// support them, so this is a simple redirect search only.
const SearchBar = ({
  initialValue = '',
  placeholder = 'Search for products, categories...',
  className,
  inputClassName,
  onSubmitted,
}: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    saveRecentSearch(trimmed);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    onSubmitted?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={className}>
      <Input
        aria-label="Search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={inputClassName}
        leftIcon={<Search className="h-4 w-4 text-text/40" />}
        rightIcon={
          query ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          ) : undefined
        }
      />
    </form>
  );
};

export { SearchBar };
