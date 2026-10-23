// TEKA NEXUS — shared pulse-event metadata (terminal + activity feed + counters).

export type PulseEventType =
  | "join"
  | "project"
  | "like"
  | "comment"
  | "chat"
  | "update"
  | "follow"
  | "save"
  | "member"
  | "task"
  | "file";

export const PULSE_EVENT_TYPES: PulseEventType[] = [
  "join",
  "project",
  "like",
  "comment",
  "chat",
  "update",
  "follow",
  "save",
  "member",
  "task",
  "file",
];

export const EVENT_GLYPH: Record<PulseEventType, string> = {
  join: "✦",
  project: "▲",
  like: "♥",
  comment: "✎",
  chat: "✉",
  update: "⚡",
  follow: "＋",
  save: "❖",
  member: "◉",
  task: "✔",
  file: "⌘",
};

/** Terminal line color per event type (phosphor palette). */
export const EVENT_CLASS: Record<PulseEventType, string> = {
  join: "text-cyan-300",
  project: "text-violet-300",
  like: "text-rose-300",
  comment: "text-amber-300",
  chat: "text-emerald-300",
  update: "text-lime-300",
  follow: "text-sky-300",
  save: "text-fuchsia-300",
  member: "text-teal-300",
  task: "text-orange-300",
  file: "text-indigo-300",
};

/** Feed chip background per event type. */
export const EVENT_CHIP: Record<PulseEventType, string> = {
  join: "bg-cyan-500/15 text-cyan-300 border-cyan-400/25",
  project: "bg-violet-500/15 text-violet-300 border-violet-400/25",
  like: "bg-rose-500/15 text-rose-300 border-rose-400/25",
  comment: "bg-amber-500/15 text-amber-300 border-amber-400/25",
  chat: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25",
  update: "bg-lime-500/15 text-lime-300 border-lime-400/25",
  follow: "bg-sky-500/15 text-sky-300 border-sky-400/25",
  save: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/25",
  member: "bg-teal-500/15 text-teal-300 border-teal-400/25",
  task: "bg-orange-500/15 text-orange-300 border-orange-400/25",
  file: "bg-indigo-500/15 text-indigo-300 border-indigo-400/25",
};

export type PulseEvent = {
  id: string;
  type: PulseEventType;
  at: string;
  actor: string;
  actorColor: string;
  target: string;
  slug?: string;
  username?: string;
  preview?: string;
};

export type PulseStats = {
  users: number;
  projects: number;
  likes: number;
  comments: number;
  chats: number;
  follows: number;
  saves?: number;
  members?: number;
  files?: number;
};

export type PulseResponse = {
  events: PulseEvent[];
  stats: PulseStats;
};
