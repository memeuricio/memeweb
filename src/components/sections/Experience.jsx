import { cv } from '../../data/cv.js'
import { SectionHeader } from './About.jsx'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          tag="02"
          title="Experiencia"
          subtitle="Una línea de tiempo de los lugares donde he construido cosas"
        />

        <div className="relative mt-12 sm:mt-16">
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-gradient-to-b from-accent-500/60 via-accent-500/20 to-transparent md:left-1/2 md:block" />

          <ul className="flex flex-col gap-8 sm:gap-10">
            {cv.experience.map((item, idx) => (
              <li key={item.company} className="relative md:grid md:grid-cols-2 md:gap-12">
                <span className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-400 bg-bg-900 shadow-[0_0_12px_rgba(34,211,238,0.7)] md:left-1/2 md:block" />

                <div className={`pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'}`}>
                  <div className="font-mono text-xs text-accent-400">{item.period}</div>
                  <h3 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">{item.role}</h3>
                  <div className="text-sm text-slate-400">
                    {item.company} · <span className="text-slate-500">{item.location}</span>
                  </div>
                </div>

                <div className={`mt-3 pl-12 md:mt-0 md:pl-0 ${idx % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:pr-12 md:text-right'}`}>
                  <div className="rounded-2xl border border-slate-800/60 bg-bg-800/40 p-4 text-left backdrop-blur transition-colors hover:border-accent-500/30 sm:p-5">
                    <ul className="space-y-2 text-sm text-slate-300">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2 md:gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                          <span className="text-slate-200">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-4 flex flex-wrap gap-1.5`}>
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-accent-500/30 bg-accent-500/5 px-2.5 py-0.5 font-mono text-[11px] text-accent-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
