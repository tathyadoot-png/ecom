import { Product } from '@/types/product.types';
import { ProductCard } from '@/components/ui/ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ products, columns = 4 }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text/60">No products found.</p>
      </div>
    );
  }

  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid gap-6 ${colClasses[columns]}`}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onWishlistToggle={(id) => console.log('Toggle wishlist', id)}
          onAddToCart={(id) => console.log('Add to cart', id)}
        />
      ))}
    </div>
  );
};

export { ProductGrid }; 