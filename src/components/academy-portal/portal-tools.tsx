"use client";

// TEKA NEXUS ACADEMY — TOOLS section.
// Sub-tab switcher over the four imported practice tools (owned by the
// tools agent): Bug Detective / Error Encyclopedia / Predict Output / Glossary.

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, BookOpen, Languages, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/shared/motion";
import { BugDetective, ErrorEncyclopedia, PredictOutput, Glossary } from "@/components/academy-portal/tools";

import type { PortalDict } from "./portal-dict";

type ToolKey = "detective" | "encyclopedia" | "predict" | "glossary";

const TOOLS: { key: ToolKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "detective", icon: Bug },
  { key: "encyclopedia", icon: BookOpen },
  { key: "predict", icon: Zap },
  { key: "glossary", icon: Languages },
];

export function ToolsSection({ dict }: { dict: PortalDict }) {
  const [tool, setTool] = useState<ToolKey>("detective");

  const labels: Record<ToolKey, string> = {
    detective: dict.tools.detective,
    encyclopedia: dict.tools.encyclopedia,
    predict: dict.tools.predict,
    glossary: dict.tools.glossary,
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{dict.tools.title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{dict.tools.subtitle}</p>
        </div>
      </FadeIn>

      {/* tool switcher */}
      <FadeIn delay={0.05}>
        <div
          role="tablist"
          aria-label={dict.tools.tabsAria}
          className="-mx-1 flex gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
        >
          {TOOLS.map(({ key, icon: Icon }) => {
            const isActive = tool === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTool(key)}
                className={cn(
                  "relative inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus-glow",
                  isActive ? "text-cyan-200" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="portal-tools-pill"
                    className="absolute inset-0 rounded-xl bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/25"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative h-4 w-4" aria-hidden="true" />
                <span className="relative whitespace-nowrap">{labels[key]}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* active tool — tools own their internals; keep them centered & readable */}
      <div className="mx-auto max-w-4xl">
        <FadeIn key={tool} y={10} duration={0.3}>
          {tool === "detective" && <BugDetective />}
          {tool === "encyclopedia" && <ErrorEncyclopedia />}
          {tool === "predict" && <PredictOutput />}
          {tool === "glossary" && <Glossary />}
        </FadeIn>
      </div>
    </div>
  );
}
