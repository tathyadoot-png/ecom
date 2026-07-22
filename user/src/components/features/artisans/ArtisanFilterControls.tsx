'use client';

import { ArtisanFilters } from '@/types/artisan.types';
import { cn } from '@/lib/utils';

interface ArtisanFilterControlsProps {
  filters: ArtisanFilters;
  onChange: (partial: Partial<ArtisanFilters>) => void;
  layout?: 'bar' | 'sheet';
}

const EXPERIENCE_OPTIONS = [
  { label: 'Any Experience', value: '' },
  { label: '5+ Years', value: '5' },
  { label: '10+ Years', value: '10' },
  { label: '20+ Years', value: '20' },
];

// Same toggle-switch treatment already established in
// ProductFilterSidebar (Phase 5B) — reused verbatim for visual
// consistency rather than inventing a second switch style.
const ToggleField = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex items-center justify-between gap-3 py-1"
  >
    <span className="font-body text-sm text-text/70">{label}</span>
    <span
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-300',
        checked ? 'bg-primary' : 'bg-warm-beige'
      )}
    >
      <span
        className={cn(
          'inline-block h-3.5 w-3.5 transform rounded-full bg-cream shadow-soft transition-transform duration-300',
          checked ? 'translate-x-4.5' : 'translate-x-0.75'
        )}
      />
    </span>
  </button>
);

// Shared between the desktop horizontal bar and the mobile
// FilterSheet — same fields, only the surrounding layout differs.
const ArtisanFilterControls = ({ filters, onChange, layout = 'bar' }: ArtisanFilterControlsProps) => {
  return (
    <div
      className={cn(
        layout === 'bar'
          ? 'flex flex-wrap items-center gap-x-6 gap-y-4'
          : 'flex flex-col gap-6'
      )}
    >
      <div className={cn('flex flex-wrap gap-3', layout === 'sheet' && 'flex-col gap-4')}>
        <input
          type="text"
          value={filters.craft || ''}
          onChange={(e) => onChange({ craft: e.target.value || undefined })}
          placeholder="Craft (e.g. Pottery)"
          className="w-full max-w-[180px] rounded-button border border-warm-beige bg-cream px-4 py-2 font-body text-sm text-text placeholder:text-text/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <input
          type="text"
          value={filters.state || ''}
          onChange={(e) => onChange({ state: e.target.value || undefined })}
          placeholder="State (e.g. Rajasthan)"
          className="w-full max-w-[180px] rounded-button border border-warm-beige bg-cream px-4 py-2 font-body text-sm text-text placeholder:text-text/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={filters.experienceMin ? String(filters.experienceMin) : ''}
          onChange={(e) => onChange({ experienceMin: e.target.value ? Number(e.target.value) : undefined })}
          className="rounded-button border border-warm-beige bg-cream px-4 py-2 font-body text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          {EXPERIENCE_OPTIONS.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={cn('flex flex-wrap gap-x-6 gap-y-3', layout === 'sheet' && 'flex-col gap-y-4 border-t border-warm-beige/40 pt-4')}>
        <ToggleField
          label="Featured"
          checked={!!filters.featured}
          onChange={(checked) => onChange({ featured: checked || undefined })}
        />
        <ToggleField
          label="Verified"
          checked={!!filters.verified}
          onChange={(checked) => onChange({ verified: checked || undefined })}
        />
        <ToggleField
          label="Custom Orders"
          checked={!!filters.customOrders}
          onChange={(checked) => onChange({ customOrders: checked || undefined })}
        />
      </div>
    </div>
  );
};

export { ArtisanFilterControls };
