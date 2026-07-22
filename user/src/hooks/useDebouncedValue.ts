'use client';

import { useEffect, useState } from 'react';

// Small, generic, reusable across any future debounced-search need —
// not artisan-specific despite being introduced for this page.
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
