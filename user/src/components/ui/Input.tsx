import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block font-body text-xs font-medium uppercase tracking-[0.08em] text-text/50">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full rounded-input border border-warm-beige/70 bg-cream px-4 py-3.5 font-body text-text placeholder:text-text/35 transition-all duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-accent/25',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'border-primary/60 focus:border-primary focus:ring-primary/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="font-body text-sm text-primary">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
