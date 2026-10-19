"use client";

// TEKA NEXUS ACADEMY — CERTIFICATES section.
// Real certificates + official TEKA licenses straight from /api/academy.
// Empty state explains the earning path (lessons → secure exam → license).
// Viewing reuses the shared CertificateDialog (with Download PNG) from the
// academy components — no duplicated canvas code.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, BookOpenCheck, GraduationCap, ScrollText, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { EASE, FadeIn, Stagger, StaggerItem, TapScale } from "@/components/shared/motion";
import { COURSES, pick } from "@/lib/academy";
import { EmptyState } from "@/components/shared/atoms";
import { CertificateDialog, type CertInfo } from "@/components/academy/certificate";
import { useT } from "@/lib/i18n";

import type { PortalDict } from "./portal-dict";
import { useLocale, type PortalDataFull } from "./portal-data";

export function CertificatesSection({ data, dict }: { data: PortalDataFull; dict: PortalDict }) {
  const locale = useLocale();
  const navigate = useApp((s) => s.navigate);
  const t = useT(); // global dict — the certificate dialog renders academy.* labels
  const [dialog, setDialog] = useState<CertInfo | null>(null);

  const rows = useMemo(
    () =>
      data.certs.map((c) => {
        const course = COURSES.find((x) => x.id === c.courseId);
        const licensed = data.exams.some((e) => e.courseId === c.courseId && e.passed);
        return { cert: c, course, licensed };
      }),
    [data.certs, data.exams],
  );

  if (!data.loaded) {
    return (
      <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.02]" />
        ))}
      </div>
    );
  }

  if (data.failed) {
    return (
      <EmptyState
        icon={ScrollText}
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

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="max-w-2xl">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{dict.certs.title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{dict.certs.subtitle}</p>
        </div>
      </FadeIn>

      {rows.length === 0 ? (
        <FadeIn delay={0.05}>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-2">
            <EmptyState
              icon={GraduationCap}
              title={dict.certs.emptyTitle}
              description={dict.certs.emptyBody}
              className="py-10"
            />
            {/* how to earn them — the honest 3-step path */}
            <ol className="mx-auto grid max-w-2xl gap-3 px-4 pb-8 sm:grid-cols-3">
              {[
                { icon: BookOpenCheck, label: dict.certs.s1 },
                { icon: ShieldCheck, label: dict.certs.s2 },
                { icon: Award, label: dict.certs.s3 },
              ].map(({ icon: Icon, label }, i) => (
                <li key={label} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-500/15 font-mono text-xs font-bold text-cyan-300" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="text-[13px] leading-5 text-slate-300">
                    <Icon className="mb-1 block h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {label}
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex justify-center pb-8">
              <TapScale>
                <button
                  onClick={() => navigate({ name: "academy" })}
                  className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
                >
                  <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                  {dict.certs.cta}
                </button>
              </TapScale>
            </div>
          </div>
        </FadeIn>
      ) : (
        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
          {rows.map(({ cert, course, licensed }) => (
            <StaggerItem key={cert.code} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-5",
                  licensed ? "border-emerald-400/25 bg-emerald-500/[0.05]" : "border-amber-400/20 bg-amber-500/[0.04]",
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-3xl",
                    licensed ? "bg-emerald-400" : "bg-amber-400",
                  )}
                />
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl" aria-hidden="true">{course?.emoji ?? "🏆"}</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ring-1 ring-inset",
                      licensed
                        ? "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30"
                        : "bg-amber-500/15 text-amber-300 ring-amber-400/30",
                    )}
                  >
                    {licensed ? <ShieldCheck className="h-3 w-3" aria-hidden="true" /> : <Award className="h-3 w-3" aria-hidden="true" />}
                    {licensed ? dict.certs.licenseBadge : dict.certs.completionBadge}
                  </span>
                </div>
                <p className="mt-3 font-display text-base font-bold text-white">
                  {course ? pick(course.title, locale) : cert.courseId}
                </p>
                <p className="mt-1 font-mono text-[11px] text-white/40">{cert.code}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(cert.createdAt).toLocaleDateString(locale)}
                  </span>
                  <TapScale>
                    <button
                      onClick={() =>
                        setDialog({
                          courseTitle: course ? pick(course.title, "en") : cert.courseId,
                          recipient: data.user?.displayName ?? "TEKA Learner",
                          code: cert.code,
                          issuedAt: new Date(cert.createdAt).toLocaleDateString(),
                          emoji: course?.emoji ?? "🏆",
                          variant: licensed ? "license" : "completion",
                        })
                      }
                      className={cn(
                        "inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-4 text-xs font-semibold transition focus-glow",
                        licensed
                          ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                          : "border-amber-400/25 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20",
                      )}
                    >
                      {dict.certs.view}
                    </button>
                  </TapScale>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <CertificateDialog cert={dialog} open={!!dialog} onClose={() => setDialog(null)} t={t} />
    </div>
  );
}
