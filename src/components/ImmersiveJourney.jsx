import heroImg from "../assets/hero.png";
import image1Img from "../assets/image1.png";
import l9iradaImg from "../assets/l9irada.png";
import babImg from "../assets/bab.png";
import toratImg from "../assets/torat.png";
import etingImg from "../assets/eting.png";
import musicImg from "../assets/music.png";

import { useLanguage } from "../context/LanguageContext";
import { assertJourneyImage } from "../lib/journeyImageAssert";
import { JourneyChapter } from "./journey/JourneyChapter";
import { JourneyHeader } from "./journey/JourneyHeader";
import { JourneyHero } from "./journey/JourneyHero";

/**
 * Each row binds exactly one imported asset to one story section.
 * Copy (title, story, CTA, WhatsApp text) comes from `t.chapters` via `chapterId`.
 */
const journeySections = [
  // 1 — The Adventure Begins
  { id: 1, chapterId: "hero", image: heroImg, isHero: true },
  // 2 — Majestic Nature
  { id: 2, chapterId: "waterfalls", image: image1Img, isHero: false },
  // 3 — Playful Encounters
  { id: 3, chapterId: "macaques", image: l9iradaImg, isHero: false },
  // 4 — Echoes of the Past
  { id: 4, chapterId: "watermills", image: babImg, isHero: false },
  // 5 — Soul of the Atlas
  { id: 5, chapterId: "amazigh", image: toratImg, isHero: false },
  // 6 — Taste of Ouzoud
  { id: 6, chapterId: "gastronomy", image: etingImg, isHero: false },
  // 7 — Rhythms of Joy
  { id: 7, chapterId: "finale", image: musicImg, isHero: false },
];

for (const row of journeySections) {
  assertJourneyImage(row.image, `ImmersiveJourney / ${row.chapterId}`);
}

export function ImmersiveJourney() {
  const { t } = useLanguage();
  const byId = Object.fromEntries(t.chapters.map((c) => [c.id, c]));

  return (
    <>
      <JourneyHeader />
      <main>
        {journeySections.map((section, index) => {
          const chapter = byId[section.chapterId];
          if (!chapter) return null;

          if (section.isHero) {
            return (
              <JourneyHero
                key={section.chapterId}
                chapter={chapter}
                image={section.image}
              />
            );
          }

          const reverseDesktop = index > 0 && index % 2 === 0;
          return (
            <JourneyChapter
              key={section.chapterId}
              chapter={chapter}
              image={section.image}
              reverseDesktop={reverseDesktop}
            />
          );
        })}
      </main>
      <footer className="border-t border-stone-200/80 bg-emerald-950/5 py-12 text-center text-sm text-stone-600 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400">
        <p className="mx-auto max-w-lg px-4 leading-relaxed">{t.footer}</p>
      </footer>
    </>
  );
}
