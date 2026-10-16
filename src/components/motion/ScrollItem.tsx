import { useRef, type ComponentType, type ReactNode, type Ref } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  easeOut,
  type MotionStyle,
} from 'framer-motion';
import { cn } from '@/utils/cn';

type ScrollItemTag = 'div' | 'li' | 'article' | 'section';

interface ScrollItemProps {
  children: ReactNode;
  className?: string;
  /** The element to render. Use `li` inside a `ul`/`ol` to keep list semantics. */
  as?: ScrollItemTag;
  /** Anchor id, for items that are deep-linked to (e.g. `#sign-3`). */
  id?: string;
}

/**
 * A card/grid item that reacts to page scroll.
 *
 * As an item crosses the viewport it grows from 0.3 -> 1 at the midpoint, then
 * shrinks back to 0.3 and fades as it leaves, anchored to the edge it is exiting
 * (transformOrigin flips at the midpoint, where scale is 1, so the flip is
 * invisible). Only transform + opacity animate; the mapping is ease-out.
 *
 * This REPLACES the one-shot whileInView entrance on the grids it is used in —
 * both drive opacity, so they cannot coexist on one element.
 *
 * Scroll-linked MotionValues are invisible to <MotionConfig reducedMotion>, so
 * prefers-reduced-motion is handled here directly: the item then renders
 * statically at full size. Once fully faded it is taken out of hit-testing.
 */
export function ScrollItem({ children, className, as = 'div', id }: ScrollItemProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Extends past the viewport on both sides (1.5 viewports of travel) so the
    // grow/shrink is spread over more scroll — a slower, calmer rate than the
    // default `['start end', 'end start']`.
    offset: ['start 1.25', 'end -0.25'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3], { ease: easeOut });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0], { ease: easeOut });
  const transformOrigin = useTransform(scrollYProgress, (v) =>
    v < 0.5 ? 'center bottom' : 'center top',
  );
  const pointerEvents = useTransform(scrollYProgress, (v) =>
    v <= 0.05 || v >= 0.95 ? 'none' : 'auto',
  );

  const Tag = motion[as] as unknown as ComponentType<{
    ref?: Ref<HTMLElement>;
    className?: string;
    style?: MotionStyle;
    id?: string;
    children?: ReactNode;
  }>;

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(className)}
      style={prefersReduced ? undefined : { scale, opacity, transformOrigin, pointerEvents }}
    >
      {children}
    </Tag>
  );
}
