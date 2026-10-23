// TEKA NEXUS — GET /api/workspace/hub  (Task 15)
// One call that powers the dedicated Workspace Hub section: every project the
// user owns or belongs to (via ProjectMember — covers teams), aggregated file
// counts, revision totals and the most recently touched files across all
// workspaces. Read-only; permissions are the viewer's own memberships.

import { db } from "@/lib/db";
import { ok, handle, requireUser } from "@/lib/server";

export const dynamic = "force-dynamic";

const ownerFields = {
  id: true,
  username: true,
  displayName: true,
  avatarColor: true,
  avatarUrl: true,
} as const;

type FileAgg = { projectId: string; _count: { _all: number }; _max: { updatedAt: Date | null } };

export async function GET() {
  return handle(async () => {
    const user = await requireUser();

    const memberships = await db.projectMember.findMany({
      where: { userId: user.id },
      include: {
        project: {
          select: {
            id: true,
            slug: true,
            name: true,
            tagline: true,
            coverImage: true,
            bgImage: true,
            visibility: true,
            updatedAt: true,
            owner: { select: ownerFields },
            _count: { select: { members: true, likes: true } },
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    });

    const projectIds = memberships.map((m) => m.project.id);
    const hasProjects = projectIds.length > 0;

    const [fileAgg, recentFiles, revisionCount] = await Promise.all([
      hasProjects
        ? db.workspaceFile.groupBy({
            by: ["projectId"],
            where: { projectId: { in: projectIds }, isFolder: false },
            _count: { _all: true },
            _max: { updatedAt: true },
          })
        : Promise.resolve([] as FileAgg[]),
      hasProjects
        ? db.workspaceFile.findMany({
            where: { projectId: { in: projectIds }, isFolder: false },
            orderBy: { updatedAt: "desc" },
            take: 8,
            select: {
              id: true,
              name: true,
              folder: true,
              language: true,
              size: true,
              updatedAt: true,
              project: { select: { slug: true, name: true } },
            },
          })
        : Promise.resolve([]),
      hasProjects
        ? db.fileRevision.count({ where: { file: { projectId: { in: projectIds } } } })
        : Promise.resolve(0),
    ]);

    const byProject = new Map(fileAgg.map((r) => [r.projectId, r]));

    const projects = memberships.map((m) => {
      const agg = byProject.get(m.project.id);
      return {
        slug: m.project.slug,
        name: m.project.name,
        tagline: m.project.tagline,
        coverImage: m.project.coverImage,
        bgImage: m.project.bgImage,
        visibility: m.project.visibility,
        role: m.role,
        owner: m.project.owner,
        memberCount: m.project._count.members,
        fileCount: agg?._count._all ?? 0,
        lastFileAt: agg?._max.updatedAt ? agg._max.updatedAt.toISOString() : null,
      };
    });

    return ok({
      projects,
      recentFiles: recentFiles.map((f) => ({
        id: f.id,
        name: f.name,
        folder: f.folder,
        language: f.language,
        size: f.size,
        updatedAt: f.updatedAt.toISOString(),
        projectSlug: f.project.slug,
        projectName: f.project.name,
      })),
      stats: {
        projects: projects.length,
        files: projects.reduce((acc, p) => acc + p.fileCount, 0),
        revisions: revisionCount,
      },
    });
  });
}
