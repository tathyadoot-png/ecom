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
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && <div className="mb-6 text-6xl text-accent">{icon}</div>}
      <h3 className="text-2xl font-heading text-text">{title}</h3>
      {description && <p className="mt-2 text-text/70 max-w-sm">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
};

export { EmptyState };