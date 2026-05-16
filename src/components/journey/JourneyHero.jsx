import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { assertJourneyImage } from "../../lib/journeyImageAssert";
import { openWhatsAppPrefilled } from "../../lib/whatsapp";
import {
  defaultScrollViewport,
  journeyItemVariants,
  journeySectionVariants,
} from "../../motion/scrollVariants";

export function JourneyHero({ chapter, image }) {
  const { dir } = useLanguage();
  const [loadError, setLoadError] = useState(null);

  assertJourneyImage(image, "JourneyHero");

  return (
    <section
      id={chapter.id}
      dir={dir}
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() =>
          setLoadError(
            "Failed to load hero image from bundled path. Check that src/assets/hero.jpg exists and is a valid image file."
          )
        }
      />
      {loadError ? (
        <div
          className="absolute inset-0 z-[5] flex items-center justify-center bg-red-950/90 p-6 text-center text-sm font-medium text-red-50"
          role="alert"
        >
          {loadError}
        </div>
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/55 to-sky-900/25 dark:from-slate-950/95 dark:via-slate-950/70 dark:to-slate-900/40"
        aria-hidden="true"
      />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-24 pt-32 md:px-8 md:pb-32"
        initial="hidden"
        whileInView="visible"
        viewport={defaultScrollViewport}
        variants={journeySectionVariants}
      >
        <motion.p
          variants={journeyItemVariants}
          className="font-display text-sm font-medium uppercase tracking-[0.2em] text-amber-200/95"
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          variants={journeyItemVariants}
          className="font-display text-4xl font-semibold leading-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl"
        >
          {chapter.title}
        </motion.h1>
        <motion.p
          variants={journeyItemVariants}
          className="max-w-2xl text-lg leading-relaxed text-emerald-50/95 md:text-xl"
        >
          {chapter.story}
        </motion.p>
        <motion.div variants={journeyItemVariants}>
          <button
            type="button"
            onClick={() => openWhatsAppPrefilled(chapter.waMessage)}
            className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3.5 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-950/30 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 active:scale-[0.98] md:text-lg"
          >
            {chapter.cta}
          </button>
        </motion.div>
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="block h-10 w-6 rounded-full border-2 border-white/40" />
          <span className="block h-2 w-1 animate-bounce rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  );
}
