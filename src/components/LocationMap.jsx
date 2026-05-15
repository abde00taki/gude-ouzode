import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { OUZOUD_MAP_EMBED_URL } from "../data/mapEmbed";
import {
  defaultScrollViewport,
  journeyItemVariants,
  journeySectionVariants,
} from "../motion/scrollVariants";

export function LocationMap() {
  const { t, dir } = useLanguage();
  const { location } = t;

  return (
    <motion.section
      id="location"
      dir={dir}
      initial="hidden"
      whileInView="visible"
      viewport={defaultScrollViewport}
      variants={journeySectionVariants}
      className="scroll-mt-28 border-b border-stone-200/60 bg-gradient-to-b from-emerald-50/40 to-white/60 py-20 dark:border-white/5 dark:from-slate-900/50 dark:to-slate-950/80 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.header
          variants={journeyItemVariants}
          className="mb-10 text-center md:mb-12"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {location.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-emerald-950 dark:text-emerald-50 md:text-4xl">
            {location.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-slate-400 md:text-lg">
            {location.subtitle}
          </p>
        </motion.header>

        <motion.div
          variants={journeyItemVariants}
          className="overflow-hidden rounded-3xl bg-stone-200 shadow-2xl shadow-emerald-950/15 ring-1 ring-stone-900/10 dark:bg-slate-800 dark:shadow-black/50 dark:ring-white/10"
        >
          <iframe
            title={location.mapTitle}
            src={OUZOUD_MAP_EMBED_URL}
            className="h-64 w-full border-0 dark:brightness-75 dark:contrast-125 dark:saturate-[0.85] md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <motion.p
          variants={journeyItemVariants}
          className="mt-6 text-center text-sm text-stone-500 dark:text-slate-500"
        >
          {location.coordsHint}
        </motion.p>
      </div>
    </motion.section>
  );
}
