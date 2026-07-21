'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  children: React.ReactNode;
}

// Mobile-only bottom sheet for filters — no drawer/dialog primitive
// exists yet in the design system, so this is a small, purpose-built
// one rather than reaching for a library. Filters apply live as the
// user taps them (same as desktop), so the footer button is just a
// calm way to dismiss back to the (already updated) grid — not a
// separate "Apply" step that would need its own pending-filter state.
const FilterSheet = ({ isOpen, onClose, resultCount, children }: FilterSheetProps) => {
  const [rendered, setRendered] = useState(isOpen);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) setRendered(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    // Move focus into the sheet for keyboard/screen-reader users —
    // otherwise focus silently stays on the trigger button underneath.
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <div
        className={cn(
          'absolute inset-0 bg-text/40 backdrop-blur-[2px] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />
      <div
        onTransitionEnd={() => {
          if (!isOpen) setRendered(false);
        }}
        className={cn(
          'absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-[20px] bg-cream shadow-lift transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex flex-shrink-0 flex-col items-center pb-2 pt-3">
          <span className="h-1 w-10 rounded-full bg-warm-beige" />
        </div>

        <div className="flex flex-shrink-0 items-center justify-between border-b border-warm-beige/40 px-6 pb-4">
          <span className="font-heading text-lg font-light text-text">Filters</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text/50 transition-colors hover:bg-warm-beige/40 hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        <div className="flex-shrink-0 border-t border-warm-beige/40 p-4">
          <Button variant="primary" size="medium" fullWidth onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { FilterSheet };
