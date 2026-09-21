import { useApp } from "../../appContext.js";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";

export default function Projects() {
  const { t } = useApp();
  const { projects } = t;

  return (
    <section
      id="projects"
      className="relative z-10 border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeader
          number="03"
          kicker={projects.kicker}
          title={projects.title}
          lead={projects.lead}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {t.projectItems.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 80}>
              <article className="card flex h-full flex-col p-6 transition-colors duration-300 hover:border-line-strong">
                <div className="flex items-baseline justify-between gap-4 font-mono text-[11px] text-faint">
                  <span>{project.company}</span>
                  <span>{project.period}</span>
                </div>

                <h3 className="mt-4 font-serif text-xl leading-snug text-ink">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {project.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
