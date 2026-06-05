import { cv } from '../../data/cv.js'
import MatrixTagline from '../MatrixTagline.jsx'

function SocialIcon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'github':
      return (
        <svg {...common}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
      )
    case 'linkedin':
      return (
        <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
      )
    case 'twitter':
      return (
        <svg {...common}><path d="M22 4.01s-2 1-3.5 1.5C17.5 4.5 16 4 14.5 4c-3 0-5.5 2.5-5.5 5.5 0 .4 0 .8.1 1.2C5 10.4 2 7.5 2 7.5s-2 5 3 9c-1.5 1-3 1.5-3 1.5s2.5 4 7 4c4.5 0 8-3.5 8-8v-.4c1.5-1 2.5-2.5 3-4-.5.5-2 1-3 1 1.5-1 2.5-2 3-3.5z" /></svg>
      )
    case 'mail':
      return (
        <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
      )
    default:
      return null
  }
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/5 px-3 py-1.5 font-mono text-xs text-accent-300 sm:mb-6">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent-glow shadow-[0_0_8px_#4ade80]" />
              <span className="truncate">{cv.status}</span>
            </div>

            <h1 className="font-sans text-4xl font-bold leading-[1.05] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
              Hola, soy <br className="hidden sm:block" />
              <span className="text-gradient text-glow">{cv.name}</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-slate-400 sm:gap-3 sm:text-lg">
              <span className="text-accent-400">$</span>
              <span>whoami</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-200">{cv.role}</span>
            </div>

            <MatrixTagline
              phrases={cv.taglines}
              className="mt-5 max-w-xl min-h-[3.5rem] text-base leading-relaxed text-slate-400 sm:mt-6 sm:min-h-[4rem] sm:text-lg"
            />

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 font-mono text-sm font-medium text-bg-900 transition-all hover:shadow-[0_0_30px_-4px_rgba(34,211,238,0.7)]"
              >
                Ver proyectos
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 px-5 py-3 font-mono text-sm text-accent-300 transition-all hover:border-accent-400 hover:bg-accent-500/10"
              >
                Contactar
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <span className="font-mono text-xs text-slate-500">socials:</span>
              {cv.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group grid h-9 w-9 place-items-center rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-400 transition-all hover:border-accent-400 hover:text-accent-300 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl border border-accent-500/20 bg-bg-800/60 p-4 backdrop-blur sm:p-6">
              <div className="flex items-center gap-1.5 border-b border-slate-700/40 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-glow/80" />
                <span className="ml-3 truncate font-mono text-[11px] text-slate-500">~/about.md</span>
              </div>
              <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-7 text-slate-300 sm:text-[13px]">
                <code>
                  <span className="text-slate-500"># </span>
                  <span className="text-accent-300">{cv.name}</span>
                  {"\n"}
                  <span className="text-slate-500">role: </span>
                  <span className="text-accent-glow">"{cv.role}"</span>
                  {"\n"}
                  <span className="text-slate-500">location: </span>
                  <span className="text-amber-300">"{cv.location}"</span>
                  {"\n\n"}
                  <span className="text-slate-500">stack = [</span>
                  {"\n  "}
                  <span className="text-accent-400">"React"</span>,
                  <span className="text-slate-600">{" // ⚡️"}</span>
                  {"\n  "}
                  <span className="text-accent-400">"Node.js"</span>,
                  {"\n  "}
                  <span className="text-accent-400">"Three.js"</span>,
                  <span className="text-slate-600">{" // ✨"}</span>
                  {"\n  "}
                  <span className="text-accent-400">"Tailwind"</span>,
                  {"\n"}
                  <span className="text-slate-500">]</span>
                  {"\n\n"}
                  <span className="text-slate-500">{`// `}</span>
                  <span className="text-slate-400">listo para colaborar</span>
                  <span className="animate-blink text-accent-400">▌</span>
                </code>
              </pre>
            </div>

            <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full border border-accent-500/30 bg-accent-500/5 blur-xl" />
            <div className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full border border-accent-glow/30 bg-accent-glow/5 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
