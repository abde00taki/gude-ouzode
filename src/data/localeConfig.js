/** Metadata per locale: text direction and flag CDN assets (flagcdn.com). */
export const locales = ["en", "fr", "es", "ar"];

/** SVG flags — lightweight, crisp on retina. */
export const localeConfig = {
  en: { dir: "ltr", flagSrc: "https://flagcdn.com/gb.svg" },
  fr: { dir: "ltr", flagSrc: "https://flagcdn.com/fr.svg" },
  es: { dir: "ltr", flagSrc: "https://flagcdn.com/es.svg" },
  ar: { dir: "rtl", flagSrc: "https://flagcdn.com/ma.svg" },
};
