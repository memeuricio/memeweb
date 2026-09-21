import { useApp } from "../../appContext.js";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";

export default function Skills() {
  const { t } = useApp();
  const { skills } = t;

  return (
    <section
      id="skills"
      className="relative z-10 border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeader
          number="05"
          kicker={skills.kicker}
          title={skills.title}
          lead={skills.lead}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, index) => (
            <Reveal key={group.title} delay={(index % 3) * 70}>
              <div className="card flex h-full flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10px] text-faint">
                    0{index + 1}
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
