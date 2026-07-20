import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CategoryBanner } from '@/components/features/categories/CategoryBanner';
import { CategorySidebar } from '@/components/features/categories/CategorySidebar';
import { CategoryProductsClient } from '@/components/features/categories/CategoryProductsClient';
import { categoryService } from '@/services/category.service';
import { productService } from '@/services/product.service';
import { JsonLd } from '@/components/seo/JsonLd';
import { ProductFilters } from '@/types/product.types';
import { SITE } from '@/constants/site';

interface CategoryDetailPageProps {
  params: { slug: string };
  searchParams: {
    page?: string;
    featured?: string;
    sort?: string;
  };
}

// The backend has no single-category-by-slug endpoint — only
// GET /categories (the full list). This resolves one slug against
// that list. Deduped across generateMetadata and the page body.
const getCategoryBySlug = cache(async (slug: string) => {
  const categories = await categoryService.getCategories();
  return categories.find((category) => category.slug === slug) || null;
});

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  // Only real backend fields — no synthesized fallback copy.
  const title = category.seo?.title || category.name;
  const description = category.seo?.description || category.description || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      images: category.image ? [category.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category.image ? [category.image] : undefined,
    },
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: CategoryDetailPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const filters: ProductFilters = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 12,
    category: category._id,
    featured: searchParams.featured === 'true' ? true : undefined,
    sort: (searchParams.sort as ProductFilters['sort']) || 'newest',
  };

  const initialData = await productService.getProducts(filters);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: `${SITE.url}/categories` },
      { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE.url}/categories/${category.slug}` },
    ],
  };

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description || undefined,
    url: `${SITE.url}/categories/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: initialData.pagination.total,
      itemListElement: initialData.products.slice(0, 12).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/products/${product.slug}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionPageJsonLd} />
      <CategoryBanner category={category} productCount={initialData.pagination.total} />

      <Container className="py-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: category.name },
          ]}
        />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-64">
            <CategorySidebar activeSlug={category.slug} />
          </aside>

          <div className="flex-1">
            <CategoryProductsClient
              category={category}
              initialProducts={initialData.products}
              initialPagination={initialData.pagination}
              initialFilters={filters}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
