import { useApp } from "../../appContext.js";
import Reveal from "../ui/Reveal.jsx";
import SectionHeader from "../ui/SectionHeader.jsx";
import {
  ArrowUpRightIcon,
  GlobeIcon,
  LockIcon,
} from "../ui/Icons.jsx";

export default function LiveProjects() {
  const { t } = useApp();
  const { live } = t;

  return (
    <section
      id="live"
      className="relative z-10 border-t border-line py-20 sm:py-28"
    >
      <div className="container-page">
        <SectionHeader
          number="04"
          kicker={live.kicker}
          title={live.title}
          lead={live.lead}
        />

        <Reveal className="mt-14">
          <ul className="card divide-y divide-line overflow-hidden">
            {live.items.map((item, index) => {
              const domain = new URL(item.url).hostname.replace(/^www\./, "");

              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    title={live.visit}
                    className="group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 px-5 py-6 transition-colors duration-300 hover:bg-accent-soft/60 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:px-7"
                  >
                    <span className="flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-white p-1.5 sm:h-20 sm:w-40 sm:p-2">
                      <img
                        src={item.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="font-mono text-[10px] text-faint">
                          0{index + 1}
                        </span>
                        <span className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-accent sm:text-xl">
                          {item.name}
                        </span>
                        {item.restricted && (
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-faint">
                            <LockIcon size={10} />
                            {live.restricted}
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                        {item.description}
                      </span>
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                        {item.context}
                      </span>
                    </span>

                    <span className="col-span-2 flex items-center gap-2 font-mono text-[11px] text-muted transition-colors group-hover:text-accent sm:col-span-1">
                      <GlobeIcon size={13} />
                      {domain}
                      <ArrowUpRightIcon
                        size={13}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
