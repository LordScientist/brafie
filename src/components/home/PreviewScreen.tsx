import type { ReactNode } from 'react';
import { Bell, Bot, HeartPulse, Home, LibraryBig, Lock, ShieldCheck } from 'lucide-react';
import { BrandImage } from '@/components/ui/BrandImage';
import { RibbonMark } from '@/components/ui/RibbonMark';
import { cn } from '@/utils/cn';

/**
 * An English, live-JSX phone screen used inside `PhoneMockup` on the marketing
 * surfaces (home hero + self-check preview).
 *
 * These were previously raster screenshots of the app — but the only captures
 * available were of the original Arabic interface, and the capture tooling is
 * not part of this repo. Rather than ship screenshots in the wrong language,
 * the screens are drawn here from the app's own design tokens and English copy.
 * Being JSX, they are editable, translatable and can never go stale the way a
 * bitmap does. The mock is decorative, so the whole tree is `aria-hidden` — the
 * surrounding heading and copy carry the accessible meaning.
 */
export type PreviewVariant = 'intro' | 'step' | 'reminder';

/* Mirrors the real BottomNav: the four core destinations, with Self-check
   active (these mocks all depict the self-check journey). */
const NAV = [
  { icon: Home, label: 'Home' },
  { icon: LibraryBig, label: 'Learn' },
  { icon: Bot, label: 'Chat' },
  { icon: HeartPulse, label: 'Self-check' },
] as const;
const NAV_ACTIVE = NAV.length - 1;

const STEPS: readonly (readonly [string, string])[] = [
  ['Look in the mirror', '1:00'],
  ['Raise your arms', '0:45'],
  ['Check while standing', '1:30'],
  ['Check while lying down', '1:30'],
  ['Check the nipple', '0:30'],
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

export function PreviewScreen({ variant }: { variant: PreviewVariant }) {
  return (
    <div aria-hidden className="flex h-full w-full select-none flex-col bg-canvas text-ink">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 text-[8px] font-semibold text-muted">
        <span>9:41</span>
        <span className="tracking-tight">●●●</span>
      </div>

      {/* App bar */}
      <div className="flex items-center justify-between px-4 pb-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-xl bg-brand-cta text-white">
            <RibbonMark tone="current" size={14} />
          </span>
          <span className="text-[11px] font-black leading-none">Brafie</span>
        </div>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-100 text-[9px] font-bold text-primary-700">
          GH
        </span>
      </div>

      <div className="min-h-0 flex-1 px-3">
        {variant === 'intro' && <IntroScreen />}
        {variant === 'step' && <StepScreen />}
        {variant === 'reminder' && <ReminderScreen />}
      </div>

      {/* Bottom navigation — the current four-destination bar */}
      <div className="grid grid-cols-4 gap-0.5 border-t border-line px-1 pb-1.5 pt-1">
        {NAV.map(({ icon: Icon, label }, i) => (
          <span
            key={label}
            className={cn(
              'flex flex-col items-center gap-0.5 rounded-lg py-1 text-[7px] font-bold text-muted',
              i === NAV_ACTIVE && 'bg-primary-50 text-primary-700',
            )}
          >
            <Icon size={13} strokeWidth={2.4} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-2xl border border-line bg-card p-2.5 shadow-petal', className)}>
      {children}
    </div>
  );
}

function IntroScreen() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="mt-1 text-[15px] font-black leading-tight">Breast self-check</h3>
      <p className="mt-0.5 text-[8px] font-semibold text-muted">
        Five calm steps · about five minutes
      </p>

      <div className="mt-2.5 flex items-start gap-1.5 rounded-2xl bg-calm-soft px-2.5 py-2 text-[7px] font-semibold text-calm-text">
        <Lock size={11} className="mt-px shrink-0" />
        <span>Nothing is recorded. Everything stays on your device.</span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Card>
          <span className="grid h-6 w-6 place-items-center rounded-xl bg-accent-soft text-accent-text">
            <HeartPulse size={12} />
          </span>
          <p className="mt-1.5 text-[6.5px] font-bold uppercase tracking-wide text-muted">Best time</p>
          <p className="text-[8px] font-bold leading-tight">Days 3–5 after your period</p>
        </Card>
        <Card>
          <span className="grid h-6 w-6 place-items-center rounded-xl bg-accent-soft text-accent-text">
            <Bell size={12} />
          </span>
          <p className="mt-1.5 text-[6.5px] font-bold uppercase tracking-wide text-muted">Duration</p>
          <p className="text-[8px] font-bold leading-tight">About 5 minutes</p>
        </Card>
      </div>

      <p className="mt-2.5 rounded-2xl bg-sunken px-2.5 py-2 text-[7.5px] leading-snug text-muted">
        A self-check helps you learn what is normal for your body. Find a private space, breathe, and
        move gently.
      </p>

      <ul className="mt-2.5 space-y-1.5">
        {STEPS.map(([title, time], i) => (
          <li
            key={title}
            className="flex items-center gap-2 rounded-2xl border border-line bg-card px-2.5 py-2 shadow-petal"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-cta text-[8px] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-[8.5px] font-bold leading-tight">{title}</span>
            <span className="ms-auto text-[7px] font-semibold text-muted">{time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto mb-1 grid h-8 place-items-center rounded-pill bg-brand-cta text-[9px] font-bold text-white shadow-petal">
        Begin self-check
      </div>
    </div>
  );
}

function StepScreen() {
  return (
    <div className="flex h-full flex-col">
      <p className="text-[6.5px] font-bold uppercase tracking-wide text-accent-text">Breast self-check</p>
      <p className="mt-0.5 text-[7.5px] font-bold text-muted">Step 1 of 5</p>
      <div className="mt-1 h-1.5 overflow-hidden rounded-pill bg-primary-100">
        <div className="h-full w-1/5 rounded-pill bg-brand-cta" />
      </div>

      <Card className="mt-2.5 text-center">
        <h3 className="text-[13px] font-black leading-tight">Look in the mirror</h3>
        <div className="mx-auto mt-2 overflow-hidden rounded-2xl border border-line">
          <BrandImage
            name="step-1"
            alt=""
            width={960}
            height={720}
          />
        </div>
        <p className="mt-2 text-[7.5px] leading-snug text-muted">
          Stand in front of the mirror with your shoulders relaxed. Look for any change in shape, size
          or skin.
        </p>

        <div className="mt-2 flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border-[5px] border-primary-200 border-t-brand-cta text-[11px] font-black">
            0:55
          </span>
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {['Shape', 'Size', 'Skin'].map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-accent-soft px-2 py-0.5 text-[6.5px] font-bold text-accent-text"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <span className="grid h-7 place-items-center rounded-pill border border-line text-[8px] font-bold text-muted">
            Previous
          </span>
          <span className="grid h-7 place-items-center rounded-pill bg-brand-cta text-[8px] font-bold text-white">
            Next step
          </span>
        </div>
      </Card>
    </div>
  );
}

function ReminderScreen() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="mt-1 text-[13px] font-black leading-tight">Choose your monthly reminder day</h3>
      <p className="mt-0.5 text-[8px] font-semibold text-muted">
        We will remind you to do your self-check every month on this day.
      </p>

      <Card className="mt-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[9px] font-bold text-muted">‹</span>
          <span className="text-[10px] font-black">July</span>
          <span className="text-[9px] font-bold text-muted">›</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="text-[6.5px] font-bold text-muted">
              {d}
            </span>
          ))}
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span
              key={n}
              className={cn(
                'grid h-5 place-items-center rounded-full text-[7.5px] font-bold text-muted',
                n === 1 && 'bg-brand-cta text-white',
              )}
            >
              {n}
            </span>
          ))}
        </div>
      </Card>

      <div className="mt-3 flex items-start gap-1.5 rounded-2xl bg-sunken px-2.5 py-2 text-[7px] font-semibold text-muted">
        <ShieldCheck size={11} className="mt-px shrink-0 text-calm" />
        <span>For awareness only. This is not a medical diagnosis. Always talk to a doctor.</span>
      </div>

      <div className="mt-auto mb-1 grid h-8 place-items-center rounded-pill bg-brand-cta text-[9px] font-bold text-white shadow-petal">
        Activate reminder
      </div>
    </div>
  );
}
