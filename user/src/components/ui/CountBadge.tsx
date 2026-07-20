import { cn } from '@/lib/utils';

interface CountBadgeProps {
  count: number;
  className?: string;
}

// Small absolutely-positioned counter for icon links (cart, wishlist).
// Renders nothing at 0 rather than showing an empty "0" badge.
const CountBadge = ({ count, className }: CountBadgeProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-cream',
        className
      )}
    >
      {count > 9 ? '9+' : count}
    </span>
  );
};

export { CountBadge };
