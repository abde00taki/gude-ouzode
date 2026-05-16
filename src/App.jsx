import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ImmersiveJourney } from "./components/ImmersiveJourney";
import { Preloader } from "./components/Preloader";
import heroImg from "./assets/hero.png";
import { useInitialLoad } from "./hooks/useInitialLoad";

export default function App() {
  const isLoading = useInitialLoad(heroImg);
  const [preloaderMounted, setPreloaderMounted] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {preloaderMounted ? (
          <Preloader
            show={isLoading}
            onExitComplete={() => setPreloaderMounted(false)}
          />
        ) : null}
        <div
          data-app="immersive-journey"
          className={
            isLoading
              ? "pointer-events-none select-none overflow-hidden"
              : undefined
          }
          aria-hidden={isLoading ? true : undefined}
        >
          <ImmersiveJourney />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
