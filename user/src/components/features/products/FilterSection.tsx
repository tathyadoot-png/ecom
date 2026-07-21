'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

// A collapsible filter section built on a CSS grid-rows transition
// (0fr -> 1fr) rather than measured JS height — smooth without a
// animation library, and without the layout thrash of max-height
// tricks. Only Category and Featured use this today, but the shape
// is generic so future sections (once the backend supports them)
// slot in without touching the surrounding sidebar layout.
const FilterSection = ({ title, children, defaultOpen = true, className }: FilterSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('border-b border-warm-beige/40 pb-6', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between font-body text-sm font-medium tracking-wide text-text"
      >
        {title}
        <ChevronDown
          className={cn('h-3.5 w-3.5 text-text/40 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { FilterSection };
