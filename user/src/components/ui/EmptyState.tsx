import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = ({ icon, title, description, action, className }: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-20 text-center', className)}>
      {icon && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-warm-beige/25 text-primary/70">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-3xl font-light text-text">{title}</h3>
      {description && (
        <p className="mt-3 max-w-sm font-body leading-relaxed text-text/60">{description}</p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
};

export { EmptyState };
