import { create } from 'zustand';
import type { Language } from '@/types/api';
import { en, type Translation } from './en';

export type { Translation };

/**
 * Locale loading.
 *
 * The Ghanaian adaptation ships English only (see SUPPORTED_LANGUAGES in
 * `config/constants.ts`), so English is the sole eager locale: it must paint
 * instantly, with no wrong-language flash.
 *
 * Ghanaian languages (Twi, Ga, Ewe, Dagbani, …) are added to the lazy map below
 * as they are authored and medically reviewed — never machine-translated. Each
 * new locale is a `<code>.ts` file implementing the `Translation` type, plus one
 * line here, plus an entry in SUPPORTED_LANGUAGES. Until a lazy locale arrives
 * the UI shows English, which is the documented fallback for unknown locales.
 */
const EAGER: Partial<Record<Language, Translation>> = { en };

const LAZY: Partial<Record<Language, () => Promise<{ default?: Translation } & Record<string, unknown>>>> = {};

interface LocaleState {
  loaded: Partial<Record<Language, Translation>>;
  load: (lang: Language) => void;
}

const useLocaleStore = create<LocaleState>((set, get) => ({
  loaded: { ...EAGER },
  load: (lang) => {
    if (get().loaded[lang]) return;
    const importer = LAZY[lang];
    if (!importer) return;
    void importer().then((mod) => {
      const translation = (mod[lang] ?? mod.default) as Translation | undefined;
      if (translation) set((s) => ({ loaded: { ...s.loaded, [lang]: translation } }));
    });
  },
}));

/**
 * The active translation. Falls back to English while a legacy locale loads —
 * never to a half-empty object, so no screen can render blank keys.
 */
export function useTranslation(lang: Language): Translation {
  const loaded = useLocaleStore((s) => s.loaded);
  const load = useLocaleStore((s) => s.load);

  if (!loaded[lang]) load(lang);

  return loaded[lang] ?? en;
}
