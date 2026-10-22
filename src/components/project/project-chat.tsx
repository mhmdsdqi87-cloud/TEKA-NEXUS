"use client";

// TEKA NEXUS — Project team chat (Live Pulse, Task pulse-2).
// Serverless-safe live chat: 3s cursor-delta polling against
// /api/projects/[slug]/chat — no websocket server required on Vercel.
// Guests read (public projects), members write (+2 XP per message,
// awarded server-side). 10 msg/min anti-flood is surfaced as a toast.

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, LogIn, MessagesSquare, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";

import { get, post, ApiError } from "@/lib/api";
import { useApp } from "@/lib/store";
import { useT, useRelativeTime } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/shared/atoms";
import { FadeIn } from "@/components/shared/motion";

type ChatUser = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  xp: number;
};

type ChatMessageDTO = {
  id: string;
  body: string;
  createdAt: string;
  user: ChatUser;
};

type ChatResponse = { messages: ChatMessageDTO[]; viewerId: string | null };

const POLL_MS = 3000;
const BODY_MAX = 500;
const KEEP = 300; // messages kept in memory (matches the API's page size)

export function ProjectChat({ slug, className }: { slug: string; className?: string }) {
  const t = useT();
  const rel = useRelativeTime();
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);

  const [messages, setMessages] = useState<ChatMessageDTO[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<string | null>(null); // createdAt of the newest known message
  const busyRef = useRef(false);

  const scrollToEnd = (smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 180;
    if (nearBottom || !smooth) el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  };

  const absorb = useCallback((incoming: ChatMessageDTO[]) => {
    if (incoming.length === 0) return;
    setMessages((prev) => {
      const base = prev ?? [];
      const known = new Set(base.map((m) => m.id));
      const fresh = incoming.filter((m) => !known.has(m.id));
      if (fresh.length === 0) return base;
      const next = [...base, ...fresh];
      return next.length > KEEP ? next.slice(next.length - KEEP) : next;
    });
    cursorRef.current = incoming[incoming.length - 1].createdAt;
    requestAnimationFrame(() => scrollToEnd(true));
  }, []);

  const load = useCallback(
    async (full: boolean) => {
      if (document.hidden || busyRef.current) return;
      busyRef.current = true;
      try {
        const after = full ? null : cursorRef.current;
        const res = await get<ChatResponse>(
          `/api/projects/${encodeURIComponent(slug)}/chat${after ? `?after=${encodeURIComponent(after)}` : ""}`
        );
        setFailed(false);
        if (full) {
          setMessages(res.messages);
          cursorRef.current = res.messages.length > 0 ? res.messages[res.messages.length - 1].createdAt : null;
          requestAnimationFrame(() => scrollToEnd(false));
        } else {
          absorb(res.messages);
        }
      } catch {
        // Transient poll failure — keep the transcript, surface a soft state.
        setFailed(true);
      } finally {
        busyRef.current = false;
      }
    },
    [slug, absorb]
  );

  // Initial load + polling loop (paused while the tab is hidden).
  useEffect(() => {
    setMessages(null);
    setFailed(false);
    cursorRef.current = null;
    void load(true);
    const timer = setInterval(() => void load(false), POLL_MS);
    const wake = () => {
      if (!document.hidden) void load(false);
    };
    document.addEventListener("visibilitychange", wake);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [load]);

  const send = async () => {
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    try {
      const res = await post<{ message?: ChatMessageDTO }>(
        `/api/projects/${encodeURIComponent(slug)}/chat`,
        { body }
      );
      if (res.message) {
        setText("");
        absorb([res.message]);
      }
    } catch (e) {
      if (e instanceof ApiError && (e.status === 429 || e.message === "rate_limited")) {
        toast.error(t("pulse.chat.tooFast"));
      } else {
        toast.error(e instanceof ApiError && e.status !== 0 ? e.message : t("pulse.chat.sendError"));
      }
    } finally {
      setSending(false);
    }
  };

  const retry = () => void load(true);

  return (
    <FadeIn>
      <section
        aria-label={t("pulse.chat.title")}
        className={cn("glass-card overflow-hidden rounded-2xl", className)}
      >
        {/* header */}
        <header className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <MessagesSquare className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          <h3 className="font-display text-sm font-semibold">{t("pulse.chat.title")}</h3>
          <span
            className="mr-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300"
            dir="ltr"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t("pulse.chat.live")}
          </span>
        </header>

        {/* transcript */}
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-label={t("pulse.chat.title")}
          className="h-[24rem] space-y-3 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10"
        >
          {messages === null && !failed ? (
            <div className="space-y-3" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-white/[0.06]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-24 animate-pulse rounded bg-white/[0.05]" />
                    <div className="h-9 animate-pulse rounded-lg bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          ) : failed && messages === null ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-muted-foreground">{t("pulse.chat.loadError")}</p>
              <Button variant="outline" size="sm" onClick={retry}>
                <RefreshCw className="h-3.5 w-3.5" /> {t("common.retry")}
              </Button>
            </div>
          ) : messages && messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <MessagesSquare className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
              <p className="text-sm font-medium">{t("pulse.chat.empty")}</p>
            </div>
          ) : (
            (messages ?? []).map((m) => {
              const mine = user?.id === m.user.id;
              return (
                <div key={m.id} className={cn("flex items-start gap-2.5", mine && "flex-row-reverse")}>
                  <UserAvatar
                    user={{ username: m.user.username, displayName: m.user.displayName, avatarColor: m.user.avatarColor, avatarUrl: m.user.avatarUrl }}
                    size={32}
                  />
                  <div className={cn("min-w-0 max-w-[85%]", mine && "text-left")}>
                    <p className={cn("mb-1 flex items-baseline gap-2 text-[11px] text-muted-foreground", mine && "flex-row-reverse")}>
                      <span className="font-semibold text-foreground/80">{mine ? user?.displayName ?? m.user.displayName : m.user.displayName}</span>
                      <time dateTime={m.createdAt} className="font-mono text-[10px]">
                        {rel(m.createdAt)}
                      </time>
                    </p>
                    <div
                      className={cn(
                        "inline-block whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-6",
                        mine
                          ? "bg-gradient-to-br from-cyan-500/25 to-violet-500/25 ring-1 ring-cyan-400/20"
                          : "bg-white/[0.05] ring-1 ring-white/[0.06]"
                      )}
                    >
                      {m.body}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* composer */}
        <div className="border-t border-white/[0.06] px-4 py-3">
          {user ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-end gap-2"
            >
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, BODY_MAX))}
                onKeyDown={(e) => {
                  // Enter sends, Shift+Enter = newline (chat convention)
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder={t("pulse.chat.placeholder")}
                aria-label={t("pulse.chat.placeholder")}
                rows={1}
                className="min-h-[2.75rem] flex-1 resize-none bg-white/[0.03] text-sm"
              />
              <Button
                type="submit"
                size="icon"
                disabled={sending || text.trim().length === 0}
                aria-label={t("pulse.chat.title")}
                className="h-11 w-11 shrink-0 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1 text-center sm:flex-row sm:justify-between sm:text-right">
              <p className="text-sm text-muted-foreground">{t("pulse.chat.loginRequired")}</p>
              <Button size="sm" className="btn-hero" onClick={() => navigate({ name: "login" })}>
                <LogIn className="h-4 w-4" /> {t("common.signIn")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </FadeIn>
  );
}
