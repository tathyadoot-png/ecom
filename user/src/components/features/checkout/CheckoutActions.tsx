import { Button } from '@/components/ui/Button';

interface CheckoutActionsProps {
  total: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const CheckoutActions = ({ total, isSubmitting, onSubmit }: CheckoutActionsProps) => {
  return (
    <Button variant="primary" size="medium" fullWidth isLoading={isSubmitting} onClick={onSubmit}>
      {isSubmitting ? 'Placing Order...' : `Place Order — ₹${total.toLocaleString('en-IN')}`}
    </Button>
  );
};

export { CheckoutActions };
