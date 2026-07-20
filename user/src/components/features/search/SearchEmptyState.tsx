import { SearchX } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

interface SearchEmptyStateProps {
  query: string;
}

const SearchEmptyState = ({ query }: SearchEmptyStateProps) => {
  return (
    <EmptyState
      icon={<SearchX className="mx-auto h-12 w-12" />}
      title={`No results for "${query}"`}
      description="Try a different search term, or browse our categories instead."
    />
  );
};

export { SearchEmptyState };
