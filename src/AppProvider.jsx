import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext } from "./appContext.js";
import { content } from "./data/cv.js";

const THEME_KEY = "mf-theme";
const LANG_KEY = "mf-lang";

function readTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readLang() {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(LANG_KEY);
  if (stored === "es" || stored === "en") return stored;
  return (navigator.language || "en").toLowerCase().startsWith("es")
    ? "es"
    : "en";
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", content[lang].meta.description);
    window.localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      lang,
      t: content[lang],
      toggleTheme,
      setLang,
    }),
    [theme, lang, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
