"use client";

// TEKA NEXUS — Workspace code editor (Task ws-1).
// Dependency-free editor: line-number gutter synced to the textarea scroll,
// Tab inserts 2 spaces, Ctrl/Cmd+S triggers save, dirty-dot + status bar with
// the TEKA watermark. Good enough for shared snippets/configs/docs.

import * as React from "react";
import { Loader2, Save } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TekaWatermark } from "@/components/shared/teka-watermark";

export function CodeEditor({
  value,
  onChange,
  onSave,
  saving,
  dirty,
  fileName,
  langLabel,
  langColor,
  lines,
  chars,
  readOnly,
  minHeight = 320,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving?: boolean;
  dirty?: boolean;
  fileName: string;
  langLabel: string;
  langColor: string;
  lines: number;
  chars: number;
  readOnly?: boolean;
  minHeight?: number;
}) {
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = React.useRef<HTMLDivElement | null>(null);

  const lineCount = Math.max(lines, value ? value.split("\n").length : 1);

  const handleScroll = React.useCallback(() => {
    if (taRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = taRef.current.scrollTop;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!readOnly && !saving) onSave();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = `${value.slice(0, start)}  ${value.slice(end)}`;
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {/* Editor surface */}
      <div className="relative flex min-h-0 flex-1">
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 shrink-0 select-none overflow-hidden border-e border-white/[0.06] bg-black/20 py-3 text-end font-mono text-[11px] leading-5 text-muted-foreground/50"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="pe-2">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          dir="ltr"
          aria-label={`Editor — ${fileName}`}
          className="min-h-0 flex-1 resize-none bg-transparent py-3 pe-3 ps-3 font-mono text-[12.5px] leading-5 text-foreground/90 outline-none placeholder:text-muted-foreground/40"
          style={{ minHeight }}
          placeholder="// start typing…"
        />
      </div>

      {/* Status bar */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.06] bg-black/40 px-3 py-1.5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 font-mono">
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: langColor }} />
          {langLabel}
        </span>
        <span className="font-mono">{lines} ln</span>
        <span className="font-mono">{chars} ch</span>
        {dirty && (
          <span className="inline-flex items-center gap-1 font-mono text-amber-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />
            unsaved
          </span>
        )}
        <span className="ms-auto inline-flex items-center gap-2">
          {readOnly ? (
            <span className="font-mono text-muted-foreground/70">read-only</span>
          ) : (
            <Button
              size="sm"
              variant={dirty ? "default" : "outline"}
              className="h-7 gap-1.5 rounded-lg px-2.5 text-[11px]"
              onClick={onSave}
              disabled={saving || !dirty}
            >
              {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
              Save
              <kbd className={cn("hidden rounded bg-white/10 px-1 font-mono text-[9px] sm:inline")}>Ctrl+S</kbd>
            </Button>
          )}
          <TekaWatermark variant="bar" />
        </span>
      </div>
    </div>
  );
}
