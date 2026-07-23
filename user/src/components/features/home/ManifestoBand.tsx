import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { GRAIN_TEXTURE } from '@/lib/grainTexture';

// The one saturated color moment on the entire homepage — the Phase
// 8D.1 audit's single biggest color finding was that the Hero
// photograph's warm palette disappears the moment you scroll past it.
// This section exists purely to say the brand's point of view out
// loud, once, in its own deep oxblood, before the page returns to its
// quieter cream/background rhythm for everything after.
const ManifestoBand = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-26">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_TEXTURE }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-32 text-center">
          <Reveal variant="line" className="h-px w-14 bg-accent/70" />

          <Reveal
            as="p"
            delay={100}
            className="font-heading text-3xl font-light italic leading-snug text-cream sm:text-4xl md:text-5xl"
          >
            We don&rsquo;t sell products &mdash; we carry hands forward.
          </Reveal>

          <Reveal
            as="p"
            delay={220}
            className="max-w-md font-body text-sm leading-relaxed tracking-wide text-cream/60"
          >
            Every piece on this marketplace began in someone&rsquo;s workshop, not a factory line.
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default ManifestoBand;
