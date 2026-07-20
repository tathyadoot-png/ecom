import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'error' | 'success' | 'info';
  children: React.ReactNode;
  className?: string;
}

// Persistent, inline feedback for forms — pairs with toast (sonner)
// for transient success messages. Colors reuse the same semantic
// mapping Badge.tsx already established (primary = error, forest =
// success) rather than introducing new ones.
const variantStyles = {
  error: 'border-primary/30 bg-primary/10 text-primary',
  success: 'border-forest/30 bg-forest/10 text-forest',
  info: 'border-accent/30 bg-accent/10 text-text',
};

const variantIcons = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const Alert = ({ variant = 'info', children, className }: AlertProps) => {
  const Icon = variantIcons[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-2 rounded-input border px-4 py-3 text-sm font-body',
        variantStyles[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
};

export { Alert };
