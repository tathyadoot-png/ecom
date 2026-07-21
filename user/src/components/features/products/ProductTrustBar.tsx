import { Truck, RotateCcw, ShieldCheck, BadgeCheck, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductTrustBarProps {
  className?: string;
}

// Generic site-level assurances (delivery/returns/payment/authenticity/
// handmade) — the same category of claim as the homepage's TrustStrip,
// not a per-product backend field, so nothing here is fabricated data.
const trustItems = [
  { icon: Truck, label: 'Free Shipping Above ₹999' },
  { icon: RotateCcw, label: '7-Day Easy Returns' },
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: BadgeCheck, label: 'Authentic & Original' },
  { icon: Hand, label: 'Handcrafted with Care' },
];

const ProductTrustBar = ({ className }: ProductTrustBarProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-3 border-y border-warm-beige/40 py-6 sm:grid-cols-3 lg:grid-cols-5',
        className
      )}
    >
      {trustItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5 text-text/55">
          <item.icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
          <span className="font-body text-xs leading-snug">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export { ProductTrustBar };
