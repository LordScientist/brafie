import { useEffect, useMemo, useState } from 'react';

type Phase = 'typing' | 'holding' | 'erasing' | 'done';

interface UseTypewriterOptions {
  /** The complete text to type. */
  text: string;
  /** `false` renders the full text statically (the caller passes `!prefersReducedMotion`). */
  enabled?: boolean;
  /** How many times to type the text before settling on it. */
  cycles?: number;
  /** How long to hold the complete text before erasing, in ms. */
  holdMs?: number;
  /** Per-grapheme delay while typing, in ms. */
  typeMs?: number;
  /** Per-grapheme delay while erasing, in ms. */
  eraseMs?: number;
}

/**
 * Split a string into user-perceived characters.
 *
 * `Intl.Segmenter` at grapheme granularity is what makes this correct for every
 * language: splitting by code unit would tear apart Devanagari clusters, Arabic
 * ligatures and emoji. Falls back to code points where Segmenter is missing.
 *
 * The types below are declared locally because `tsconfig` targets ES2020, whose
 * lib predates `Intl.Segmenter` (ES2022).
 */
interface SegmentPart {
  segment: string;
}
interface GraphemeSegmenter {
  segment(input: string): Iterable<SegmentPart>;
}
interface SegmenterCtor {
  new (locales?: string | string[], options?: { granularity?: 'grapheme' | 'word' | 'sentence' }): GraphemeSegmenter;
}

export function segmentGraphemes(text: string): string[] {
  const Segmenter = (Intl as unknown as { Segmenter?: SegmenterCtor }).Segmenter;
  if (typeof Segmenter === 'function') {
    const segmenter = new Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (part) => part.segment);
  }
  return Array.from(text);
}

/**
 * The typewriter state machine.
 *
 * Types the text in one grapheme at a time, holds it, erases it and repeats —
 * for at most `cycles` passes, then settles on the complete text so the final
 * state is always readable. It never animates when `enabled` is false.
 *
 * Pausing: a timeout that fires while the tab is hidden re-schedules itself
 * instead of advancing, so the animation freezes in the background rather than
 * racing to the end and resuming mid-word.
 *
 * Returns the grapheme count to render, plus the segmented text, so the caller
 * can slice it (and colour a highlight) without re-segmenting.
 */
export function useTypewriter({
  text,
  enabled = true,
  cycles = 3,
  holdMs = 4000,
  typeMs = 55,
  eraseMs = 26,
}: UseTypewriterOptions) {
  const graphemes = useMemo(() => segmentGraphemes(text), [text]);
  const total = graphemes.length;

  const [count, setCount] = useState(enabled ? 0 : total);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setCount(total);
      setDone(true);
      return;
    }

    let alive = true;
    let timer = 0;
    let phase: Phase = 'typing';
    let shown = 0;
    let passes = 0;

    function schedule(delay: number) {
      timer = window.setTimeout(() => {
        if (!alive) return;
        if (document.visibilityState === 'visible') step();
        else schedule(400);
      }, delay);
    }

    function step() {
      if (!alive) return;

      if (phase === 'typing') {
        if (shown < total) {
          shown += 1;
          setCount(shown);
          schedule(typeMs);
        } else {
          phase = 'holding';
          schedule(holdMs);
        }
        return;
      }

      if (phase === 'holding') {
        passes += 1;
        if (passes >= cycles) {
          phase = 'done';
          setDone(true);
          setCount(total);
          return;
        }
        phase = 'erasing';
        schedule(eraseMs);
        return;
      }

      if (phase === 'erasing') {
        if (shown > 0) {
          shown -= 1;
          setCount(shown);
          schedule(eraseMs);
        } else {
          phase = 'typing';
          schedule(typeMs);
        }
      }
    }

    schedule(typeMs);

    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, [enabled, total, cycles, holdMs, typeMs, eraseMs]);

  return { count, total, graphemes, done };
}
