import { ArrowUpRight } from 'lucide-react';
import { Artisan } from '@/types/artisan.types';

interface ArtisanSocialLinksProps {
  socialLinks?: Artisan['socialLinks'];
}

const LABELS: { key: keyof NonNullable<Artisan['socialLinks']>; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'website', label: 'Website' },
];

// Plain text links, not brand-colored icon buttons — this reads as
// editorial credits at the end of a magazine feature, not an app's
// social-share row. Only rendered links that actually exist; the
// whole row disappears if none do.
const ArtisanSocialLinks = ({ socialLinks }: ArtisanSocialLinksProps) => {
  const links = LABELS.filter((item) => socialLinks?.[item.key]);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {links.map((item) => (
        <a
          key={item.key}
          href={socialLinks![item.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 font-body text-sm uppercase tracking-[0.1em] text-text/50 transition-colors hover:text-primary"
        >
          {item.label}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
};

export { ArtisanSocialLinks };
