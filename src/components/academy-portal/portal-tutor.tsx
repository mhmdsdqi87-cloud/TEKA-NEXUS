"use client";

// TEKA NEXUS ACADEMY — TUTOR section.
// Explains the AI tutor honestly (optional, Socratic, real limits) and hosts
// the TutorPanel component owned by the tutor agent. No lesson context is
// passed — the portal tutor is a general-purpose study companion.

import { Brain, Lightbulb, ShieldCheck } from "lucide-react";

import { FadeIn } from "@/components/shared/motion";
import { TutorPanel } from "@/components/academy-portal/tutor/tutor-panel";

import type { PortalDict } from "./portal-dict";

const BULLET_ICONS = [Lightbulb, Brain, ShieldCheck] as const;

export function TutorSection({ dict }: { dict: PortalDict }) {
  const bullets = [dict.tutor.b1, dict.tutor.b2, dict.tutor.b3];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{dict.tutor.title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{dict.tutor.subtitle}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <ul className="grid gap-3 sm:grid-cols-3">
          {bullets.map((b, i) => {
            const Icon = BULLET_ICONS[i];
            return (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.05] ring-1 ring-inset ring-white/10" aria-hidden="true">
                  <Icon className="h-4 w-4 text-cyan-300" />
                </span>
                <span className="text-[13px] leading-5 text-slate-300">{b}</span>
              </li>
            );
          })}
        </ul>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="min-h-[60vh]">
          <TutorPanel />
        </div>
      </FadeIn>
    </div>
  );
}
