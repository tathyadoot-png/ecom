import { Price } from '@/components/ui/Price';
import { Badge } from '@/components/ui/Badge';

interface ProductPriceProps {
  price: number;
  salePrice: number;
}

const ProductPrice = ({ price, salePrice }: ProductPriceProps) => {
  const hasSale = salePrice > 0 && salePrice < price;
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <Price
        amount={hasSale ? salePrice : price}
        compareAt={hasSale ? price : undefined}
        size="lg"
      />
      {hasSale && <Badge variant="sale">{discountPercent}% off</Badge>}
    </div>
  );
};

export { ProductPrice };
