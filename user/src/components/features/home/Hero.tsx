'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden ">
      {/* Background Image - full bleed, no card */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/herobg.png"
          alt="Indian artisan at work"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle overlay to enhance text readability */}
        
      </div>

      <Container className="relative z-10 flex h-full min-h-[90vh] items-center">
        <div className="max-w-2xl space-y-6 pt-12 md:pt-0">
          {/* Decorative element */}
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <span className="text-sm font-medium tracking-widest text-text/60 uppercase font-body">
              Handcrafted. Heartfelt.
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-text">
            Rooted in India.
          </h1>

          <p className="text-lg md:text-xl text-text/80 max-w-md font-body leading-relaxed">
            Discover timeless treasures made by skilled hands, inspired by tradition.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/products">
              <Button variant="primary" size="large">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="large">
                Explore Categories
              </Button>
            </Link>
          </div>

          {/* Trust Strip mini – shown on hero for quick assurance */}
          <div className="flex flex-wrap gap-6 pt-8 text-sm text-text/60">
            <span className="flex items-center gap-2">
              <span className="text-accent">✓</span> Authentic & Original
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">✓</span> Sustainable & Ethical
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">✓</span> Free Shipping
            </span>
          </div>
        </div>
      </Container>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L60 70C120 80 240 100 360 95C480 90 600 60 720 55C840 50 960 70 1080 80C1200 90 1320 90 1380 90L1440 90V120H0V60Z"
            fill="#F7F1E8"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;