import { cv } from "../../data/cv.js";

function SocialIcon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "github":
      return (
        <svg {...common}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M22 4.01s-2 1-3.5 1.5C17.5 4.5 16 4 14.5 4c-3 0-5.5 2.5-5.5 5.5 0 .4 0 .8.1 1.2C5 10.4 2 7.5 2 7.5s-2 5 3 9c-1.5 1-3 1.5-3 1.5s2.5 4 7 4c4.5 0 8-3.5 8-8v-.4c1.5-1 2.5-2.5 3-4-.5.5-2 1-3 1 1.5-1 2.5-2 3-3.5z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-bg-800/80 to-bg-900 p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-accent-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-60 w-60 rounded-full border border-accent-glow/20 blur-2xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent-400">[05]</span>
                <span className="h-px w-12 bg-gradient-to-r from-accent-500/60 to-transparent" />
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                  sección
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                ¿Construimos algo <span className="text-gradient">juntos</span>?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-slate-400 sm:mt-4 sm:text-base">
                Estoy disponible para proyectos freelance, colaboraciones o
                roles a tiempo completo. Si tienes una idea en mente, escribeme.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                <a
                  href={`mailto:${cv.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2.5 font-mono text-xs font-medium text-bg-900 transition-all hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.7)] sm:px-5 sm:py-3 sm:text-sm"
                >
                  <span className="truncate">{cv.email}</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                {cv.socials
                  .filter((s) => s.icon !== "mail")
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-2.5 font-mono text-xs text-slate-200 transition-all hover:border-accent-400 hover:text-accent-300 sm:px-4 sm:text-sm"
                    >
                      <SocialIcon name={s.icon} />
                      {s.label}
                    </a>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-bg-900/60 p-4 backdrop-blur sm:p-6">
              <div className="font-mono text-[11px] text-accent-400">
                ~/contact-info.json
              </div>
              <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-6 text-slate-300 sm:text-[13px] sm:leading-7">
                <code>
                  {`{
  "email": "`}
                  <span className="text-accent-300">{cv.email}</span>
                  {`",
  "phone": "`}
                  <span className="text-amber-300">{cv.phone}</span>
                  {`",
  "location": "`}
                  <span className="text-amber-300">{cv.location}</span>
                  {`",
  "status": "`}
                  <span className="text-accent-glow">{cv.status}</span>
                  {`",
  "response_time": "24h"
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
