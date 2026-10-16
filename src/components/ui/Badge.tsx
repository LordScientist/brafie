import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'primary' | 'high' | 'medium' | 'low' | 'neutral' | 'info';

interface BadgeProps {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const TONES: Record<Tone, string> = {
  primary: 'bg-accent-soft text-accent-text',
  high: 'bg-attention-soft text-attention-text',
  medium: 'bg-warn-soft text-warn-text',
  low: 'bg-calm-soft text-calm-text',
  info: 'bg-info-soft text-info-text',
  neutral: 'bg-sunken text-muted',
};

/** Small status pill. */
export function Badge({ tone = 'primary', icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
