import { cv } from '../../data/cv.js'
import { SectionHeader } from './About.jsx'

export default function Skills() {
  const groups = Object.entries(cv.skills)
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeader
          tag="04"
          title="Stack & Skills"
          subtitle="Las herramientas que uso día a día, con honestidad"
        />

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([category, items], gi) => (
            <div
              key={category}
              className="rounded-2xl border border-slate-800/60 bg-bg-800/40 p-5 backdrop-blur sm:p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm text-accent-300">{category}</h3>
                <span className="font-mono text-[11px] text-slate-500">0{gi + 1}</span>
              </div>
              <ul className="mt-5 space-y-4 sm:mt-6">
                {items.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-200">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-glow shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
