/**
 * Scroll-linked enter / exit: with `viewport.once: false`, leaving the viewport
 * restores `initial` so sections fade/slide out again.
 */
export const journeySectionVariants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const journeyItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
};

/** @deprecated use journeySectionVariants */
export const scrollStoryVariants = journeySectionVariants;

export const scrollChildVariants = journeyItemVariants;

export const scrollStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

export const defaultScrollViewport = {
  once: false,
  amount: 0.28,
  margin: "0px 0px -8% 0px",
};
