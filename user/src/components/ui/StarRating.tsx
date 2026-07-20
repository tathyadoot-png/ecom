import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
};

// Shared by ProductCard, the PDP header, and the reviews list.
const StarRating = ({ rating, size = 'sm', className }: StarRatingProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < Math.floor(rating || 0) ? 'fill-accent text-accent' : 'text-warm-beige'
          )}
        />
      ))}
    </div>
  );
};

export { StarRating };
