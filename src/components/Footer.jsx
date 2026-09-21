import { useApp } from "../appContext.js";
import { profile } from "../data/cv.js";
import { ArrowUpIcon } from "./ui/Icons.jsx";

export default function Footer() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-[11px] text-muted">
            © {year} {profile.name}
          </p>
          <p className="mt-1 text-xs text-faint">
            {t.footer.built} · {t.footer.stack}
          </p>
        </div>
        <a
          href="#hero"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-accent"
        >
          <ArrowUpIcon size={13} />
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
