import { useEffect, useState } from 'react'
import { cv, navLinks } from '../data/cv.js'
import { PlaygroundToggle } from './Playground.jsx'
import { usePlayground } from './playgroundContext.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { active } = usePlayground()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        active
          ? 'pointer-events-none -translate-y-3 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-5 sm:py-2.5 ${
          scrolled
            ? 'glass border-accent-500/20 shadow-[0_8px_32px_-12px_rgba(34,211,238,0.25)]'
            : 'border-transparent'
        }`}
        style={{ marginTop: scrolled ? '12px' : '20px', width: 'min(72rem, calc(100% - 1rem))' }}
      >
        <a href="#hero" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-accent-500/40 transition-all group-hover:border-accent-400 group-hover:shadow-[0_0_20px_-2px_rgba(34,211,238,0.6)]">
            <img src="/icon.jpg" alt={cv.name} className="h-full w-full object-cover" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-accent-glow shadow-[0_0_8px_#4ade80]" />
          </span>
          <span className="hidden font-mono text-sm text-slate-300 sm:block">
            <span className="text-accent-400">~/</span>
            memeuricio
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 font-mono text-xs text-slate-300 transition-colors hover:text-accent-300"
              >
                {link.label}
                <span className="absolute inset-x-3.5 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-accent-400 to-accent-glow transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <PlaygroundToggle />
          <a
            href="#contact"
            className="hidden rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-2 font-mono text-xs text-accent-300 transition-all hover:border-accent-400 hover:bg-accent-500/20 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] sm:inline-flex"
          >
            Hablemos →
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent-500/30 bg-bg-800/60 text-accent-300 md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 overflow-hidden rounded-2xl border border-accent-500/20 bg-bg-800/95 shadow-2xl backdrop-blur md:hidden">
          <ul className="flex flex-col p-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm text-slate-300 transition-colors hover:bg-accent-500/10 hover:text-accent-300"
                >
                  <span>{link.label}</span>
                  <span className="text-accent-400">→</span>
                </a>
              </li>
            ))}
            <li className="px-1 pb-1 pt-2">
              <a
                onClick={() => setOpen(false)}
                href="#contact"
                className="flex items-center justify-center gap-2 rounded-xl border border-accent-500/40 bg-accent-500/10 px-4 py-3 font-mono text-sm text-accent-300"
              >
                Hablemos →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
