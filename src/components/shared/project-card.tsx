"use client";

// TEKA NEXUS — ProjectCard + skeletons shared by feed / explore / profile / search.

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProjectCard as ProjectCardDTO } from "@/lib/dto";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { StatusPill, ProjectCover, UserAvatar } from "@/components/shared/atoms";
import { EASE, HoverLift } from "@/components/shared/motion";
import { useApp } from "@/lib/store";
import { useT, useRelativeTime, useLabeled } from "@/lib/i18n";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";
import { Heart, Users, Clock3 } from "lucide-react";

export function ProjectCardView({
  project,
  compact = false,
}: {
  project: ProjectCardDTO;
  compact?: boolean;
}) {
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const rel = useRelativeTime();
  const lbl = useLabeled();
  const cat = PROJECT_CATEGORIES.find((c) => c.slug === project.category);

  return (
    <HoverLift className="h-full w-full">
      <button
        onClick={() => navigate({ name: "project", slug: project.slug })}
        className={cn(
          "glass-card rounded-xl text-left group overflow-hidden focus-glow cursor-pointer w-full h-full",
          compact ? "p-3" : "p-0"
        )}
        aria-label={t("profile.shared.openProjectAria", { name: project.name })}
      >
        {!compact && (
          <div className="h-32 overflow-hidden border-b border-white/[0.06]">
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.05]">
              <ProjectCover cover={project.coverImage} name={project.name} seed={project.slug.length} />
            </div>
          </div>
        )}
        <div className={cn("flex flex-col gap-2.5", compact ? "" : "p-4")}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold leading-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
              {project.name}
            </h3>
            <StatusPill status={project.status} className="shrink-0" />
          </div>
          <p className={cn("text-sm text-muted-foreground", compact ? "line-clamp-1" : "line-clamp-2")}>
            {project.tagline}
          </p>
          {!compact && (project.tags?.length > 0 || project.requiredSkills?.length > 0) && (
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.04 }}
            >
              {project.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-muted-foreground">
                  #{t}
                </span>
              ))}
              {project.requiredSkills.slice(0, 2).map((s) => (
                <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300">
                  {s}
                </span>
              ))}
            </motion.div>
          )}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: 0.08 }}
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-white/[0.05] mt-1">
              <span className="flex items-center gap-1.5 min-w-0">
                <UserAvatar user={project.owner} size={20} />
                <span className="truncate max-w-[110px]">{project.owner.displayName}</span>
              </span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="flex items-center gap-1" title={t("profile.shared.likes")}>
                  <Heart className="h-3 w-3" /> {project.likeCount}
                </span>
                <span className="flex items-center gap-1" title={t("profile.shared.teamSize")}>
                  <Users className="h-3 w-3" /> {project.memberCount}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70 mt-2.5">
              <Clock3 className="h-3 w-3" />
              {t("profile.shared.updated", { time: rel(new Date(project.updatedAt)) })}
              {cat && <span className="ml-auto font-mono uppercase tracking-wide opacity-70">{lbl("project.categories", cat.slug, cat.name)}</span>}
            </div>
          </motion.div>
        </div>
      </button>
    </HoverLift>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-card rounded-xl overflow-hidden p-0">
      <ShadSkeleton className="h-32 w-full rounded-none bg-white/[0.06]" />
      <div className="p-4 flex flex-col gap-2.5">
        <ShadSkeleton className="h-5 w-2/3 bg-white/[0.06]" />
        <ShadSkeleton className="h-4 w-full bg-white/[0.04]" />
        <ShadSkeleton className="h-4 w-1/2 bg-white/[0.04]" />
        <div className="flex justify-between pt-2">
          <ShadSkeleton className="h-6 w-24 rounded-full bg-white/[0.05]" />
          <ShadSkeleton className="h-6 w-16 bg-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
          <ShadSkeleton className="h-10 w-10 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2">
            <ShadSkeleton className="h-4 w-1/3 bg-white/[0.06]" />
            <ShadSkeleton className="h-3 w-3/4 bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}
