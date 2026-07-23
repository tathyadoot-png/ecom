'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms — pass index * 90 (or similar) for sequential reveals within a list. */
  delay?: number;
  /** 'rise' fades up (default, for text/cards); 'mask' clips upward from a hard edge (full-bleed imagery); 'line' scales in horizontally from center (hairline dividers). */
  variant?: 'rise' | 'mask' | 'line';
  once?: boolean;
}

// One shared scroll-reveal primitive for the whole homepage rebuild,
// rather than a bespoke IntersectionObserver per section. CSS
// transitions do the actual animating (not JS-driven frames), so
// globals.css's `prefers-reduced-motion` block — which zeroes every
// transition-duration — silences this automatically with no extra
// logic needed here.
const Reveal = ({ children, as: Tag = 'div', className, delay = 0, variant = 'rise', once = true }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      // threshold 0 — not the 0.15 this started with. For elements
      // taller than the viewport (the mask-revealed portraits this
      // component was actually built for), Chromium's
      // intersectionRatio can get stuck reporting ~0 even once the
      // element is genuinely on screen, so a >0 threshold silently
      // never crosses it and the reveal never fires (confirmed via
      // direct IntersectionObserver instrumentation — isIntersecting
      // flips to true correctly at threshold 0, ratio stays 0
      // regardless). threshold 0 fires on any intersection at all,
      // sidestepping the ratio bug entirely.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all ease-out',
        variant === 'rise' && 'duration-700',
        variant === 'rise' && (inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'),
        variant === 'mask' && 'duration-1000',
        variant === 'mask' && (inView ? 'clip-path-reveal-open' : 'clip-path-reveal-closed'),
        variant === 'line' && 'origin-center duration-1100',
        variant === 'line' && (inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'),
        className
      )}
    >
      {children}
    </Tag>
  );
};

export { Reveal };
