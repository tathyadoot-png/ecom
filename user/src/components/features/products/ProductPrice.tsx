import { Price } from '@/components/ui/Price';

interface ProductPriceProps {
  price: number;
  salePrice: number;
}

// The discount reads as quiet text, not a colored pill — the brief is
// explicit that this page should never feel like a flash sale.
const ProductPrice = ({ price, salePrice }: ProductPriceProps) => {
  const hasSale = salePrice > 0 && salePrice < price;
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <div className="flex items-baseline gap-3">
      <Price
        amount={hasSale ? salePrice : price}
        compareAt={hasSale ? price : undefined}
        size="lg"
      />
      {hasSale && (
        <span className="font-body text-sm text-terracotta">{discountPercent}% off</span>
      )}
    </div>
  );
};

export { ProductPrice };
