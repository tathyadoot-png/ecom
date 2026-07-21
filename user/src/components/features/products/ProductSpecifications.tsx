import { Product } from '@/types/product.types';

interface ProductSpecificationsProps {
  product: Product;
}

// The backend Product schema has no dedicated specifications field —
// this surfaces the structured facts that do exist rather than
// fabricating ones (material/dimensions/weight/color don't exist on
// the schema). Extend once the backend adds real spec fields. No
// card box — a plain hairline-divided list, consistent with the
// filter sidebar's treatment on the Listing page.
const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const categoryName =
    typeof product.category === 'object' ? product.category.name : undefined;

  const specs: Array<[string, string]> = [
    ...(categoryName ? ([['Category', categoryName]] as [string, string][]) : []),
    ['Availability', product.inventoryStatus === 'out_of_stock' ? 'Out of stock' : 'In stock'],
    ['SKU', product.slug],
  ];

  return (
    <div>
      <h3 className="mb-5 font-heading text-xl font-light text-text">Details</h3>
      <dl>
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-4 border-b border-warm-beige/40 py-3 font-body text-sm first:pt-0 last:border-0"
          >
            <dt className="text-text/50">{label}</dt>
            <dd className="text-right text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export { ProductSpecifications };
