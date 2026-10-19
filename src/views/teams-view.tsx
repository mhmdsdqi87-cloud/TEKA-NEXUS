"use client";

// TEKA NEXUS — Teams view (spec §10): crew formation hub.
// Tabs: My crews / Requests / Discover. Guarded behind auth.

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useT, useRelativeTime, useFormatDate, useLabeled, useIsRTL } from "@/lib/i18n";
import {
  CheckCircle2,
  Compass,
  ExternalLink,
  Inbox,
  Loader2,
  LogOut,
  MessageCircle,
  MessageSquare,
  Send,
  Smile,
  Trash2,
  Users,
  XCircle,
  X,
} from "lucide-react";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { get, del, patch } from "@/lib/api";
import { useApp } from "@/lib/store";
import { MEMBER_ROLES } from "@/lib/constants";
import type { CollabRequestDTO, ProjectCard } from "@/lib/dto";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { ProjectCardView } from "@/components/shared/project-card";
import { FadeIn, Stagger, StaggerItem, TapScale } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const STAGGER_CAP = 12;

const errText = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback);

type MyMembership = {
  role: string;
  joinedAt: string;
  project: ProjectCard;
};

const ROLE_STYLE: Record<string, string> = {
  OWNER: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  ADMIN: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  CONTRIBUTOR: "bg-zinc-500/15 text-zinc-300 border-zinc-500/25",
  VIEWER: "bg-zinc-600/10 text-zinc-400 border-zinc-600/20",
};

function RoleChip({ role, className }: { role: string; className?: string }) {
  const lbl = useLabeled();
  const name = lbl("project.roles", role, MEMBER_ROLES.find((r) => r.slug === role)?.name ?? role);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        ROLE_STYLE[role] ?? ROLE_STYLE.VIEWER,
        className
      )}
    >
      {name}
    </span>
  );
}

const REQ_STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-amber-500/15 text-amber-300",
  ACCEPTED: "bg-emerald-500/15 text-emerald-300",
  REJECTED: "bg-rose-500/15 text-rose-300",
  WITHDRAWN: "bg-zinc-500/15 text-zinc-400",
};

function RequestStatusChip({ status }: { status: string }) {
  const t = useT();
  const label = t(`teams.status.${status}`);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        REQ_STATUS_STYLE[status] ?? REQ_STATUS_STYLE.WITHDRAWN
      )}
    >
      {label}
    </span>
  );
}

const TAB_ITEMS = [
  { value: "crews", labelKey: "crews", icon: Users },
  { value: "requests", labelKey: "requests", icon: Inbox },
  { value: "discover", labelKey: "discover", icon: Compass },
] as const;

// ─── Real-time team chat (Task 4-d) ──────────────────────────────────────────
// Socket.io mini service behind the Caddy gateway — RELATIVE URL only, the
// target port travels via the XTransformPort query param. NEVER hardcode a
// host/port here; Caddy forwards "/...?XTransformPort=3030" → chat-service.
const CHAT_SOCKET_URL = "/?XTransformPort=3030";
const CHAT_EMOJIS = ["👍", "❤️", "🔥", "😂", "🎉", "🤔"];
const CHAT_MAX_TEXT = 1000;

type ChatMessageDTO = {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  text: string;
  createdAt: string;
  clientTag: string | null;
  reactions?: Record<string, number>;
  mine?: string[];
};

type ChatPresenceUser = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
};

type ChatJoinAck = {
  ok: boolean;
  error?: string;
  serverTime?: string;
  messages?: ChatMessageDTO[];
  presence?: ChatPresenceUser[];
};

export function TeamsView() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const [tab, setTab] = useState("crews");
  const t = useT();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20">
        <EmptyState
          icon={Users}
          title={t("teams.auth.title")}
          description={t("teams.auth.description")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("common.signIn")}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 md:px-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          {t("teams.titlePrefix")} <span className="text-gradient">{t("teams.titleCrews")}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("teams.subtitle")}
        </p>
      </header>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-x-auto pb-0.5">
          <TabsList className="glass h-11 w-fit min-w-full gap-1 rounded-xl bg-transparent p-1">
            {TAB_ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="relative gap-1.5 rounded-lg px-3 text-xs data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground md:px-4 md:text-sm"
              >
                <item.icon className="h-4 w-4" />
                {t(`teams.tabs.${item.labelKey}`)}
                {tab === item.value && (
                  <motion.span
                    layoutId="teams-tab-underline"
                    className="absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="crews" className="mt-6">
          <MyCrews />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <RequestsHub />
        </TabsContent>

        <TabsContent value="discover" className="mt-6">
          <DiscoverCrews />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── My crews ─────────────────────────────────────────────────────────────────

function MyCrews() {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const lbl = useLabeled();
  const fd = useFormatDate();
  const [crews, setCrews] = useState<MyMembership[] | null>(null);
  const [chatCrew, setChatCrew] = useState<MyMembership | null>(null);

  const load = useCallback(() => {
    get<{ projects: MyMembership[] }>("/api/me/projects")
      .then((r) => setCrews(r.projects))
      .catch((e) => {
        setCrews([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  if (crews === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (crews.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title={t("teams.crews.emptyTitle")}
        description={t("teams.crews.emptyDesc")}
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button className="btn-hero" onClick={() => navigate({ name: "explore" })}>
              <Compass className="h-4 w-4" /> {t("teams.crews.explore")}
            </Button>
            <Button variant="outline" onClick={() => navigate({ name: "projectNew" })}>
              {t("teams.crews.start")}
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
        {crews.map((m, i) => (
          <StaggerItem key={m.project.id} className="relative">
            <span className="absolute -top-2 left-3 z-10">
              <RoleChip role={m.role} />
            </span>
            <ProjectCardView project={m.project} compact />
            <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {m.project.memberCount === 1
                  ? t("teams.crews.member", { n: m.project.memberCount })
                  : t("teams.crews.members", { n: m.project.memberCount })}
                <span className="hidden text-muted-foreground/50 sm:inline">·</span>
                <span className="hidden sm:inline">{t("teams.crews.joined", { date: fd(m.joinedAt, "MMM yyyy") })}</span>
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-2.5 text-xs"
                  onClick={() => setChatCrew(m)}
                  aria-label={t("teams.chat.a11y.openChat", { name: m.project.name })}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-300" />
                  <span className="hidden sm:inline">{t("teams.chat.title")}</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8"
                  onClick={() => navigate({ name: "project", slug: m.project.slug })}
                >
                  {t("teams.crews.open")} <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <span className="sr-only">{t("teams.a11y.yourRole", { role: lbl("project.roles", m.role, "") })}</span>
          </StaggerItem>
        ))}
      </Stagger>
      <TeamChatPanel project={chatCrew?.project ?? null} onClose={() => setChatCrew(null)} />
    </>
  );
}

// ─── Team chat panel (real-time, socket.io mini service) ─────────────────────

function TeamChatPanel({
  project,
  onClose,
}: {
  project: ProjectCard | null;
  onClose: () => void;
}) {
  const t = useT();
  const rel = useRelativeTime();
  const isRTL = useIsRTL();
  const me = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);

  const open = !!project;
  const projectId = project?.id ?? "";
  const projectName = project?.name ?? "";

  const [connected, setConnected] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
  const [presence, setPresence] = useState<ChatPresenceUser[]>([]);
  const [tallies, setTallies] = useState<Record<string, Record<string, number>>>({});
  const [mine, setMine] = useState<Record<string, Set<string>>>({});
  const [typingUsers, setTypingUsers] = useState<{ userId: string; username: string }[]>([]);
  const [mutedUntil, setMutedUntil] = useState(0);
  const [text, setText] = useState("");

  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const nearBottomRef = useRef(true);
  const animatedIds = useRef<Set<string>>(new Set());
  const typingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const lastTypingEmit = useRef(0);
  const mutedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // socket lifecycle — one connection per open panel
  useEffect(() => {
    if (!projectId) return;
    const socket = io(CHAT_SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true, // sends the httpOnly teka_session cookie on the handshake
      reconnection: true,
      reconnectionDelay: 1200,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      forceNew: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setLoginRequired(false);
      socket.emit("chat:join", { projectId }, (ack: ChatJoinAck) => {
        if (!ack?.ok) {
          if (ack?.error === "notMember") toast.error(t("teams.errors.generic"));
          return;
        }
        animatedIds.current.clear();
        setMessages(ack.messages ?? []);
        setPresence(ack.presence ?? []);
        const nextTallies: Record<string, Record<string, number>> = {};
        const nextMine: Record<string, Set<string>> = {};
        for (const m of ack.messages ?? []) {
          nextTallies[m.id] = m.reactions ?? {};
          nextMine[m.id] = new Set(m.mine ?? []);
        }
        setTallies(nextTallies);
        setMine(nextMine);
        nearBottomRef.current = true;
        requestAnimationFrame(() => scrollToBottom("auto"));
      });
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", (err: Error) => {
      setConnected(false);
      if (String(err?.message ?? "").includes("unauthorized")) setLoginRequired(true);
    });

    socket.on("chat:message", (m: ChatMessageDTO) => {
      if (!m || m.projectId !== projectId) return;
      animatedIds.current.add(m.id);
      setMessages((prev) => {
        // replace optimistic copy by clientTag, or drop duplicates by id
        if (m.clientTag) {
          const idx = prev.findIndex((x) => x.clientTag === m.clientTag || x.id === m.id);
          if (idx !== -1) {
            const next = [...prev];
            next[idx] = m;
            return next;
          }
        } else if (prev.some((x) => x.id === m.id)) {
          return prev;
        }
        return [...prev, m];
      });
    });

    socket.on("presence:update", (p: { projectId: string; users: ChatPresenceUser[]; online: number }) => {
      if (p.projectId === projectId) setPresence(p.users ?? []);
    });

    socket.on("chat:typing", (p: { projectId: string; userId: string; username: string; isTyping: boolean }) => {
      if (p.projectId !== projectId || p.userId === me?.id) return;
      setTypingUsers((prev) => {
        const next = prev.filter((u) => u.userId !== p.userId);
        if (p.isTyping) next.push({ userId: p.userId, username: p.username });
        return next;
      });
      const timers = typingTimers.current;
      const old = timers.get(p.userId);
      if (old) clearTimeout(old);
      if (p.isTyping) {
        timers.set(
          p.userId,
          setTimeout(() => {
            setTypingUsers((prev) => prev.filter((u) => u.userId !== p.userId));
            timers.delete(p.userId);
          }, 3000)
        );
      }
    });

    socket.on(
      "chat:react:update",
      (p: { projectId: string; messageId: string; emoji: string; userId: string; op: "add" | "remove"; tally: Record<string, number> }) => {
        if (p.projectId !== projectId) return;
        setTallies((prev) => ({ ...prev, [p.messageId]: p.tally }));
        if (me && p.userId === me.id) {
          setMine((prev) => {
            const set = new Set(prev[p.messageId] ?? []);
            if (p.op === "add") set.add(p.emoji);
            else set.delete(p.emoji);
            return { ...prev, [p.messageId]: set };
          });
        }
      }
    );

    socket.on("chat:deleted", (p: { projectId: string; messageId: string }) => {
      if (p.projectId !== projectId) return;
      setMessages((prev) => prev.filter((m) => m.id !== p.messageId));
    });

    socket.on("chat:muted", (p: { projectId: string; retryAfterMs: number }) => {
      if (p.projectId !== projectId) return;
      const until = Date.now() + Math.max(0, p.retryAfterMs ?? 0);
      setMutedUntil(until);
      if (mutedTimer.current) clearTimeout(mutedTimer.current);
      mutedTimer.current = setTimeout(() => setMutedUntil(0), Math.max(0, p.retryAfterMs ?? 0));
      toast.error(t("teams.chat.rateLimited"));
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      for (const timer of typingTimers.current.values()) clearTimeout(timer);
      typingTimers.current.clear();
      if (mutedTimer.current) clearTimeout(mutedTimer.current);
    };
  }, [projectId, me?.id, t, scrollToBottom]);

  // Escape closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // keep pinned to bottom while new messages/typing arrive (if already near bottom)
  useEffect(() => {
    if (nearBottomRef.current) scrollToBottom("smooth");
  }, [messages, typingUsers, scrollToBottom]);

  const muted = Date.now() < mutedUntil;

  function send() {
    const socket = socketRef.current;
    const body = text.trim();
    if (!socket || !connected || !body || muted || !projectId) return;
    const clientTag = `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    if (me) {
      animatedIds.current.add(`local-${clientTag}`);
      setMessages((prev) => [
        ...prev,
        {
          id: `local-${clientTag}`,
          projectId,
          userId: me.id,
          username: me.username,
          displayName: me.displayName,
          avatarColor: me.avatarColor,
          avatarUrl: me.avatarUrl,
          text: body,
          createdAt: new Date().toISOString(),
          clientTag,
        },
      ]);
    }
    socket.emit("chat:message", { projectId, text: body, clientTag });
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    if (lastTypingEmit.current) {
      lastTypingEmit.current = 0;
      socket.emit("chat:typing", { projectId, isTyping: false });
    }
  }

  function onTextChange(value: string) {
    setText(value.slice(0, CHAT_MAX_TEXT));
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
    }
    const socket = socketRef.current;
    if (!socket || !connected) return;
    const now = Date.now();
    if (value && now - lastTypingEmit.current > 2000) {
      lastTypingEmit.current = now;
      socket.emit("chat:typing", { projectId, isTyping: true });
    } else if (!value && lastTypingEmit.current) {
      lastTypingEmit.current = 0;
      socket.emit("chat:typing", { projectId, isTyping: false });
    }
  }

  function react(messageId: string, emoji: string) {
    const socket = socketRef.current;
    if (socket && connected) socket.emit("chat:react", { projectId, messageId, emoji });
  }

  function removeMessage(messageId: string) {
    const socket = socketRef.current;
    if (socket && connected) socket.emit("chat:delete", { projectId, messageId });
  }

  const panel = (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-backdrop"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            key="chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("teams.chat.title")}
            className="fixed inset-0 z-[71] flex flex-col glass border-white/[0.08] shadow-2xl sm:inset-y-0 sm:end-0 sm:start-auto sm:w-[420px] sm:max-w-[94vw] sm:rounded-s-2xl"
            initial={{ opacity: 0, x: isRTL ? -56 : 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -56 : 56 }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            {/* header */}
            <header className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <div className="min-w-0 flex-1">
                <h2 className="font-display truncate text-sm font-bold">{projectName}</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      connected ? "bg-emerald-400" : "bg-amber-400",
                      connected && "animate-pulse"
                    )}
                  />
                  {!connected
                    ? t("teams.chat.reconnecting")
                    : presence.length === 0
                      ? t("teams.chat.onlineOne")
                      : t("teams.chat.online", { n: presence.length })}
                </p>
              </div>
              <div className="flex items-center -space-x-2" aria-hidden="true">
                {presence.slice(0, 4).map((u) => (
                  <span key={u.id} className="relative rounded-full ring-2 ring-black/40">
                    <UserAvatar user={u} size={24} />
                    <span className="absolute -bottom-0.5 -end-0.5 h-2 w-2 rounded-full border border-black/40 bg-emerald-400" />
                  </span>
                ))}
                {presence.length > 4 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-[10px] font-semibold text-muted-foreground">
                    +{presence.length - 4}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onClose}
                aria-label={t("teams.chat.a11y.closeChat")}
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            {!connected && !loginRequired && (
              <div
                role="status"
                className="flex items-center gap-2 border-b border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-xs text-amber-200"
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {t("teams.chat.reconnecting")}
              </div>
            )}

            {loginRequired ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{t("teams.chat.loginRequired")}</p>
                <Button
                  className="btn-hero"
                  onClick={() => {
                    onClose();
                    navigate({ name: "login" });
                  }}
                >
                  {t("common.signIn")}
                </Button>
              </div>
            ) : (
              <>
                {/* messages */}
                <div
                  ref={scrollRef}
                  onScroll={() => {
                    const el = scrollRef.current;
                    if (el) nearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 90;
                  }}
                  role="log"
                  aria-label={t("teams.chat.a11y.messages")}
                  aria-live="polite"
                  className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
                >
                  {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium">{t("teams.chat.empty")}</p>
                      <p className="max-w-[26ch] text-xs text-muted-foreground">{t("teams.chat.emptyHint")}</p>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <ChatMessageRow
                        key={m.id}
                        m={m}
                        own={!!me && m.userId === me.id}
                        tally={tallies[m.id] ?? {}}
                        mineEmoji={mine[m.id] ?? new Set()}
                        canDelete={!!me && m.userId === me.id && connected}
                        animated={animatedIds.current.has(m.id)}
                        rel={rel}
                        deleteLabel={t("teams.chat.a11y.deleteMessage")}
                        reactAddLabel={t("teams.chat.reactAdd")}
                        onReact={react}
                        onDelete={removeMessage}
                      />
                    ))
                  )}
                </div>

                {/* composer */}
                <div className="border-t border-white/[0.06] p-3">
                  <TypingLine users={typingUsers} typingLabel={t("teams.chat.typing", { names: typingUsers.map((u) => u.username).join(", ") })} typingMultiLabel={t("teams.chat.typingMulti", { names: typingUsers.map((u) => u.username).join(", ") })} />
                  <div className="flex items-end gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-11 w-10 shrink-0 rounded-xl"
                          disabled={!connected}
                          aria-label={t("teams.chat.reactAdd")}
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" align="start" className="z-[80] w-auto glass p-2">
                        <div className="grid grid-cols-6 gap-1">
                          {CHAT_EMOJIS.map((emoji) => (
                            <TapScale key={emoji}>
                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-colors hover:bg-white/[0.08]"
                                onClick={() => {
                                  setText((prev) => (prev + emoji).slice(0, CHAT_MAX_TEXT));
                                  textareaRef.current?.focus();
                                }}
                                aria-label={emoji}
                              >
                                {emoji}
                              </button>
                            </TapScale>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="relative flex-1">
                      <Textarea
                        ref={textareaRef}
                        rows={1}
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                            e.preventDefault();
                            send();
                          }
                        }}
                        placeholder={connected ? t("teams.chat.placeholder") : t("teams.chat.reconnecting")}
                        disabled={!connected || muted}
                        className="max-h-24 min-h-[44px] resize-none pe-16 text-sm"
                      />
                      {text.length >= 900 && (
                        <span className="pointer-events-none absolute bottom-1.5 end-3 text-[10px] tabular-nums text-amber-300/80">
                          {t("teams.chat.charsLeft", { n: CHAT_MAX_TEXT - text.length })}
                        </span>
                      )}
                    </div>
                    <TapScale>
                      <Button
                        size="icon"
                        className="btn-hero h-11 w-11 shrink-0 rounded-xl"
                        onClick={send}
                        disabled={!connected || muted || !text.trim()}
                        aria-label={t("teams.chat.send")}
                      >
                        <Send className="h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </TapScale>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );

  // portal → avoids transformed ancestors breaking position:fixed
  if (typeof document === "undefined") return null;
  return createPortal(panel, document.body);
}

function ChatMessageRow({
  m,
  own,
  tally,
  mineEmoji,
  canDelete,
  animated,
  rel,
  deleteLabel,
  reactAddLabel,
  onReact,
  onDelete,
}: {
  m: ChatMessageDTO;
  own: boolean;
  tally: Record<string, number>;
  mineEmoji: Set<string>;
  canDelete: boolean;
  animated: boolean;
  rel: (date: Date | string | number) => string;
  deleteLabel: string;
  reactAddLabel: string;
  onReact: (messageId: string, emoji: string) => void;
  onDelete: (messageId: string) => void;
}) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 10, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("group flex w-full items-end gap-2", own && "flex-row-reverse")}
    >
      <UserAvatar user={m} size={30} className="mb-1 shrink-0" />
      <div className={cn("flex min-w-0 max-w-[78%] flex-col gap-1", own ? "items-end" : "items-start")}>
        <div className="flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
          <span className={cn("truncate font-semibold", own && "text-cyan-300")}>{m.displayName}</span>
          <span className="shrink-0">{rel(m.createdAt)}</span>
          {own && canDelete && (
            <button
              onClick={() => onDelete(m.id)}
              aria-label={deleteLabel}
              className="shrink-0 rounded opacity-0 transition-opacity hover:text-rose-300 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          )}
        </div>
        <div
          className={cn(
            "whitespace-pre-wrap break-words rounded-2xl border px-3 py-2 text-sm leading-relaxed",
            own
              ? "rounded-ee-sm border-primary/30 bg-primary/15 text-foreground"
              : "rounded-es-sm border-white/[0.06] bg-white/[0.05] text-zinc-200"
          )}
        >
          {m.text}
        </div>
        <div className="flex flex-wrap items-center gap-1 px-0.5">
          {Object.entries(tally)
            .filter(([, n]) => n > 0)
            .map(([emoji, n]) => (
              <button
                key={emoji}
                onClick={() => onReact(m.id, emoji)}
                aria-label={reactAddLabel}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] transition-colors",
                  mineEmoji.has(emoji)
                    ? "border-cyan-400/40 bg-cyan-400/15"
                    : "border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08]"
                )}
              >
                <span>{emoji}</span>
                <span className="text-[10px] tabular-nums text-muted-foreground">{n}</span>
              </button>
            ))}
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label={reactAddLabel}
                className="flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all hover:bg-white/[0.08] hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Smile className="h-3 w-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" className="z-[80] w-auto glass p-1.5">
              <div className="grid grid-cols-6 gap-0.5">
                {CHAT_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => onReact(m.id, emoji)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-base transition-colors hover:bg-white/[0.08]"
                    aria-label={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.div>
  );
}

function TypingLine({
  users,
  typingLabel,
  typingMultiLabel,
}: {
  users: { userId: string; username: string }[];
  typingLabel: string;
  typingMultiLabel: string;
}) {
  return (
    <div className="flex h-5 items-center px-1 text-[11px] text-muted-foreground" aria-live="polite">
      {users.length > 0 && (
        <>
          <span className="me-1.5 flex items-end gap-0.5" aria-hidden="true">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.span
                key={delay}
                className="h-1.5 w-1.5 rounded-full bg-cyan-300/80"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay, ease: "easeInOut" }}
              />
            ))}
          </span>
          {users.length === 1 ? typingLabel : typingMultiLabel}
        </>
      )}
    </div>
  );
}

// ─── Requests hub ─────────────────────────────────────────────────────────────

function RequestsHub() {
  const t = useT();
  const [sent, setSent] = useState<CollabRequestDTO[] | null>(null);
  const [received, setReceived] = useState<CollabRequestDTO[] | null>(null);

  const load = useCallback(() => {
    get<{ sent: CollabRequestDTO[]; received: CollabRequestDTO[] }>("/api/me/requests")
      .then((r) => {
        setSent(r.sent);
        setReceived(r.received);
      })
      .catch((e) => {
        setSent([]);
        setReceived([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <section aria-label={t("teams.a11y.sentAria")}>
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Send className="h-4 w-4 text-cyan-300" /> {t("teams.requests.sent")}
          <span className="text-sm font-normal text-muted-foreground">
            {t("teams.requests.pendingCount", { n: sent?.filter((r) => r.status === "PENDING").length ?? 0 })}
          </span>
        </h2>
        {sent === null ? (
          <div className="space-y-3">
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-32 rounded-xl bg-white/[0.04]" />
          </div>
        ) : sent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            {t("teams.requests.sentEmpty")}
          </div>
        ) : (
          <Stagger className="space-y-3" gap={0.05}>
            {sent.map((r) => (
              <StaggerItem key={r.id}>
                <SentRequestCard request={r} onChanged={load} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      <section aria-label={t("teams.a11y.receivedAria")}>
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <Inbox className="h-4 w-4 text-violet-300" /> {t("teams.requests.received")}
          <span className="text-sm font-normal text-muted-foreground">
            {t("teams.requests.pendingCount", { n: received?.filter((r) => r.status === "PENDING").length ?? 0 })}
          </span>
        </h2>
        {received === null ? (
          <div className="space-y-3">
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
            <Skeleton className="h-36 rounded-xl bg-white/[0.04]" />
          </div>
        ) : received.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.08] py-8 text-center text-sm text-muted-foreground">
            {t("teams.requests.receivedEmpty")}
          </div>
        ) : (
          <Stagger className="space-y-3" gap={0.05}>
            {received.map((r) => (
              <StaggerItem key={r.id}>
                <ReceivedRequestCard request={r} onChanged={load} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </div>
  );
}

function SentRequestCard({
  request,
  onChanged,
}: {
  request: CollabRequestDTO;
  onChanged: () => void;
}) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const [withdrawing, setWithdrawing] = useState(false);
  const pending = request.status === "PENDING";

  async function withdraw() {
    setWithdrawing(true);
    try {
      await del(`/api/requests/${request.id}`);
      onChanged();
      toast.success(t("teams.toasts.withdrawn"));
    } catch (e) {
      toast.error(errText(e, t("teams.errors.generic")));
    } finally {
      setWithdrawing(false);
    }
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <button
            onClick={() =>
              request.project && navigate({ name: "project", slug: request.project.slug })
            }
            className="focus-glow truncate rounded text-left font-display text-sm font-semibold transition-colors hover:text-cyan-300"
          >
            {request.project?.name ?? t("teams.requests.unknownProject")}
          </button>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {t("teams.requests.appliedAs", {
              role: request.requestedRole.toLowerCase(),
              ago: rel(request.createdAt),
            })}
          </p>
        </div>
        <RequestStatusChip status={request.status} />
      </div>
      <p className="mt-2 line-clamp-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
        &ldquo;{request.introduction}&rdquo;
      </p>
      {pending && (
        <div className="mt-3 flex justify-end">
          <TapScale>
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={withdraw}
              disabled={withdrawing}
            >
              {withdrawing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}
              {t("teams.requests.withdraw")}
            </Button>
          </TapScale>
        </div>
      )}
    </div>
  );
}

function ReceivedRequestCard({
  request,
  onChanged,
}: {
  request: CollabRequestDTO;
  onChanged: () => void;
}) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const [acting, setActing] = useState<"accept" | "reject" | null>(null);
  const pending = request.status === "PENDING";

  async function review(action: "accept" | "reject") {
    setActing(action);
    try {
      await patch(`/api/requests/${request.id}`, { action });
      onChanged();
      toast.success(
        action === "accept"
          ? t("teams.toasts.accepted")
          : t("teams.toasts.rejected")
      );
    } catch (e) {
      toast.error(errText(e, t("teams.errors.generic")));
    } finally {
      setActing(null);
    }
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start justify-between gap-2">
        <button
          onClick={() => navigate({ name: "profile", username: request.applicant.username })}
          className="focus-glow flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left"
          aria-label={t("teams.a11y.viewProfileAria", { name: request.applicant.displayName })}
        >
          <UserAvatar user={request.applicant} size={38} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              {request.applicant.displayName}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              @{request.applicant.username}
            </span>
          </span>
        </button>
        <RequestStatusChip status={request.status} />
      </div>

      {request.applicant.bio && (
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{request.applicant.bio}</p>
      )}
      <p className="mt-2 rounded-lg bg-white/[0.03] p-2.5 text-xs italic leading-relaxed text-zinc-300">
        &ldquo;{request.introduction}&rdquo;
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        <span>
          {t("teams.requests.wantsToJoinPrefix")}
          <span className="font-medium text-foreground">{request.project?.name ?? t("teams.requests.aProject")}</span>
          {t("teams.requests.wantsToJoinMiddle")}
          <span className="font-medium uppercase">{request.requestedRole.toLowerCase()}</span>
          {t("teams.requests.wantsToJoinSuffix")}
        </span>
        <span>· {rel(request.createdAt)}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {pending ? (
          <>
            <TapScale className="flex-1">
              <Button
                size="sm"
                className="btn-hero h-8 w-full"
                onClick={() => review("accept")}
                disabled={acting !== null}
              >
                {acting === "accept" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {t("teams.accept")}
              </Button>
            </TapScale>
            <TapScale className="flex-1">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-full"
                onClick={() => review("reject")}
                disabled={acting !== null}
              >
                {acting === "reject" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                {t("teams.reject")}
              </Button>
            </TapScale>
          </>
        ) : null}
        {request.project && (
          <Button
            size="sm"
            variant="ghost"
            className="h-8"
            onClick={() => navigate({ name: "project", slug: request.project!.slug })}
          >
            {t("teams.requests.viewProject")} <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Discover ─────────────────────────────────────────────────────────────────

function DiscoverCrews() {
  const t = useT();
  const [projects, setProjects] = useState<ProjectCard[] | null>(null);

  const load = useCallback(() => {
    get<{ projects: ProjectCard[] }>("/api/projects?sort=recent")
      .then((r) => setProjects(r.projects))
      .catch((e) => {
        setProjects([]);
        toast.error(errText(e, t("teams.errors.generic")));
      });
  }, [t]);

  useEffect(load, [load]);

  if (projects === null) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  const recruiting = projects.filter((p) => p.requiredSkills.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold">{t("teams.discover.title")}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {t("teams.discover.subtitle")}
        </p>
      </div>

      {recruiting.length === 0 ? (
        <>
          <FadeIn>
            <EmptyState
              icon={Compass}
              title={t("teams.discover.emptyTitle")}
              description={t("teams.discover.emptyDesc")}
            />
          </FadeIn>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.04}>
            {projects.map((p, i) =>
              i < STAGGER_CAP ? (
                <StaggerItem key={p.id}>
                  <ProjectCardView project={p} />
                </StaggerItem>
              ) : (
                <FadeIn key={p.id} y={12} duration={0.35}>
                  <ProjectCardView project={p} />
                </FadeIn>
              )
            )}
          </Stagger>
        </>
      ) : (
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.04}>
          {recruiting.map((p, i) =>
            i < STAGGER_CAP ? (
              <StaggerItem key={p.id} className="space-y-1.5">
                <ProjectCardView project={p} />
                {p.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-0.5">
                    {p.requiredSkills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-violet-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </StaggerItem>
            ) : (
              <FadeIn key={p.id} y={12} duration={0.35} className="space-y-1.5">
                <ProjectCardView project={p} />
                {p.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-0.5">
                    {p.requiredSkills.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-violet-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </FadeIn>
            )
          )}
        </Stagger>
      )}
    </div>
  );
}
