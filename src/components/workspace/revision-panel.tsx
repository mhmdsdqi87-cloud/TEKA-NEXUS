"use client";

// TEKA NEXUS — Workspace revision history (Task ws-1).
// Every save snapshots a revision (≤ 20 kept). One-click restore — restores
// are themselves snapshotted, so nothing is ever lost.

import * as React from "react";
import { History, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatBytes } from "@/lib/workspace";
import type { WsRevisionMeta } from "@/lib/dto";
import { useRelativeTime } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { TekaWatermark } from "@/components/shared/teka-watermark";

export function RevisionPanel({
  revisions,
  currentSize,
  restoringId,
  canEdit,
  onRestore,
  onRefresh,
}: {
  revisions: WsRevisionMeta[];
  currentSize: number;
  restoringId: string | null;
  canEdit: boolean;
  onRestore: (revisionId: string) => void;
  onRefresh: () => void;
}) {
  const rel = useRelativeTime();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-1.5">
        <History className="h-3.5 w-3.5 text-violet-300" />
        <span className="font-mono text-[11px] text-muted-foreground">version history</span>
        <span className="rounded-full bg-white/[0.06] px-1.5 font-mono text-[10px] text-muted-foreground">{revisions.length}</span>
        <Button size="sm" variant="ghost" className="ms-auto h-6 rounded-lg px-2 text-[11px]" onClick={onRefresh}>
          Refresh
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {revisions.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground/60">
            No snapshots yet — save the file to create the first one.
          </p>
        ) : (
          <ul className="space-y-1">
            {revisions.map((r, idx) => (
              <li
                key={r.id}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs",
                  idx === 0 ? "bg-cyan-500/[0.08] ring-1 ring-cyan-400/15" : "hover:bg-white/[0.04]",
                )}
              >
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full", idx === 0 ? "bg-cyan-400" : "bg-white/20")} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[11.5px] text-foreground/85">
                    {formatBytes(r.size)} {idx === 0 ? "· latest" : ""}
                  </div>
                  <div className="truncate text-[10.5px] text-muted-foreground/70">
                    {r.editorName ? `${r.editorName} · ` : ""}
                    {rel(r.createdAt)}
                  </div>
                </div>
                {idx > 0 && canEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 gap-1 rounded-lg px-1.5 text-[10.5px]"
                    onClick={() => onRestore(r.id)}
                    disabled={restoringId === r.id}
                  >
                    <RotateCcw className="h-3 w-3" /> Restore
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-1 text-[10px] text-muted-foreground/60">
        <span className="font-mono">current: {formatBytes(currentSize)} · 20 kept per file</span>
        <TekaWatermark variant="bar" label="TEKA VCS" />
      </div>
    </div>
  );
}
