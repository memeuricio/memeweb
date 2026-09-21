import { useEffect, useState } from "react";
import { useApp } from "../appContext.js";
import { profile, sectionOrder } from "../data/cv.js";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./ui/Icons.jsx";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, t } = useApp();
  const next = theme === "dark" ? t.ui.themeLight : t.ui.themeDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`icon-btn ${className}`}
      aria-label={`${t.ui.theme}: ${next}`}
      title={`${t.ui.theme}: ${next}`}
    >
      {theme === "dark" ? <SunIcon size={15} /> : <MoonIcon size={15} />}
    </button>
  );
}

function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useApp();

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className={`inline-flex items-center rounded-lg border border-line bg-surface p-0.5 ${className}`}
    >
      {["es", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-md px-2 py-1 font-mono text-[11px] uppercase transition-colors ${
            lang === code
              ? "bg-accent-soft text-accent"
              : "text-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export default function Navbar() {
  const { t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionOrder);
  const shortRole = t.hero.role.split("·")[0].trim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#hero"
          onClick={close}
          className="flex items-center gap-3"
          aria-label={profile.name}
        >
          <span className="hidden sm:block">
            <span className="block font-serif text-[15px] leading-tight text-ink">
              {profile.name}
            </span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {shortRole}
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:inline-flex" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-btn lg:hidden"
            aria-label={open ? t.ui.close : t.ui.menu}
            aria-expanded={open}
          >
            {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav aria-label="Móvil" className="container-page py-4">
            <ul className="divide-y divide-line">
              {t.nav.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    className="flex items-center justify-between py-3.5 font-serif text-lg text-ink"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-faint">
                      0{sectionOrder.indexOf(link.id) + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-5">
              <LangSwitch />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
