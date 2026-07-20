import { Card } from '@/components/ui/Card';
import { CartTotals } from './CartTotals';
import { CartActions } from './CartActions';

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
}

const CartSummary = ({ itemCount, subtotal }: CartSummaryProps) => {
  return (
    <Card className="sticky top-24 space-y-6">
      <h2 className="font-heading text-xl text-text">Order Summary</h2>
      <CartTotals itemCount={itemCount} subtotal={subtotal} />
      <CartActions />
    </Card>
  );
};

export { CartSummary };
