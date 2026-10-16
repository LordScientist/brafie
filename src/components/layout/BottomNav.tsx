import { NavLink } from 'react-router-dom';
import { Bot, HeartPulse, Home, LibraryBig } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/utils/cn';

/* The four core destinations. Everything else lives in the drawer, so each cell
   here stays a comfortable tap target on a 360px phone instead of squeezing
   seven or eight columns into the bar. */
const items = [
  { to: '/', key: 'home', icon: Home },
  { to: '/learn', key: 'learn', icon: LibraryBig },
  { to: '/chat', key: 'chat', icon: Bot },
  { to: '/self-check', key: 'selfCheck', icon: HeartPulse },
] as const;

export function BottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card/90 px-2 pb-safe pt-2 shadow-[0_-20px_50px_rgba(214,51,132,0.12)] backdrop-blur-2xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map(({ to, key, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={t.nav[key]}
            className={({ isActive }) =>
              cn(
                'flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-bold text-muted transition',
                isActive && 'bg-accent-soft text-accent-text shadow-glow',
              )
            }
          >
            <Icon size={20} strokeWidth={2.4} aria-hidden />
            <span className="max-w-full truncate">{t.nav[key]}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
