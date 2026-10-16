import { useReducedMotion } from 'framer-motion';
import { segmentGraphemes, useTypewriter } from '@/hooks/useTypewriter';
import { cn } from '@/utils/cn';

interface HeroHeadlineProps {
  /** The lead-in, rendered in the default ink colour. */
  title: string;
  /** The tail, rendered in the brand accent colour. */
  highlight: string;
  className?: string;
}

/**
 * The home hero headline, typed out by a typewriter effect.
 *
 * Three rules keep it honest:
 * - The complete headline lives once in the DOM for screen readers (`sr-only`);
 *   every animated copy is `aria-hidden`, so assistive tech never hears it
 *   re-typing.
 * - An invisible copy of the full headline reserves its height from the first
 *   paint, so the typing never shifts the layout.
 * - Reduced motion skips the effect entirely: the static headline, no caret.
 *
 * Returning to the page remounts this component, so the animation restarts.
 */
export function HeroHeadline({ title, highlight, className }: HeroHeadlineProps) {
  const prefersReduced = useReducedMotion();
  const full = `${title} ${highlight}`;
  const { count, graphemes, done } = useTypewriter({ text: full, enabled: !prefersReduced });

  // The grapheme index where the accent-coloured half begins.
  const split = segmentGraphemes(`${title} `).length;
  const lead = graphemes.slice(0, Math.min(count, split)).join('');
  const tail = count > split ? graphemes.slice(split, count).join('') : '';

  return (
    <h1 className={cn('relative text-balance text-display text-ink', className)}>
      <span className="sr-only">{full}</span>

      {/* Reserves the full height so the typing never moves the page. */}
      <span aria-hidden className="invisible">
        {title} <span className="text-accent-text">{highlight}</span>
      </span>

      {/* The visible copy, overlaid on the reserved space. */}
      <span aria-hidden className="absolute inset-0">
        {lead}
        <span className="text-accent-text">{tail}</span>
        {!done && !prefersReduced && (
          <span className="ms-0.5 inline-block h-[0.85em] w-[3px] -translate-y-[0.06em] rounded-full bg-accent-text align-middle motion-safe:animate-caret" />
        )}
      </span>
    </h1>
  );
}
