import { useEffect } from 'react';

// Warns on tab close/refresh while a form has unsaved edits. Next.js
// App Router has no built-in in-app navigation-blocking API, so this
// covers the browser-level case (close tab, refresh, external nav)
// rather than inventing a bespoke route-transition interceptor.
export function useUnsavedChangesGuard(hasUnsavedChanges: boolean) {
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
}
