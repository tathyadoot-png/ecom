import { cn } from '@/lib/utils';

interface FilterGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Generic filter-section wrapper — title is optional so it also works
// for a single standalone control (e.g. one checkbox) without an
// empty heading.
const FilterGroup = ({ title, children, className }: FilterGroupProps) => {
  return (
    <div className={cn(className)}>
      {title && <h4 className="mb-2 font-body text-sm font-medium text-text/80">{title}</h4>}
      {children}
    </div>
  );
};

export { FilterGroup };
