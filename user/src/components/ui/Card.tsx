import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ className, hoverable = false, padding = 'md', children, ...props }: CardProps) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-5',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  };

  return (
    <div
      className={cn(
        'rounded-card border border-warm-beige/30 bg-cream shadow-soft transition-all duration-500 ease-out',
        hoverable && 'hover:-translate-y-1 hover:border-warm-beige/60 hover:shadow-lift',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card };
