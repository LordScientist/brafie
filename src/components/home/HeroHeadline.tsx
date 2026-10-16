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
 * The text never reflows while typing: every grapheme is rendered from the first
 * paint and the unrevealed ones are simply `invisible`, so they still occupy
 * their final space and the line breaks are fixed. The caret is taken out of
 * flow and pinned to the end of the last revealed grapheme, so it travels along
 * the finished lines instead of pushing the text around.
 *
 * Three rules keep it honest:
 * - The complete headline lives once in the DOM for screen readers (`sr-only`);
 *   the animated copy is `aria-hidden`, so assistive tech never hears it
 *   re-typing.
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
  const showCaret = !done && !prefersReduced;

  return (
    <h1 className={cn('text-balance text-display text-ink', className)}>
      <span className="sr-only">{full}</span>

      <span aria-hidden>
        {showCaret && count === 0 && (
          <span className="me-0.5 inline-block h-[0.85em] w-[3px] -translate-y-[0.06em] rounded-full bg-accent-text align-middle motion-safe:animate-caret" />
        )}

        {graphemes.map((grapheme, i) => {
          const isLast = i === count - 1;
          return (
            <span
              key={i}
              className={cn(
                i >= split && 'text-accent-text',
                i >= count && 'invisible',
                isLast && 'relative',
              )}
            >
              {grapheme}
              {showCaret && isLast && (
                <span className="pointer-events-none absolute start-full top-1/2 h-[0.85em] w-[3px] -translate-y-1/2 rounded-full bg-accent-text motion-safe:animate-caret" />
              )}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
