"use client";

// TEKA NEXUS — MessagesView (Task dm-1): 1:1 private chats.
// Two-pane on desktop (conversation list + open chat), single-pane with a
// back button on mobile. Runs inside AppShell — no nav of its own.
//
// Architecture note: polling (not sockets) — production runs on Vercel
// serverless. Open chat polls /messages?after=<cursor> every 4s; the
// conversation list refreshes every 8s; both feed the global unread badge.

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Loader2, MessageCircle, MessagesSquare, Send } from "lucide-react";

import { get, post, qs, ApiError } from "@/lib/api";
import { useApp } from "@/lib/store";
import { useT, useFormatDate, useRelativeTime } from "@/lib/i18n";
import type { DmConversationDTO, DmMessageDTO, DmPartner } from "@/lib/dto";
import { cn } from "@/lib/utils";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

const MESSAGES_POLL_MS = 4000;
const LIST_POLL_MS = 8000;
const BODY_MAX = 2000;

// ─── Conversation row ────────────────────────────────────────
function ConversationRow({
  conversation,
  active,
  onClick,
}: {
  conversation: DmConversationDTO;
  active: boolean;
  onClick: () => void;
}) {
  const t = useT();
  const rel = useRelativeTime();

  const preview = conversation.lastMessage
    ? `${conversation.lastMessage.senderId === conversation.other.id ? "" : `${t("dm.you")}: `}${conversation.lastMessage.body}`
    : t("dm.emptyChatTitle");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-xl p-3 text-start outline-none transition-colors focus-glow",
        active
          ? "bg-white/[0.06] ring-1 ring-inset ring-cyan-400/20"
          : "hover:bg-white/[0.04]"
      )}
    >
      <UserAvatar user={conversation.other} size={42} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {conversation.other.displayName}
          </span>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {rel(conversation.lastMessageAt)}
          </span>
        </span>
        <span className="mt-0.5 flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{preview}</span>
          {conversation.unreadCount > 0 && (
            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-[10px] font-bold text-[#07070d]">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

// ─── Message bubble ──────────────────────────────────────────
function MessageBubble({ message, own }: { message: DmMessageDTO; own: boolean }) {
  const fd = useFormatDate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex w-full", own ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed sm:max-w-[70%]",
          own
            ? "rounded-ee-md border border-cyan-400/25 bg-cyan-500/15 text-foreground"
            : "rounded-es-md border border-white/10 bg-white/[0.05] text-foreground/90"
        )}
      >
        <p className="whitespace-pre-line break-words" dir="auto">
          {message.body}
        </p>
        <span
          className={cn(
            "mt-1 block text-[10px]",
            own ? "text-cyan-200/70" : "text-muted-foreground/70"
          )}
        >
          {fd(message.createdAt, "HH:mm")}
          {!own ? "" : message.readAt ? " ·✓✓" : " ·✓"}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Skeletons ───────────────────────────────────────────────
function ConversationListSkeleton() {
  return (
    <div className="space-y-1 p-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl p-3">
          <Skeleton className="h-10 w-10 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3 bg-white/[0.06]" />
            <Skeleton className="h-3 w-2/3 bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="flex flex-1 flex-col justify-end gap-3 p-4">
      <Skeleton className="h-10 w-2/3 rounded-2xl bg-white/[0.05]" />
      <Skeleton className="ml-auto h-10 w-1/2 rounded-2xl bg-white/[0.05]" />
      <Skeleton className="h-12 w-3/4 rounded-2xl bg-white/[0.05]" />
      <Skeleton className="ml-auto h-8 w-1/3 rounded-2xl bg-white/[0.05]" />
    </div>
  );
}

// ─── Main view ───────────────────────────────────────────────
export function DmView({ initialConversationId }: { initialConversationId?: string }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const setDmUnreadCount = useApp((s) => s.setDmUnreadCount);
  const t = useT();

  const [conversations, setConversations] = useState<DmConversationDTO[] | null>(null);
  const [listFailed, setListFailed] = useState(false);

  const [activeId, setActiveId] = useState<string | null>(initialConversationId ?? null);
  const [other, setOther] = useState<DmPartner | null>(null);
  const [messages, setMessages] = useState<DmMessageDTO[] | null>(null);
  const [chatFailed, setChatFailed] = useState(false);

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string | null>(activeId);
  activeIdRef.current = activeId;
  // Polling cursor: createdAt of the last known message (avoids stale closures).
  const cursorRef = useRef<string | null>(null);

  // ── Conversation list: initial fetch + 8s poll ──────────────
  const loadConversations = useCallback(
    async (silent = false) => {
      if (!silent) setListFailed(false);
      try {
        const res = await get<{ conversations: DmConversationDTO[] }>("/api/dm/conversations");
        setConversations(res.conversations);
        setListFailed(false);
        // Global badge = total unread across conversations.
        setDmUnreadCount(res.conversations.reduce((sum, c) => sum + c.unreadCount, 0));
      } catch (e) {
        if (!silent) {
          setListFailed(true);
          toast.error(e instanceof Error ? e.message : t("dm.toasts.loadFailed"));
        }
      }
    },
    [setDmUnreadCount, t]
  );

  // ── Messages: initial fetch (no cursor) + 4s cursor poll ────
  const fetchMessages = useCallback(
    async (conversationId: string, mode: "initial" | "poll") => {
      const after = mode === "poll" ? (cursorRef.current ?? undefined) : undefined;
      try {
        const res = await get<{ messages: DmMessageDTO[]; other: DmPartner }>(
          `/api/dm/conversations/${encodeURIComponent(conversationId)}/messages${qs({ after })}`
        );
        // Guard against a stale poll landing after the user switched chats.
        if (activeIdRef.current !== conversationId) return;
        setOther(res.other);
        setChatFailed(false);
        if (mode === "initial") {
          setMessages(res.messages);
          cursorRef.current = res.messages[res.messages.length - 1]?.createdAt ?? null;
          // The server just marked this conversation as read — zero it locally.
          setConversations((prev) =>
            prev?.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c)) ?? prev
          );
        } else if (res.messages.length > 0) {
          setMessages((prev) => {
            const known = new Set((prev ?? []).map((m) => m.id));
            const fresh = res.messages.filter((m) => !known.has(m.id));
            if (fresh.length) cursorRef.current = fresh[fresh.length - 1].createdAt;
            return fresh.length ? [...(prev ?? []), ...fresh] : prev;
          });
        }
      } catch (e) {
        if (activeIdRef.current !== conversationId) return;
        if (mode === "initial") {
          setChatFailed(true);
          toast.error(e instanceof Error ? e.message : t("dm.toasts.loadFailed"));
        } else if (e instanceof ApiError && (e.status === 403 || e.status === 404)) {
          // Blocked or conversation vanished — stop polling it silently.
          setActiveId(null);
          setMessages(null);
        }
      }
    },
    [t]
  );

  // Boot: list (+ initial chat if deep-linked from a profile).
  useEffect(() => {
    if (!user) return;
    loadConversations();
  }, [user, loadConversations]);

  // Open chat lifecycle: reset state, initial fetch, start polls.
  useEffect(() => {
    if (!user || !activeId) return;
    setMessages(null);
    setOther(null);
    setChatFailed(false);
    fetchMessages(activeId, "initial");

    const msgTimer = setInterval(() => {
      const id = activeIdRef.current;
      if (id) fetchMessages(id, "poll");
    }, MESSAGES_POLL_MS);

    return () => clearInterval(msgTimer);
  }, [user, activeId, fetchMessages]);

  // List poll (also keeps the global badge fresh).
  useEffect(() => {
    if (!user) return;
    const listTimer = setInterval(() => loadConversations(true), LIST_POLL_MS);
    return () => clearInterval(listTimer);
  }, [user, loadConversations]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages?.length]);

  async function openConversation(id: string) {
    setActiveId(id);
  }

  function backToList() {
    setActiveId(null);
    setMessages(null);
    setOther(null);
  }

  async function sendMessage() {
    const conversationId = activeId;
    const body = draft.trim();
    if (!conversationId || !body || sending) return;
    setSending(true);
    try {
      const res = await post<{ message: DmMessageDTO }>(
        `/api/dm/conversations/${encodeURIComponent(conversationId)}/messages`,
        { body }
      );
      setDraft("");
      cursorRef.current = res.message.createdAt;
      setMessages((prev) =>
        prev?.some((m) => m.id === res.message.id) ? prev : [...(prev ?? []), res.message]
      );
      // Fast list refresh: own preview + ordering, without waiting for the poll.
      setConversations((prev) => {
        if (!prev) return prev;
        const updated = prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: {
                  body: res.message.body,
                  senderId: res.message.senderId,
                  createdAt: res.message.createdAt,
                },
                lastMessageAt: res.message.createdAt,
              }
            : c
        );
        return updated.sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("dm.toasts.sendFailed"));
    } finally {
      setSending(false);
    }
  }

  // ── Guest guard (page routing normally prevents this) ───────
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-8">
        <EmptyState
          icon={MessagesSquare}
          title={t("dm.signInTitle")}
          description={t("dm.signInDesc")}
          action={
            <Button
              className="btn-hero"
              onClick={() => navigate({ name: "login" })}
            >
              {t("common.signIn")}
            </Button>
          }
        />
      </div>
    );
  }

  const hasConversations = (conversations ?? []).length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl px-0 py-6 sm:px-4 md:py-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-5 flex items-center gap-3 px-4 sm:px-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20">
          <MessagesSquare className="h-5 w-5 text-cyan-300" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">{t("dm.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dm.listAria")}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,330px)_minmax(0,1fr)] md:items-stretch md:h-[calc(100vh-19rem)] md:min-h-[440px]">
        {/* ── Conversation list pane ───────────────────────── */}
        <aside
          aria-label={t("dm.listAria")}
          className={cn(
            "glass-card rounded-2xl p-2 flex flex-col min-h-0",
            activeId && "hidden md:flex"
          )}
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            {conversations === null && !listFailed ? (
              <ConversationListSkeleton />
            ) : listFailed ? (
              <EmptyState
                icon={MessageCircle}
                title={t("dm.loadFailedTitle")}
                description={t("dm.loadFailedDesc")}
                action={
                  <Button variant="outline" onClick={() => loadConversations()}>
                    {t("common.retry")}
                  </Button>
                }
                className="py-8"
              />
            ) : !hasConversations ? (
              <EmptyState
                icon={MessagesSquare}
                title={t("dm.emptyTitle")}
                description={t("dm.emptyDesc")}
                className="py-10"
              />
            ) : (
              <div className="space-y-1" role="list">
                {conversations!.map((c) => (
                  <div role="listitem" key={c.id}>
                    <ConversationRow
                      conversation={c}
                      active={c.id === activeId}
                      onClick={() => openConversation(c.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ── Chat pane ────────────────────────────────────── */}
        <section
          aria-label={other ? t("dm.chatAria", { name: other.displayName }) : t("dm.title")}
          className={cn(
            "glass-card rounded-2xl flex flex-col min-h-0 overflow-hidden",
            "h-[calc(100vh-13rem)] md:h-auto",
            !activeId && "hidden md:flex"
          )}
        >
          {!activeId ? (
            <div className="flex flex-1 items-center justify-center">
              <EmptyState
                icon={MessagesSquare}
                title={t("dm.selectChatTitle")}
                description={t("dm.selectChatDesc")}
              />
            </div>
          ) : (
            <>
              {/* Chat header */}
              <header className="flex items-center gap-3 border-b border-white/[0.07] px-3 py-2.5">
                <button
                  type="button"
                  onClick={backToList}
                  aria-label={t("dm.backToList")}
                  className="md:hidden flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors outline-none focus-glow"
                >
                  <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
                </button>
                {other ? (
                  <button
                    type="button"
                    onClick={() => navigate({ name: "profile", username: other.username })}
                    aria-label={t("nav.viewProfile")}
                    className="flex min-w-0 items-center gap-2.5 rounded-lg py-1 pe-2 outline-none focus-glow"
                  >
                    <UserAvatar user={other} size={34} />
                    <span className="min-w-0 text-start">
                      <span className="block truncate text-sm font-medium">{other.displayName}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        @{other.username}
                      </span>
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <Skeleton className="h-[34px] w-[34px] rounded-full bg-white/[0.06]" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-24 bg-white/[0.06]" />
                      <Skeleton className="h-2.5 w-16 bg-white/[0.04]" />
                    </div>
                  </div>
                )}
              </header>

              {/* Messages */}
              <div ref={scrollRef} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3 md:p-4">
                {messages === null && !chatFailed ? (
                  <ChatSkeleton />
                ) : chatFailed ? (
                  <EmptyState
                    icon={MessageCircle}
                    title={t("dm.loadFailedTitle")}
                    description={t("dm.loadFailedDesc")}
                    action={
                      <Button variant="outline" onClick={() => activeId && fetchMessages(activeId, "initial")}>
                        {t("common.retry")}
                      </Button>
                    }
                    className="py-8"
                  />
                ) : messages!.length === 0 ? (
                  <EmptyState
                    icon={MessagesSquare}
                    title={t("dm.emptyChatTitle")}
                    description={t("dm.emptyChatDesc")}
                    className="py-10"
                  />
                ) : (
                  messages!.map((m) => (
                    <MessageBubble key={m.id} message={m} own={m.senderId === user.id} />
                  ))
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-white/[0.07] p-2.5 md:p-3">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value.slice(0, BODY_MAX))}
                    onKeyDown={(e) => {
                      // Enter sends on desktop; Shift+Enter / mobile Enter = newline.
                      if (e.key === "Enter" && !e.shiftKey && window.innerWidth >= 768) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={t("dm.placeholder")}
                    aria-label={t("dm.placeholder")}
                    rows={1}
                    className="min-h-[44px] max-h-32 resize-none bg-white/[0.04] border-white/10 py-2.5"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={sending || !draft.trim()}
                    size="icon"
                    aria-label={t("dm.sendAria")}
                    className="btn-hero h-11 w-11 shrink-0 rounded-xl"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 rtl:-scale-x-100" />
                    )}
                  </Button>
                </div>
                {draft.length > BODY_MAX - 200 && (
                  <p className="mt-1 text-end text-[10px] font-mono text-muted-foreground">
                    {draft.length}/{BODY_MAX}
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      {/* Hidden a11y live region: announces unread summary for screen readers */}
      <span className="sr-only" aria-live="polite">
        {conversations?.some((c) => c.unreadCount > 0)
          ? t("dm.unreadAria", {
              count: conversations.reduce((sum, c) => sum + c.unreadCount, 0),
            })
          : ""}
      </span>
    </div>
  );
}
