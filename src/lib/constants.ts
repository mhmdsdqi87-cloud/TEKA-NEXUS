// TEKA NEXUS — Domain constants shared by backend and frontend.
// Single source of truth for every enum-ish string in the platform.

export const PROJECT_CATEGORIES = [
  { slug: "WEB_DEVELOPMENT", name: "Web Development", icon: "Globe" },
  { slug: "MOBILE_DEVELOPMENT", name: "Mobile Development", icon: "Smartphone" },
  { slug: "ARTIFICIAL_INTELLIGENCE", name: "Artificial Intelligence", icon: "Brain" },
  { slug: "DEVELOPER_TOOLS", name: "Developer Tools", icon: "Wrench" },
  { slug: "OPEN_SOURCE", name: "Open Source", icon: "GitBranch" },
  { slug: "INDIE_GAMES", name: "Indie Games", icon: "Gamepad2" },
  { slug: "CYBERSECURITY", name: "Cybersecurity", icon: "Shield" },
  { slug: "BLOCKCHAIN", name: "Blockchain", icon: "Boxes" },
  { slug: "HARDWARE_IOT", name: "Hardware & IoT", icon: "Cpu" },
  { slug: "DATA_SCIENCE", name: "Data Science", icon: "BarChart3" },
  { slug: "DESIGN_TOOLS", name: "Design Tools", icon: "Palette" },
  { slug: "OTHER_TECHNOLOGY", name: "Other Technology", icon: "Sparkles" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["slug"];

export const PROJECT_STATUSES = [
  { slug: "IDEA", name: "Idea", color: "text-zinc-300", bg: "bg-zinc-500/15", dot: "bg-zinc-400" },
  { slug: "PLANNING", name: "Planning", color: "text-amber-300", bg: "bg-amber-500/15", dot: "bg-amber-400" },
  { slug: "IN_DEVELOPMENT", name: "In Development", color: "text-cyan-300", bg: "bg-cyan-500/15", dot: "bg-cyan-400" },
  { slug: "BETA", name: "Beta", color: "text-violet-300", bg: "bg-violet-500/15", dot: "bg-violet-400" },
  { slug: "RELEASED", name: "Released", color: "text-emerald-300", bg: "bg-emerald-500/15", dot: "bg-emerald-400" },
  { slug: "PAUSED", name: "Paused", color: "text-orange-300", bg: "bg-orange-500/15", dot: "bg-orange-400" },
  { slug: "ARCHIVED", name: "Archived", color: "text-zinc-500", bg: "bg-zinc-600/15", dot: "bg-zinc-500" },
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number]["slug"];

// Cover gallery for the new-project form — local paths (public/covers) or
// external http(s) URLs are both accepted by POST /api/projects (max 500 chars).
export const PROJECT_COVER_GALLERY = [
  // themed covers (match seeded projects)
  "/covers/takbook.png",
  "/covers/challenge-kadeh.png",
  "/covers/hamyar-python.png",
  "/covers/donyaye-pixel.png",
  "/covers/masiryar.png",
  "/covers/negahban-form.png",
  // generic covers
  "/covers/choreograph.png",
  "/covers/datadock.png",
  "/covers/echoform.png",
  "/covers/guardrail.png",
  "/covers/herald.png",
  "/covers/hivemote.png",
  "/covers/neuron-forge.png",
  "/covers/nexus-core.png",
  "/covers/pitchframe.png",
  "/covers/pulseboard.png",
] as const;

export type ProjectCover = (typeof PROJECT_COVER_GALLERY)[number];

export const TASK_STATUSES = [
  { slug: "BACKLOG", name: "Backlog" },
  { slug: "TODO", name: "To Do" },
  { slug: "IN_PROGRESS", name: "In Progress" },
  { slug: "IN_REVIEW", name: "In Review" },
  { slug: "DONE", name: "Done" },
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number]["slug"];

export const TASK_PRIORITIES = [
  { slug: "LOW", name: "Low", color: "text-zinc-400", bg: "bg-zinc-500/15" },
  { slug: "NORMAL", name: "Normal", color: "text-cyan-300", bg: "bg-cyan-500/15" },
  { slug: "HIGH", name: "High", color: "text-amber-300", bg: "bg-amber-500/15" },
  { slug: "URGENT", name: "Urgent", color: "text-rose-300", bg: "bg-rose-500/15" },
] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number]["slug"];

export const MEMBER_ROLES = [
  { slug: "OWNER", name: "Owner" },
  { slug: "ADMIN", name: "Admin" },
  { slug: "CONTRIBUTOR", name: "Contributor" },
  { slug: "VIEWER", name: "Viewer" },
] as const;

export const VISIBILITIES = [
  { slug: "PUBLIC", name: "Public" },
  { slug: "UNLISTED", name: "Unlisted" },
  { slug: "PRIVATE", name: "Private" },
] as const;

// The 12 profile skills from spec §10
export const SKILLS = [
  { slug: "frontend-development", name: "Frontend Development" },
  { slug: "backend-development", name: "Backend Development" },
  { slug: "mobile-development", name: "Mobile Development" },
  { slug: "game-development", name: "Game Development" },
  { slug: "ai-and-data", name: "AI and Data" },
  { slug: "ui-ux", name: "UI/UX" },
  { slug: "qa-testing", name: "QA and Testing" },
  { slug: "devops", name: "DevOps" },
  { slug: "technical-writing", name: "Technical Writing" },
  { slug: "product-management", name: "Product Management" },
  { slug: "hardware-iot", name: "Hardware & IoT" },
  { slug: "other", name: "Other" },
] as const;

export const GOALS = [
  { slug: "build", name: "Build my own projects" },
  { slug: "contribute", name: "Contribute to projects" },
  { slug: "learn", name: "Learn new technology" },
  { slug: "discover", name: "Discover projects" },
] as const;

// Verified reputation rules (spec §12) — server-side only, idempotent
export const XP_RULES = {
  PROJECT_CREATED: { xp: 15, reputation: 0 },
  TASK_COMPLETED: { xp: 10, reputation: 5 },
  UPDATE_POSTED: { xp: 5, reputation: 0 },
  MILESTONE_COMPLETED: { xp: 20, reputation: 10 },
  RELEASE_PUBLISHED: { xp: 30, reputation: 15 },
  COLLABORATION_ACCEPTED: { xp: 25, reputation: 10 },
  // TEKA Academy (free Python & HTML courses)
  ACADEMY_LESSON: { xp: 15, reputation: 2 },
  ACADEMY_COURSE: { xp: 100, reputation: 25 },
} as const;

export const AVATAR_GRADIENTS: Record<string, string> = {
  cyan: "from-cyan-400 to-teal-500",
  violet: "from-violet-400 to-purple-600",
  ember: "from-orange-400 to-rose-500",
  lime: "from-lime-400 to-emerald-500",
  rose: "from-rose-400 to-pink-600",
  gold: "from-amber-300 to-yellow-600",
};

export const AVATAR_GRADIENT_KEYS = Object.keys(AVATAR_GRADIENTS);

export const LIMITS = {
  bio: 500,
  introduction: 600,
  comment: 1000,
  taskTitle: 140,
  taskDescription: 4000,
  updateBody: 6000,
  updateTitle: 140,
  projectDescription: 8000,
  coverImage: 500,
  tagline: 140,
  searchQuery: 80,
  pageSize: 12,
};
