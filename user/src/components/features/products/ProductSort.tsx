'use client';

interface ProductSortProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  // future: { value: 'popular', label: 'Popularity' },
  // future: { value: 'rating', label: 'Top Rated' },
];

const ProductSort = ({ currentSort, onSortChange }: ProductSortProps) => {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="rounded-button border border-warm-beige bg-cream px-4 py-2 text-sm font-body text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { ProductSort };