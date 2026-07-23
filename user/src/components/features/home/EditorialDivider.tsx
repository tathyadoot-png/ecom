import { Reveal } from '@/components/ui/Reveal';

// A deliberately small transitional beat, not a section — a few
// seconds of quiet between Hero's photograph and the Manifesto Band's
// bold color statement, so that statement lands as a change of scene
// rather than the next block in a stack. A self-drawing hairline is
// the entire content; there is nothing here that needs a heading.
const EditorialDivider = () => {
  return (
    <div className="flex items-center justify-center gap-5 bg-background py-14 md:py-20">
      <Reveal variant="line" className="h-px w-64 bg-warm-beige/60 md:w-[96px]" />
      <Reveal delay={120} className="font-heading text-sm italic tracking-wide text-text/40">
        every piece begins with a hand
      </Reveal>
      <Reveal variant="line" delay={80} className="h-px w-64 bg-warm-beige/60 md:w-[96px]" />
    </div>
  );
};

export default EditorialDivider;
