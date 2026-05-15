const BLOCKED = ["unsplash.com", "picsum.photos", "placehold.co", "placeholder"];

/**
 * Ensures journey `image` comes from a local Vite static import (bundled URL).
 * Throws during render if the prop is invalid — no silent fallbacks.
 *
 * @param {unknown} image
 * @param {string} componentLabel e.g. "JourneyHero"
 */
export function assertJourneyImage(image, componentLabel) {
  if (typeof image !== "string" || image.trim() === "") {
    throw new Error(
      `[${componentLabel}] Missing journey image. Expected a bundled URL from a static import (e.g. import heroImg from "../assets/hero.jpg"). Received: ${String(image)}`
    );
  }

  const lower = image.toLowerCase();
  for (const domain of BLOCKED) {
    if (lower.includes(domain)) {
      throw new Error(
        `[${componentLabel}] External or placeholder image URLs are not allowed. Replace with files under src/assets/ (hero.jpg, image1.jpg, …). Blocked match: ${domain}`
      );
    }
  }
}
