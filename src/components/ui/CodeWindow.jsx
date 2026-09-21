import { useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons.jsx";

const TOKEN_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\]:,])/g;

const TOKEN_CLASS = {
  comment: "text-tok-com italic",
  key: "text-tok-key",
  string: "text-tok-str",
  number: "text-tok-num",
  keyword: "text-tok-kw",
  punct: "text-tok-pun",
  plain: "text-code-text",
};

function tokenizeLine(line) {
  const tokens = [];
  let lastIndex = 0;
  let match;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", value: line.slice(lastIndex, match.index) });
    }

    const [full, comment, str, num, keyword, punct] = match;
    let type = "plain";
    if (comment) type = "comment";
    else if (str) {
      const rest = line.slice(match.index + full.length).trimStart();
      type = rest.startsWith(":") ? "key" : "string";
    } else if (num) type = "number";
    else if (keyword) type = "keyword";
    else if (punct) type = "punct";

    tokens.push({ type, value: full });
    lastIndex = match.index + full.length;
  }

  if (lastIndex < line.length) {
    tokens.push({ type: "plain", value: line.slice(lastIndex) });
  }
  return tokens;
}

function renderLine(line, keyPrefix) {
  return tokenizeLine(line).map((token, i) => (
    <span key={`${keyPrefix}-${i}`} className={TOKEN_CLASS[token.type]}>
      {token.value}
    </span>
  ));
}

export default function CodeWindow({
  title,
  lines = [],
  showLineNumbers = true,
  caret = false,
  copyable = false,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className = "",
  bodyClassName = "",
}) {
  const [copied, setCopied] = useState(false);
  const raw = lines.join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-code-bg shadow-soft ${className}`}
    >
      <figcaption className="flex items-center gap-3 border-b border-code-line bg-code-bar px-4 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#c98a84]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#cbb078]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#8fb69b]" />
        </span>
        {title && (
          <span className="truncate font-mono text-[11px] text-muted">
            {title}
          </span>
        )}
        {copyable && (
          <button
            type="button"
            onClick={copy}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
            <span>{copied ? copiedLabel : copyLabel}</span>
          </button>
        )}
      </figcaption>

      <pre
        className={`overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 ${bodyClassName}`}
      >
        <code>
          {lines.map((line, index) => (
            <span key={index} className="flex">
              {showLineNumbers && (
                <span className="mr-4 w-5 shrink-0 select-none text-right text-faint/70">
                  {index + 1}
                </span>
              )}
              <span className="whitespace-pre">
                {renderLine(line, index)}
                {caret && index === lines.length - 1 && (
                  <span className="caret" />
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
