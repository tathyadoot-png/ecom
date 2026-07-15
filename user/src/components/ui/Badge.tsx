import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider font-body',
  {
    variants: {
      variant: {
        sale: 'bg-accent text-text',
        new: 'bg-forest text-cream',
        featured: 'bg-primary text-cream',
        'out-of-stock': 'bg-text/80 text-cream',
        pending: 'bg-warm-beige text-text/70',
        approved: 'bg-forest text-cream',
        rejected: 'bg-primary/80 text-cream',
      },
    },
    defaultVariants: {
      variant: 'sale',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
};

export { Badge, badgeVariants };