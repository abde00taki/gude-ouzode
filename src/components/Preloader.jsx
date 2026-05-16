import { AnimatePresence, motion } from "framer-motion";

export function Preloader({ show, onExitComplete }) {
  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {show ? (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading Ouzoud Waterfalls"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--surface)] text-[var(--foreground)]"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-transparent to-sky-50/50 dark:from-emerald-950/40 dark:to-slate-950/60"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-8 px-6 text-center"
          >
            <motion.div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-200/80 bg-white/60 shadow-lg shadow-emerald-900/5 backdrop-blur-sm dark:border-emerald-500/20 dark:bg-slate-900/50 dark:shadow-black/30"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0.15)",
                  "0 0 32px 8px rgba(16, 185, 129, 0.25)",
                  "0 0 0 0 rgba(16, 185, 129, 0.15)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="h-7 w-7 text-emerald-600 dark:text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c-1.5 2.5-4 4.5-4 8a4 4 0 108 0c0-3.5-2.5-5.5-4-8z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 21c1.5-1 3.5-1.5 4-1.5s2.5.5 4 1.5"
                />
              </svg>
            </motion.div>

            <motion.h1
              className="font-display text-2xl font-semibold tracking-wide text-emerald-900 dark:text-emerald-100 md:text-3xl"
              animate={{
                textShadow: [
                  "0 0 20px rgba(16, 185, 129, 0)",
                  "0 0 28px rgba(16, 185, 129, 0.35)",
                  "0 0 20px rgba(16, 185, 129, 0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Ouzoud Waterfalls
            </motion.h1>

            <div className="flex items-center gap-2" aria-hidden="true">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
