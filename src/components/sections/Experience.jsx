import { useApp } from "../../appContext.js";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";

export default function Experience() {
  const { t } = useApp();
  const { experience } = t;

  return (
    <section
      id="experience"
      className="relative z-10 border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeader
          number="02"
          kicker={experience.kicker}
          title={experience.title}
          lead={experience.lead}
        />

        <div className="mt-14">
          {t.experienceItems.map((item) => (
            <Reveal
              key={item.id}
              className="border-t border-line py-10 first:border-t-0 first:pt-0 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-10"
            >
              <div className="sm:pt-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {item.period}
                </p>
                <p className="mt-2 font-serif text-lg leading-snug text-ink">
                  {item.company}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-faint">
                  {item.location}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl leading-snug text-ink sm:text-2xl">
                  {item.role}
                </h3>

                <ul className="mt-5 space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
