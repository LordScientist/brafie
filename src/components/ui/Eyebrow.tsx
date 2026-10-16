import type { ReactNode } from 'react';
import { RibbonMark } from '@/components/ui/RibbonMark';
import { cn } from '@/utils/cn';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/**
 * A page eyebrow: a quiet label that sits above an h1.
 *
 * Plain text with the ribbon mark — no pill, no translucent fill, no blur, no
 * shadow. The frosted chip was the generic part; the words and the brand mark
 * are the design. Left as a line so it reads as a label, not a control.
 *
 * @example
 * <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-caption font-bold text-accent-text', className)}>
      <RibbonMark tone="current" size={16} className="shrink-0" />
      {children}
    </span>
  );
}
