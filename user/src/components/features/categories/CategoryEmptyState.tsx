import { PackageSearch } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

interface CategoryEmptyStateProps {
  categoryName: string;
}

const CategoryEmptyState = ({ categoryName }: CategoryEmptyStateProps) => {
  return (
    <EmptyState
      icon={<PackageSearch className="mx-auto h-10 w-10" />}
      title={`No products in ${categoryName} yet`}
      description="Check back soon, or explore other categories in the meantime."
    />
  );
};

export { CategoryEmptyState };
