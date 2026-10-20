"use client";

// TEKA NEXUS — Academy AI Tutor panel (spec §8).
// A Socratic chat: the tutor guides with hints instead of dumping answers.
// No persistence — history lives in component state (capped at 12 messages)
// and is re-sent every turn. Honest labeling + graceful error fallback: when
// the AI is unavailable the panel says so plainly and offers a retry, it
// never fakes a reply.

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, Eraser, RotateCcw, SendHorizontal, WifiOff } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { ApiError, post } from "@/lib/api";
import { useI18n } from "@/lib/i18n/store";
import { EASE } from "@/components/shared/motion";
import { LogoMark } from "@/components/brand/logo";
import { TUTOR_DICT } from "./tutor-dict";

type ChatMsg = { role: "user" | "assistant"; content: string; offline?: boolean };
type ChatError = { message: string; rate: boolean } | null;

export type TutorContext = {
  courseId?: string;
  lessonId?: string;
  /** Display-only: shown on the context chip, never sent to the API. */
  lessonTitle?: string;
};

const MAX_HISTORY = 12;

export function TutorPanel({ context }: { context?: TutorContext }) {
  const locale = useI18n((s) => s.locale);
  const dict = TUTOR_DICT[locale] ?? TUTOR_DICT.en;

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ChatError>(null);

  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest bubble / typing indicator.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending, error]);

  const callTutor = async (history: ChatMsg[]) => {
    const res = await post<{ reply: string; offline?: boolean }>("/api/academy/tutor", {
      messages: history,
      context: {
        courseId: context?.courseId,
        lessonId: context?.lessonId,
        locale,
      },
    });
    return { reply: res.reply, offline: res.offline === true };
  };

  const fail = (err: unknown) => {
    const message = err instanceof ApiError && err.message ? err.message : dict.errGeneric;
    setError({ message, rate: err instanceof ApiError && err.status === 429 });
    toast.error(message);
  };

  const sendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setDraft("");
    setError(null);
    const history = [...messages, { role: "user" as const, content: trimmed }].slice(-MAX_HISTORY);
    setMessages(history);
    setPending(true);
    try {
      const { reply, offline } = await callTutor(history);
      const trimmed = reply.trim();
      if (trimmed) {
        const replyMsg: ChatMsg = { role: "assistant", content: trimmed, offline };
        setMessages((prev) => [...prev, replyMsg].slice(-MAX_HISTORY));
      } else {
        setError({ message: dict.errGeneric, rate: false });
      }
    } catch (err) {
      fail(err);
    } finally {
      setPending(false);
    }
  };

  // Re-ask with the same history (the failed user message is already in it).
  const retry = async () => {
    if (pending || !error) return;
    setError(null);
    setPending(true);
    try {
      const { reply, offline } = await callTutor(messages.slice(-MAX_HISTORY));
      const trimmed = reply.trim();
      if (trimmed) {
        const replyMsg: ChatMsg = { role: "assistant", content: trimmed, offline };
        setMessages((prev) => [...prev, replyMsg].slice(-MAX_HISTORY));
      } else {
        setError({ message: dict.errGeneric, rate: false });
      }
    } catch (err) {
      fail(err);
    } finally {
      setPending(false);
    }
  };

  const clearChat = () => {
    if (pending) return;
    setMessages([]);
    setError(null);
    setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void sendText(draft);
    }
  };

  const rows = Math.min(4, Math.max(1, draft.split("\n").length));
  const contextLabel = context?.lessonTitle ?? context?.courseId;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-500/10"
          aria-hidden="true"
        >
          <LogoMark size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-white">{dict.title}</h3>
            {contextLabel && (
              <span
                className="hidden max-w-[180px] items-center gap-1 truncate rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium text-cyan-200/90 ring-1 ring-inset ring-cyan-400/20 sm:inline-flex"
                title={`${dict.discussing}: ${contextLabel}`}
              >
                <BookOpen className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{contextLabel}</span>
              </span>
            )}
          </div>
          <p dir="auto" className="truncate text-xs text-muted-foreground">
            {dict.tagline}
          </p>
        </div>
        <button
          type="button"
          onClick={clearChat}
          disabled={pending || messages.length === 0}
          aria-label={dict.clearChat}
          title={dict.clearChat}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground disabled:opacity-40 focus-glow"
        >
          <Eraser className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* message list */}
      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label={dict.title}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4"
      >
        <TutorBubble>{dict.greeting}</TutorBubble>

        {messages.map((m, i) =>
          m.role === "user" ? (
            <UserBubble key={i}>{m.content}</UserBubble>
          ) : (
            <TutorBubble key={i} offline={m.offline} offlineLabel={dict.offlineBadge}>
              {m.content}
            </TutorBubble>
          ),
        )}

        {pending && <TypingDots label={dict.typing} />}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto max-w-[90%] space-y-2 rounded-xl border border-rose-400/25 bg-rose-500/[0.08] px-3 py-2.5 text-center"
          >
            <p className="text-xs leading-5 text-rose-200/90">
              {error.rate ? `${error.message}` : error.message}
            </p>
            <button
              type="button"
              onClick={() => void retry()}
              disabled={pending}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:opacity-50 focus-glow"
            >
              <RotateCcw className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
              {dict.retry}
            </button>
          </motion.div>
        )}
      </div>

      {/* quick prompts — single scrollable row, always within reach */}
      <div className="flex gap-2 overflow-x-auto px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {dict.quickPrompts.map((q) => (
          <button
            key={q}
            type="button"
            dir="auto"
            onClick={() => void sendText(q)}
            disabled={pending}
            className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-500/[0.08] hover:text-cyan-100 disabled:opacity-50 focus-glow"
          >
            {q}
          </button>
        ))}
      </div>

      {/* composer */}
      <div className="flex items-end gap-2 border-t border-white/10 px-3 py-3">
        <textarea
          dir="auto"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          placeholder={dict.placeholder}
          aria-label={dict.placeholder}
          className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-100 transition placeholder:text-muted-foreground/70 focus:border-cyan-400/40 focus:outline-none focus-glow"
        />
        <button
          type="button"
          onClick={() => void sendText(draft)}
          disabled={pending || !draft.trim()}
          aria-label={dict.send}
          title={dict.send}
          className="btn-hero inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl focus-glow"
        >
          <SendHorizontal className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>

      {/* honest-AI footer */}
      <p dir="auto" className="border-t border-white/10 px-3 py-2 text-center text-[11px] leading-4 text-muted-foreground">
        {dict.disclaimer}
      </p>
    </div>
  );
}

// ─── Bubbles ─────────────────────────────────────────────────
// y/opacity-only animations — RTL-safe by construction.

function TutorBubble({
  children,
  offline,
  offlineLabel,
}: {
  children: ReactNode;
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
        className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan-400/25 bg-cyan-500/10"
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

function UserBubble({ children }: { children: ReactNode }) {
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

function TypingDots({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="flex items-start gap-2">
      <span
        className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan-400/25 bg-cyan-500/10"
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
