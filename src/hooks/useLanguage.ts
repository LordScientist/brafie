import { useLanguageStore } from '@/stores/languageStore';
import { useTranslation, type Translation } from '@/i18n';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/config/constants';
import type { Language } from '@/types/api';

interface UseLanguage {
  t: Translation;
  lang: Language;
  setLang: (lang: Language) => void;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
  /** Tailwind font class matching the active script. */
  fontClass: string;
}

/** Central i18n hook — translations, direction and font for the active language. */
export function useLanguage(): UseLanguage {
  const stored = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);

  /* A language persisted by the original (multilingual) build — e.g. `ar` — must
     not survive into the Ghanaian release: it is no longer supported and would
     flip the whole layout to RTL while the UI renders English. Clamp it here. */
  const lang = SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;

  const isRTL = lang === 'ar';
  return {
    t: useTranslation(lang),
    lang,
    setLang,
    isRTL,
    dir: isRTL ? 'rtl' : 'ltr',
    fontClass: isRTL ? 'font-arabic' : 'font-display',
  };
}

/** Replace `{token}` placeholders in a translation string. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));
}
