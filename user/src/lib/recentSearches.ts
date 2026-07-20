// Recent search history — localStorage only, no backend support for
// this (or for suggestions), per the Search Experience's explicit
// "do not fake backend suggestions" rule.
const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = query.trim();
  if (!trimmed) return;

  try {
    const existing = getRecentSearches();
    const updated = [
      trimmed,
      ...existing.filter((q) => q.toLowerCase() !== trimmed.toLowerCase()),
    ].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (private browsing, etc.) — recent
    // searches just won't persist, not worth surfacing an error for.
  }
}
