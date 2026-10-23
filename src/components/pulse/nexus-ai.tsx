"use client";

// TEKA NEXUS — NEXUS AI chat (Task 13: "دستیار هوشمند قوی").
// The platform-wide copilot UI: stateless chat against /api/ai/nexus, which
// injects a LIVE platform snapshot (stats, top projects, challenge, caller
// profile) into the system prompt. Honest offline badge when the backend
// falls back to real-data mode. History capped at 16 messages.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Eraser, RotateCcw, SendHorizontal, Sparkles, WifiOff } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { ApiError, post } from "@/lib/api";
import { useT, useTList } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { LogoMark } from "@/components/brand/logo";

type ChatMsg = { role: "user" | "assistant"; content: string; offline?: boolean };

const MAX_HISTORY = 16;

export function NexusAI({ className }: { className?: string }) {
  const t = useT();
  const tList = useTList();
  const locale = useI18n((s) => s.locale);

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending, error]);

  const call = async (history: ChatMsg[]) => {
    const res = await post<{ reply: string; offline?: boolean }>("/api/ai/nexus", {
      messages: history.slice(-MAX_HISTORY),
      locale,
    });
    return { reply: res.reply, offline: res.offline === true };
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setDraft("");
    setError(null);
    const history: ChatMsg[] = [...messages, { role: "user", content: trimmed }].slice(-MAX_HISTORY);
    setMessages(history);
    setPending(true);
    try {
      const { reply, offline } = await call(history);
      if (reply.trim()) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply.trim(), offline }].slice(-MAX_HISTORY));
      } else {
        setError(t("pulse.ai.errGeneric"));
      }
    } catch (e) {
      const msg = e instanceof ApiError && e.message ? e.message : t("pulse.ai.errGeneric");
      setError(msg);
      if (e instanceof ApiError && e.status !== 429) toast.error(msg);
    } finally {
      setPending(false);
    }
  };

  const retry = async () => {
    if (pending || !error || messages.length === 0) return;
    setError(null);
    setPending(true);
    try {
      const { reply, offline } = await call(messages.slice(-MAX_HISTORY));
      if (reply.trim()) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply.trim(), offline }].slice(-MAX_HISTORY));
      } else setError(t("pulse.ai.errGeneric"));
    } catch (e) {
      setError(e instanceof ApiError && e.message ? e.message : t("pulse.ai.errGeneric"));
    } finally {
      setPending(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(draft);
    }
  };

  const rows = Math.min(4, Math.max(1, draft.split("\n").length));

  return (
    <section
      aria-label={t("pulse.ai.title")}
      className={cn("glass-card flex flex-col rounded-2xl p-4 md:p-5", className)}
    >
      {/* header */}
      <header className="mb-3 flex items-center gap-2.5">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-violet-400/25 bg-violet-500/10"
          aria-hidden="true"
        >
          <Sparkles className="h-[18px] w-[18px] text-violet-300" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm font-semibold tracking-wide text-white">{t("pulse.ai.title")}</h3>
            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold text-violet-300" dir="ltr">
              {t("pulse.ai.badge")}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{t("pulse.ai.tagline")}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (pending || messages.length === 0) return;
            setMessages([]);
            setError(null);
            setDraft("");
          }}
          disabled={pending || messages.length === 0}
          aria-label={t("pulse.ai.clearChat")}
          title={t("pulse.ai.clearChat")}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40 focus-glow"
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      {/* messages */}
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label={t("pulse.ai.title")}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto py-1 pr-1 max-h-[26rem] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar]:w-1.5"
      >
        <Bubble>{t("pulse.ai.greeting")}</Bubble>

        {messages.map((m, i) =>
          m.role === "user" ? (
            <UserLine key={i}>{m.content}</UserLine>
          ) : (
            <Bubble key={i} offline={m.offline} offlineLabel={t("pulse.ai.offlineBadge")}>
              {m.content}
            </Bubble>
          ),
        )}

        {pending && <Typing label={t("pulse.ai.typing")} />}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto max-w-[92%] space-y-2 rounded-xl border border-rose-400/25 bg-rose-500/[0.08] px-3 py-2.5 text-center"
          >
            <p className="text-xs leading-5 text-rose-200/90">{error}</p>
            <button
              type="button"
              onClick={() => void retry()}
              disabled={pending}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:opacity-50 focus-glow"
            >
              <RotateCcw className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
              {t("pulse.ai.retry")}
            </button>
          </motion.div>
        )}
      </div>

      {/* quick prompts */}
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tList("pulse.ai.quickPrompts").map((q) => (
          <button
            key={q}
            type="button"
            dir="auto"
            onClick={() => void send(q)}
            disabled={pending}
            className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200 transition hover:border-violet-400/30 hover:bg-violet-500/[0.08] hover:text-violet-100 disabled:opacity-50 focus-glow"
          >
            {q}
          </button>
        ))}
      </div>

      {/* composer */}
      <div className="mt-1 flex items-end gap-2 border-t border-white/10 pt-3">
        <textarea
          dir="auto"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          placeholder={t("pulse.ai.placeholder")}
          aria-label={t("pulse.ai.placeholder")}
          className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-100 transition placeholder:text-muted-foreground/70 focus:border-violet-400/40 focus:outline-none focus-glow"
        />
        <button
          type="button"
          onClick={() => void send(draft)}
          disabled={pending || !draft.trim()}
          aria-label={t("pulse.ai.send")}
          title={t("pulse.ai.send")}
          className="btn-hero inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl focus-glow"
        >
          <SendHorizontal className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-2 text-center text-[11px] leading-4 text-muted-foreground">{t("pulse.ai.disclaimer")}</p>
    </section>
  );
}

function Bubble({
  children,
  offline,
  offlineLabel,
}: {
  children: React.ReactNode;
  offline?: boolean;
  offlineLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex items-start gap-2"
    >
      <span
        className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-violet-400/25 bg-violet-500/10"
        aria-hidden="true"
      >
        <LogoMark size={16} />
      </span>
      <div
        dir="auto"
        className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-es-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-6 text-slate-100"
      >
        {children}
        {offline && offlineLabel && (
          <span className="mt-2 flex items-center gap-1 text-[10px] font-medium text-amber-300/90">
            <WifiOff className="h-3 w-3" aria-hidden="true" />
            {offlineLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function UserLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex justify-end"
    >
      <div
        dir="auto"
        className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-ee-md border border-cyan-400/25 bg-cyan-500/[0.12] px-3.5 py-2.5 text-sm leading-6 text-cyan-50"
      >
        {children}
      </div>
    </motion.div>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="flex items-start gap-2">
      <span
        className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-violet-400/25 bg-violet-500/10"
        aria-hidden="true"
      >
        <LogoMark size={16} />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full", i === 1 ? "bg-violet-300" : "bg-cyan-300")}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
