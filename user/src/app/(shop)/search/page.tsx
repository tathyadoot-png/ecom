import type { Metadata } from 'next';
import { productService } from '@/services/product.service';
import { ProductFilters } from '@/types/product.types';
import { SearchResults } from '@/components/features/search/SearchResults';
import { SearchBar } from '@/components/features/search/SearchBar';
import { RecentSearches } from '@/components/features/search/RecentSearches';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: false },
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    category?: string;
    featured?: string;
    sort?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || '').trim();

  // No query yet — don't call getProducts with an empty search (the
  // backend just drops the filter and returns the whole catalog,
  // which would be a misleading "search" result). Prompt instead.
  if (!query) {
    return (
      <Container className="py-16">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <h1 className="font-heading text-3xl text-text">Search Products</h1>
          <SearchBar className="w-full" />
          <RecentSearches />
        </div>
      </Container>
    );
  }

  const filters: ProductFilters = {
    search: query,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 12,
    category: searchParams.category || '',
    featured: searchParams.featured === 'true' ? true : undefined,
    sort: (searchParams.sort as ProductFilters['sort']) || 'newest',
  };

  const initialData = await productService.getProducts(filters);

  return (
    <Container className="py-10">
      <SearchResults
        query={query}
        initialProducts={initialData.products}
        initialPagination={initialData.pagination}
        initialFilters={filters}
      />
    </Container>
  );
}
