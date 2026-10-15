import { cn } from '@/utils/cn';

interface BrandImageProps {
  /** File stem in /public/assets, e.g. "sign-03" or "how-check". */
  name: string;
  /** REQUIRED, and translated. There is no such thing as an optional alt. */
  alt: string;
  /** Intrinsic size — reserves the box so the image never causes layout shift. */
  width: number;
  height: number;
  /**
   * The LCP image, if this page has one. Sets fetchpriority=high and eager
   * loading. At most ONE per page: marking everything high-priority is the same
   * as marking nothing.
   */
  priority?: boolean;
  className?: string;
}

/**
 * A generated brand illustration.
 *
 * These are SVG: they are geometry (see scripts/generate-assets.mjs), so they
 * are 4-30 KB, scale to any density for free, and never need a srcset. A raster
 * pipeline here would be all cost and no benefit.
 *
 * Everything below the hero is lazy and async-decoded; the hero opts in with
 * `priority`. width/height are always set, so the box is reserved before the
 * bytes arrive and the image contributes nothing to CLS.
 */
export function BrandImage({ name, alt, width, height, priority, className }: BrandImageProps) {
  return (
    <img
      src={`/assets/${name}.svg`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn('block h-auto w-full select-none', className)}
      draggable={false}
    />
  );
}

/* The former `AppScreenshot` (raster captures of the app) is gone: the only
   captures available were of the original Arabic UI, and the capture tooling
   is not part of this repo. Phone previews are now live English JSX — see
   `src/components/home/PreviewScreen.tsx`. */
