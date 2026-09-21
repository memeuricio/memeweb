import { useApp } from "../../appContext.js";
import { profile } from "../../data/cv.js";
import CodeWindow from "../ui/CodeWindow.jsx";
import Reveal from "../ui/Reveal.jsx";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "../ui/Icons.jsx";

export default function Hero() {
  const { t } = useApp();

  return (
    <section id="hero" className="relative z-10 pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {t.hero.status}
            </span>
          </p>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {t.hero.greeting}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl font-mono text-xs leading-relaxed text-accent sm:text-[13px]">
            {t.hero.role}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#experience" className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowRightIcon size={15} />
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              <MailIcon size={15} />
              {profile.email}
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPinIcon size={15} />
              Santiago, Chile
            </span>
            <span className="inline-flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <GithubIcon size={15} />
                GitHub
                <ArrowUpRightIcon size={12} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
              >
                <LinkedinIcon size={15} />
                LinkedIn
                <ArrowUpRightIcon size={12} />
              </a>
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <CodeWindow
            title={t.hero.codeTitle}
            lines={t.hero.code}
            caret
            copyable
            copyLabel={t.ui.copy}
            copiedLabel={t.ui.copied}
          />
        </Reveal>
      </div>
    </section>
  );
}
