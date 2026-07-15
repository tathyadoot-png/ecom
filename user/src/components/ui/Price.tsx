import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  compareAt?: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Price = ({ amount, compareAt, currency = '₹', className, size = 'md' }: PriceProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  };

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-semibold text-text', sizeClasses[size])}>
        {currency}
        {amount.toLocaleString('en-IN')}
      </span>
      {compareAt && compareAt > amount && (
        <span className={cn('line-through text-text/50', sizeClasses[size])}>
          {currency}
          {compareAt.toLocaleString('en-IN')}
        </span>
      )}
    </div>
  );
};

export { Price };