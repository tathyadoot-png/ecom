import { cn } from '@/lib/utils';

interface CountBadgeProps {
  count: number;
  className?: string;
}

// Small counter for icon links (cart, wishlist). Renders nothing at 0
// rather than showing an empty "0" badge. The ring creates a clean
// separation from the icon glyph sitting behind it, and min-w (with
// px-1 instead of a fixed w-4) keeps "9+" from clipping.
const CountBadge = ({ count, className }: CountBadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-cream ring-2 ring-cream',
        className
      )}
    >
      {count > 9 ? '9+' : count}
    </span>
  );
};

export { CountBadge };
