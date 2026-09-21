import { useApp } from "../../appContext.js";
import { profile } from "../../data/cv.js";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import {
  ArrowUpRightIcon,
  AwardIcon,
  GlobeIcon,
  GraduationIcon,
  MailIcon,
  MapPinIcon,
} from "../ui/Icons.jsx";

function Fact({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3 py-3.5">
      <Icon size={15} className="mt-0.5 shrink-0 text-faint" />
      <div className="min-w-0">
        <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {label}
        </dt>
        <dd className="mt-1 break-words text-sm leading-relaxed text-ink/80">
          {children}
        </dd>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useApp();
  const { about } = t;

  return (
    <section id="about" className="relative z-10 border-t border-line py-20 sm:py-28">
      <div className="container-page">
        <SectionHeader
          number="01"
          kicker={about.kicker}
          title={about.title}
          lead={about.lead}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0">
            <div className="space-y-5">
              {about.body.map((paragraph, index) => (
                <Reveal
                  key={paragraph.slice(0, 24)}
                  as="p"
                  delay={index * 70}
                  className="text-[15px] leading-relaxed text-muted sm:text-base"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {about.focusTitle}
              </h3>
              <div className="mt-6 space-y-6">
                {about.focus.map((item, index) => (
                  <div key={item.title} className="border-l border-line pl-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-faint">
                        0{index + 1}
                      </span>
                      <h4 className="font-medium text-ink">{item.title}</h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="min-w-0 lg:self-start">
            <div className="card p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <img
                  src="/perfil.png"
                  alt={profile.name}
                  className="h-16 w-16 rounded-lg border border-line object-cover"
                />
                <div className="min-w-0">
                  <p className="font-serif text-lg leading-tight text-ink">
                    {profile.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {t.hero.role.split("·")[0].trim()}
                  </p>
                </div>
              </div>

              <h3 className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {about.factsTitle}
              </h3>
              <dl className="mt-2 divide-y divide-line border-t border-line">
                <Fact icon={MapPinIcon} label={about.facts.location}>
                  Santiago, Chile
                </Fact>
                <Fact icon={MailIcon} label={about.facts.email}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {profile.email}
                  </a>
                </Fact>
                <Fact icon={GlobeIcon} label={about.facts.languages}>
                  {about.languages}
                </Fact>
                <Fact icon={GraduationIcon} label={about.facts.education}>
                  {about.education}
                </Fact>
                <Fact icon={AwardIcon} label={about.facts.certification}>
                  <a
                    href={profile.certUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    {about.certification}
                    <ArrowUpRightIcon size={12} />
                  </a>
                </Fact>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
