import Reveal from "./Reveal.jsx";

export default function SectionHeader({ number, kicker, title, lead }) {
  return (
    <Reveal className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{number}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
