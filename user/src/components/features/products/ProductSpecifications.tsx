import { Card } from '@/components/ui/Card';
import { Product } from '@/types/product.types';

interface ProductSpecificationsProps {
  product: Product;
}

// The backend Product schema has no dedicated specifications field —
// this surfaces the structured facts that do exist rather than
// fabricating ones. Extend once the backend adds real spec fields
// (materials, dimensions, etc. — natural fit for a handcrafted-goods
// marketplace).
const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const categoryName =
    typeof product.category === 'object' ? product.category.name : undefined;

  const specs: Array<[string, string]> = [
    ...(categoryName ? ([['Category', categoryName]] as [string, string][]) : []),
    ['Availability', product.inventoryStatus === 'out_of_stock' ? 'Out of stock' : 'In stock'],
    ['SKU', product.slug],
  ];

  return (
    <Card padding="md" className="h-fit">
      <h3 className="mb-4 font-heading text-lg text-text">Product Details</h3>
      <dl className="space-y-3">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-b border-warm-beige/40 pb-3 font-body text-sm last:border-0 last:pb-0"
          >
            <dt className="text-text/50">{label}</dt>
            <dd className="text-right text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
};

export { ProductSpecifications };
