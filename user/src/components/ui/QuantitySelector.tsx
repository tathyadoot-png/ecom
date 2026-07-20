'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

// Generic +/- stepper, bounded by min/max — not product-specific, the
// cart page will reuse this exact component.
const QuantitySelector = ({ value, onChange, min = 1, max, className }: QuantitySelectorProps) => {
  const canDecrease = value > min;
  const canIncrease = max === undefined || value < max;

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-button border border-warm-beige',
        className
      )}
    >
      <button
        type="button"
        onClick={() => canDecrease && onChange(value - 1)}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center text-text/70 transition-colors hover:text-primary disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </button>

      <span className="w-10 text-center font-body text-sm text-text" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        onClick={() => canIncrease && onChange(value + 1)}
        disabled={!canIncrease}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center text-text/70 transition-colors hover:text-primary disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export { QuantitySelector };
