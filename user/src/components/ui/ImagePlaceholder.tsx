import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  className?: string;
}

// No product/category photography exists as a static asset in this
// project, so a fallback image path (e.g. "/images/fallback-product.jpg")
// just 404s. This renders in its place instead of pointing at a file
// that doesn't exist.
const ImagePlaceholder = ({ className }: ImagePlaceholderProps) => {
  return (
    <div className={cn('flex items-center justify-center bg-warm-beige/30 text-text/30', className)}>
      <ImageOff className="h-1/4 w-1/4" />
    </div>
  );
};

export { ImagePlaceholder };
