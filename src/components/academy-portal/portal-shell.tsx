"use client";

// TEKA NEXUS ACADEMY — portal chrome: identity wordmark, the "← TEKA NEXUS"
// back link that makes the portal feel like a separate destination, and the
// section nav pills (framer-motion layoutId sliding highlight, RTL-safe).

import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { TapScale } from "@/components/shared/motion";

import type { PortalDict } from "./portal-dict";
import { PORTAL_SECTIONS, type PortalSection } from "./portal-data";

export function PortalWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-inset ring-cyan-400/30" aria-hidden="true">
        <GraduationCap className="h-5 w-5 text-cyan-300" />
      </span>
      <span className="font-display text-base font-bold tracking-tight sm:text-lg">
        <span className="text-foreground">TEKA</span>{" "}
        <span className="text-gradient">ACADEMY</span>
        {!compact && (
          <span className="ms-2 hidden align-super font-mono text-[10px] font-medium tracking-widest text-muted-foreground md:inline">
            PORTAL
          </span>
        )}
      </span>
    </span>
  );
}

export function PortalHeader({
  active,
  onNavigate,
  dict,
}: {
  active: PortalSection;
  onNavigate: (s: PortalSection) => void;
  dict: PortalDict;
}) {
  const navigate = useApp((s) => s.navigate);
  const back = useApp((s) => s.back);

  const labels: Record<PortalSection, string> = {
    dashboard: dict.nav.dashboard,
    paths: dict.nav.paths,
    tools: dict.nav.tools,
    tutor: dict.nav.tutor,
    certificates: dict.nav.certificates,
  };

  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PortalWordmark />

        <TapScale>
          <button
            onClick={() => back()}
            aria-label={dict.meta.backAria}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-muted-foreground transition hover:border-cyan-400/30 hover:text-foreground focus-glow"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {dict.meta.backToNexus}
          </button>
        </TapScale>
      </div>

      <nav
        aria-label={dict.nav.navAria}
        className="-mx-1 flex gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
      >
        {PORTAL_SECTIONS.map((s) => {
          const isActive = s === active;
          return (
            <button
              key={s}
              onClick={() => onNavigate(s)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative min-h-[44px] shrink-0 rounded-xl px-4 text-sm font-semibold transition focus-glow",
                isActive ? "text-cyan-200" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="portal-nav-pill"
                  className="absolute inset-0 rounded-xl bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/25"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{labels[s]}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
