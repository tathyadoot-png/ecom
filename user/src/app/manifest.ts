import { MetadataRoute } from 'next';
import { SITE } from '@/constants/site';

// Colors match the real design tokens in globals.css (--color-background,
// --color-primary), not invented ones. logo.png is the only brand icon
// asset that actually exists — reused as-is rather than fabricating
// resized icon files.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: 'Indian Artisan',
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F1E8',
    theme_color: '#8B2C1D',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
