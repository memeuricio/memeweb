import { cv } from '../../data/cv.js'
import { SectionHeader } from './About.jsx'

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          tag="03"
          title="Proyectos"
          subtitle="Una selección de cosas que he construido recientemente"
        />

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2">
          {cv.projects.map((p, idx) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/60 bg-bg-800/40 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.4)] sm:p-6"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-500/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <div className="font-mono text-[11px] text-accent-400">
                  project_{String(idx + 1).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow/80" />
                  <span className="hidden sm:inline">{p.highlight}</span>
                  <span className="sm:hidden">destacado</span>
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-100 transition-colors group-hover:text-accent-300 sm:text-2xl">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {p.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-slate-700/60 bg-slate-900/40 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t border-slate-800/60 pt-4 font-mono text-xs sm:mt-6">
                <a href={p.link} className="text-accent-300 transition-colors hover:text-accent-400">
                  live ↗
                </a>
                <a href={p.repo} className="text-slate-400 transition-colors hover:text-slate-200">
                  code ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
