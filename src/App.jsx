/**
 * Root shell: theme + i18n providers, then the immersive scroll portfolio.
 * Renders ONLY <ImmersiveJourney /> (local assets, journey sections) — no legacy layout.
 */
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ImmersiveJourney } from "./components/ImmersiveJourney";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div data-app="immersive-journey">
          <ImmersiveJourney />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
