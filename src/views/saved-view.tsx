"use client";

// TEKA NEXUS — Saved projects view.

import { useEffect, useState, useCallback } from "react";
import { useApp } from "@/lib/store";
import { get } from "@/lib/api";
import { ProjectCard } from "@/lib/dto";
import { ProjectCardView, ProjectCardSkeleton } from "@/components/shared/project-card";
import { EmptyState } from "@/components/shared/atoms";
import { Button } from "@/components/ui/button";
import { Bookmark, Compass, AlertTriangle } from "lucide-react";

export function SavedView() {
  const navigate = useApp((s) => s.navigate);
  const user = useApp((s) => s.user);
  const [projects, setProjects] = useState<ProjectCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await get<{ projects: ProjectCard[] }>("/api/me/saved");
      setError(null);
      setProjects(res.projects);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load saved projects");
      setProjects([]);
    }
  }, []);

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
          setError(e instanceof Error ? e.message : "Failed to load saved projects");
          setProjects([]);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const list = user ? projects : [];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Saved projects</h1>
        <p className="text-sm text-muted-foreground mt-1">Your personal build-later list.</p>
      </div>

      {!user ? (
        <EmptyState
          icon={Bookmark}
          title="Sign in to save projects"
          description="Keep track of the projects you want to follow, join, or study."
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              Sign in
            </Button>
          }
        />
      ) : error ? (
        <EmptyState
          icon={AlertTriangle}
          title="Something went wrong"
          description={error}
          action={
            <Button variant="outline" onClick={load}>
              Try again
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
          title="Nothing saved yet"
          description="Tap the bookmark icon on any project to keep it here for later."
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "explore" })}>
              <Compass className="h-4 w-4 mr-2" />
              Explore projects
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
