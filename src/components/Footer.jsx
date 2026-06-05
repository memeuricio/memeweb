import { cv } from '../data/cv.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      className="relative border-t border-slate-800/60 py-8 sm:py-10"
      style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:gap-4 sm:px-6 sm:text-left">
        <div className="font-mono text-[11px] text-slate-500 sm:text-xs">
          <span className="text-accent-400">©</span> {year} {cv.name} · Hecho con
          <span className="text-accent-300"> React</span>,
          <span className="text-accent-300"> Vite</span>,
          <span className="text-accent-300"> Tailwind</span> &amp;
          <span className="text-accent-300"> R3F</span>
        </div>
        <div className="font-mono text-[11px] text-slate-600">
          <span className="text-accent-glow">●</span> v0.1.0
        </div>
      </div>
    </footer>
  )
}
