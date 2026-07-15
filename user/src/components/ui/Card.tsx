import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ className, hoverable = false, padding = 'md', children, ...props }: CardProps) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  };

  return (
    <div
      className={cn(
        'rounded-card bg-cream shadow-soft transition-all duration-300',
        hoverable && 'hover:shadow-hover hover:-translate-y-1',
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