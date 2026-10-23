"use client";

// TEKA NEXUS — Workspace debug console (Task ws-1).
// Structured log stream with level filters, one-click server diagnostics and
// manual log posting by team members. TEKA-watermarked.

import * as React from "react";
import { Loader2, Play, Plus, Terminal } from "lucide-react";

import { cn } from "@/lib/utils";
import type { WsDebugLog } from "@/lib/dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TekaWatermark } from "@/components/shared/teka-watermark";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LEVEL_STYLES: Record<string, string> = {
  info: "text-sky-300",
  success: "text-emerald-300",
  warn: "text-amber-300",
  error: "text-rose-300",
};

const LEVEL_DOT: Record<string, string> = {
  info: "bg-sky-400",
  success: "bg-emerald-400",
  warn: "bg-amber-400",
  error: "bg-rose-400",
};

export function DebugConsole({
  logs,
  running,
  canEdit,
  onRunDiagnostics,
  onPostLog,
  onRefresh,
}: {
  logs: WsDebugLog[];
  running: boolean;
  canEdit: boolean;
  onRunDiagnostics: () => void;
  onPostLog: (level: string, message: string) => void;
  onRefresh: () => void;
}) {
  const [filter, setFilter] = React.useState<string>("all");
  const [message, setMessage] = React.useState("");
  const [level, setLevel] = React.useState("info");
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const shown = React.useMemo(
    () => (filter === "all" ? logs : logs.filter((l) => l.level === filter)),
    [logs, filter],
  );

  const submit = () => {
    const msg = message.trim();
    if (!msg) return;
    onPostLog(level, msg);
    setMessage("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.06] px-2 py-1.5">
        <Terminal className="h-3.5 w-3.5 text-emerald-300" />
        <span className="me-1 font-mono text-[11px] text-muted-foreground">debug://console</span>
        {(["all", "info", "success", "warn", "error"] as const).map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => setFilter(lv)}
            className={cn(
              "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide transition-colors",
              filter === lv
                ? "bg-white/10 text-foreground ring-1 ring-white/20"
                : "text-muted-foreground/70 hover:text-foreground",
            )}
          >
            {lv}
          </button>
        ))}
        <div className="ms-auto flex items-center gap-1.5">
          {canEdit && (
            <Button size="sm" variant="outline" className="h-7 gap-1.5 rounded-lg px-2 text-[11px]" onClick={onRunDiagnostics} disabled={running}>
              {running ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
              Run diagnostics
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 rounded-lg px-2 text-[11px]" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Log stream */}
      <div ref={listRef} dir="ltr" className="min-h-0 flex-1 overflow-y-auto px-3 py-2 font-mono text-[11.5px] leading-relaxed">
        {shown.length === 0 ? (
          <p className="py-6 text-center text-muted-foreground/60">
            no log lines yet — run diagnostics or post one below
          </p>
        ) : (
          shown.map((l) => (
            <div key={l.id} className="flex gap-2 py-0.5">
              <span className="shrink-0 text-muted-foreground/50">
                {new Date(l.createdAt).toLocaleTimeString("en-GB", { hour12: false })}
              </span>
              <span className={cn("inline-block h-1.5 w-1.5 shrink-0 translate-y-[5px] rounded-full", LEVEL_DOT[l.level] ?? "bg-sky-400")} aria-hidden="true" />
              <span className={cn("shrink-0 uppercase", LEVEL_STYLES[l.level] ?? "text-sky-300")}>[{l.source}]</span>
              <span className="min-w-0 break-words text-foreground/85">{l.message}</span>
              {l.user && <span className="ms-auto hidden shrink-0 text-muted-foreground/50 sm:inline">— {l.user.displayName}</span>}
            </div>
          ))
        )}
      </div>

      {/* Composer */}
      {canEdit && (
        <div className="flex items-center gap-1.5 border-t border-white/[0.06] bg-black/20 px-2 py-1.5">
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="h-7 w-[92px] rounded-lg font-mono text-[11px]" aria-label="Log level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">info</SelectItem>
              <SelectItem value="success">success</SelectItem>
              <SelectItem value="warn">warn</SelectItem>
              <SelectItem value="error">error</SelectItem>
            </SelectContent>
          </Select>
          <Input
            dir="ltr"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="post a log line… (what did you run? what happened?)"
            className="h-7 flex-1 rounded-lg bg-white/[0.04] font-mono text-[11.5px]"
            aria-label="Log message"
            maxLength={1000}
          />
          <Button size="sm" variant="outline" className="h-7 gap-1 rounded-lg px-2" onClick={submit} disabled={!message.trim()}>
            <Plus className="h-3 w-3" /> Log
          </Button>
          <TekaWatermark variant="bar" label="TEKA DEBUG" />
        </div>
      )}
    </div>
  );
}
