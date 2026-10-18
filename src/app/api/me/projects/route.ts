import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server";
import { handle, ok, parseBody, fail } from "@/lib/server";

// GET /api/me/projects — projects the user owns or is a member of (any visibility).
export async function GET() {
  return handle(async () => {
    const user = await requireUser();
    const memberships = await db.projectMember.findMany({
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
      orderBy: { joinedAt: "desc" },
    });

    const projects = memberships.map((m) => ({
      role: m.role,
      joinedAt: m.joinedAt,
      project: {
        id: m.project.id,
        slug: m.project.slug,
        name: m.project.name,
        tagline: m.project.tagline,
        category: m.project.category,
        status: m.project.status,
        visibility: m.project.visibility,
        coverImage: m.project.coverImage,
        tags: m.project.tags.map((t) => t.tag),
        requiredSkills: [] as string[],
        owner: m.project.owner,
        likeCount: m.project._count.likes,
        memberCount: m.project._count.members,
        createdAt: m.project.createdAt,
        updatedAt: m.project.updatedAt,
      },
    }));
    return ok({ projects });
  });
}

const noopSchema = z.object({});
export async function POST(req: NextRequest) {
  return handle(async () => {
    await parseBody(req, noopSchema);
    return fail("Use POST /api/projects to create a project.", 405);
  });
}
