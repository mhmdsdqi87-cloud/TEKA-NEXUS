"use client";

// TEKA NEXUS — Saved projects view.

import { useEffect, useState, useCallback } from "react";
import { useApp } from "@/lib/store";
import { get } from "@/lib/api";
import { ProjectCard } from "@/lib/dto";
import { useT } from "@/lib/i18n";
import { ProjectCardView, ProjectCardSkeleton } from "@/components/shared/project-card";
import { EmptyState } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import { Bookmark, Compass, AlertTriangle } from "lucide-react";

export function SavedView() {
  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const t = useT();
  const [projects, setProjects] = useState<ProjectCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await get<{ projects: ProjectCard[] }>("/api/me/saved");
      setError(null);
      setProjects(res.projects);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("saved.loadError"));
      setProjects([]);
    }
  }, [t]);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    (async () => {
      try {
        const res = await get<{ projects: ProjectCard[] }>("/api/me/saved");
        if (mounted) {
          setError(null);
          setProjects(res.projects);
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : t("saved.loadError"));
          setProjects([]);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user, t]);

  const list = user ? projects : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold">{t("saved.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("saved.subtitle")}</p>
      </div>

      {!user ? (
        <EmptyState
          icon={Bookmark}
          title={t("saved.signInTitle")}
          description={t("saved.signInDescription")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("common.signIn")}
            </Button>
          }
        />
      ) : error ? (
        <EmptyState
          icon={AlertTriangle}
          title={t("saved.errorTitle")}
          description={error}
          action={
            <Button variant="outline" onClick={load}>
              {t("common.retry")}
            </Button>
          }
        />
      ) : list === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : list.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title={t("saved.emptyTitle")}
          description={t("saved.emptyDescription")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "explore" })}>
              <Compass className="h-4 w-4 mr-2" />
              {t("saved.exploreCta")}
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <ProjectCardView key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
