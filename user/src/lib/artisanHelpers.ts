import { Artisan } from '@/types/artisan.types';

// Shared by every homepage section that features "the" lead artisan
// (Featured Artisan, Inside the Workshop) so they deterministically
// agree on who that is — both call the same homepage-artisans endpoint
// and apply this same filter, so the first result is the same person
// in both places, continuing one story instead of introducing someone
// new mid-narrative.
export const hasEnoughContent = (artisan: Artisan): boolean =>
  Boolean(artisan.portraitImage || artisan.logo || artisan.craft || artisan.shortQuote);
