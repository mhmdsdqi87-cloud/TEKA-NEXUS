"use client";

// TEKA NEXUS — Arena Terminal (Task 23, was TEKA OS Terminal).
// A real command line for the platform: opens games & pages, reads live
// stats, hides easter eggs. Commands run against the same stores the
// Arena uses.

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { useApp, type View } from "@/lib/store";
import { useOsSession } from "@/lib/os/session-store";
import { ARENA_GAMES } from "./app-registry";
import { OS_STRINGS, pickL } from "@/lib/os/strings";
import { levelFromXp } from "@/lib/xp";

type Line = { id: number; text: string; tone?: "cmd" | "ok" | "err" | "dim" | "accent" };

let lineSeq = 0;
const mkLine = (text: string, tone?: Line["tone"]): Line => ({ id: ++lineSeq, text, tone });

const LOGO_ASCII = [
  " ______  _______ _______ _______ _     _",
  "|_____/ |______ |______ |_____| |____/ ",
  "|    \\_ |______ ______| |     | |    \\_",
];

export function TerminalApp() {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const L = (key: keyof typeof OS_STRINGS.terminal) => pickL(OS_STRINGS.terminal[key], locale);

  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const session = useOsSession((s) => s.session);
  const fetchSession = useOsSession((s) => s.fetchSession);

  const [lines, setLines] = useState<Line[]>(() => [
    mkLine(pickL(OS_STRINGS.terminal.banner1, locale), "accent"),
    mkLine(pickL(OS_STRINGS.terminal.banner2, locale), "dim"),
    mkLine(""),
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (...ls: Line[]) => setLines((prev) => [...prev, ...ls]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) {
      push(mkLine(""));
      return;
    }
    push(mkLine(`$ ${cmd}`, "cmd"));
    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");
    const c = head.toLowerCase();

    const open = (id: string, props?: Record<string, string | undefined>) => {
      if (id === "academy") {
        navigate({ name: "academy", course: props?.course });
        push(mkLine(`→ ${t("os.apps.academy")}`, "ok"));
        return;
      }
      const game = ARENA_GAMES.find((g) => g.id === id);
      if (!game) {
        push(mkLine(`no app: ${id}`, "err"));
        return;
      }
      navigate({ name: game.id } as View);
      push(mkLine(`→ ${t(game.titleKey)}`, "ok"));
    };

    switch (c) {
      case "help":
        push(
          mkLine("AVAILABLE COMMANDS", "accent"),
          mkLine("  help                 this list"),
          mkLine("  apps                 list installed games"),
          mkLine("  open <app>           launch a game (e.g. open boss)"),
          mkLine("  status               your live stats"),
          mkLine("  whoami               identity card"),
          mkLine("  neofetch             system info, TEKA style"),
          mkLine("  date                 Tehran time"),
          mkLine("  echo <text>          say it back"),
          mkLine("  clear                wipe the screen"),
          mkLine("  teka learn <course>  jump into a course"),
          mkLine("  teka <app>           open any arena game by name"),
          mkLine("  battle @user         challenge someone (for glory)"),
          mkLine("  …and maybe one secret. maybe.", "dim"),
        );
        break;

      case "apps":
      case "ls":
        push(mkLine(ARENA_GAMES.map((g) => g.id).join("  "), "ok"));
        break;

      case "open": {
        const id = arg.toLowerCase().trim();
        if (!id) push(mkLine("usage: open <app>", "err"));
        else open(id);
        break;
      }

      case "status": {
        if (!session) {
          push(mkLine("syncing session… try again in a second", "dim"));
          fetchSession();
          break;
        }
        push(
          mkLine(`USER      ${user?.username ?? "?"}`, "ok"),
          mkLine(`XP        ${session.xp}  (level ${levelFromXp(session.xp)})`),
          mkLine(`COINS     ${session.coins} TEKA`),
          mkLine(`TEAM      ${session.team ?? "— unaffiliated —"}`),
          mkLine(`TITLE     ${session.title ?? "— none yet — fight a boss!"}`),
          mkLine(`CARDS     ${session.cards.count}`),
          mkLine(`PET       ${session.pet ? `${session.pet.name || "unnamed"} (stage ${session.pet.stage}, ${session.pet.hunger}%)` : "not hatched"}`),
          mkLine(`EVENT     ${session.event.active ? "TEKA NIGHTS LIVE — 2× XP" : `next in ${fmtDelta(session.event.nextStart)}`}`),
        );
        break;
      }

      case "whoami":
        push(
          mkLine(`${user?.displayName ?? "guest"} (@${user?.username ?? "unknown"})`, "accent"),
          mkLine(user?.title ? `title: ${user.title}` : "title: unproven", "dim"),
        );
        break;

      case "neofetch":
        push(
          ...LOGO_ASCII.map((l) => mkLine(l, "accent")),
          mkLine(""),
          mkLine(`OS       TEKA NEXUS 2.0 (arena)`, "ok"),
          mkLine(`SHELL    tekash`),
          mkLine(`UPTIME   since ${session ? new Date(session.memberSince).toLocaleDateString() : "…"}`),
          mkLine(`XP       ${session?.xp ?? 0}`),
          mkLine(`COINS    ${session?.coins ?? 0}`),
        );
        break;

      case "date":
        push(mkLine(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tehran", dateStyle: "full", timeStyle: "short" }).format(new Date()), "ok"));
        break;

      case "echo":
        push(mkLine(arg || " "));
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        if (arg.toLowerCase() === "hack") {
          push(
            mkLine("requesting elevated privileges…", "dim"),
            mkLine("bypassing firewall ██████████░░ 67%"),
            mkLine("injecting python ████████████████ 100%", "ok"),
            mkLine("ACCESS GRANTED — just kidding. this is a friendly platform 😎", "accent"),
          );
          toast.success("sudo hack — nice try, agent.");
        } else {
          push(mkLine("sudo: unknown intent. (try: sudo hack)", "err"));
        }
        break;

      case "teka": {
        const sub = arg.toLowerCase().split(/\s+/)[0] ?? "";
        if (sub === "learn") {
          const course = arg.split(/\s+/)[1];
          if (!course) {
            push(mkLine("courses: python-basics | html-basics | css-basics | js-basics", "dim"));
          } else {
            open("academy", { course });
            push(mkLine(`loading ${course}…`, "ok"));
          }
        } else if (!sub) {
          push(mkLine("usage: teka <app> | teka learn <course>", "err"));
        } else if (ARENA_GAMES.some((g) => g.id === sub)) {
          open(sub);
        } else {
          push(mkLine(L("unknown").replace("{cmd}", `teka ${sub}`), "err"));
        }
        break;
      }

      case "battle": {
        const target = arg.replace(/^@/, "").trim();
        if (!target) {
          push(mkLine("usage: battle @username", "err"));
          break;
        }
        // Deterministic cosmetic duel — hash of both names decides the winner.
        const me = user?.username ?? "you";
        const seed = [...(me + target)].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 997, 7);
        const win = seed % 2 === 0;
        push(
          mkLine(`⚔️  ${me} vs ${target} — FIGHT!`, "accent"),
          mkLine(`${me} casts ${["recursion", "clean code", "a regex", "rubber duck"][seed % 4]}…`),
          mkLine(`${target} counters with ${["scope creep", "legacy code", "spaghetti", "a semicolon"][seed % 4]}…`),
          mkLine(win ? `🏆 ${me} wins! +0 XP (glory only)` : `💀 ${target} wins… rematch anytime.`, "ok"),
        );
        break;
      }

      default:
        push(mkLine(L("unknown").replace("{cmd}", c), "err"), mkLine(L("hintSecret"), "dim"));
    }
  };

  const submit = () => {
    const cmd = input;
    setInput("");
    if (cmd.trim()) {
      setHistory((h) => [...h, cmd.trim()]);
      setHistIdx(-1);
    }
    run(cmd);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      if (history[idx]) {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx >= 0 && histIdx < history.length - 1) {
        setHistIdx(histIdx + 1);
        setInput(history[histIdx + 1]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.key === "Enter") {
      submit();
    }
  };

  const toneClass = (tone?: Line["tone"]) =>
    tone === "cmd" ? "text-white"
    : tone === "ok" ? "text-emerald-300"
    : tone === "err" ? "text-rose-300"
    : tone === "accent" ? "text-cyan-300"
    : tone === "dim" ? "text-white/35"
    : "text-white/70";

  return (
    <div
      className="flex h-full flex-col bg-[#02050c] font-mono text-[12px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
      dir="ltr"
    >
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-3 teka-os-scroll">
        {lines.map((l) => (
          <p key={l.id} className={`whitespace-pre-wrap ${toneClass(l.tone)}`}>{l.text}</p>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-emerald-400/10 px-4 py-2.5">
        <span className="text-emerald-400">teka@os</span>
        <span className="text-white/30">:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          className="flex-1 bg-transparent text-emerald-100 caret-emerald-300 outline-none"
        />
      </div>
    </div>
  );
}

function fmtDelta(iso: string): string {
  const ms = Math.max(0, new Date(iso).getTime() - Date.now());
  const h = Math.floor(ms / 3_600_000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h`;
  return `${h}h`;
}
