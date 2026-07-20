'use client';

import { Container } from '@/components/ui/Container';
import {
  Shield,
  Leaf,
  Truck,
  CreditCard,
  Headphones,
  HeartHandshake,
} from 'lucide-react';

const trustItems = [
  {
    icon: HeartHandshake,
    label: '100% Handmade',
    description: 'Products crafted with love',
  },
  {
    icon: Leaf,
    label: 'Eco-friendly & Fair Trade',
    description: 'Sustainable & ethical',
  },
  {
    icon: Truck,
    label: 'Free Shipping',
    description: 'On orders above ₹999',
  },
  {
    icon: CreditCard,
    label: 'Secure Payments',
    description: '100% safe & secure',
  },
  {
    icon: Headphones,
    label: '24/7 Support',
    description: "We're here to help",
  },
];

const TrustStrip = () => {
  return (
    <section className="border-y border-warm-beige/20 bg-cream py-10">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-warm-beige/20 text-accent">
                <item.icon className="h-5 w-5" />
              </div>
              <h4 className="font-heading text-base font-medium text-text">{item.label}</h4>
              <p className="font-body text-xs text-text/50">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustStrip;