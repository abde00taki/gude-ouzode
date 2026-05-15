import { useEffect, useId, useRef, useState } from "react";
import { useLanguage, useLocales } from "../context/LanguageContext";

const a11yLabel = (code) =>
  code === "en"
    ? "British English"
    : code === "fr"
      ? "French"
      : code === "es"
        ? "Spanish"
        : "Arabic";

function FlagThumb({ src, priority }) {
  return (
    <span className="relative block aspect-[4/3] w-10 overflow-hidden rounded-md border border-black/10 shadow-sm ring-1 ring-black/[0.06] dark:border-white/10 dark:ring-white/10">
      <img
        src={src}
        alt=""
        role="presentation"
        width={40}
        height={30}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function LanguageDropdown() {
  const { locale, setLocale } = useLanguage();
  const localeList = useLocales();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();

  const current = localeList.find((x) => x.code === locale) ?? localeList[0];
  const activeOptionId = `${listId}-opt-${locale}`;

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? listId : undefined}
        aria-haspopup="listbox"
        className="flex items-center justify-center rounded-lg border border-stone-200/90 bg-white p-1.5 shadow-sm outline-none transition hover:bg-stone-50 focus-visible:ring-2 focus-visible:ring-emerald-600/50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10 dark:focus-visible:ring-amber-400/60"
        aria-label="Language menu"
      >
        <FlagThumb src={current.flagSrc} priority />
      </button>

      {menuOpen ? (
        <ul
          id={listId}
          role="listbox"
          aria-activedescendant={activeOptionId}
          className="absolute end-0 top-full z-[70] mt-2 flex min-w-[4.75rem] flex-col gap-0.5 rounded-xl border border-stone-200/90 bg-white p-1.5 shadow-xl shadow-stone-900/10 ring-1 ring-black/5 transition duration-150 ease-out dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40 dark:ring-white/5"
        >
          {localeList.map((item) => {
            const selected = item.code === locale;
            const optionId = `${listId}-opt-${item.code}`;
            return (
              <li key={item.code} role="none" className="list-none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  id={optionId}
                  onClick={() => {
                    setLocale(item.code);
                    setMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-center transition-colors ${
                    selected
                      ? "rounded-xl bg-gray-100 p-2 dark:bg-slate-800"
                      : "rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                  aria-label={a11yLabel(item.code)}
                >
                  <FlagThumb src={item.flagSrc} priority={false} />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
