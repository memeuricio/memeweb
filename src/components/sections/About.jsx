import { cv } from "../../data/cv.js";

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          tag="01"
          title="Sobre mí"
          subtitle="Un poco de contexto sobre quién soy y cómo trabajo"
        />

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/10 via-bg-800 to-bg-900 sm:aspect-[4/5]">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img
                    src="/perfil.png"
                    alt={cv.name}
                    className="h-36 w-36 rounded-full border-2 border-accent-500/40 object-cover shadow-[0_0_60px_-10px_rgba(34,211,238,0.5)] sm:h-44 sm:w-44"
                  />
                  <div className="absolute -inset-6 -z-10 rounded-full border border-dashed border-accent-500/30" />
                  <div className="absolute -inset-12 -z-10 rounded-full border border-dashed border-accent-500/15" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-accent-500/30 bg-bg-900/80 p-3 backdrop-blur sm:bottom-4 sm:left-4 sm:right-4">
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-glow" />
                  STATUS · {cv.status}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base leading-relaxed text-slate-300 sm:text-xl">
              {cv.about}
            </p>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              <InfoRow label="Ubicación" value={cv.location} />
              <InfoRow label="Email" value={cv.email} />
              <InfoRow
                label="Idiomas"
                value={cv.languages
                  .map((l) => `${l.name} (${l.level})`)
                  .join(" · ")}
              />
              <InfoRow
                label="Formación"
                value={
                  <>
                    {cv.education[0]?.school}
                    <br />
                    {cv.education[0]?.detail}
                  </>
                }
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
              {[
                "React",
                "Node.js",
                "Three.js",
                "Tailwind",
                "Postgres",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 font-mono text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800/60 bg-bg-800/40 p-3 sm:p-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-accent-400">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-slate-200">{value}</div>
    </div>
  );
}

export function SectionHeader({ tag, title, subtitle, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-mono text-xs text-accent-400">[{tag}]</span>
        <span className="h-px w-12 bg-gradient-to-r from-accent-500/60 to-transparent" />
        <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
          sección
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
