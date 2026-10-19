# Task 1-b — backend-group-b — Work Record

## Scope
Group B REST API: projects/workspace/feed endpoints (17 route files). Did NOT touch group-A routes, lib files, schema, pages, or tests.

## Files created (all under /home/z/my-project)
- src/app/api/projects/route.ts — GET discovery (PUBLIC+UNLISTED, q/category/status/tag/sort/page, pageSize=LIMITS.pageSize=12) + POST create (tx: project + OWNER member + tags createMany + requiredSkills createMany; PROJECT_CREATED activity + award; unique slug)
- src/app/api/projects/[slug]/route.ts — GET detail (myRole/liked/saved/likeCount/myRequest; PRIVATE+non-member=404), PATCH (owner/admin; replaces tags/skills in tx; status->RELEASED logs RELEASE_PUBLISHED + awards owner), DELETE (owner only; archive: status ARCHIVED + archivedAt)
- src/app/api/projects/[slug]/like/route.ts — POST toggle ProjectLike -> {liked, likeCount}
- src/app/api/projects/[slug]/save/route.ts — POST toggle ProjectSave -> {saved}
- src/app/api/projects/[slug]/tasks/route.ts — GET list (position asc; status/assigneeId filters) + POST (canContribute; assignee must be member else 400; position=max+1000; TASK_ASSIGNED notify)
- src/app/api/tasks/[id]/route.ts — PATCH (canContribute; DONE transition sets completedAt + awards effective assignee + logs TASK_COMPLETED; leaving DONE clears completedAt) + DELETE
- src/app/api/tasks/[id]/comments/route.ts — GET (project read access) + POST (canContribute, body 1-1000)
- src/app/api/projects/[slug]/milestones/route.ts — GET asc + POST (canContribute)
- src/app/api/milestones/[id]/route.ts — PATCH {completed} (sets/clears completedAt; on complete logs MILESTONE_COMPLETED + awards actor) + DELETE
- src/app/api/projects/[slug]/updates/route.ts — GET desc + POST (logs UPDATE_POSTED + awards author)
- src/app/api/projects/[slug]/members/route.ts — GET (OWNER first then joinedAt asc; canManage flag)
- src/app/api/members/[id]/route.ts — PATCH role (OWNER only; role=OWNER performs tx ownership transfer: target OWNER, caller ADMIN, Project.ownerId updated; last-owner demotion guarded 400) + DELETE (self-leave or owner removes; last owner protected 400 "Transfer ownership before leaving.")
- src/app/api/projects/[slug]/requests/route.ts — GET (owner/admin) + POST (authed non-member; P2002 -> 409; COLLAB_REQUEST notify to owner)
- src/app/api/requests/[id]/route.ts — PATCH accept/reject (owner/admin, PENDING only; accept is tx: ACCEPTED + membership upsert; COLLABORATION_ACCEPTED award + MEMBER_JOINED activity + owner notification + REQUEST_ACCEPTED to applicant; reject -> REQUEST_REJECTED) + DELETE withdraw (applicant, PENDING only)
- src/app/api/projects/[slug]/comments/route.ts — GET nested tree (deleted rows: body "[deleted]", author null) + POST (parentId must be top-level same-project; PROJECT_COMMENT notify to owner)
- src/app/api/comments/[id]/route.ts — DELETE soft-delete (author or project owner/admin; deletedAt + body "[deleted]")
- src/app/api/feed/route.ts — GET ?page (PUBLIC projects only, 15/page, actor + slim project, metadata JSON parsed)

## Key decisions / deviations
- Discovery includes UNLISTED per API_CONTRACT.md ("Only PUBLIC + UNLISTED appear in discovery"); feed is PUBLIC-only per task spec.
- PATCH [slug] does not regenerate slug on rename (keeps links stable).
- Ownership transfer additionally updates Project.ownerId for consistency of owner-targeted awards/relations.
- TASK_COMPLETED award targets the effective assignee (new assignee if changed in same PATCH).
- Membership in accept uses upsert (skip if exists) inside the transaction, per contract.
- All writes that must be atomic use db.$transaction; reputation awards stay idempotent via ContributionEvent unique constraint.

## Verification
- bunx tsc --noEmit: no errors under src/ (pre-existing errors only in examples/ and skills/ scaffolding, outside project scope).
- bun run lint: 0 errors (one pre-existing warning in src/components/shared/atoms.tsx, not this task's file).
- Full runtime smoke test with 3 users covering every endpoint, guards (401/403/404/409/422), awards and notifications; no 500s in dev.log.
