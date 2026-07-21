'use client';

import { Container } from '@/components/ui/Container';
import {
  Leaf,
  Truck,
  CreditCard,
  Headphones,
  HeartHandshake,
} from 'lucide-react';

const trustItems = [
  { icon: HeartHandshake, label: '100% Handmade' },
  { icon: Leaf, label: 'Eco-friendly & Fair Trade' },
  { icon: Truck, label: 'Free Shipping Above ₹999' },
  { icon: CreditCard, label: 'Secure Payments' },
  { icon: Headphones, label: '24/7 Support' },
];

// A quiet, single line of assurances — no circular icon badges, no
// accent color, no secondary description line. Small thin-stroke icons
// and hairline dividers, closer to a masthead credit line than a
// feature grid.
const TrustStrip = () => {
  return (
    <section className="border-y border-warm-beige/20 bg-cream py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 text-text/55">
              <item.icon className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
              <span className="font-body text-xs uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustStrip;
