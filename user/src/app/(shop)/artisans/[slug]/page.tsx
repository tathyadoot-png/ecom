import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/seo/JsonLd';
import { artisanService } from '@/services/artisan.service';
import { Artisan } from '@/types/artisan.types';
import { SITE } from '@/constants/site';
import { ArtisanProfileHero } from '@/components/features/artisans/ArtisanProfileHero';
import { ArtisanStory } from '@/components/features/artisans/ArtisanStory';
import { ArtisanGallery } from '@/components/features/artisans/ArtisanGallery';
import { ArtisanProductsSection } from '@/components/features/artisans/ArtisanProductsSection';
import { RelatedArtisans } from '@/components/features/artisans/RelatedArtisans';
import { ArtisanLocation } from '@/components/features/artisans/ArtisanLocation';
import { ArtisanSocialLinks } from '@/components/features/artisans/ArtisanSocialLinks';

interface ArtisanProfilePageProps {
  params: Promise<{ slug: string }>;
}

// Deduped across generateMetadata and the page body (same slug, same
// request) — matches the exact pattern the PDP already establishes.
const getArtisan = cache((slug: string) => artisanService.getArtisanBySlug(slug));

export async function generateMetadata({ params }: ArtisanProfilePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const artisan = await getArtisan(slug);
    const title = artisan.seo?.title || artisan.owner.name;
    const description =
      artisan.seo?.description ||
      artisan.shortQuote ||
      artisan.description ||
      `Meet ${artisan.owner.name}, an artisan on ${SITE.name}.`;
    const image = artisan.portraitImage || artisan.coverImage || artisan.logo;

    return {
      title,
      description,
      alternates: { canonical: `/artisans/${artisan.slug}` },
      openGraph: {
        title,
        description,
        url: `${SITE.url}/artisans/${artisan.slug}`,
        images: image ? [image] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return { title: 'Artisan Not Found' };
  }
}

// "Related" reads as same craft OR same state, capped at 4 — each
// query only runs when that field actually exists on this artisan, so
// a sparse profile never triggers an unfiltered (and therefore
// meaningless) "related" fetch.
async function getRelatedArtisans(artisan: Artisan): Promise<Artisan[]> {
  const queries: Promise<{ artisans: Artisan[] }>[] = [];
  if (artisan.craft) queries.push(artisanService.getArtisans({ craft: artisan.craft, limit: 5 }));
  if (artisan.state) queries.push(artisanService.getArtisans({ state: artisan.state, limit: 5 }));

  if (queries.length === 0) return [];

  const results = await Promise.all(queries);
  const merged = new Map<string, Artisan>();
  results.forEach((result) =>
    result.artisans.forEach((candidate) => {
      if (candidate._id !== artisan._id) merged.set(candidate._id, candidate);
    })
  );

  return Array.from(merged.values()).slice(0, 4);
}

export default async function ArtisanProfilePage({ params }: ArtisanProfilePageProps) {
  const { slug } = await params;

  let artisan: Artisan;
  try {
    artisan = await getArtisan(slug);
  } catch (error: any) {
    if (error?.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const [productsData, relatedArtisans] = await Promise.all([
    artisanService.getArtisanProducts(slug, { limit: 12 }).catch(() => null),
    getRelatedArtisans(artisan).catch(() => []),
  ]);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artisan.owner.name,
    description: artisan.shortQuote || artisan.description || undefined,
    image: artisan.portraitImage || artisan.logo || undefined,
    jobTitle: artisan.craft || undefined,
    address:
      artisan.city || artisan.state
        ? {
            '@type': 'PostalAddress',
            addressLocality: artisan.city || undefined,
            addressRegion: artisan.state || undefined,
            addressCountry: 'IN',
          }
        : undefined,
    url: `${SITE.url}/artisans/${artisan.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Meet the Makers', item: `${SITE.url}/artisans` },
      {
        '@type': 'ListItem',
        position: 3,
        name: artisan.owner.name,
        item: `${SITE.url}/artisans/${artisan.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="bg-background py-10 lg:py-14">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Meet the Makers', href: '/artisans' },
              { label: artisan.owner.name },
            ]}
            className="mb-10 lg:mb-14"
          />

          <ArtisanProfileHero artisan={artisan} />

          <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
            <ArtisanStory artisan={artisan} />

            {artisan.gallery && artisan.gallery.length > 0 && (
              <div>
                <h2 className="mb-10 text-center font-heading text-3xl font-light text-text">
                  The Workshop
                </h2>
                <ArtisanGallery images={artisan.gallery} name={artisan.owner.name} />
              </div>
            )}

            {productsData && (
              <ArtisanProductsSection name={artisan.owner.name} products={productsData.products} />
            )}

            <RelatedArtisans artisans={relatedArtisans} />

            {(artisan.city || artisan.state || artisan.village || artisan.googleMap) && (
              <ArtisanLocation artisan={artisan} />
            )}

            <ArtisanSocialLinks socialLinks={artisan.socialLinks} />
          </div>
        </Container>
      </section>
    </>
  );
}
