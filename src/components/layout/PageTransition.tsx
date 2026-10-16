import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE_SOFT } from '@/motion/motion';

/**
 * The page-to-page transition.
 *
 * Opacity and transform ONLY. This used to animate `filter: blur(8px) → 0` on
 * every navigation, which looks lovely on a laptop and forces the compositor to
 * re-rasterise the entire page on every frame of every route change. On a
 * mid-range Android — most of the people this app is for — that is the
 * difference between a transition and a stutter.
 *
 * Reduced motion is handled by <MotionConfig reducedMotion="user"> in App.tsx:
 * the rise is dropped and the cross-fade remains.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: DURATION.base, ease: EASE_SOFT }}
      /* The Footer owns the bottom-nav clearance (pb-28), so main only needs
         breathing room before it.

         Mobile gutter: the pages' inner panel (`.ds-scope` / the page's top
         card) is this column's content box, so its width IS the column width.
         At 24px a side that panel was only ~87% of a phone and read as a narrow
         slab. 2.5vw a side puts it at ~95% with balanced margins, while ≥sm
         keeps the original 24px so the desktop layout is untouched.

         Mobile breathing room: a 2vh top/bottom inset keeps the panel ~2% away
         from the sticky navbar and the footer below. `.ds-scope` then stretches
         to fill whatever is left (see design-scope.css) and pads its own content
         so nothing sits flush to the panel edge. ≥sm keeps the original
         24px/48px so the desktop layout is untouched. */
      className="mx-auto w-full max-w-content px-[2.5vw] pb-[2vh] pt-[2vh] sm:px-6 sm:pb-12 sm:pt-6"
    >
      {children}
    </motion.main>
  );
}
