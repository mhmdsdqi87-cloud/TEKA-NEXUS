// TEKA NEXUS — real-time group chat mini service (socket.io, Bun).
// Task 4-d. Runs standalone on port 3030 behind the Caddy gateway:
//   client connects with  io("/?XTransformPort=3030", { path: "/", withCredentials: true })
//
// AUTH: the `teka_session` cookie is httpOnly, so it cannot be read from JS.
// Instead the socket.io ENGINE.IO handshake carries the browser's Cookie header
// (withCredentials: true), which Caddy forwards 1:1. We parse `teka_session`
// from `socket.handshake.headers.cookie` and verify it against the main SQLite
// database opened READ-ONLY. A handshake `auth.token` is also accepted as a
// fallback (same Session table). Unauthenticated sockets are rejected.
//
// ROOMS: `project:{projectId}` — a socket may only join rooms for projects
// where the authenticated user is a ProjectMember (OWNER/ADMIN/CONTRIBUTOR/VIEWER).
//
// Persistence: JSONL log at ./messages.json ({type:"msg"|"del"|"react"} lines).
// Rewritten as a compact snapshot when the log grows past 5000 lines.
// Last 200 messages per project are replayed on join.
//
// NOTE: this file is also type-checked by the project root tsconfig, so it
// sticks to strict-mode-safe TypeScript and references bun-types explicitly.

/// <reference types="bun-types" />

import { createServer, type IncomingMessage } from "node:http";
import { Server, type Socket } from "socket.io";
import postgres from "postgres";
import { appendFileSync, existsSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";

const PORT = 3030;
const STORE_PATH = new URL("./messages.json", import.meta.url).pathname;

const MAX_TEXT = 1000;
const REPLAY_LIMIT = 200;
const LOG_LINE_CAP = 5000;
const LOG_KEEP = 4000;
const RATE_WINDOW_MS = 10_000;
const RATE_MAX = 10;
const MEMBER_ROLES = ["OWNER", "ADMIN", "CONTRIBUTOR", "VIEWER"];
const REACTIONS = ["👍", "❤️", "🔥", "😂", "🎉", "🤔"];

// ─── Read-only DB access (Supabase Postgres — same DB as the main app) ──────

// Prisma creates quoted camelCase identifiers, hence the explicit quoting.
// The Postgres URL is injected via the environment (mini-services/chat-service/.env
// or the parent shell) — it is NEVER hardcoded here, this repo is public.
function resolveDatabaseUrl(): string {
  const fromEnv = process.env.DATABASE_URL ?? "";
  if (fromEnv.startsWith("postgres")) return fromEnv;
  // Sandboxes often export a stale DATABASE_URL (e.g. file:… SQLite) that would
  // shadow the local .env (env vars beat .env files). Parse the local .env directly.
  try {
    const raw = readFileSync(new URL("./.env", import.meta.url), "utf8");
    const m = raw.match(/^DATABASE_URL=(.+)\s*$/m);
    const local = m?.[1]?.trim() ?? "";
    if (local.startsWith("postgres")) return local;
  } catch {
    /* no local .env */
  }
  return "";
}
const DATABASE_URL = resolveDatabaseUrl();
if (!DATABASE_URL) {
  console.error(
    "[chat-service] DATABASE_URL must point at Supabase Postgres (postgresql://…). " +
      "Put it in mini-services/chat-service/.env and restart."
  );
  process.exit(1);
}
const sql = postgres(DATABASE_URL, {
  max: 5, idle_timeout: 30, prepare: false, // transaction-pooler-safe
});

/** Prisma stores timestamps as timestamps; normalize anything to epoch ms. */
function toMs(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n) && value.trim() !== "") return n;
    const parsed = Date.parse(value.includes("T") ? value : value.replace(" ", "T"));
    if (Number.isFinite(parsed)) return parsed;
  }
  return NaN;
}

type ChatUser = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
};

function parseCookies(header: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

async function verifySession(token: string | undefined): Promise<ChatUser | null> {
  if (!token || token.length < 16) return null;
  try {
    const rows = await sql`
      SELECT s."expiresAt" AS "expiresAt", u."id" AS id, u."username" AS username,
             u."displayName" AS "displayName", u."avatarColor" AS "avatarColor", u."avatarUrl" AS "avatarUrl"
        FROM "Session" s JOIN "User" u ON u."id" = s."userId"
       WHERE s."token" = ${token} LIMIT 1`;
    const row = rows[0] as
      | { expiresAt: unknown; id: string; username: string; displayName: string; avatarColor: string; avatarUrl: string | null }
      | undefined;
    if (!row) return null;
    const exp = toMs(row.expiresAt);
    if (!Number.isFinite(exp) || exp <= Date.now()) return null;
    return {
      id: row.id,
      username: row.username,
      displayName: row.displayName,
      avatarColor: row.avatarColor || "cyan",
      avatarUrl: row.avatarUrl ?? null,
    };
  } catch (err) {
    console.error("[chat-service] session lookup failed:", err);
    return null;
  }
}

// ─── Membership (cached) ─────────────────────────────────────────────────────

const membershipCache = new Map<string, { ok: boolean; until: number }>();
const MEMBER_TTL_MS = 60_000;

async function isProjectMember(userId: string, projectId: string): Promise<boolean> {
  const key = `${userId}:${projectId}`;
  const hit = membershipCache.get(key);
  if (hit && hit.until > Date.now()) return hit.ok;
  let ok = false;
  try {
    const rows = await sql`SELECT "role" FROM "ProjectMember" WHERE "userId" = ${userId} AND "projectId" = ${projectId} LIMIT 1`;
    const row = rows[0] as { role: string } | undefined;
    ok = !!row && MEMBER_ROLES.includes(row.role);
  } catch (err) {
    console.error("[chat-service] membership lookup failed:", err);
    ok = false;
  }
  membershipCache.set(key, { ok, until: Date.now() + MEMBER_TTL_MS });
  return ok;
}

// ─── Message store (JSONL append log + in-memory) ────────────────────────────

type ChatMessage = {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
  text: string;
  createdAt: string; // ISO
  clientTag: string | null;
};

type StoreLine =
  | { type: "msg"; m: ChatMessage & { reactions?: Record<string, string[]> } }
  | { type: "del"; projectId: string; messageId: string }
  | { type: "react"; projectId: string; messageId: string; emoji: string; userId: string; op: "add" | "remove" };

const messagesByProject = new Map<string, ChatMessage[]>();
const reactionsByMessage = new Map<string, Record<string, string[]>>(); // messageId → emoji → userIds
let logLines = 0;

function reactionsOf(messageId: string): Record<string, string[]> {
  let r = reactionsByMessage.get(messageId);
  if (!r) {
    r = {};
    reactionsByMessage.set(messageId, r);
  }
  return r;
}

function tallyOf(messageId: string): Record<string, number> {
  const tally: Record<string, number> = {};
  const r = reactionsByMessage.get(messageId);
  if (r) for (const [emoji, users] of Object.entries(r)) if (users.length > 0) tally[emoji] = users.length;
  return tally;
}

function appendLog(line: StoreLine): void {
  try {
    appendFileSync(STORE_PATH, JSON.stringify(line) + "\n");
    logLines += 1;
    if (logLines > LOG_LINE_CAP) compactStore();
  } catch (err) {
    console.error("[chat-service] log append failed:", err);
  }
}

/** Rewrite the log as a compact snapshot of live messages + reactions. */
function compactStore(): void {
  try {
    const tmp = STORE_PATH + ".tmp";
    const out: string[] = [];
    for (const list of messagesByProject.values()) {
      for (const m of list) {
        const reactions = reactionsByMessage.get(m.id);
        out.push(
          JSON.stringify({
            type: "msg",
            m: reactions && Object.keys(reactions).length > 0 ? { ...m, reactions } : m,
          })
        );
      }
    }
    writeFileSync(tmp, out.join("\n") + (out.length ? "\n" : ""));
    renameSync(tmp, STORE_PATH);
    logLines = out.length;
    console.log(`[chat-service] store compacted → ${logLines} lines`);
  } catch (err) {
    console.error("[chat-service] store compaction failed:", err);
  }
}

function loadStore(): void {
  if (!existsSync(STORE_PATH)) return;
  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    const lines = raw.split("\n").filter((l) => l.trim() !== "");
    logLines = lines.length;
    for (const line of lines) {
      let rec: StoreLine;
      try {
        rec = JSON.parse(line) as StoreLine;
      } catch {
        continue;
      }
      if (rec.type === "msg") {
        const list = messagesByProject.get(rec.m.projectId) ?? [];
        if (!list.some((m) => m.id === rec.m.id)) {
          const { reactions, ...m } = rec.m;
          list.push(m);
          messagesByProject.set(rec.m.projectId, list);
          if (reactions) {
            for (const [emoji, users] of Object.entries(reactions)) {
              const r = reactionsOf(rec.m.id);
              r[emoji] = users.filter(Boolean);
            }
          }
        }
      } else if (rec.type === "del") {
        const list = messagesByProject.get(rec.projectId);
        if (list) messagesByProject.set(rec.projectId, list.filter((m) => m.id !== rec.messageId));
        reactionsByMessage.delete(rec.messageId);
      } else if (rec.type === "react") {
        const r = reactionsOf(rec.messageId);
        const users = r[rec.emoji] ?? [];
        r[rec.emoji] =
          rec.op === "add"
            ? users.includes(rec.userId)
              ? users
              : [...users, rec.userId]
            : users.filter((u) => u !== rec.userId);
      }
    }
    // keep only last REPLAY_LIMIT per project in memory
    for (const [pid, list] of messagesByProject) {
      if (list.length > REPLAY_LIMIT) messagesByProject.set(pid, list.slice(-REPLAY_LIMIT));
    }
    console.log(`[chat-service] loaded store: ${logLines} log lines, ${messagesByProject.size} projects`);
  } catch (err) {
    console.error("[chat-service] store load failed:", err);
  }
}

// ─── Rate limiting & presence & unread ───────────────────────────────────────

const sendTimes = new Map<string, number[]>(); // userId → epoch ms of recent sends

function checkRate(userId: string): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const times = (sendTimes.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_MAX) {
    sendTimes.set(userId, times);
    const oldest = times[0] ?? now;
    return { ok: false, retryAfterMs: RATE_WINDOW_MS - (now - oldest) };
  }
  times.push(now);
  sendTimes.set(userId, times);
  return { ok: true, retryAfterMs: 0 };
}

/** roomId → (userId → set of socket ids) */
const presence = new Map<string, Map<string, { user: ChatUser; sockets: Set<string> }>>();
/** last activity per room per user (for unread bookkeeping) */
const lastActivity = new Map<string, Map<string, number>>(); // projectId → userId → epoch ms

function noteActivity(projectId: string, userId: string): void {
  let m = lastActivity.get(projectId);
  if (!m) {
    m = new Map();
    lastActivity.set(projectId, m);
  }
  m.set(userId, Date.now());
}

function presenceList(projectId: string): ChatUser[] {
  const room = presence.get(projectId);
  if (!room) return [];
  return Array.from(room.values()).map(({ user }) => user);
}

function broadcastPresence(io: Server, projectId: string): void {
  const users = presenceList(projectId);
  io.to(`project:${projectId}`).emit("presence:update", {
    projectId,
    users,
    online: users.length,
  });
}

// ─── Socket.io wiring ────────────────────────────────────────────────────────

function handleHealth(res: import("node:http").ServerResponse): void {
  const connections = Array.from(presence.values()).reduce((n, m) => n + m.size, 0);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      ok: true,
      service: "teka-chat-service",
      uptimeSec: Math.round(process.uptime()),
      connections,
      rooms: presence.size,
      storedProjects: messagesByProject.size,
      logLines,
      time: new Date().toISOString(),
    })
  );
}

const httpServer = createServer();

// socket.io is REQUIRED to serve on path "/" (Caddy gateway forwards it as-is),
// which makes engine.io claim every URL — including /health. Re-route manually:
// keep engine.io's request listener for everything, but answer /health ourselves.
function rerouteHealthEndpoint(): void {
  const listeners = (httpServer as unknown as { listeners(ev: string): unknown[] }).listeners("request").slice();
  const engineHandler = listeners.find((l) => typeof l === "function" && l !== handleHealth);
  httpServer.removeAllListeners("request");
  httpServer.on("request", (req, res) => {
    const url = (req.url || "/").split("?")[0];
    if (url === "/health") {
      handleHealth(res);
      return;
    }
    if (engineHandler) (engineHandler as (r: IncomingMessage, s: typeof res) => void)(req, res);
  });
}

const io = new Server(httpServer, {
  // DO NOT change the path, it is used by Caddy to forward the request
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
  pingTimeout: 60_000,
  pingInterval: 25_000,
  maxHttpBufferSize: 1e5,
});

type SocketData = { user: ChatUser; rooms: Set<string> };

io.use(async (socket, next) => {
  const cookies = parseCookies(socket.handshake.headers.cookie);
  const token = cookies["teka_session"] ?? socket.handshake.auth?.token;
  const user = await verifySession(token);
  if (!user) return next(new Error("unauthorized: login required"));
  (socket.data as SocketData) = { user, rooms: new Set() };
  next();
});

function projectRoom(projectId: string): string {
  return `project:${projectId}`;
}

/** Validate + authorize an event scoped to a project room. */
function authorize(socket: Socket, projectId: unknown): { user: ChatUser; pid: string } | null {
  if (typeof projectId !== "string" || !/^[a-z0-9]{10,40}$/i.test(projectId)) return null;
  const data = socket.data as SocketData;
  if (!data?.user) return null;
  if (!data.rooms.has(projectId)) return null; // must have joined the room first
  return { user: data.user, pid: projectId };
}

io.on("connection", (socket: Socket) => {
  const data = socket.data as SocketData;
  const user = data.user;
  console.log(`[chat-service] connected ${socket.id} user=@${user.username}`);

  // ── join a project room ──
  socket.on("chat:join", async (payload: { projectId?: unknown }, ack?: (r: unknown) => void) => {
    const projectId = payload?.projectId;
    if (typeof projectId !== "string" || !/^[a-z0-9]{10,40}$/i.test(projectId)) {
      ack?.({ ok: false, error: "badProject" });
      return;
    }
    if (!(await isProjectMember(user.id, projectId))) {
      ack?.({ ok: false, error: "notMember" });
      return;
    }
    const room = projectRoom(projectId);
    if (data.rooms.has(projectId)) {
      ack?.({ ok: true, alreadyJoined: true, projectId });
      return;
    }
    data.rooms.add(projectId);
    socket.join(room);

    let roomPresence = presence.get(projectId);
    if (!roomPresence) {
      roomPresence = new Map();
      presence.set(projectId, roomPresence);
    }
    let entry = roomPresence.get(user.id);
    if (!entry) {
      entry = { user, sockets: new Set() };
      roomPresence.set(user.id, entry);
    }
    entry.sockets.add(socket.id);

    // replay last messages + reaction tallies, then presence
    const history = (messagesByProject.get(projectId) ?? []).slice(-REPLAY_LIMIT);
    const replay = history.map((m) => {
      const reactions = tallyOf(m.id);
      const mine = Object.entries(reactionsByMessage.get(m.id) ?? {})
        .filter(([, users]) => users.includes(user.id))
        .map(([emoji]) => emoji);
      return { ...m, reactions, mine };
    });
    ack?.({
      ok: true,
      projectId,
      serverTime: new Date().toISOString(),
      messages: replay,
      presence: presenceList(projectId),
      reactions: REACTIONS,
    });

    broadcastPresence(io, projectId);
    console.log(`[chat-service] @${user.username} joined project:${projectId} (${presenceList(projectId).length} online)`);
  });

  // ── explicit leave ──
  socket.on("chat:leave", (payload: { projectId?: unknown }) => {
    const projectId = payload?.projectId;
    if (typeof projectId !== "string") return;
    leaveRoom(io, socket, projectId);
  });

  // ── send a message ──
  socket.on("chat:message", (payload: { projectId?: unknown; text?: unknown; clientTag?: unknown }) => {
    const auth = authorize(socket, payload?.projectId);
    if (!auth) return;
    const { pid } = auth;
    const text = typeof payload.text === "string" ? payload.text.trim().slice(0, MAX_TEXT) : "";
    if (!text) return;
    const tag = typeof payload.clientTag === "string" ? payload.clientTag.slice(0, 64) : null;

    const rate = checkRate(user.id);
    if (!rate.ok) {
      socket.emit("chat:muted", { projectId: pid, retryAfterMs: Math.ceil(rate.retryAfterMs) });
      return;
    }

    const msg: ChatMessage = {
      id: `m${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
      projectId: pid,
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarColor: user.avatarColor,
      avatarUrl: user.avatarUrl,
      text,
      createdAt: new Date().toISOString(),
      clientTag: tag,
    };
    const list = messagesByProject.get(pid) ?? [];
    list.push(msg);
    messagesByProject.set(pid, list.length > REPLAY_LIMIT ? list.slice(-REPLAY_LIMIT) : list);
    appendLog({ type: "msg", m: msg });
    noteActivity(pid, user.id);

    io.to(projectRoom(pid)).emit("chat:message", { ...msg, reactions: {} });
  });

  // ── typing indicator ──
  socket.on("chat:typing", (payload: { projectId?: unknown; isTyping?: unknown }) => {
    const auth = authorize(socket, payload?.projectId);
    if (!auth) return;
    socket
      .to(projectRoom(auth.pid))
      .emit("chat:typing", { projectId: auth.pid, userId: user.id, username: user.username, isTyping: !!payload.isTyping });
  });

  // ── reactions (fixed emoji set, toggle per user) ──
  socket.on("chat:react", (payload: { projectId?: unknown; messageId?: unknown; emoji?: unknown }) => {
    const auth = authorize(socket, payload?.projectId);
    if (!auth) return;
    const { pid } = auth;
    const { messageId, emoji } = payload as { messageId?: unknown; emoji?: unknown };
    if (typeof messageId !== "string" || typeof emoji !== "string" || !REACTIONS.includes(emoji)) return;
    const list = messagesByProject.get(pid);
    if (!list || !list.some((m) => m.id === messageId)) return;

    const r = reactionsOf(messageId);
    const users = r[emoji] ?? [];
    const op: "add" | "remove" = users.includes(user.id) ? "remove" : "add";
    r[emoji] = op === "add" ? [...users, user.id] : users.filter((u) => u !== user.id);
    appendLog({ type: "react", projectId: pid, messageId, emoji, userId: user.id, op });

    io.to(projectRoom(pid)).emit("chat:react:update", {
      projectId: pid,
      messageId,
      emoji,
      userId: user.id,
      op,
      tally: tallyOf(messageId),
    });
  });

  // ── delete own message ──
  socket.on("chat:delete", (payload: { projectId?: unknown; messageId?: unknown }) => {
    const auth = authorize(socket, payload?.projectId);
    if (!auth) return;
    const { pid } = auth;
    const messageId = payload?.messageId;
    if (typeof messageId !== "string") return;
    const list = messagesByProject.get(pid);
    const msg = list?.find((m) => m.id === messageId);
    if (!msg || msg.userId !== user.id) return; // author only

    messagesByProject.set(pid, (list ?? []).filter((m) => m.id !== messageId));
    reactionsByMessage.delete(messageId);
    appendLog({ type: "del", projectId: pid, messageId });

    io.to(projectRoom(pid)).emit("chat:deleted", { projectId: pid, messageId });
  });

  // ── disconnect ──
  socket.on("disconnect", () => {
    for (const projectId of Array.from(data.rooms)) leaveRoom(io, socket, projectId);
    console.log(`[chat-service] disconnected ${socket.id} user=@${user.username}`);
  });
});

function leaveRoom(io: Server, socket: Socket, projectId: string): void {
  const data = socket.data as SocketData;
  if (!data.rooms.has(projectId)) return;
  data.rooms.delete(projectId);
  socket.leave(projectRoom(projectId));

  const room = presence.get(projectId);
  if (room) {
    const entry = room.get(data.user.id);
    if (entry) {
      entry.sockets.delete(socket.id);
      if (entry.sockets.size === 0) {
        room.delete(data.user.id);
        noteActivity(projectId, data.user.id);
      }
    }
    if (room.size === 0) presence.delete(projectId);
  }
  broadcastPresence(io, projectId);
}

// ─── boot ────────────────────────────────────────────────────────────────────

loadStore();
rerouteHealthEndpoint();

httpServer.listen(PORT, () => {
  console.log(`[chat-service] TEKA chat service listening on http://localhost:${PORT} (path "/", health at /health)`);
});

// bun-types narrows process.on to "memoryPressure"; cast for signal handling
const proc = process as unknown as { on: (event: string, cb: () => void) => void };
proc.on("SIGTERM", () => {
  httpServer.close(() => process.exit(0));
});
proc.on("SIGINT", () => {
  httpServer.close(() => process.exit(0));
});
