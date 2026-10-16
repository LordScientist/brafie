import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift — use for clickable cards. */
  interactive?: boolean;
  /** Frosted-glass background instead of solid. */
  glass?: boolean;
  padded?: boolean;
}

/** Soft, rounded surface — the building block for most of the UI. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, glass, padded = true, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl border border-line shadow-petal',
        glass ? 'glass' : 'bg-card',
        padded && 'p-5',
        interactive &&
          'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-petal-lg active:translate-y-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
