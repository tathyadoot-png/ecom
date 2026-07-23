'use client';

import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { HeartHandshake, Leaf, Truck, ShieldCheck } from 'lucide-react';

// TrustStrip and WhyChoose used to say the same handful of things
// three separate times across the homepage (counting Hero's own
// checklist, now removed) — the Phase 8D.1 audit's clearest example of
// repetition. This is that message said once: four real claims, one
// quiet line, positioned beside the footer where reassurance belongs
// in the journey instead of competing with Hero for attention.
const assurances = [
  { icon: HeartHandshake, label: '100% Handmade' },
  { icon: Leaf, label: 'Sustainable & Fair Trade' },
  { icon: Truck, label: 'Free Shipping Above ₹999' },
  { icon: ShieldCheck, label: 'Secure Payments' },
];

const AssuranceStrip = () => {
  return (
    <section className="border-y border-warm-beige/20 bg-background py-32 md:py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
          {assurances.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <div className="flex items-center gap-2.5 text-text/55">
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="font-body text-xs uppercase tracking-widest">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AssuranceStrip;
