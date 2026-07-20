'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  HeartHandshake,
  Leaf,
  Award,
  Clock,
  ShieldCheck,
  Truck,
  CreditCard,
  Users,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

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

const WhyChoose = () => {
  return (
    <section className="py-20 bg-cream md:py-28">
      <Container>
        <SectionHeading
          title="Why Choose Indian Artisan"
          subtitle="We believe in creating a meaningful connection between you and the artisans"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, index) => (
            <Card
              key={index}
              padding="md"
              hoverable
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warm-beige/25 text-accent">
                <item.icon className="h-7 w-7" />
              </div>
              <h4 className="font-heading text-xl font-medium text-text">{item.title}</h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-text/60">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;