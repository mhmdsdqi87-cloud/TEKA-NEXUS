import { db } from "@/lib/db";
import { requireUser } from "@/lib/server";
import { handle, ok } from "@/lib/server";

// GET /api/me/saved — projects the user saved (public + unlisted only for display).
export async function GET() {
  return handle(async () => {
    const user = await requireUser();
    const saves = await db.projectSave.findMany({
      where: { userId: user.id },
      include: {
        project: {
          include: {
            owner: { select: { id: true, username: true, displayName: true, avatarColor: true, avatarUrl: true, bio: true, reputation: true } },
            tags: { select: { tag: true } },
            _count: { select: { members: true, likes: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const projects = saves
      .filter((s) => s.project.visibility !== "PRIVATE")
      .map((s) => ({
        id: s.project.id,
        slug: s.project.slug,
        name: s.project.name,
        tagline: s.project.tagline,
        category: s.project.category,
        status: s.project.status,
        visibility: s.project.visibility,
        coverImage: s.project.coverImage,
        tags: s.project.tags.map((t) => t.tag),
        requiredSkills: [] as string[],
        owner: s.project.owner,
        likeCount: s.project._count.likes,
        memberCount: s.project._count.members,
        createdAt: s.project.createdAt,
        updatedAt: s.project.updatedAt,
      }));
    return ok({ projects });
  });
}
