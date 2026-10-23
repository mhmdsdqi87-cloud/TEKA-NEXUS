"use client";

// TEKA NEXUS — Workspace file tree (Task ws-1).
// Flat DB list → hierarchical tree with collapsible folders, HTML5 drag &
// drop move, starring, search filter and per-row context menus.

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  File as FileIcon,
  FilePlus2,
  FolderPlus,
  Folder as FolderIcon,
  MoreHorizontal,
  Pencil,
  Search,
  Star,
  Trash2,
  FolderInput,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatBytes, langMeta } from "@/lib/workspace";
import type { WsFileMeta } from "@/lib/dto";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TreeNode = {
  key: string;
  file: WsFileMeta;
  children: TreeNode[];
};

function buildTree(files: WsFileMeta[]): TreeNode[] {
  const nodes = new Map<string, TreeNode>();
  for (const f of files) nodes.set(f.id, { key: f.id, file: f, children: [] });
  const roots: TreeNode[] = [];
  const pathToFolderNode = new Map<string, TreeNode>();

  // Folders first so files can attach to them.
  const ordered = [...files].sort((a, b) => {
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  for (const f of ordered) {
    const node = nodes.get(f.id)!;
    if (f.isFolder) pathToFolderNode.set(f.folder === "/" ? `/${f.name}` : `${f.folder}/${f.name}`, node);
  }
  for (const f of ordered) {
    const node = nodes.get(f.id)!;
    const parent = pathToFolderNode.get(f.folder);
    if (parent && f.id !== parent.file.id) parent.children.push(node);
    else roots.push(node);
  }

  const sortRec = (list: TreeNode[]) => {
    list.sort((a, b) => {
      if (a.file.isFolder !== b.file.isFolder) return a.file.isFolder ? -1 : 1;
      if (a.file.starred !== b.file.starred) return a.file.starred ? -1 : 1;
      return a.file.name.localeCompare(b.file.name);
    });
    for (const n of list) sortRec(n.children);
  };
  sortRec(roots);
  return roots;
}

export function FileTree({
  files,
  openFileId,
  canEdit,
  onOpen,
  onCreateFile,
  onCreateFolder,
  onRename,
  onDelete,
  onToggleStar,
  onDuplicate,
  onDownload,
  onMove,
}: {
  files: WsFileMeta[];
  openFileId: string | null;
  canEdit: boolean;
  onOpen: (f: WsFileMeta) => void;
  onCreateFile: (folder: string) => void;
  onCreateFolder: (folder: string) => void;
  onRename: (f: WsFileMeta) => void;
  onDelete: (f: WsFileMeta) => void;
  onToggleStar: (f: WsFileMeta) => void;
  onDuplicate: (f: WsFileMeta) => void;
  onDownload: (f: WsFileMeta) => void;
  onMove: (f: WsFileMeta, targetFolder: string) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const [dragOver, setDragOver] = React.useState<string | null>(null);
  const [dragId, setDragId] = React.useState<string | null>(null);

  const tree = React.useMemo(() => buildTree(files), [files]);
  const folders = React.useMemo(
    () => files.filter((f) => f.isFolder).map((f) => (f.folder === "/" ? `/${f.name}` : `${f.folder}/${f.name}`)).sort(),
    [files],
  );

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const q = query.trim().toLowerCase();
  const filtered = q
    ? files.filter((f) => `${f.folder === "/" ? "" : `${f.folder}/`}${f.name}`.toLowerCase().includes(q))
    : null;

  const starred = files.filter((f) => f.starred && !f.isFolder);

  const renderRow = (node: TreeNode, depth: number) => {
    const f = node.file;
    const isOpen = openFileId === f.id;
    const isCollapsed = collapsed.has(f.id);
    const path = f.folder === "/" ? `/${f.name}` : `${f.folder}/${f.name}`;
    const meta = f.isFolder ? null : langMeta(f.language);

    return (
      <div key={f.id}>
        <div
          draggable={canEdit}
          onDragStart={(e) => {
            setDragId(f.id);
            e.dataTransfer.setData("text/teka-node", f.id);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragEnd={() => {
            setDragId(null);
            setDragOver(null);
          }}
          onDragOver={(e) => {
            if (!dragId || dragId === f.id) return;
            if (!f.isFolder) return;
            e.preventDefault();
            setDragOver(f.id);
          }}
          onDragLeave={() => setDragOver((cur) => (cur === f.id ? null : cur))}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/teka-node") || dragId;
            setDragOver(null);
            setDragId(null);
            if (!id || id === f.id || !f.isFolder) return;
            const dragged = files.find((x) => x.id === id);
            if (dragged) onMove(dragged, path);
          }}
          className={cn(
            "group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors",
            isOpen ? "bg-cyan-500/[0.12] text-foreground ring-1 ring-cyan-400/20" : "hover:bg-white/[0.05] text-foreground/80",
            dragOver === f.id && "ring-2 ring-violet-400/40 bg-violet-500/10",
            dragId === f.id && "opacity-40",
          )}
          style={{ paddingInlineStart: `${depth * 14 + 8}px` }}
        >
          <button
            type="button"
            aria-label={f.isFolder ? (isCollapsed ? "Expand folder" : "Collapse folder") : undefined}
            className={cn("flex h-4 w-4 shrink-0 items-center justify-center", !f.isFolder && "invisible")}
            onClick={() => toggle(f.id)}
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {f.isFolder ? (
            <FolderIcon className="h-4 w-4 shrink-0 text-amber-300/80" />
          ) : meta ? (
            <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} aria-hidden="true" />
          ) : (
            <FileIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}

          <button type="button" className="min-w-0 flex-1 truncate text-start font-mono" onClick={() => (f.isFolder ? toggle(f.id) : onOpen(f))} title={path}>
            {f.name}
          </button>

          {f.starred && <Star className="h-3 w-3 shrink-0 fill-amber-300 text-amber-300" />}
          {!f.isFolder && f.size > 0 && (
            <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground/60 group-hover:inline sm:inline">{formatBytes(f.size)}</span>
          )}

          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" aria-label={`Actions for ${f.name}`} className="invisible flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-white/10 group-hover:visible">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {!f.isFolder && (
                  <DropdownMenuItem onClick={() => onOpen(f)}>
                    <FileIcon className="h-3.5 w-3.5" /> Open
                  </DropdownMenuItem>
                )}
                {f.isFolder && (
                  <>
                    <DropdownMenuItem onClick={() => onCreateFile(path)}>
                      <FilePlus2 className="h-3.5 w-3.5" /> New file here
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCreateFolder(path)}>
                      <FolderPlus className="h-3.5 w-3.5" /> New folder here
                    </DropdownMenuItem>
                  </>
                )}
                {!f.isFolder && (
                  <DropdownMenuItem onClick={() => onDownload(f)}>
                    <Download className="h-3.5 w-3.5" /> Download
                  </DropdownMenuItem>
                )}
                {!f.isFolder && (
                  <DropdownMenuItem onClick={() => onDuplicate(f)}>
                    <Copy className="h-3.5 w-3.5" /> Duplicate
                  </DropdownMenuItem>
                )}
                {!f.isFolder && (
                  <DropdownMenuItem onClick={() => onToggleStar(f)}>
                    <Star className={cn("h-3.5 w-3.5", f.starred && "fill-amber-300 text-amber-300")} />
                    {f.starred ? "Unstar" : "Star"}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <FolderInput className="h-3.5 w-3.5" /> Move to…
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
                    <DropdownMenuItem onClick={() => onMove(f, "/")}>/ (root)</DropdownMenuItem>
                    {folders
                      .filter((p) => p !== path && !p.startsWith(`${path}/`))
                      .map((p) => (
                        <DropdownMenuItem key={p} onClick={() => onMove(f, p)}>
                          {p}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onRename(f)}>
                  <Pencil className="h-3.5 w-3.5" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(f)} className="text-rose-300 focus:text-rose-300">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {f.isFolder && !isCollapsed && node.children.map((child) => renderRow(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files…"
            className="h-8 rounded-lg bg-white/[0.04] ps-8 text-xs"
            aria-label="Search workspace files"
          />
        </div>
        {canEdit && (
          <>
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg" title="New file" aria-label="New file" onClick={() => onCreateFile("/")}>
              <FilePlus2 className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg" title="New folder" aria-label="New folder" onClick={() => onCreateFolder("/")}>
              <FolderPlus className="h-3.5 w-3.5" />
            </Button>
          </>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pe-1">
        {!q && starred.length > 0 && (
          <div className="mb-2">
            <div className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">★ Starred</div>
            {starred.map((f) => {
              const meta = langMeta(f.language);
              return (
                <div
                  key={`star-${f.id}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors",
                    openFileId === f.id ? "bg-cyan-500/[0.12] ring-1 ring-cyan-400/20" : "hover:bg-white/[0.05]",
                  )}
                >
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta.color }} aria-hidden="true" />
                  <button type="button" className="min-w-0 flex-1 truncate text-start font-mono" onClick={() => onOpen(f)}>
                    {f.name}
                  </button>
                  <span className="font-mono text-[10px] text-muted-foreground/50">{f.folder}</span>
                </div>
              );
            })}
          </div>
        )}

        {filtered
          ? filtered.map((f) => {
              const meta = f.isFolder ? null : langMeta(f.language);
              return (
                <div
                  key={`q-${f.id}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px]",
                    openFileId === f.id ? "bg-cyan-500/[0.12] ring-1 ring-cyan-400/20" : "hover:bg-white/[0.05]",
                  )}
                >
                  {f.isFolder ? <FolderIcon className="h-4 w-4 shrink-0 text-amber-300/80" /> : <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: meta?.color }} aria-hidden="true" />}
                  <button type="button" className="min-w-0 flex-1 truncate text-start font-mono" onClick={() => (f.isFolder ? toggle(f.id) : onOpen(f))}>
                    {f.name}
                  </button>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/50">{f.folder === "/" ? "" : f.folder}</span>
                </div>
              );
            })
          : tree.map((n) => renderRow(n, 0))}

        {files.length === 0 && (
          <div className="px-3 py-10 text-center text-xs text-muted-foreground/70">
            <p className="font-mono">empty workspace</p>
            <p className="mt-1">Create your first file to start building.</p>
          </div>
        )}
      </div>
    </div>
  );
}
