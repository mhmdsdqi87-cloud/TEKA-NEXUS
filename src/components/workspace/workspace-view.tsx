"use client";

// TEKA NEXUS — Project Workspace (Task ws-1).
// A shared in-app development environment per project: file tree with
// drag & drop, dependency-free code editor, automatic version history and a
// team debug console with one-click diagnostics. Everything TEKA-watermarked.

import * as React from "react";
import { toast } from "sonner";
import {
  Boxes,
  Download,
  FilePlus2,
  FolderPlus,
  FolderTree,
  Loader2,
  Lock,
  RefreshCw,
  TerminalSquare,
} from "lucide-react";

import { get, post, put, patch, del, ApiError } from "@/lib/api";
import { useT } from "@/lib/i18n";
import { formatBytes, langMeta, countLines } from "@/lib/workspace";
import { WS_TEMPLATES, templateById } from "@/lib/workspace-templates";
import type {
  WorkspaceResponse,
  WorkspaceFileResponse,
  WsFileMeta,
  WsFileFull,
  WsRevisionMeta,
} from "@/lib/dto";
import { FileTree } from "./file-tree";
import { CodeEditor } from "./code-editor";
import { DebugConsole } from "./debug-console";
import { RevisionPanel } from "./revision-panel";
import { TekaWatermark } from "@/components/shared/teka-watermark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function WorkspaceView({ slug, canEdit, initialFileId }: { slug: string; canEdit: boolean; initialFileId?: string }) {
  const t = useT();
  const base = `/api/projects/${slug}/workspace`;
  const debugBase = `/api/projects/${slug}/debug`;

  // ─── Data ──────────────────────────────────────────────────
  const [files, setFiles] = React.useState<WsFileMeta[]>([]);
  const [logs, setLogs] = React.useState<WorkspaceResponse["logs"]>([]);
  const [stats, setStats] = React.useState<WorkspaceResponse["stats"] | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [openFile, setOpenFile] = React.useState<WsFileFull | null>(null);
  const [revisions, setRevisions] = React.useState<WsRevisionMeta[]>([]);
  const [fileLoading, setFileLoading] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const [runningDiag, setRunningDiag] = React.useState(false);
  const [restoringId, setRestoringId] = React.useState<string | null>(null);
  const [bottomTab, setBottomTab] = React.useState("console");

  // Dialogs
  const [createDialog, setCreateDialog] = React.useState<{ open: boolean; folder: string; isFolder: boolean } | null>(null);
  const [createName, setCreateName] = React.useState("");
  const [createTemplate, setCreateTemplate] = React.useState("empty");
  const [renameTarget, setRenameTarget] = React.useState<WsFileMeta | null>(null);
  const [renameValue, setRenameValue] = React.useState("");
  const [moveTarget, setMoveTarget] = React.useState<WsFileMeta | null>(null);
  const [moveFolder, setMoveFolder] = React.useState("/");
  const [deleteTarget, setDeleteTarget] = React.useState<WsFileMeta | null>(null);

  const loadWorkspace = React.useCallback(async () => {
    try {
      const res = await get<WorkspaceResponse>(base);
      setFiles(res.files);
      setLogs(res.logs);
      setStats(res.stats);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 403) toast.error(t("workspace.toast.loadError"));
    } finally {
      setLoading(false);
    }
  }, [base, t]);

  React.useEffect(() => {
    // Fetch-on-mount: workspace tree + logs for this project.
    void loadWorkspace();
  }, [loadWorkspace]);

  // Deep link: hub "recent files" jumps straight into the editor with the
  // requested file pre-opened once the tree has loaded. The effect itself
  // lives right after openFileById is declared (it references it).
  const pendingOpenId = React.useRef<string | null>(initialFileId ?? null);

  // Light 10s poll of the debug console so the team sees each other's runs.
  React.useEffect(() => {
    const id = setInterval(() => {
      void get<{ logs: WorkspaceResponse["logs"] }>(debugBase)
        .then((r) => setLogs(r.logs))
        .catch(() => {});
    }, 10_000);
    return () => clearInterval(id);
  }, [debugBase]);

  // ─── File ops ──────────────────────────────────────────────

  const openFileById = React.useCallback(
    async (f: WsFileMeta) => {
      if (f.isFolder) return;
      setFileLoading(true);
      try {
        const res = await get<WorkspaceFileResponse>(`${base}/file?fileId=${f.id}`);
        setOpenFile(res.file);
        setRevisions(res.revisions);
        setDraft(res.file.content);
        setBottomTab("console");
      } catch {
        toast.error(t("workspace.toast.loadError"));
      } finally {
        setFileLoading(false);
      }
    },
    [base, t],
  );

  React.useEffect(() => {
    if (loading || !pendingOpenId.current) return;
    const target = files.find((f) => f.id === pendingOpenId.current && !f.isFolder);
    if (target) {
      pendingOpenId.current = null;
      void openFileById(target);
    }
  }, [loading, files, openFileById]);

  const refreshRevisions = React.useCallback(async () => {
    if (!openFile) return;
    try {
      const res = await get<{ revisions: WsRevisionMeta[] }>(`${base}/revisions?fileId=${openFile.id}`);
      setRevisions(res.revisions);
    } catch {
      /* non-critical */
    }
  }, [base, openFile]);

  const saveFile = React.useCallback(async () => {
    if (!openFile) return;
    setSaving(true);
    try {
      await put(`${base}/file`, { fileId: openFile.id, content: draft });
      setOpenFile((cur) => (cur ? { ...cur, content: draft } : cur));
      toast.success(t("workspace.toast.saved", { name: openFile.name }));
      void refreshRevisions();
      void loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    } finally {
      setSaving(false);
    }
  }, [base, openFile, draft, refreshRevisions, loadWorkspace, t]);

  const createNode = async () => {
    if (!createDialog) return;
    const name = createName.trim();
    if (!name) return;
    try {
      const res = await post<{ file: WsFileMeta }>(base, {
        name,
        folder: createDialog.folder,
        isFolder: createDialog.isFolder,
        templateId: createDialog.isFolder ? undefined : createTemplate,
      });
      setCreateDialog(null);
      setCreateName("");
      setCreateTemplate("empty");
      toast.success(t("workspace.toast.created", { name: res.file.name }));
      await loadWorkspace();
      if (!res.file.isFolder) void openFileById(res.file);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const doRename = async () => {
    if (!renameTarget) return;
    try {
      await patch(base, { fileId: renameTarget.id, name: renameValue.trim() });
      toast.success(t("workspace.toast.renamed", { name: renameValue.trim() }));
      setRenameTarget(null);
      await loadWorkspace();
      if (openFile?.id === renameTarget.id) await openFileById({ ...renameTarget, name: renameValue.trim() });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const doMove = async (f: WsFileMeta, folder: string) => {
    if (f.folder === folder) return;
    try {
      await patch(base, { fileId: f.id, folder });
      toast.success(t("workspace.toast.moved", { name: f.name, folder }));
      await loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const toggleStar = async (f: WsFileMeta) => {
    try {
      await patch(base, { fileId: f.id, starred: !f.starred });
      toast.success(t(f.starred ? "workspace.toast.unstarred" : "workspace.toast.starred", { name: f.name }));
      await loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const doDelete = async () => {
    if (!deleteTarget) return;
    try {
      await del(`${base}?fileId=${deleteTarget.id}`);
      toast.success(t("workspace.toast.deleted", { name: deleteTarget.name }));
      if (openFile && (openFile.id === deleteTarget.id || openFile.folder.startsWith(deleteTarget.folder))) {
        setOpenFile(null);
        setRevisions([]);
      }
      setDeleteTarget(null);
      await loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const duplicate = async (f: WsFileMeta) => {
    try {
      const full = await get<WorkspaceFileResponse>(`${base}/file?fileId=${f.id}`);
      const dot = f.name.lastIndexOf(".");
      const copyName = dot > 0 ? `${f.name.slice(0, dot)}-copy${f.name.slice(dot)}` : `${f.name}-copy`;
      const res = await post<{ file: WsFileMeta }>(base, {
        name: copyName,
        folder: f.folder,
        content: full.file.content,
      });
      toast.success(t("workspace.toast.duplicated", { name: res.file.name }));
      await loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const downloadFile = async (f: WsFileMeta) => {
    try {
      const full = await get<WorkspaceFileResponse>(`${base}/file?fileId=${f.id}`);
      const blob = new Blob([full.file.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.name;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const exportAll = async () => {
    try {
      const realFiles = files.filter((f) => !f.isFolder).slice(0, 60);
      const contents = await Promise.all(
        realFiles.map((f) =>
          get<WorkspaceFileResponse>(`${base}/file?fileId=${f.id}`).then((r) => ({
            path: f.folder === "/" ? `/${f.name}` : `${f.folder}/${f.name}`,
            language: f.language,
            size: f.size,
            updatedAt: f.updatedAt,
            updatedBy: f.updatedBy?.displayName ?? null,
            content: r.file.content,
          })),
        ),
      );
      const manifest = {
        generator: "TEKA NEXUS Workspace",
        watermark: "TEKA",
        project: slug,
        exportedAt: new Date().toISOString(),
        files: contents,
      };
      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `teka-workspace-${slug}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t("workspace.toast.exported", { n: contents.length }));
    } catch {
      toast.error(t("common.error"));
    }
  };

  // ─── Debug console ops ─────────────────────────────────────

  const refreshLogs = React.useCallback(async () => {
    try {
      const res = await get<{ logs: WorkspaceResponse["logs"] }>(debugBase);
      setLogs(res.logs);
    } catch {
      /* non-critical */
    }
  }, [base]);

  const runDiagnostics = async () => {
    setRunningDiag(true);
    setBottomTab("console");
    try {
      const res = await put<{ run: { files: number; errors: number; warnings: number; logsAdded: number } }>(debugBase);
      toast.success(
        t("workspace.toast.diagDone", { errors: res.run.errors, warnings: res.run.warnings }),
      );
      await refreshLogs();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    } finally {
      setRunningDiag(false);
    }
  };

  const postLog = async (level: string, message: string) => {
    try {
      await post(debugBase, { level, message });
      await refreshLogs();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    }
  };

  const restoreRevision = async (revisionId: string) => {
    if (!openFile) return;
    setRestoringId(revisionId);
    try {
      const res = await post<{ content: string }>(`${base}/revisions`, { fileId: openFile.id, revisionId });
      setDraft(res.content);
      setOpenFile((cur) => (cur ? { ...cur, content: res.content } : cur));
      toast.success(t("workspace.toast.restored"));
      await refreshRevisions();
      await loadWorkspace();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : t("common.error"));
    } finally {
      setRestoringId(null);
    }
  };

  // ─── Derived ───────────────────────────────────────────────

  const dirty = openFile !== null && draft !== openFile.content;
  const meta = openFile ? langMeta(openFile.language) : null;

  const folderOptions = React.useMemo(() => {
    const set = new Set<string>(["/"]);
    for (const f of files) if (f.isFolder) set.add(f.folder === "/" ? `/${f.name}` : `${f.folder}/${f.name}`);
    return [...set].sort();
  }, [files]);

  // ─── Render ────────────────────────────────────────────────

  return (
    <div className="space-y-3">
      {/* Header strip */}
      <div className="glass flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-cyan-400/25">
            <FolderTree className="h-4 w-4 text-cyan-300" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">{t("workspace.title")}</p>
            <p className="text-[11px] text-muted-foreground">{t("workspace.subtitle")}</p>
          </div>
        </div>

        <div className="ms-auto flex flex-wrap items-center gap-1.5">
          {stats && (
            <>
              <StatChip icon={<Boxes className="h-3 w-3" />} label={String(stats.files)} title={t("workspace.stats.files")} />
              <StatChip icon={<FolderTree className="h-3 w-3" />} label={String(stats.folders)} title={t("workspace.stats.folders")} />
              <StatChip label={formatBytes(stats.totalSize)} title={t("workspace.stats.size")} />
              {stats.languages[0] && (
                <StatChip
                  dot={langMeta(stats.languages[0].id).color}
                  label={stats.languages[0].id}
                  title={t("workspace.stats.langs")}
                />
              )}
            </>
          )}
          {!canEdit && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[10.5px] text-amber-300 ring-1 ring-amber-400/25">
              <Lock className="h-3 w-3" /> {t("workspace.readonlyBadge")}
            </span>
          )}
          {canEdit && (
            <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-lg text-xs" onClick={exportAll} disabled={files.length === 0}>
              <Download className="h-3.5 w-3.5" /> {t("workspace.exportAll")}
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" aria-label="Refresh workspace" onClick={() => void loadWorkspace()}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="glass grid overflow-hidden rounded-2xl border border-white/10 lg:h-[640px] lg:grid-cols-[290px_1fr]">
        {/* Tree */}
        <aside className="relative border-b border-white/[0.06] p-2.5 lg:min-h-0 lg:border-b-0 lg:border-e" style={{ maxHeight: undefined }}>
          <div className="h-64 lg:h-full">
            {loading ? (
              <div className="space-y-2 p-1">
                {Array.from({ length: 6 }, (_, i) => (
                  <Skeleton key={i} className="h-7 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <FileTree
                files={files}
                openFileId={openFile?.id ?? null}
                canEdit={canEdit}
                onOpen={(f) => void openFileById(f)}
                onCreateFile={(folder) => {
                  setCreateName("");
                  setCreateTemplate("empty");
                  setCreateDialog({ open: true, folder, isFolder: false });
                }}
                onCreateFolder={(folder) => {
                  setCreateName("");
                  setCreateDialog({ open: true, folder, isFolder: true });
                }}
                onRename={(f) => {
                  setRenameTarget(f);
                  setRenameValue(f.name);
                }}
                onDelete={(f) => setDeleteTarget(f)}
                onToggleStar={(f) => void toggleStar(f)}
                onDuplicate={(f) => void duplicate(f)}
                onDownload={(f) => void downloadFile(f)}
                onMove={(f, folder) => void doMove(f, folder)}
              />
            )}
          </div>
          <TekaWatermark label="TEKA FILES" className="bottom-1 end-2" />
        </aside>

        {/* Editor + bottom panel */}
        <section className="flex min-h-0 flex-col">
          {/* Editor */}
          <div className="min-h-[280px] flex-1 p-2.5 lg:min-h-0">
            {fileLoading ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-black/20">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : openFile && meta ? (
              <CodeEditor
                value={draft}
                onChange={setDraft}
                onSave={() => void saveFile()}
                saving={saving}
                dirty={dirty}
                readOnly={!canEdit}
                fileName={openFile.name}
                langLabel={meta.label}
                langColor={meta.color}
                lines={countLines(draft)}
                chars={draft.length}
                minHeight={260}
              />
            ) : (
              <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 bg-black/10 text-center">
                <TerminalSquare className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground/70">{t("workspace.empty")}</p>
                <p className="max-w-xs text-xs text-muted-foreground/70">{t("workspace.emptyHint")}</p>
                {canEdit && (
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-lg text-xs" onClick={() => { setCreateName(""); setCreateTemplate("empty"); setCreateDialog({ open: true, folder: "/", isFolder: false }); }}>
                      <FilePlus2 className="h-3.5 w-3.5" /> {t("workspace.newFile")}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-lg text-xs" onClick={() => { setCreateName(""); setCreateDialog({ open: true, folder: "/", isFolder: true }); }}>
                      <FolderPlus className="h-3.5 w-3.5" /> {t("workspace.newFolder")}
                    </Button>
                  </div>
                )}
                <TekaWatermark label="TEKA" />
              </div>
            )}
          </div>

          {/* Bottom: console / history */}
          <div className="border-t border-white/[0.06] lg:h-[280px]">
            <Tabs value={bottomTab} onValueChange={setBottomTab} className="flex h-full flex-col">
              <div className="px-2.5 pt-1.5">
                <TabsList className="glass h-8 rounded-lg bg-transparent p-0.5">
                  <TabsTrigger value="console" className="h-7 gap-1.5 rounded-md px-3 text-[11.5px]">
                    <TerminalSquare className="h-3 w-3" /> {t("workspace.console")}
                  </TabsTrigger>
                  <TabsTrigger value="history" className="h-7 gap-1.5 rounded-md px-3 text-[11.5px]">
                    <RefreshCw className="h-3 w-3" /> {t("workspace.history")}
                    {openFile && revisions.length > 0 && (
                      <span className="rounded-full bg-white/10 px-1.5 text-[9.5px]">{revisions.length}</span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="min-h-[220px] flex-1 lg:min-h-0" role="tabpanel">
                {bottomTab === "console" ? (
                  <DebugConsole
                    logs={logs}
                    running={runningDiag}
                    canEdit={canEdit}
                    onRunDiagnostics={() => void runDiagnostics()}
                    onPostLog={(level, message) => void postLog(level, message)}
                    onRefresh={() => void refreshLogs()}
                  />
                ) : (
                  <RevisionPanel
                    revisions={revisions}
                    currentSize={openFile?.size ?? 0}
                    restoringId={restoringId}
                    canEdit={canEdit}
                    onRestore={(id) => void restoreRevision(id)}
                    onRefresh={() => void refreshRevisions()}
                  />
                )}
              </div>
            </Tabs>
          </div>
        </section>
      </div>

      {/* ─── Dialogs ─────────────────────────────────────────── */}

      {/* Create file / folder */}
      <Dialog open={!!createDialog?.open} onOpenChange={(open) => !open && setCreateDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{createDialog?.isFolder ? t("workspace.newFolder") : t("workspace.newFile")}</DialogTitle>
            <DialogDescription>
              {t("workspace.targetFolder")}: <span className="font-mono text-cyan-300">{createDialog?.folder ?? "/"}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground" htmlFor="ws-create-name">{t("workspace.name")}</label>
              <Input
                id="ws-create-name"
                dir="ltr"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createNode()}
                placeholder={createDialog?.isFolder ? t("workspace.folderPlaceholder") : t("workspace.filePlaceholder")}
                className="font-mono"
                autoFocus
              />
            </div>
            {!createDialog?.isFolder && (
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground" htmlFor="ws-template">{t("workspace.template")}</label>
                <Select value={createTemplate} onValueChange={setCreateTemplate}>
                  <SelectTrigger id="ws-template" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WS_TEMPLATES.map((tpl) => (
                      <SelectItem key={tpl.id} value={tpl.id}>
                        {t(`workspace.templates.${tpl.nameKey}`)} <span className="font-mono text-[10px] text-muted-foreground">{tpl.fileName}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {templateById(createTemplate) && (
                  <pre dir="ltr" className="max-h-24 overflow-hidden rounded-lg bg-black/30 p-2 font-mono text-[10px] leading-4 text-muted-foreground/70">
                    {templateById(createTemplate)!.content.split("\n").slice(0, 4).join("\n")}
                  </pre>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCreateDialog(null)}>{t("common.cancel")}</Button>
            <Button className="btn-hero" onClick={() => void createNode()} disabled={!createName.trim()}>
              {t("workspace.create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename */}
      <Dialog open={!!renameTarget} onOpenChange={(open) => !open && setRenameTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("workspace.renameTitle")}</DialogTitle>
          </DialogHeader>
          <Input
            dir="ltr"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void doRename()}
            className="font-mono"
            autoFocus
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRenameTarget(null)}>{t("common.cancel")}</Button>
            <Button onClick={() => void doRename()} disabled={!renameValue.trim()}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move */}
      <Dialog open={!!moveTarget} onOpenChange={(open) => !open && setMoveTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("workspace.moveTitle", { name: moveTarget?.name ?? "" })}</DialogTitle>
          </DialogHeader>
          <Select value={moveFolder} onValueChange={setMoveFolder}>
            <SelectTrigger className="w-full font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-56">
              {folderOptions.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setMoveTarget(null)}>{t("common.cancel")}</Button>
            <Button
              onClick={() => {
                if (moveTarget) void doMove(moveTarget, moveFolder);
                setMoveTarget(null);
              }}
            >
              {t("workspace.moveConfirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("workspace.deleteTitle", { name: deleteTarget?.name ?? "" })}</AlertDialogTitle>
            <AlertDialogDescription>{t("workspace.deleteHint")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction className="bg-rose-600 text-white hover:bg-rose-700" onClick={() => void doDelete()}>
              {t("workspace.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatChip({ icon, label, title, dot }: { icon?: React.ReactNode; label: string; title: string; dot?: string }) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2 py-1 font-mono text-[10.5px] text-foreground/75 ring-1 ring-white/10"
    >
      {dot ? <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} aria-hidden="true" /> : icon}
      {label}
    </span>
  );
}
