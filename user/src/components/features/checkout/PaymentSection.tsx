import { Banknote, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { PaymentMethod } from '@/types/order.types';

interface PaymentSectionProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const OPTIONS: { value: PaymentMethod; label: string; description: string; icon: typeof Banknote }[] = [
  { value: 'RAZORPAY', label: 'Pay Online', description: 'Cards, UPI, netbanking via Razorpay', icon: CreditCard },
  { value: 'COD', label: 'Cash on Delivery', description: 'Pay when your order arrives', icon: Banknote },
];

const PaymentSection = ({ value, onChange }: PaymentSectionProps) => {
  return (
    <Card className="space-y-4">
      <h2 className="font-heading text-xl text-text">Payment Method</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={cn(
                'flex items-start gap-3 rounded-input border-2 p-4 text-left transition-colors',
                isSelected ? 'border-primary bg-primary/5' : 'border-warm-beige hover:border-primary/40'
              )}
            >
              <Icon className={cn('mt-0.5 h-5 w-5', isSelected ? 'text-primary' : 'text-text/50')} />
              <div>
                <p className="font-body text-sm font-medium text-text">{option.label}</p>
                <p className="mt-0.5 text-xs text-text/60 font-body">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export { PaymentSection };
