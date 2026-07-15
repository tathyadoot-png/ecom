import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading = ({ title, subtitle, align = 'center', className }: SectionHeadingProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('space-y-4', alignClasses[align], className)}>
      <h2 className="text-4xl md:text-5xl font-heading text-text">{title}</h2>
      {subtitle && <p className="text-lg text-text/70 font-body max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export { SectionHeading };