// TEKA NEXUS — live voice rooms mini service (socket.io, Bun).
// Task 19-h. Runs standalone on port 3021 behind the Caddy gateway:
//   client connects with  io("/?XTransformPort=3021", { path: "/" })
//
// Design (mirrors mini-services/chat-service): node http server + socket.io
// attached with path "/" (the gateway forwards every path as-is, so engine.io
// claims the whole URL space). That means our REST endpoint /rooms must be
// re-routed manually — engine.io's attach() captures the request listeners,
// so we re-capture them and answer /rooms ourselves before delegating to the
// engine handler. Same trick as chat-service's rerouteHealthEndpoint().
//
// PROTOCOL (client → server):
//   room:join   { room, username }              → join + ack { ok, room, participants }
//   room:leave  { room? }                       → cleanup + broadcasts
//   voice:chunk { room, data: base64 ≤ 60KB, seq } → relay to everyone else in room
//   rooms:list  (ack)                           → ack { rooms: [{ name, count }] }
// (server → client):
//   room:state  { room, participants: [{ id, username }] }   — per-room presence
//   rooms:state [{ name, count }]                            — lobby list (broadcast)
//   voice:chunk { data, seq, from }                          — relayed audio
//
// Rooms live in memory only (no persistence) and persist once created so the
// lobby can list them; participant maps are cleaned on leave/disconnect.

/// <reference types="bun-types" />

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { Server, type Socket } from "socket.io";

const PORT = 3021; // hardcoded — the gateway targets it via ?XTransformPort=3021
const MAX_ROOM_NAME = 60;
const MAX_USERNAME = 40;
const MAX_CHUNK_CHARS = 60 * 1024; // base64 payload cap (chars) ≈ 45KB audio

// ─── State ───────────────────────────────────────────────────────────────────

type Participant = { username: string };
type VoiceRoom = { name: string; participants: Map<string, Participant> };

const rooms = new Map<string, VoiceRoom>();

type Ack = (response: unknown) => void;

function sanitizeRoom(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const name = raw.trim().slice(0, MAX_ROOM_NAME);
  return name.length >= 1 ? name : null;
}

function sanitizeUsername(raw: unknown): string {
  if (typeof raw !== "string") return "guest";
  const name = raw.trim().slice(0, MAX_USERNAME);
  return name.length >= 1 ? name : "guest";
}

function participantsOf(roomName: string): { id: string; username: string }[] {
  const room = rooms.get(roomName);
  if (!room) return [];
  return Array.from(room.participants.entries()).map(([id, p]) => ({ id, username: p.username }));
}

function roomsList(): { name: string; count: number }[] {
  return Array.from(rooms.values()).map((r) => ({ name: r.name, count: r.participants.size }));
}

function broadcastRoomState(io: Server, roomName: string): void {
  io.to(roomName).emit("room:state", { room: roomName, participants: participantsOf(roomName) });
}

function broadcastRoomsList(io: Server): void {
  io.emit("rooms:state", roomsList());
}

/** Remove a socket from its current voice room (if any) + broadcast. */
function leaveCurrentRoom(io: Server, socket: Socket): void {
  const roomName = socket.data.voiceRoom as string | undefined;
  if (!roomName) return;
  socket.data.voiceRoom = undefined;
  socket.leave(roomName);
  const room = rooms.get(roomName);
  if (room) room.participants.delete(socket.id);
  broadcastRoomState(io, roomName);
  broadcastRoomsList(io);
  console.log(`[voice-service] ${socket.id} left room "${roomName}" (${room?.participants.size ?? 0} inside)`);
}

// ─── HTTP + socket.io wiring ─────────────────────────────────────────────────

function handleRooms(res: ServerResponse): void {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ rooms: roomsList() }));
}

const httpServer = createServer();

const io = new Server(httpServer, {
  // DO NOT change the path — the Caddy gateway forwards every path as-is and
  // the client connects with io("/?XTransformPort=3021", { path: "/" }).
  path: "/",
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
  pingTimeout: 60_000,
  pingInterval: 25_000,
  maxHttpBufferSize: 1e5, // hard engine cap; voice:chunk enforces 60KB itself
});

// engine.io claimed every URL (path "/"), so re-route /rooms to ourselves and
// delegate everything else back to the engine handler (chat-service pattern).
function rerouteRestEndpoints(): void {
  const listeners = (httpServer as unknown as { listeners(ev: string): unknown[] })
    .listeners("request")
    .slice();
  const engineHandler = listeners.find((l) => typeof l === "function" && l !== handleRooms);
  httpServer.removeAllListeners("request");
  httpServer.on("request", (req: IncomingMessage, res: ServerResponse) => {
    const url = (req.url || "/").split("?")[0];
    if (url === "/rooms") {
      handleRooms(res);
      return;
    }
    if (engineHandler) {
      (engineHandler as (r: IncomingMessage, s: ServerResponse) => void)(req, res);
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("teka voice");
    }
  });
}

io.on("connection", (socket: Socket) => {
  socket.data.voiceRoom = undefined;
  console.log(`[voice-service] connected ${socket.id}`);

  // ── join (and implicitly create) a room ──
  socket.on(
    "room:join",
    (payload: { room?: unknown; username?: unknown } | undefined, ack?: Ack) => {
      const roomName = sanitizeRoom(payload?.room);
      if (!roomName) {
        ack?.({ ok: false, error: "badRoom" });
        return;
      }
      const username = sanitizeUsername(payload?.username);

      // one room per socket — leaving the previous one keeps state consistent
      if (socket.data.voiceRoom && socket.data.voiceRoom !== roomName) {
        leaveCurrentRoom(io, socket);
      }

      let room = rooms.get(roomName);
      if (!room) {
        room = { name: roomName, participants: new Map() };
        rooms.set(roomName, room);
      }
      room.participants.set(socket.id, { username });
      socket.join(roomName);
      socket.data.voiceRoom = roomName;

      ack?.({ ok: true, room: roomName, participants: participantsOf(roomName) });
      broadcastRoomState(io, roomName);
      broadcastRoomsList(io);
      console.log(
        `[voice-service] ${socket.id} (@${username}) joined "${roomName}" (${room.participants.size} inside)`
      );
    }
  );

  // ── explicit leave ──
  socket.on("room:leave", (payload: { room?: unknown } | undefined) => {
    const requested = sanitizeRoom(payload?.room);
    if (requested && socket.data.voiceRoom && socket.data.voiceRoom !== requested) return;
    leaveCurrentRoom(io, socket);
  });

  // ── relay an audio chunk to everyone else in the room ──
  socket.on("voice:chunk", (payload: { room?: unknown; data?: unknown; seq?: unknown } | undefined) => {
    const roomName = socket.data.voiceRoom as string | undefined;
    if (!roomName) return;
    if (!payload || payload.room !== roomName) return;
    const data = payload.data;
    if (typeof data !== "string" || data.length === 0 || data.length > MAX_CHUNK_CHARS) return;
    const seq = typeof payload.seq === "number" && Number.isFinite(payload.seq) ? payload.seq : 0;
    socket.to(roomName).emit("voice:chunk", { data, seq, from: socket.id });
  });

  // ── lobby list (ack) ──
  socket.on("rooms:list", (ack?: Ack) => {
    ack?.({ rooms: roomsList() });
  });

  // ── disconnect → cleanup ──
  socket.on("disconnect", () => {
    leaveCurrentRoom(io, socket);
    console.log(`[voice-service] disconnected ${socket.id}`);
  });
});

// ─── boot ────────────────────────────────────────────────────────────────────

rerouteRestEndpoints();

httpServer.listen(PORT, () => {
  console.log(`[voice-service] TEKA voice service listening on http://localhost:${PORT} (path "/", REST at /rooms)`);
});

// bun-types narrows process.on to "memoryPressure"; cast for signal handling
const proc = process as unknown as { on: (event: string, cb: () => void) => void };
proc.on("SIGTERM", () => {
  httpServer.close(() => process.exit(0));
});
proc.on("SIGINT", () => {
  httpServer.close(() => process.exit(0));
});
