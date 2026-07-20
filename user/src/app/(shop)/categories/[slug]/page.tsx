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
import { ProductFilters } from '@/types/product.types';

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

  return (
    <>
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
