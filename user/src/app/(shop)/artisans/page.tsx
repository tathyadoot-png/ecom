import type { Metadata } from 'next';
import { artisanService } from '@/services/artisan.service';
import { ArtisanFilters } from '@/types/artisan.types';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/constants/site';
import ArtisanDirectoryClient from '@/components/features/artisans/ArtisanDirectoryClient';

export const metadata: Metadata = {
  title: 'Meet the Makers',
  description:
    'Discover the artisans behind every handcrafted piece — their craft, their story, and the tradition they carry forward.',
  alternates: { canonical: '/artisans' },
  openGraph: {
    title: 'Meet the Makers | Indian Artisan Marketplace',
    description:
      'Discover the artisans behind every handcrafted piece — their craft, their story, and the tradition they carry forward.',
    url: `${SITE.url}/artisans`,
  },
  twitter: {
    card: 'summary',
    title: 'Meet the Makers | Indian Artisan Marketplace',
    description: 'Discover the artisans behind every handcrafted piece.',
  },
};

interface ArtisansPageProps {
  searchParams: Promise<{
    search?: string;
    state?: string;
    craft?: string;
    featured?: string;
    verified?: string;
    customOrders?: string;
    experienceMin?: string;
    sort?: string;
    limit?: string;
  }>;
}

export default async function ArtisansPage({ searchParams }: ArtisansPageProps) {
  const resolvedSearchParams = await searchParams;

  const filters: ArtisanFilters = {
    search: resolvedSearchParams.search || undefined,
    state: resolvedSearchParams.state || undefined,
    craft: resolvedSearchParams.craft || undefined,
    featured: resolvedSearchParams.featured === 'true' ? true : undefined,
    verified: resolvedSearchParams.verified === 'true' ? true : undefined,
    customOrders: resolvedSearchParams.customOrders === 'true' ? true : undefined,
    limit: resolvedSearchParams.limit ? Number(resolvedSearchParams.limit) : undefined,
    experienceMin: resolvedSearchParams.experienceMin
      ? Number(resolvedSearchParams.experienceMin)
      : undefined,
    sort: (resolvedSearchParams.sort as ArtisanFilters['sort']) || 'displayOrder',
  };

  const initialData = await artisanService.getArtisans(filters);

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Meet the Makers',
    description: 'Directory of artisans on the Indian Artisan Marketplace.',
    url: `${SITE.url}/artisans`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: initialData.pagination.total,
      itemListElement: initialData.artisans.slice(0, 12).map((artisan, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: artisan.owner.name,
        url: `${SITE.url}/artisans/${artisan.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Meet the Makers', item: `${SITE.url}/artisans` },
    ],
  };

  return (
    <>
      <JsonLd data={collectionPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section className="bg-background py-10 lg:py-14">
        <Container>
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Meet the Makers' }]}
            className="mb-10 lg:mb-14"
          />

          {/* Hero — text-only on purpose. No illustration, no banner:
              the artisans' own portraits below are the imagery. */}
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-5xl font-light leading-tight text-text sm:text-6xl">
              Meet the Makers
            </h1>
            <span className="mx-auto mt-5 block h-px w-16 bg-accent" />
            <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-text/60">
              Every craft on this marketplace belongs to someone whose name you can know, and
              whose story you can read. This is where their work begins — before the product,
              there is a person.
            </p>
          </div>

          <div className="mt-14">
            <ArtisanDirectoryClient
              initialArtisans={initialData.artisans}
              initialPagination={initialData.pagination}
              initialFilters={filters}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
