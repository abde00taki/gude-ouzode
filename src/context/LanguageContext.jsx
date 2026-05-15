import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLocale, journeyCopy, locales } from "../data/journeyCopy";
import { localeConfig } from "../data/localeConfig";

const LanguageContext = createContext(null);

const LOCALE_STORAGE_KEY = "ousama-locale";

function readStoredLocale() {
  if (typeof window === "undefined") return defaultLocale;
  const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return locales.includes(raw) ? raw : defaultLocale;
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => readStoredLocale());
  const dir = localeConfig[locale].dir;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, dir]);

  const setLocaleSafe = useCallback((code) => {
    if (locales.includes(code)) setLocaleState(code);
  }, []);

  const t = journeyCopy[locale];

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLocaleSafe,
      dir,
      t,
    }),
    [locale, setLocaleSafe, dir, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div
        dir={dir}
        className="min-h-dvh bg-[var(--surface)] text-[var(--foreground)] transition-colors duration-300"
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useLocales() {
  return locales.map((code) => ({
    code,
    flagSrc: localeConfig[code].flagSrc,
    dir: localeConfig[code].dir,
  }));
}
