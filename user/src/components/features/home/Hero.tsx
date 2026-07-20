'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/constants/site';

// A technical noise texture (SVG feTurbulence), not decorative
// artwork — generated, not an asset, kept at near-zero opacity below
// so it reads as paper-grain warmth rather than a visible pattern.
const GRAIN_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-background py-16 lg:py-20">
      {/* Grain — adds warmth to the flat background color, nothing more */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_TEXTURE }}
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Asymmetric editorial grid — 5/12 text, 7/12 image */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Text column */}
          <div className="animate-fade-in flex flex-col gap-7 lg:col-span-5">
            {/* Luxury label */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-text/50">
                {SITE.name}
              </span>
            </div>

            {/* Headline — one flowing sentence broken across lines,
                not three declarative slogan fragments. */}
            <h1 className="font-heading text-5xl font-light leading-[1.15] text-text sm:text-6xl lg:text-7xl">
              Made by hand,
              <br />
              carried by story —
              <br />
              rooted in India.
            </h1>

            {/* Supporting copy — a quiet statement, not an imperative
                sales line. */}
            <p className="max-w-sm font-body text-lg leading-relaxed text-text/60">
              Each piece is shaped slowly, and made to be kept.
            </p>

            {/* Primary CTA */}
            <div className="pt-1">
              <Link href="/products">
                <Button variant="primary" size="large">
                  Shop the Collection
                </Button>
              </Link>
            </div>

            {/* Secondary CTA — visibly subordinate */}
            <Link
              href="/categories"
              className="group flex w-fit items-center gap-1.5 border-t border-warm-beige/30 pt-4 font-body text-xs text-text/45 transition-colors duration-200 hover:text-primary"
            >
              Explore Categories
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Trust strip mini — untouched, redesign deferred. The
                icon+text split into two explicit spans (rather than an
                icon element followed by loose text on the same line)
                fixes a pre-existing SSR/CSR hydration mismatch — the
                gap gets handled by flex `gap-1.5`, not a literal space
                character in the text node. */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-body text-sm text-text/50">
              <span className="flex items-center gap-1.5">
                <span className="text-accent">&#10003;</span>
                <span>Authentic &amp; Original</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">&#10003;</span>
                <span>Sustainable &amp; Ethical</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">&#10003;</span>
                <span>Free Shipping</span>
              </span>
            </div>
          </div>

          {/* Image column — mounted like a print: a cream mat, a thin
              hairline border, and only a whisper of corner rounding on
              the photograph itself, rather than a big soft app-card
              radius. This is what makes it read as a photograph placed
              on the page, not a rounded image. */}
          <div className="lg:col-span-7">
            <div className="border border-warm-beige/50 bg-cream p-3 shadow-medium sm:p-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px]">
                {/* Desktop crop */}
                <Image
                  src="/hero/herobg.png"
                  alt="Indian artisan at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="hidden object-cover object-center lg:block"
                />
                {/* Dedicated mobile/tablet crop */}
                <Image
                  src="/hero/herobgmobile.png"
                  alt="Indian artisan at work"
                  fill
                  priority
                  sizes="100vw"
                  className="block object-cover object-center lg:hidden"
                />
                {/* Radial vignette — photographic depth, not a
                    legibility fade */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(36,28,21,0.28)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
