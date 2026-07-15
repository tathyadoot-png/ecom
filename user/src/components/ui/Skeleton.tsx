import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({ className, variant = 'rect', width, height, ...props }: SkeletonProps) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-card',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-warm-beige/60',
        variantClasses[variant],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    />
  );
};

export { Skeleton };