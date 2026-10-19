"use client";

// TEKA NEXUS ACADEMY — PATHS section.
// Three recommended routes (recommendations, not silos — spec §5/§13):
//   1. Programming Foundations  → python-basics modules
//   2. Web Creation             → html-basics modules
//   3. The full journey         → python → web → license → build in the community
// Every step chip derives its state (done / current / upcoming) from real
// progress and jumps straight into the right lesson.

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Compass, Route, ShieldCheck, Sparkles, Terminal, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { EASE, FadeIn, HoverLift, Stagger, StaggerItem, TapScale } from "@/components/shared/motion";
import { COURSES, pick } from "@/lib/academy";
import { EmptyState } from "@/components/shared/atoms";

import type { PortalDict } from "./portal-dict";
import {
  courseDone,
  courseStat,
  fill,
  licenseCount,
  moduleStats,
  nextLessonInCourse,
  useLocale,
  type PortalDataFull,
  type PortalSection,
} from "./portal-data";

type StepState = "done" | "current" | "upcoming";

const STATE_STYLE: Record<StepState, { chip: string; dot: string; labelClass: string }> = {
  done: {
    chip: "border-emerald-400/25 bg-emerald-500/[0.08] text-emerald-100 hover:border-emerald-400/45",
    dot: "bg-emerald-400",
    labelClass: "text-emerald-300",
  },
  current: {
    chip: "border-cyan-400/40 bg-cyan-500/[0.1] text-cyan-100 hover:border-cyan-400/60 shadow-[0_0_18px_-6px_rgba(34,211,238,0.45)]",
    dot: "bg-cyan-400",
    labelClass: "text-cyan-300",
  },
  upcoming: {
    chip: "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-white/25 hover:text-foreground",
    dot: "bg-white/25",
    labelClass: "text-muted-foreground",
  },
};

function StepDot({ state, index }: { state: StepState; index: number }) {
  return (
    <span
      className={cn(
        "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold",
        state === "done" && "bg-emerald-500/25 text-emerald-300",
        state === "current" && "bg-cyan-500/25 text-cyan-200",
        state === "upcoming" && "bg-white/[0.07] text-slate-400",
      )}
      aria-hidden="true"
    >
      {state === "done" ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
    </span>
  );
}

function ModuleChip({
  state,
  index,
  title,
  stateLabel,
  onClick,
}: {
  state: StepState;
  index: number;
  title: string;
  stateLabel: string;
  onClick: () => void;
}) {
  const style = STATE_STYLE[state];
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-h-[44px] w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-start transition focus-glow",
        style.chip,
      )}
    >
      <StepDot state={state} index={index} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold">{title}</span>
        <span className={cn("text-[10px] font-medium uppercase tracking-wider", style.labelClass)}>{stateLabel}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 opacity-60 rtl:rotate-180" aria-hidden="true" />
    </button>
  );
}

function PathCard({
  icon: Icon,
  iconClass,
  title,
  desc,
  pct,
  children,
  ctaLabel,
  onCta,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  title: string;
  desc: string;
  pct: number;
  children: React.ReactNode;
  ctaLabel: string;
  onCta: () => void;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <HoverLift className="h-full">
        <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.05] ring-1 ring-inset ring-white/10", iconClass)} aria-hidden="true">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-white sm:text-lg">{title}</h3>
              <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{desc}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.span
                className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 rtl:origin-right"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: pct }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
              />
            </span>
            <span className="shrink-0 text-xs font-bold tabular-nums text-white">{Math.round(pct * 100)}%</span>
          </div>

          <div className="mt-4 grid flex-1 content-start gap-2">{children}</div>

          <div className="mt-5">
            <TapScale>
              <button
                onClick={onCta}
                className="btn-hero inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {ctaLabel}
              </button>
            </TapScale>
          </div>
        </div>
      </HoverLift>
    </FadeIn>
  );
}

// ─── Section ─────────────────────────────────────────────────

export function PathsSection({ data, dict, onNavigate }: { data: PortalDataFull; dict: PortalDict; onNavigate: (s: PortalSection) => void }) {
  const locale = useLocale();
  const navigate = useApp((s) => s.navigate);

  if (data.user && !data.loaded) {
    return (
      <div className="grid gap-5 lg:grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.02]" />
        ))}
      </div>
    );
  }

  if (data.user && data.failed) {
    return (
      <EmptyState
        icon={Route}
        title={dict.states.errorTitle}
        description={dict.states.errorBody}
        action={
          <TapScale>
            <button onClick={() => void data.refresh()} className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow">
              {dict.states.retry}
            </button>
          </TapScale>
        }
        className="rounded-2xl border border-dashed border-white/10"
      />
    );
  }

  const [py, web] = COURSES;
  const pyStat = courseStat(py.id, data.progress);
  const webStat = courseStat(web.id, data.progress);
  const pyModules = moduleStats(py, data.progress);
  const webModules = moduleStats(web, data.progress);
  const licenses = licenseCount(data.exams);

  const journeyPct = (pyStat.pct + webStat.pct + Math.min(licenses, 2) / 2) / 3;

  // per-course "current module" = first module that isn't fully done
  const currentState = (complete: boolean, isNext: boolean): StepState => (complete ? "done" : isNext ? "current" : "upcoming");

  const courseCta = (courseId: string) => {
    const next = nextLessonInCourse(courseId, data.progress);
    navigate(next ? { name: "academy", course: courseId, lesson: next.lessonId } : { name: "academy", course: courseId });
  };

  const pyDone = courseDone(py.id, data.progress);
  const webDone = courseDone(web.id, data.progress);
  const targetCourseId = !pyDone ? py.id : !webDone ? web.id : py.id;
  const allLicensed = licenses >= 2;

  // Full journey CTA: next undone milestone, else the community door
  const journeyCta = () => {
    if (!pyDone) return courseCta(py.id);
    if (!webDone) return courseCta(web.id);
    if (!allLicensed) return navigate({ name: "academy", course: pyDone ? web.id : py.id });
    navigate(data.user ? { name: "home" } : { name: "explore" });
  };
  const journeyCtaLabel = !pyDone || !webDone ? dict.paths.resume : !allLicensed ? dict.paths.jExam : dict.community.cta;

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{dict.paths.title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{dict.paths.subtitle}</p>
        </div>
      </FadeIn>

      <Stagger className="grid gap-5 lg:grid-cols-3" gap={0.09}>
        {/* Path 1 — Programming Foundations */}
        <StaggerItem className="h-full">
          <PathCard
            icon={Terminal}
            iconClass="text-amber-300"
            title={dict.paths.p1Title}
            desc={dict.paths.p1Desc}
            pct={pyStat.pct}
            ctaLabel={pyStat.done === 0 ? dict.paths.start : dict.paths.resume}
            onCta={() => courseCta(py.id)}
            delay={0.05}
          >
            {pyModules.map((m, i) => (
              <ModuleChip
                key={m.module.id}
                index={i}
                state={currentState(m.complete, i === pyModules.findIndex((x) => !x.complete))}
                title={fill(dict.paths.stepModule, { n: i + 1 }) + " · " + pick(m.module.title, locale)}
                stateLabel={m.complete ? dict.paths.stepDone : m.doneCount > 0 ? dict.paths.stepCurrent : dict.paths.stepUpcoming}
                onClick={() => m.nextLessonId && navigate({ name: "academy", course: py.id, lesson: m.nextLessonId })}
              />
            ))}
          </PathCard>
        </StaggerItem>

        {/* Path 2 — Web Creation */}
        <StaggerItem className="h-full">
          <PathCard
            icon={Compass}
            iconClass="text-cyan-300"
            title={dict.paths.p2Title}
            desc={dict.paths.p2Desc}
            pct={webStat.pct}
            ctaLabel={webStat.done === 0 ? dict.paths.start : dict.paths.resume}
            onCta={() => courseCta(web.id)}
            delay={0.1}
          >
            {webModules.map((m, i) => (
              <ModuleChip
                key={m.module.id}
                index={i}
                state={currentState(m.complete, i === webModules.findIndex((x) => !x.complete))}
                title={fill(dict.paths.stepModule, { n: i + 1 }) + " · " + pick(m.module.title, locale)}
                stateLabel={m.complete ? dict.paths.stepDone : m.doneCount > 0 ? dict.paths.stepCurrent : dict.paths.stepUpcoming}
                onClick={() => m.nextLessonId && navigate({ name: "academy", course: web.id, lesson: m.nextLessonId })}
              />
            ))}
          </PathCard>
        </StaggerItem>

        {/* Path 3 — The full journey */}
        <StaggerItem className="h-full">
          <PathCard
            icon={Trophy}
            iconClass="text-violet-300"
            title={dict.paths.p3Title}
            desc={dict.paths.p3Desc}
            pct={journeyPct}
            ctaLabel={journeyCtaLabel}
            onCta={journeyCta}
            delay={0.15}
          >
            <div className="space-y-2">
              {[
                {
                  state: (pyDone ? "done" : pyStat.done > 0 ? "current" : "upcoming") as StepState,
                  label: dict.paths.jPython,
                  onClick: () => courseCta(py.id),
                },
                {
                  state: (webDone ? "done" : webStat.done > 0 ? "current" : "upcoming") as StepState,
                  label: dict.paths.jHtml,
                  onClick: () => courseCta(web.id),
                },
                {
                  state: (allLicensed ? "done" : pyDone && webDone ? "current" : "upcoming") as StepState,
                  label: dict.paths.jExam,
                  onClick: () => navigate({ name: "academy", course: targetCourseId }),
                },
                {
                  // an open destination, not a graded milestone — never faked as "done"
                  state: (allLicensed ? "current" : "upcoming") as StepState,
                  label: dict.paths.jBuild,
                  onClick: () => navigate(data.user ? { name: "home" } : { name: "explore" }),
                },
              ].map((step, i) => (
                <ModuleChip
                  key={step.label}
                  index={i}
                  state={step.state}
                  title={step.label}
                  stateLabel={step.state === "done" && i === 2 ? dict.paths.licensed : step.state === "done" ? dict.paths.stepDone : step.state === "current" ? dict.paths.stepCurrent : dict.paths.stepUpcoming}
                  onClick={step.onClick}
                />
              ))}
              <p className="flex items-start gap-2 px-1 pt-1 text-[11px] leading-5 text-muted-foreground/75">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                {dict.paths.jExamDesc} {dict.paths.jBuildDesc}
              </p>
            </div>
          </PathCard>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
