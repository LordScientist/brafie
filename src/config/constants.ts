import type { Language } from '@/types/api';

export const APP = {
  name: 'Brafie',
  latinName: 'Brafie',
  version: '1.0.0',
  /**
   * Public contact address. Left empty on purpose for the Ghanaian adaptation:
   * no verified Ghana support inbox exists yet, and the footer hides the contact
   * link rather than shipping the original project's Morocco address. Fill this
   * in once a real, monitored address is available.
   */
  email: '',
} as const;

/**
 * Languages offered in the UI.
 *
 * The Ghanaian adaptation currently ships English only. English is the official
 * language of Ghana, and we never machine-translate medical content — so Twi, Ga,
 * Ewe, Dagbani and other Ghanaian languages will be added one at a time, only
 * once each can be fully translated and reviewed. `LanguageSwitch` hides itself
 * while this list holds a single entry.
 */
export const SUPPORTED_LANGUAGES: Language[] = ['en'];
export const DEFAULT_LANGUAGE: Language = 'en';

export const STORAGE_KEYS = {
  language: 'sahtek:lang',
  theme: 'sahtek:theme',
  chat: 'sahtek:chat',
  preventionChecklist: 'sahtek:prevention',
  selfCheckLog: 'sahtek:selfcheck-log',
  reminder: 'sahtek:reminder',
  onboarded: 'sahtek:onboarded',
} as const;

export const MOCK_DELAY = 500;

/**
 * Social profiles. Rendered in the footer ONLY when a url is filled in — an
 * empty string hides the icon rather than shipping a dead link.
 */
export const SOCIAL_LINKS: { id: 'instagram' | 'facebook' | 'youtube'; url: string }[] = [
  { id: 'instagram', url: '' },
  { id: 'facebook', url: '' },
  { id: 'youtube', url: '' },
];

/**
 * Footer legal/company links. `to` is an in-app route; `href` is external
 * (mailto, etc.). Entries whose destination is empty are not rendered.
 *
 * NOTE: /about, /privacy and /terms do not exist yet — the routes are built in
 * the pages pass. Until then these are intentionally left empty so the footer
 * never ships a link that 404s. Fill them in when the pages land.
 */
export const FOOTER_LINKS: { key: 'about' | 'privacy' | 'terms' | 'contact'; to?: string; href?: string }[] = [
  { key: 'about', to: '' },
  { key: 'privacy', to: '' },
  { key: 'terms', to: '' },
  { key: 'contact', href: APP.email ? `mailto:${APP.email}` : '' },
];

/**
 * The clinician who reviewed the medical content, and the sources it is drawn
 * from. Both render on the homepage credibility section ONLY when filled in.
 *
 * THIS IS DELIBERATELY EMPTY. Nobody has reviewed the content yet, and we cite
 * no sources yet — so the app claims neither. A credibility block is worth
 * exactly as much as it is true, and an invented reviewer or a decorative
 * "evidence-based" badge is the fastest way to lose a woman who is scared and
 * checking whether we can be trusted.
 *
 * To turn the block on: get a named, credentialled clinician to actually review
 * the content, list the sources it was written from, and fill these in. Do not
 * fill them in first.
 */
export const MEDICAL_REVIEW: { name: string; credential: string; reviewedOn: string } | null = null;

export const EVIDENCE_SOURCES: { label: string; url: string }[] = [];

export const LANGUAGE_META: Record<Language, { label: string; native: string; flag: string }> = {
  ar: { label: 'Darija', native: 'الدارجة', flag: 'MA' },
  fr: { label: 'Francais', native: 'Francais', flag: 'FR' },
  en: { label: 'English', native: 'English', flag: 'GH' },
  es: { label: 'Spanish', native: 'Espanol', flag: 'ES' },
  de: { label: 'German', native: 'Deutsch', flag: 'DE' },
  ru: { label: 'Russian', native: 'Русский', flag: 'RU' },
  pt: { label: 'Portuguese', native: 'Portugues', flag: 'BR' },
};
