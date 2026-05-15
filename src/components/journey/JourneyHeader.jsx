import { motion } from "framer-motion";
import { LanguageDropdown } from "../LanguageDropdown";
import { ThemeToggle } from "../ThemeToggle";
import { useLanguage } from "../../context/LanguageContext";

export function JourneyHeader() {
  const { t } = useLanguage();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6"
    >
      <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-stone-200/80 bg-white/75 px-3 py-2 shadow-lg shadow-emerald-950/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/40">
        <p className="truncate ms-1 font-display text-sm font-semibold tracking-wide text-emerald-950 dark:text-emerald-100 md:text-base">
          {t.brand}
        </p>
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <LanguageDropdown />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
