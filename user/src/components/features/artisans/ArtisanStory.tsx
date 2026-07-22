import { Artisan } from '@/types/artisan.types';

interface ArtisanStoryProps {
  artisan: Artisan;
}

// Two independent, separately-omittable sections. A real artisan may
// have a long story and no philosophy line, or the reverse — neither
// is invented to fill a gap the other left.
const ArtisanStory = ({ artisan }: ArtisanStoryProps) => {
  if (!artisan.story && !artisan.craftPhilosophy) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-16">
      {artisan.story && (
        <div>
          <h2 className="font-heading text-3xl font-light text-text">The Story</h2>
          <p className="mt-6 whitespace-pre-line font-body text-lg leading-loose text-text/70">
            {artisan.story}
          </p>
        </div>
      )}

      {artisan.craftPhilosophy && (
        <div className="border-t border-warm-beige/40 pt-16 text-center">
          <span className="font-heading text-5xl leading-none text-accent">&ldquo;</span>
          <blockquote className="mt-2 font-heading text-2xl font-light italic leading-relaxed text-text/80">
            {artisan.craftPhilosophy}
          </blockquote>
          <span className="mt-4 block font-body text-xs uppercase tracking-[0.16em] text-text/40">
            Craft Philosophy
          </span>
        </div>
      )}
    </div>
  );
};

export { ArtisanStory };
