"use client";

// TEKA NEXUS — LIVE UNIVERSE workspace (NEXUS 2.0 Phase 1).
//
// DATA HONESTY CONTRACT:
// - Every number, node, and event below comes from /api/universe (real DB
//   aggregates). Nothing is invented, sampled, or decorated.
// - Countries appear ONLY when users self-declared them (Settings → Profile).
// - Updates arrive via 45s polling while the tab is visible (Vercel
//   serverless has no persistent socket layer — polling is the honest
//   production mechanism).
// - No WebGL → graceful 2D fallback with the same real data.

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApp } from "@/lib/store";
import { useT, useRelativeTime } from "@/lib/i18n";
import { get, ApiError } from "@/lib/api";
import { COUNTRIES } from "@/lib/countries";
import { AVATAR_GRADIENTS } from "@/lib/constants";
import type { UniverseResponse } from "@/lib/dto";
import {
  Activity, Users, FolderKanban, ListChecks, Flag, RefreshCw,
  GitPullRequest, FileText, Sparkles, GraduationCap, Trophy, Globe2,
  X, Dna, ExternalLink, WifiOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const NexusGlobe = dynamic(() => import("./nexus-globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="mx-auto h-14 w-14 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        <p className="text-xs text-muted-foreground">…</p>
      </div>
    </div>
  ),
});

const POLL_MS = 45_000;

const EVENT_ICONS: Record<string, LucideIcon> = {
  PROJECT_CREATED: FolderKanban,
  TASK_COMPLETED: ListChecks,
  UPDATE_POSTED: FileText,
  MILESTONE_COMPLETED: Flag,
  RELEASE_PUBLISHED: Sparkles,
  COLLABORATION_ACCEPTED: GitPullRequest,
  ACADEMY_LESSON: GraduationCap,
  ACADEMY_COURSE: GraduationCap,
  COMMENT_POSTED: Activity,
  LIKE_GIVEN: Activity,
  CHAT_MESSAGE: Activity,
  CHALLENGE_COMPLETED: Trophy,
};

function avatarClass(color: string): string {
  return AVATAR_GRADIENTS[color] ?? "from-amber-300 to-yellow-600";
}

function StatCard({ icon: Icon, label, value, loading }: { icon: LucideIcon; label: string; value: number; loading: boolean }) {
  return (
    <div className="rounded-xl border border-amber-500/15 bg-black/40 px-3 py-3 flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-amber-300" aria-hidden />
      </div>
      <div className="min-w-0">
        {loading ? (
          <Skeleton className="h-5 w-12 bg-amber-500/10" />
        ) : (
          <div className="text-lg font-bold text-amber-100 tabular-nums leading-none">{value.toLocaleString()}</div>
        )}
        <div className="text-[11px] text-muted-foreground truncate mt-1">{label}</div>
      </div>
    </div>
  );
}

export function UniverseView() {
  const t = useT();
  const relTime = useRelativeTime();
  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const router = useRouter();

  const [data, setData] = useState<UniverseResponse["universe"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await get<UniverseResponse>("/api/universe");
      setData(res.universe);
      setError(null);
    } catch (e) {
      if (!(silent && data)) setError(e instanceof ApiError ? e.message : "network");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setWebglOk(() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    });
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(() => {
      if (document.visibilityState === "visible") load(true);
    }, POLL_MS);
    const onVis = () => {
      if (document.visibilityState === "visible") load(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [load]);

  const markers = useMemo(() => {
    if (!data) return [];
    return data.countries
      .filter((c) => COUNTRIES[c.code])
      .map((c) => {
        const weight = c.users * 3 + c.projects * 4 + c.activity30d;
        const info = COUNTRIES[c.code];
        return {
          code: c.code,
          lat: info.lat,
          lon: info.lon,
          size: Math.min(0.085, Math.max(0.03, 0.03 + Math.log10(1 + weight) * 0.02)),
          selected: selectedCountry === c.code,
        };
      });
  }, [data, selectedCountry]);

  const filteredProjects = useMemo(() => {
    if (!data) return [];
    return data.projects.filter((p) => {
      if (selectedCountry && p.owner.country !== selectedCountry) return false;
      if (techFilter && !p.tags.some((tg) => tg.toLowerCase() === techFilter.toLowerCase())) return false;
      return true;
    });
  }, [data, selectedCountry, techFilter]);

  const selectedCountryData = data?.countries.find((c) => c.code === selectedCountry) ?? null;
  const maxCountryUsers = useMemo(
    () => Math.max(1, ...(data?.countries.map((c) => c.users) ?? [1])),
    [data],
  );

  const onSelectCountry = useCallback((code: string) => {
    setSelectedCountry((cur) => (cur === code ? null : code));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6" aria-label={t("universe.aria")}>
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center">
                <Globe2 className="h-6 w-6 text-amber-300" aria-hidden />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-amber-50">{t("universe.title")}</h1>
                <p className="text-sm text-muted-foreground max-w-xl">{t("universe.subtitle")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="border-amber-400/30 text-amber-300 bg-amber-400/5 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden />
              {t("universe.realDataBadge")}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => load()} className="text-muted-foreground gap-1.5" aria-label={t("universe.refreshAria")}>
              <RefreshCw className="h-3.5 w-3.5" aria-hidden />
              {data ? relTime(data.stats.generatedAt) : ""}
            </Button>
          </div>
        </header>

        {error && (
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4 flex items-center gap-3 text-sm text-red-200">
              <WifiOff className="h-4 w-4 shrink-0" aria-hidden />
              {t("universe.error")}
              <Button size="sm" variant="outline" onClick={() => load()}>{t("universe.retry")}</Button>
            </CardContent>
          </Card>
        )}

        {/* ── Real platform stats ────────────────────────────── */}
        <section aria-label={t("universe.statsAria")} className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          <StatCard icon={Users} label={t("universe.statUsers")} value={data?.stats.users ?? 0} loading={loading} />
          <StatCard icon={Globe2} label={t("universe.statCountries")} value={data?.stats.declaredCountries ?? 0} loading={loading} />
          <StatCard icon={FolderKanban} label={t("universe.statProjects")} value={data?.stats.publicProjects ?? 0} loading={loading} />
          <StatCard icon={ListChecks} label={t("universe.statTasks")} value={data?.stats.tasksDone ?? 0} loading={loading} />
          <StatCard icon={Flag} label={t("universe.statMilestones")} value={data?.stats.milestonesCompleted ?? 0} loading={loading} />
          <StatCard icon={GitPullRequest} label={t("universe.statRequests")} value={data?.stats.requestsAccepted ?? 0} loading={loading} />
        </section>

        {/* ── Main: globe + side panel ───────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3 border-amber-500/15 bg-black/60 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-100/90 flex items-center justify-between">
                {t("universe.globeTitle")}
                <span className="text-[11px] font-normal text-muted-foreground">{t("universe.globeHint")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[380px] sm:h-[440px] rounded-xl bg-[#050505] border border-amber-500/10 overflow-hidden">
                {webglOk === false ? (
                  <div className="w-full h-full flex flex-col p-4 gap-2 overflow-y-auto" role="img" aria-label={t("universe.fallbackAria")}>
                    <p className="text-xs text-muted-foreground mb-1">{t("universe.fallbackNote")}</p>
                    {(data?.countries ?? []).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => onSelectCountry(c.code)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-amber-400/5 focus-visible:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60"
                      >
                        <span className="text-xs font-mono text-amber-300 w-8">{c.code}</span>
                        <span className="text-sm text-amber-50/90 w-36 truncate">{COUNTRIES[c.code]?.name}</span>
                        <div className="flex-1 h-2 rounded-full bg-amber-400/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300"
                            style={{ width: `${Math.min(100, Math.round((c.users / maxCountryUsers) * 100))}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums w-14 text-right">
                          {c.users} {t("universe.membersShort")}
                        </span>
                      </button>
                    ))}
                    {data && data.countries.length === 0 && (
                      <p className="text-sm text-muted-foreground">{t("universe.emptyCountries")}</p>
                    )}
                  </div>
                ) : (
                  <NexusGlobe markers={markers} selectedCode={selectedCountry} onSelect={onSelectCountry} />
                )}
              </div>
              {/* legend */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400 inline-block" aria-hidden />{t("universe.legendCountry")}</span>
                <span>{t("universe.legendSize")}</span>
                <span>{t("universe.legendSelfReported")}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-amber-500/15 bg-black/60 flex flex-col">
            <CardContent className="pt-6 flex-1 min-h-0">
              <Tabs defaultValue="activity" className="h-full flex flex-col gap-3">
                <TabsList className="bg-black/60 border border-amber-500/15 w-full grid grid-cols-3">
                  <TabsTrigger value="activity" className="data-[state=active]:text-amber-300">{t("universe.tabActivity")}</TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:text-amber-300">{t("universe.tabProjects")}</TabsTrigger>
                  <TabsTrigger value="countries" className="data-[state=active]:text-amber-300">{t("universe.tabCountries")}</TabsTrigger>
                </TabsList>

                {/* Activity */}
                <TabsContent value="activity" className="min-h-0 flex-1">
                  <ScrollArea className="h-[380px] pr-2">
                    {loading && !data ? (
                      <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 bg-amber-500/5" />)}</div>
                    ) : (data?.activity.length ?? 0) === 0 ? (
                      <p className="text-sm text-muted-foreground py-6 text-center">{t("universe.emptyActivity")}</p>
                    ) : (
                      <ul className="space-y-2">
                        {data?.activity.map((ev) => {
                          const Icon = EVENT_ICONS[ev.eventType] ?? Activity;
                          return (
                            <li key={ev.id} className="flex items-start gap-3 rounded-lg border border-amber-500/10 bg-black/40 p-2.5">
                              <Avatar className="h-8 w-8 border border-amber-500/20">
                                <AvatarFallback className={`${avatarClass(ev.actor.avatarColor)} text-black text-[11px] font-bold`}>
                                  {ev.actor.displayName.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 text-xs text-amber-50/90">
                                  <Icon className="h-3 w-3 text-amber-300 shrink-0" aria-hidden />
                                  <button className="font-semibold hover:underline text-amber-100" onClick={() => navigate({ name: "profile", username: ev.actor.username })}>
                                    {ev.actor.displayName}
                                  </button>
                                  <span className="text-muted-foreground truncate">{t(`universe.events.${ev.eventType}`)}</span>
                                </div>
                                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                                  {ev.project && (
                                    <button className="hover:text-amber-300 truncate max-w-[140px]" onClick={() => navigate({ name: "project", slug: ev.project!.slug })}>
                                      {ev.project.name}
                                    </button>
                                  )}
                                  <span>{relTime(ev.createdAt)}</span>
                                  {ev.xp > 0 && <Badge variant="outline" className="h-4 px-1 text-[9px] border-amber-400/30 text-amber-300">+{ev.xp} XP</Badge>}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </ScrollArea>
                </TabsContent>

                {/* Projects */}
                <TabsContent value="projects" className="min-h-0 flex-1">
                  <ScrollArea className="h-[380px] pr-2">
                    {loading && !data ? (
                      <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 bg-amber-500/5" />)}</div>
                    ) : filteredProjects.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-6 text-center">
                        {selectedCountry || techFilter ? t("universe.emptyFilteredProjects") : t("universe.emptyProjects")}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {filteredProjects.map((p) => (
                          <li key={p.slug} className="rounded-lg border border-amber-500/10 bg-black/40 p-3 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <button className="font-semibold text-sm text-amber-100 hover:underline text-left" onClick={() => navigate({ name: "dna", slug: p.slug })}>
                                  {p.name}
                                </button>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.tagline}</p>
                              </div>
                              <Badge variant="outline" className="text-[9px] shrink-0 border-amber-500/20 text-amber-200/80">
                                {t(`project.categories.${p.category}`)}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                              <span className="truncate">
                                {t("universe.by")}{" "}
                                <button className="text-amber-200/80 hover:underline" onClick={() => navigate({ name: "profile", username: p.owner.username })}>
                                  @{p.owner.username}
                                </button>
                                {p.owner.country && COUNTRIES[p.owner.country] ? ` · ${COUNTRIES[p.owner.country].name}` : ""}
                              </span>
                              <span className="shrink-0 flex items-center gap-2">
                                <span>{p.members} {t("universe.membersShort")}</span>
                                <button
                                  className="inline-flex items-center gap-1 text-amber-300 hover:underline"
                                  onClick={() => navigate({ name: "dna", slug: p.slug })}
                                  aria-label={t("universe.openDnaAria", { name: p.name })}
                                >
                                  <Dna className="h-3 w-3" aria-hidden /> {t("universe.dnaShort")}
                                </button>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ScrollArea>
                </TabsContent>

                {/* Countries */}
                <TabsContent value="countries" className="min-h-0 flex-1">
                  <ScrollArea className="h-[380px] pr-2">
                    {loading && !data ? (
                      <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9 bg-amber-500/5" />)}</div>
                    ) : (data?.countries.length ?? 0) === 0 ? (
                      <div className="py-6 px-3 text-center space-y-3">
                        <p className="text-sm text-muted-foreground">{t("universe.emptyCountries")}</p>
                        {user && !user.country && (
                          <Button size="sm" variant="outline" className="border-amber-400/40 text-amber-300" onClick={() => navigate({ name: "settings", tab: "profile" })}>
                            {t("universe.setCountryCta")}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {data?.countries.map((c) => {
                          const info = COUNTRIES[c.code];
                          const active = selectedCountry === c.code;
                          return (
                            <li key={c.code}>
                              <button
                                onClick={() => onSelectCountry(c.code)}
                                aria-pressed={active}
                                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60 ${
                                  active ? "border-amber-400/50 bg-amber-400/10" : "border-transparent hover:bg-amber-400/5"
                                }`}
                              >
                                <span className="font-mono text-[11px] text-amber-300 w-8">{c.code}</span>
                                <span className="text-sm text-amber-50/90 flex-1 truncate">{info?.name ?? c.code}</span>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                  {c.users} · {c.projects} · {c.activity30d}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* ── Technology filters ─────────────────────────────── */}
        {(data?.technologies.length ?? 0) > 0 && (
          <section aria-label={t("universe.techAria")} className="space-y-2">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("universe.techTitle")}</h2>
            <div className="flex flex-wrap gap-2">
              {data?.technologies.slice(0, 16).map((tech) => (
                <button
                  key={tech.tag}
                  onClick={() => setTechFilter((cur) => (cur === tech.tag ? null : tech.tag))}
                  aria-pressed={techFilter === tech.tag}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/60 ${
                    techFilter === tech.tag
                      ? "border-amber-400/60 bg-amber-400/15 text-amber-200"
                      : "border-amber-500/15 bg-black/40 text-amber-100/70 hover:border-amber-400/30 hover:text-amber-200"
                  }`}
                >
                  {tech.tag} <span className="text-[10px] text-muted-foreground">{tech.projects}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── Selected country panel ─────────────────────────── */}
        {selectedCountryData && (
          <Card className="border-amber-400/40 bg-amber-400/5" data-testid="country-panel">
            <CardContent className="p-4 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-amber-300" aria-hidden />
                  <h2 className="font-semibold text-amber-50">{COUNTRIES[selectedCountryData.code]?.name ?? selectedCountryData.code}</h2>
                  <Badge variant="outline" className="border-amber-400/30 text-amber-300 text-[10px]">{selectedCountryData.code}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("universe.countryStats", {
                    users: selectedCountryData.users,
                    projects: selectedCountryData.projects,
                    activity: selectedCountryData.activity30d,
                  })}
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setSelectedCountry(null)} className="text-amber-200 gap-1">
                <X className="h-3.5 w-3.5" aria-hidden /> {t("universe.clearFilter")}
              </Button>
            </CardContent>
          </Card>
        )}

        <footer className="pt-2 pb-6 text-center text-[11px] text-muted-foreground/70">
          <p>
            {t("universe.dataSourceNote")}{" "}
            {data && relTime(data.stats.generatedAt)}
            {user && !user.country && (
              <>
                {" · "}
                <button className="underline hover:text-amber-300 inline-flex items-center gap-1" onClick={() => navigate({ name: "settings", tab: "profile" })}>
                  <ExternalLink className="h-3 w-3" aria-hidden />
                  {t("universe.setCountryCta")}
                </button>
              </>
            )}
          </p>
        </footer>
      </main>
    </div>
  );
}
