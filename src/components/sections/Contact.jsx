import { useApp } from "../../appContext.js";
import { profile } from "../../data/cv.js";
import CodeWindow from "../ui/CodeWindow.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
  PhoneIcon,
} from "../ui/Icons.jsx";

export default function Contact() {
  const { t } = useApp();
  const { contact } = t;

  return (
    <section
      id="contact"
      className="relative z-10 border-t border-line py-20 sm:py-28"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="min-w-0">
          <SectionHeader
            number="06"
            kicker={contact.kicker}
            title={contact.title}
            lead={contact.lead}
          />

          <Reveal className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              {contact.emailCta}
              <ArrowRightIcon size={15} />
            </a>
            <a href={`tel:${profile.phoneHref}`} className="btn-ghost">
              <PhoneIcon size={15} />
              {profile.phone}
            </a>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <GithubIcon size={15} />
              {profile.githubLabel}
              <ArrowUpRightIcon size={12} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <LinkedinIcon size={15} />
              {profile.linkedinLabel}
              <ArrowUpRightIcon size={12} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0">
          <CodeWindow
            title={contact.codeTitle}
            lines={contact.code}
            copyable
            copyLabel={t.ui.copy}
            copiedLabel={t.ui.copied}
          />
        </Reveal>
      </div>
    </section>
  );
}
