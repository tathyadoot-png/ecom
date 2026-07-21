'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  HeartHandshake,
  Leaf,
  Award,
  ShieldCheck,
  Truck,
  CreditCard,
} from 'lucide-react';

interface WhyItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const whyItems: WhyItem[] = [
  {
    icon: HeartHandshake,
    title: '100% Handmade',
    description: 'Every piece is crafted by skilled artisans with love and care.',
  },
  {
    icon: Leaf,
    title: 'Sustainable & Ethical',
    description: 'We support fair trade and eco-friendly practices.',
  },
  {
    icon: Award,
    title: 'Authentic Quality',
    description: 'Each product is verified for authenticity and craftsmanship.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Your transactions are 100% safe and protected.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders above ₹999.',
  },
  {
    icon: CreditCard,
    title: 'Easy Returns',
    description: 'Hassle-free returns within 7 days of delivery.',
  },
];

// Bordered, shadowed icon-in-a-circle cards read as a SaaS pricing-page
// feature grid — this replaces that with quiet, left-aligned blocks
// separated by a hairline rule, closer to an editorial list than a
// marketing module.
const WhyChoose = () => {
  return (
    <section className="py-20 bg-cream md:py-28">
      <Container>
        <SectionHeading
          title="Why Choose Indian Artisan"
          subtitle="We believe in creating a meaningful connection between you and the artisans"
        />
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, index) => (
            <div key={index} className="border-t border-warm-beige/40 pt-6">
              <item.icon className="h-5 w-5 text-primary/60" strokeWidth={1.5} />
              <h4 className="mt-4 font-heading text-2xl font-light text-text">{item.title}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-text/60">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;
