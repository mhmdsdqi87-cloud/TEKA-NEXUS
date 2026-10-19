# TEKA NEXUS — API Contract (v1)

All routes under `/api`. JSON in/out. Auth via httpOnly cookie `teka_session`.
Errors: `{ "error": "readable message" }` with proper status (400/401/403/404/422/500).

## Auth
| Method | Path | Body | Response |
|---|---|---|---|
| POST | /api/auth/register | {email, password, username} | {user: SessionUser} + sets cookie |
| POST | /api/auth/login | {email, password} | {user: SessionUser} + sets cookie |
| POST | /api/auth/logout | — | {ok:true} |
| GET | /api/auth/me | — | {user: SessionUser\|null} |

- register validates username: `/^[a-z0-9_]{3,24}$/` (normalized lowercase), reserved words rejected.
- register also logs in (creates session).

## Onboarding & Profile
| Method | Path | Body | Response |
|---|---|---|---|
| POST | /api/onboarding | {displayName, bio?, skills: string[](skill slugs), interests: string[](category slugs), goals: string[], websiteUrl?, avatarColor?} | {user} sets onboardingCompleted=true |
| GET | /api/skills | — | {skills: [{slug,name}]} |
| GET | /api/users/[username] | — | {user: ProfileDetail, projects: ProjectCard[], contributions: ContributionDTO[]} |
| POST | /api/users/[username]/follow | — | {following: bool, followerCount} |
| POST | /api/users/[username]/block | — | {blocked: bool} |
| GET | /api/me/requests | — | {sent: CollabRequestDTO[], received: CollabRequestDTO[]} |
| GET | /api/me/projects | — | {projects: [{role: string, joinedAt, project: ProjectCard}]} — ALL memberships incl. private |

## Projects & Discovery
| Method | Path | Body/Query | Response |
|---|---|---|---|
| GET | /api/projects | ?q&category&status&sort=recent\|updated\|popular&tag&page | {projects: ProjectCard[], page, pages, total} |
| POST | /api/projects | {name, tagline, description?, category, status?, visibility?, tags?[], requiredSkills?[], repositoryUrl?, demoUrl?, websiteUrl?, coverImage?} | {project: {slug,...}} |
| GET | /api/projects/[slug] | — | {project: ProjectDetail, myRole, liked, saved, likeCount, myRequest} |
| PATCH | /api/projects/[slug] | partial fields above | {project} (owner/admin) |
| DELETE | /api/projects/[slug] | — | {ok} (owner; archives) |
| POST | /api/projects/[slug]/like | — | {liked, likeCount} toggle |
| POST | /api/projects/[slug]/save | — | {saved} toggle |

Rules:
- Only PUBLIC + UNLISTED appear in discovery/feeds/search; PRIVATE only for members (404 for others).
- status→RELEASED logs `RELEASE_PUBLISHED` activity + award. Creating project logs `PROJECT_CREATED` + award.
- name required (3-80 chars), tagline required (max 140).

## Tasks
| Method | Path | Body | Response |
|---|---|---|---|
| GET | /api/projects/[slug]/tasks | ?status&assigneeId | {tasks: TaskDTO[]} |
| POST | /api/projects/[slug]/tasks | {title, description?, priority?, assigneeId?, dueAt?} | {task} (CONTRIBUTOR+) |
| PATCH | /api/tasks/[id] | {title?, description?, status?, priority?, assigneeId?(string\|null), dueAt?(string\|null), position?} | {task} (CONTRIBUTOR+) |
| DELETE | /api/tasks/[id] | — | {ok} (CONTRIBUTOR+) |
| GET | /api/tasks/[id]/comments | — | {comments} |
| POST | /api/tasks/[id]/comments | {body} | {comment} (CONTRIBUTOR+) |

- Task read access follows project visibility (private → members only). Writes require CONTRIBUTOR+.
- assignee must be a project member (validated server-side).
- status→DONE sets completedAt + `TASK_COMPLETED` award to assignee + activity `TASK_COMPLETED`.

## Milestones / Updates / Members / Requests
| Method | Path | Body | Response |
|---|---|---|---|
| GET/POST | /api/projects/[slug]/milestones | {title, description?, dueAt?} | {milestones\|milestone} (POST: CONTRIBUTOR+) |
| PATCH | /api/milestones/[id] | {completed: bool} | {milestone} — completing logs activity + award |
| DELETE | /api/milestones/[id] | — | {ok} |
| GET/POST | /api/projects/[slug]/updates | {title, body} | {updates\|update} (POST: CONTRIBUTOR+) — logs activity + award |
| GET | /api/projects/[slug]/members | — | {members: ProjectMemberDTO[], canManage} |
| PATCH | /api/members/[id] | {role} | {member} (owner only; cannot demote last owner) |
| DELETE | /api/members/[id] | — | {ok} (owner removes others; member leaves self; last owner protected) |
| GET | /api/projects/[slug]/requests | — | {requests: CollabRequestDTO[]} (owner/admin) |
| POST | /api/projects/[slug]/requests | {requestedRole, introduction, portfolioUrl?} | {request} (any authed non-member; unique PENDING per user/project) |
| PATCH | /api/requests/[id] | {action: "accept"\|"reject"} | {request} (owner/admin; accept creates membership atomically + award + notify) |
| DELETE | /api/requests/[id] | — | {ok} (applicant withdraw) |

## Social
| Method | Path | Body | Response |
|---|---|---|---|
| GET/POST | /api/projects/[slug]/comments | {body, parentId?} | {comments: CommentDTO[] (nested)\|comment} |
| DELETE | /api/comments/[id] | — | {ok} (author or project owner/admin; soft-delete) |
| GET | /api/feed | ?page | {events: FeedEvent[], page, pages, total} — public projects only |

## Notifications / Search / Settings / Reports
| Method | Path | Body | Response |
|---|---|---|---|
| GET | /api/notifications | — | {notifications: NotificationDTO[], unread: number} |
| POST | /api/notifications/read | {id?} or {all:true} | {ok} |
| GET | /api/search | ?q (min 2) | {projects, users, tags: [{tag,count}]} — public only, max 6 each |
| GET | /api/me/settings | — | {prefs} |
| PATCH | /api/me/settings | {projectActivity?, collaborationRequests?, socialActivity?} | {prefs} |
| PATCH | /api/me/profile | {displayName?, bio?, websiteUrl?, avatarColor?, skills?[]} | {user} |
| PATCH | /api/me/password | {currentPassword, newPassword} | {ok} |
| DELETE | /api/me/account | {password} | {ok} — deletes account and owned projects |
| POST | /api/reports | {targetType: "project"\|"user"\|"comment", targetId, reason, details?} | {ok} |

## Semantics for reputation (server-side only, idempotent)
- PROJECT_CREATED: owner, +15xp
- TASK_COMPLETED: assignee on DONE transition, +10xp/+5rep
- UPDATE_POSTED: author, +5xp
- MILESTONE_COMPLETED: actor, +20xp/+10rep
- RELEASE_PUBLISHED: owner on status→RELEASED, +30xp/+15rep
- COLLABORATION_ACCEPTED: applicant on accept, +25xp/+10rep

## Notifications created server-side
- NEW_FOLLOWER (to followed), PROJECT_COMMENT (to project owner when someone comments), COLLAB_REQUEST (to owner), REQUEST_ACCEPTED / REQUEST_REJECTED (to applicant), TASK_ASSIGNED (to assignee), MEMBER_JOINED (to owner).
