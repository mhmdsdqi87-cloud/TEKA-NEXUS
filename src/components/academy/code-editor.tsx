"use client";

// TEKA NEXUS — TEKA Academy code editor.
// A dependency-free code editor: transparent <textarea> layered over a
// syntax-highlighted <pre> (the classic overlay trick), with line numbers,
// Tab/Shift-Tab indent editing and scroll sync. Python + HTML tokenizers.

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

// ─── Tokenizers ──────────────────────────────────────────────

export type Tok = { text: string; cls?: string };

const PY_KEYWORDS = new Set([
  "if", "elif", "else", "while", "for", "in", "def", "return", "break",
  "continue", "pass", "and", "or", "not", "import",
]);
const PY_CONSTS = new Set(["True", "False", "None"]);
const PY_BUILTINS = new Set([
  "print", "input", "len", "int", "float", "str", "bool", "range", "sum",
  "max", "min", "abs", "round", "sorted", "list", "random", "math", "seed",
  "randint", "choice", "shuffle", "sqrt", "floor", "ceil", "pow",
]);

function tokenizePython(code: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const push = (text: string, cls?: string) => text && toks.push({ text, cls });
  while (i < code.length) {
    const ch = code[i];
    // comment
    if (ch === "#") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j += 1;
      push(code.slice(i, j), "text-slate-500 italic");
      i = j;
      continue;
    }
    // strings & f-strings
    if ((ch === "f" || ch === "F") && (code[i + 1] === '"' || code[i + 1] === "'")) {
      const q = code[i + 1];
      let j = i + 2;
      while (j < code.length && code[j] !== q && code[j] !== "\n") {
        if (code[j] === "\\") j += 1;
        j += 1;
      }
      push(code.slice(i, Math.min(j + 1, code.length)), "text-emerald-300");
      i = Math.min(j + 1, code.length);
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== ch && code[j] !== "\n") {
        if (code[j] === "\\") j += 1;
        j += 1;
      }
      push(code.slice(i, Math.min(j + 1, code.length)), "text-emerald-300");
      i = Math.min(j + 1, code.length);
      continue;
    }
    // numbers
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < code.length && /[0-9._]/.test(code[j])) j += 1;
      push(code.slice(i, j), "text-amber-300");
      i = j;
      continue;
    }
    // names
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j += 1;
      const word = code.slice(i, j);
      const before = code.slice(0, i).trimEnd().endsWith(".");
      const cls = PY_KEYWORDS.has(word)
        ? "text-violet-300 font-medium"
        : PY_CONSTS.has(word)
          ? "text-amber-300"
          : PY_BUILTINS.has(word)
            ? "text-cyan-300"
            : before
              ? "text-teal-200"
              : undefined;
      push(word, cls);
      i = j;
      continue;
    }
    if (ch === "\n") {
      push("\n");
      i += 1;
      continue;
    }
    if ("+-*/%<>=!(),:.[]{}".includes(ch)) {
      push(ch, "text-slate-400");
      i += 1;
      continue;
    }
    push(ch);
    i += 1;
  }
  return toks;
}

const HTML_VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

function tokenizeHtml(code: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const push = (text: string, cls?: string) => text && toks.push({ text, cls });
  let inStyle = false;
  let inScript = false;

  const pushCss = (chunk: string) => {
    // very light CSS highlighting
    const re = /([{};])|([-\w]+)(\s*:\s*)|([^{};:]+)(?=[{;])|(\/\*[\s\S]*?\*\/)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(chunk))) {
      if (m.index > last) push(chunk.slice(last, m.index));
      if (m[1]) push(m[1], "text-slate-400");
      else if (m[2]) { push(m[2], "text-teal-200"); push(m[3], "text-slate-400"); }
      else if (m[5]) push(m[5], "text-slate-500 italic");
      else if (m[4]) push(m[4], "text-amber-200/80");
      last = re.lastIndex;
    }
    if (last < chunk.length) push(chunk.slice(last));
  };

  const pushJs = (chunk: string) => {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(function|return|if|else|var|let|const|true|false|null|this|document|querySelector|classList|toggle|addEventListener)\b/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(chunk))) {
      if (m.index > last) push(chunk.slice(last, m.index));
      if (m[1]) push(m[1], "text-slate-500 italic");
      else if (m[2]) push(m[2], "text-emerald-300");
      else push(m[3], "text-violet-300");
      last = re.lastIndex;
    }
    if (last < chunk.length) push(chunk.slice(last));
  };

  while (i < code.length) {
    if (inStyle || inScript) {
      const closeTag = inStyle ? "</style" : "</script";
      const idx = code.toLowerCase().indexOf(closeTag, i);
      const chunk = idx === -1 ? code.slice(i) : code.slice(i, idx);
      if (inStyle) pushCss(chunk);
      else pushJs(chunk);
      i = idx === -1 ? code.length : idx;
      inStyle = false;
      inScript = false;
      continue;
    }
    // comment
    if (code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i);
      const stop = end === -1 ? code.length : end + 3;
      push(code.slice(i, stop), "text-slate-500 italic");
      i = stop;
      continue;
    }
    // closing tag
    if (code.startsWith("</", i)) {
      let j = i + 2;
      while (j < code.length && /[a-zA-Z0-9-]/.test(code[j])) j += 1;
      push("</", "text-slate-400");
      push(code.slice(i + 2, j), "text-cyan-300");
      i = j;
      continue;
    }
    // opening tag
    if (code[i] === "<") {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9!-]/.test(code[j])) j += 1;
      const tag = code.slice(i + 1, j).toLowerCase();
      push("<", "text-slate-400");
      push(code.slice(i + 1, j), "text-cyan-300");
      i = j;
      // attributes until >
      while (i < code.length && code[i] !== ">") {
        if (/\s/.test(code[i])) { push(code[i]); i += 1; continue; }
        if (code[i] === "=") { push("=", "text-slate-400"); i += 1; continue; }
        if (code[i] === '"' || code[i] === "'") {
          const q = code[i];
          let k = i + 1;
          while (k < code.length && code[k] !== q) k += 1;
          push(code.slice(i, Math.min(k + 1, code.length)), "text-emerald-300");
          i = Math.min(k + 1, code.length);
          continue;
        }
        let k = i;
        while (k < code.length && !/[\s=>" <]/.test(code[k])) k += 1;
        push(code.slice(i, k), "text-violet-300");
        i = k;
      }
      if (i < code.length) {
        push(">", "text-slate-400");
        i += 1;
      }
      if (tag === "style") inStyle = true;
      if (tag === "script" && !HTML_VOID.has(tag)) inScript = true;
      continue;
    }
    // text
    let j = i;
    while (j < code.length && code[j] !== "<" && code[j] !== "\n") j += 1;
    if (j === i) {
      push(code[i]);
      i += 1;
    } else {
      push(code.slice(i, j));
      i = j;
    }
  }
  return toks;
}

export function highlightCode(code: string, lang: "python" | "html"): Tok[] {
  return lang === "python" ? tokenizePython(code) : tokenizeHtml(code);
}

// ─── Editor ──────────────────────────────────────────────────

export function CodeEditor({
  value,
  onChange,
  lang,
  className,
  ariaLabel,
  minRows = 6,
}: {
  value: string;
  onChange: (v: string) => void;
  lang: "python" | "html";
  className?: string;
  ariaLabel?: string;
  minRows?: number;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const toks = useMemo(() => highlightCode(value, lang), [value, lang]);
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const indent = lang === "python" ? "    " : "  ";

  const syncScroll = () => {
    const ta = taRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop;
  };

  // keep highlight in place when value changes externally (reset/solution)
  useEffect(syncScroll, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart: s, selectionEnd: en } = ta;
      if (e.shiftKey) {
        // outdent current line
        const lineStart = value.lastIndexOf("\n", s - 1) + 1;
        const lineText = value.slice(lineStart, s);
        const strip = lineText.match(/^([ \t]{1,4})/);
        if (strip) {
          const next = value.slice(0, lineStart) + lineText.slice(strip[1].length) + value.slice(s);
          onChange(next);
          requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = Math.max(lineStart, s - strip[1].length);
          });
        }
      } else if (s !== en) {
        // indent each selected line
        const lineStart = value.lastIndexOf("\n", s - 1) + 1;
        const selected = value.slice(lineStart, en);
        const indented = selected.replace(/^/gm, indent);
        const next = value.slice(0, lineStart) + indented + value.slice(en);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = lineStart;
          ta.selectionEnd = lineStart + indented.length;
        });
      } else {
        const next = value.slice(0, s) + indent + value.slice(en);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = s + indent.length;
        });
      }
    }
    if (e.key === "Enter") {
      // auto-indent: copy leading whitespace of current line
      const s = ta.selectionStart;
      const lineStart = value.lastIndexOf("\n", s - 1) + 1;
      const lineText = value.slice(lineStart, s);
      const lead = lineText.match(/^[ \t]*/)?.[0] ?? "";
      const extra = /[:>{(]$/.test(lineText.trimEnd()) && lang === "python" ? indent : "";
      if (lead || extra) {
        e.preventDefault();
        const insert = "\n" + lead + extra;
        const next = value.slice(0, s) + insert + value.slice(ta.selectionEnd);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = s + insert.length;
        });
      }
    }
  };

  const rows = Math.max(minRows, Math.min(lineCount, 24));

  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-xl border border-white/10 bg-[#0b1220] font-mono text-[13px] leading-6 focus-within:ring-2 focus-within:ring-cyan-400/40",
        className,
      )}
      dir="ltr"
    >
      {/* line numbers */}
      <div
        ref={gutterRef}
        aria-hidden="true"
        className="select-none overflow-hidden py-3 ps-3 pe-2 text-end text-slate-600"
        style={{ minWidth: "2.6rem" }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <pre
          ref={preRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre px-3 py-3 text-slate-200"
        >
          {toks.map((t, i) => (
            <span key={i} className={t.cls}>
              {t.text}
            </span>
          ))}
          {"\n"}
        </pre>
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label={ariaLabel}
          rows={rows}
          className="relative z-10 w-full resize-none overflow-x-auto whitespace-pre bg-transparent px-3 py-3 text-transparent caret-cyan-300 outline-none"
        />
      </div>
    </div>
  );
}

// ─── Read-only highlighted code block ────────────────────────

export function CodeBlock({
  code,
  lang,
  className,
}: {
  code: string;
  lang: "python" | "html";
  className?: string;
}) {
  const toks = useMemo(() => highlightCode(code, lang), [code, lang]);
  return (
    <pre
      dir="ltr"
      className={cn(
        "overflow-x-auto rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 font-mono text-[13px] leading-6 text-slate-200",
        className,
      )}
    >
      {toks.map((t, i) => (
        <span key={i} className={t.cls}>
          {t.text}
        </span>
      ))}
    </pre>
  );
}
