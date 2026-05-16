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

export function JourneyChapter({ chapter, image, reverseDesktop }) {
  const { dir } = useLanguage();
  const [loadError, setLoadError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  assertJourneyImage(
    image,
    `JourneyChapter (${chapter?.id ?? "unknown"})`
  );

  const imageOrder = reverseDesktop
    ? "order-1 md:order-2"
    : "order-1 md:order-1";
  const textOrder = reverseDesktop
    ? "order-2 md:order-1"
    : "order-2 md:order-2";

  return (
    <motion.section
      id={chapter.id}
      dir={dir}
      initial="hidden"
      whileInView="visible"
      viewport={defaultScrollViewport}
      variants={journeySectionVariants}
      className="relative scroll-mt-28 border-b border-stone-200/60 bg-gradient-to-b from-white/40 to-emerald-50/30 py-20 dark:border-white/5 dark:from-slate-950/80 dark:to-slate-900/40 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14 lg:gap-20">
          <motion.div
            variants={journeyItemVariants}
            className={`relative overflow-hidden rounded-3xl shadow-xl shadow-emerald-900/10 ring-1 ring-stone-900/5 dark:shadow-black/50 dark:ring-white/10 ${imageOrder}`}
          >
            <div className="relative aspect-[4/3] w-full bg-stone-200 dark:bg-slate-800 md:aspect-[5/4]">
              {!imageLoaded && !loadError ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 via-emerald-50/60 to-stone-100 dark:from-slate-800 dark:via-emerald-950/30 dark:to-slate-900"
                />
              ) : null}
              <img
                src={image}
                alt=""
                width={800}
                height={600}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={() =>
                  setLoadError(
                    `Failed to load image for section "${chapter.id}". Verify the matching file exists under src/assets/ and is a valid image.`
                  )
                }
              />
            </div>
            {loadError ? (
              <div
                className="absolute inset-0 z-[1] flex items-center justify-center bg-red-950/90 p-4 text-center text-xs font-medium leading-snug text-red-50 sm:text-sm"
                role="alert"
              >
                {loadError}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            variants={journeyItemVariants}
            className={`flex flex-col gap-5 md:max-w-xl md:ms-0 md:me-auto md:justify-self-start ${textOrder}`}
          >
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              {chapter.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-emerald-950 dark:text-emerald-50 md:text-4xl">
              {chapter.title}
            </h2>
            <p className="text-base leading-relaxed text-stone-700 dark:text-slate-300 md:text-lg">
              {chapter.story}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openWhatsAppPrefilled(chapter.waMessage)}
                className="inline-flex w-full items-center justify-center rounded-full border border-emerald-700/20 bg-emerald-700 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:scale-[0.98] sm:w-auto dark:border-emerald-400/30 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {chapter.cta}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
