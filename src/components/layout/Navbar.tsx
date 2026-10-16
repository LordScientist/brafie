import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import { MobileDrawer, type DrawerGroup, type DrawerLink } from '@/components/layout/MobileDrawer';
import { LogoLockup } from '@/components/ui/LogoLockup';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

/* Desktop keeps the primary journey visible; the drawer carries everything.
   /signs sits second, right after Home: recognizing a change is the first of
   the four verbs, and it is the page most likely to be shared into the app
   from outside. It is deliberately NOT in BottomNav — that bar keeps to the
   four core destinations (Home / Learn / Chat / Self-check) so each stays a
   comfortable tap target on a 360px phone. Mobile reaches /signs via the drawer. */
const PRIMARY_LINKS: DrawerLink[] = [
  { to: '/', key: 'home' },
  { to: '/signs', key: 'signs' },
  { to: '/learn', key: 'learn' },
  { to: '/self-check', key: 'selfCheck' },
  { to: '/risk', key: 'risk' },
  { to: '/chat', key: 'chat' },
];

/* The drawer carries everything the desktop bar and the four-cell mobile bar
   have no room for. Grouped so a long list stays scannable: a single Home entry,
   then Learn / Your Health / More. Headings are plain English because the Ghana
   build ships English only (see docs/GHANA_LOCALISATION.md); the link labels
   still come from the active translation. */
const DRAWER_GROUPS: DrawerGroup[] = [
  { links: [{ to: '/', key: 'home' }] },
  {
    heading: 'Learn & Explore',
    links: [
      { to: '/learn', key: 'learn' },
      { to: '/self-check', key: 'selfCheck' },
      { to: '/risk', key: 'risk' },
      { to: '/signs', key: 'signs' },
      { to: '/risk-factors', key: 'riskFactors' },
      { to: '/when-to-seek-help', key: 'whenToSeek' },
    ],
  },
  {
    heading: 'Your Health',
    links: [
      { to: '/reminder', key: 'reminder' },
      { to: '/doctors', key: 'doctors' },
      { to: '/companion', key: 'companion' },
    ],
  },
  {
    heading: 'More',
    links: [
      { to: '/about', key: 'about' },
      { to: '/faq', key: 'faq' },
    ],
  },
];

/** Sticky top bar: logo lockup, primary links, language, theme, mobile drawer. */
export function Navbar() {
  const { t } = useLanguage();
  const { resolved, toggle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDark = resolved === 'dark';

  return (
    <>
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0 border-b border-line px-4 pt-safe">
        <div className="mx-auto flex min-h-16 max-w-content items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {/* Mobile nav concept puts the menu trigger on the leading edge. */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={t.common.menu}
              aria-expanded={drawerOpen}
              className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line bg-card text-ink shadow-petal transition hover:border-primary-200 active:scale-95 lg:hidden"
            >
              <Menu size={18} aria-hidden />
            </button>

            {/* The link carries the accessible name; the lockup inside is decorative. */}
            <NavLink to="/" aria-label={t.app.name} className="focus-ring min-w-0 rounded-2xl">
              <LogoLockup showTagline />
            </NavLink>
          </div>

          <nav aria-label={t.common.menu} className="hidden items-center gap-1 lg:flex">
            {PRIMARY_LINKS.map(({ to, key }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'focus-ring flex min-h-11 items-center rounded-pill px-4 text-body-sm font-bold transition',
                    isActive ? 'bg-accent-soft text-accent-text' : 'text-muted hover:bg-sunken hover:text-ink',
                  )
                }
              >
                {t.nav[key]}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={isDark}
              aria-label={`${t.settings.theme}: ${isDark ? t.settings.dark : t.settings.light}`}
              title={isDark ? t.settings.light : t.settings.dark}
              className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-pill border border-line bg-card text-accent-text shadow-petal transition hover:border-primary-200 active:scale-95"
            >
              {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} groups={DRAWER_GROUPS} />
    </>
  );
}
