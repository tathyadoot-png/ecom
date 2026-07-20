import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  compareAt?: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Serif numerals for the live price (a common luxury-retail cue) —
// the strikethrough compare price stays in body type, smaller and
// muted, so the hierarchy reads correctly at a glance.
const Price = ({ amount, compareAt, currency = '₹', className, size = 'md' }: PriceProps) => {
  const amountSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const compareSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-baseline gap-2.5', className)}>
      <span className={cn('font-heading font-medium text-text', amountSizeClasses[size])}>
        {currency}
        {amount.toLocaleString('en-IN')}
      </span>
      {compareAt && compareAt > amount && (
        <span className={cn('font-body text-text/40 line-through', compareSizeClasses[size])}>
          {currency}
          {compareAt.toLocaleString('en-IN')}
        </span>
      )}
    </div>
  );
};

export { Price };
