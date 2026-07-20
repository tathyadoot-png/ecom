import { Product } from '@/types/product.types';
import { WishlistItem } from './WishlistItem';

interface WishlistGridProps {
  products: Product[];
}

const WishlistGrid = ({ products }: WishlistGridProps) => {
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <WishlistItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export { WishlistGrid };
