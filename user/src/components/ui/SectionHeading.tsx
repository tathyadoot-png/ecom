import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading = ({ title, subtitle, align = 'center', className }: SectionHeadingProps) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col gap-4', alignClasses[align], className)}>
      <h2 className="font-heading text-4xl font-light leading-tight text-text md:text-5xl">{title}</h2>
      <span className="h-px w-16 bg-accent" />
      {subtitle && (
        <p className="max-w-2xl font-body text-lg leading-relaxed text-text/60">{subtitle}</p>
      )}
    </div>
  );
};

export { SectionHeading };
