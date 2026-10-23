"use client";

// TEKA OS — VOICE ROOMS app (Task 19-h).
// Live push-to-talk audio rooms over the dedicated socket.io mini service
// (mini-services/voice-service, port 3021 behind the Caddy gateway).
// Connection follows the sandbox demo pattern exactly: RELATIVE url only,
// the target port travels in the XTransformPort query — never a host/port.
//
// Flow:
//   lobby  → rooms list (REST GET /rooms?XTransformPort=3021 + live
//            rooms:state broadcasts) + create/join via room:join
//   room   → participant chips + LIVE badge + push-to-talk mic:
//            pointerdown starts getUserMedia → MediaRecorder (webm/opus,
//            1500ms timeslice) → base64 → voice:chunk {room,data,seq}
//   audio  → incoming voice:chunk chunks are queued per sender and played
//            sequentially through a single <Audio>; own echo is ignored.

import { useCallback, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";
import { Loader2, LogOut, Mic, Plus, Radio, Users } from "lucide-react";

import { useI18n } from "@/lib/i18n/store";
import { OS_STRINGS, pickL, type L2 } from "@/lib/os/strings";
import { useApp } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Constants ────────────────────────────────────────────────

// Gateway rule: relative path + XTransformPort query → voice-service:3021.
const VOICE_SOCKET_URL = "/?XTransformPort=3021";
const ROOMS_REST_URL = "/rooms?XTransformPort=3021";
const CHUNK_TIMESLICE_MS = 1500; // recorder emits a chunk every 1.5s
const MAX_CHUNK_CHARS = 60 * 1024; // matches the service-side base64 cap
const MAX_QUEUE = 24; // ~36s of buffered audio before we drop the backlog

type LobbyRoom = { name: string; count: number };
type Participant = { id: string; username: string };
type RoomStatePayload = { room: string; participants: Participant[] };
type VoiceChunkPayload = { data: string; seq: number; from: string };
type JoinAck = { ok: boolean; room?: string; participants?: Participant[]; error?: string };
type RoomsAck = { rooms?: LobbyRoom[] };

/** Decode a base64 payload into a webm audio Blob for playback. */
function base64ToBlob(base64: string): Blob {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: "audio/webm" });
}

/** Best webm/opus mime the browser can record ("" → browser default). */
function pickRecorderMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return "audio/webm;codecs=opus";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  return "";
}

// ─── App ──────────────────────────────────────────────────────

export function VoiceApp() {
  const locale = useI18n((s) => s.locale);
  const S = OS_STRINGS.voice;
  const L = (s: L2) => pickL(s, locale);
  const user = useApp((s) => s.user);
  const myUsername = user?.displayName || user?.username || "guest";

  // ── lobby / connection state ──
  const [rooms, setRooms] = useState<LobbyRoom[]>([]);
  const [roomDraft, setRoomDraft] = useState("");
  const [connected, setConnected] = useState(false);

  // ── active room state ──
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [speaking, setSpeaking] = useState<string[]>([]); // socket ids currently audible

  // ── mic state ──
  const [talking, setTalking] = useState(false);
  const [micBusy, setMicBusy] = useState(false);

  // ── refs (socket + capture + playback machinery) ──
  const socketRef = useRef<Socket | null>(null);
  const myIdRef = useRef("");
  const roomRef = useRef<string | null>(null);
  const pressRef = useRef(false);
  const talkingRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const seqRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<VoiceChunkPayload[]>([]);
  const playingRef = useRef(false);
  const speakerTimersRef = useRef<Map<string, number>>(new Map());

  // username mirror for the (mount-once) socket handlers
  const usernameRef = useRef(myUsername);
  useEffect(() => {
    usernameRef.current = myUsername;
  }, [myUsername]);

  // ── playback: drain the chunk queue through one Audio element ──
  const playNext = useCallback((): void => {
    if (playingRef.current) return;
    const next = queueRef.current.shift();
    if (!next) return;
    try {
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio();
        audioRef.current = audio;
      }
      const url = URL.createObjectURL(base64ToBlob(next.data));
      if (audio.src) URL.revokeObjectURL(audio.src);
      audio.src = url;
      playingRef.current = true;
      audio.onended = () => {
        playingRef.current = false;
        playNext();
      };
      void audio.play().catch(() => {
        // autoplay policy / decode failure — drop the chunk, keep the queue moving
        playingRef.current = false;
        playNext();
      });
    } catch {
      playingRef.current = false;
      playNext();
    }
  }, []);

  /** Stop (and discard) any active capture — pointerup / leave / unmount. */
  const stopCapture = useCallback((): void => {
    talkingRef.current = false;
    setTalking(false);
    const recorder = recorderRef.current;
    recorderRef.current = null;
    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop(); // fires a final dataavailable → tail chunk is relayed
      } catch {
        /* already stopped */
      }
    }
    const stream = streamRef.current;
    streamRef.current = null;
    stream?.getTracks().forEach((track) => track.stop());
  }, []);

  /** Push-to-talk press: mic → MediaRecorder → base64 chunks → voice:chunk. */
  const startCapture = async (): Promise<void> => {
    if (talkingRef.current || !roomRef.current) return;
    if (typeof MediaRecorder === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      toast.error(L(S.micDenied));
      return;
    }
    pressRef.current = true;
    setMicBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // the press may have been released while the permission prompt was open
      if (!pressRef.current || !roomRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const mime = pickRecorderMime();
      const recorder = new MediaRecorder(stream, {
        ...(mime ? { mimeType: mime } : {}),
        audioBitsPerSecond: 48000, // 1.5s ≈ 9KB → ~12KB base64, well under the cap
      });
      recorderRef.current = recorder;
      seqRef.current = 0;
      recorder.ondataavailable = (event: BlobEvent) => {
        const blob = event.data;
        const room = roomRef.current;
        const socket = socketRef.current;
        if (!blob || blob.size === 0 || !room || !socket || !socket.connected) return;
        const reader = new FileReader();
        reader.onload = () => {
          const result = typeof reader.result === "string" ? reader.result : "";
          const comma = result.indexOf(",");
          const base64 = comma >= 0 ? result.slice(comma + 1) : result;
          if (!base64 || base64.length > MAX_CHUNK_CHARS) return;
          seqRef.current += 1;
          socket.emit("voice:chunk", { room, data: base64, seq: seqRef.current });
        };
        reader.readAsDataURL(blob);
      };
      recorder.start(CHUNK_TIMESLICE_MS);
      talkingRef.current = true;
      setTalking(true);
    } catch {
      toast.error(L(S.micDenied));
    } finally {
      setMicBusy(false);
    }
  };

  const releasePress = (): void => {
    pressRef.current = false;
    stopCapture();
  };

  /** Join (or implicitly create) a room via the socket service. */
  const joinRoom = (rawName: string): void => {
    const name = rawName.trim().slice(0, 60);
    if (!name) return;
    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      toast.error(L(S.offlineHint));
      return;
    }
    socket.emit("room:join", { room: name, username: myUsername }, (ack: JoinAck) => {
      if (!ack?.ok || !ack.room) {
        toast.error(L(S.offlineHint));
        return;
      }
      roomRef.current = ack.room;
      setActiveRoom(ack.room);
      setParticipants(ack.participants ?? []);
      queueRef.current = [];
      setRoomDraft("");
    });
  };

  /** Leave the active room and reset all room/audio state. */
  const leaveRoom = (): void => {
    const socket = socketRef.current;
    const room = roomRef.current;
    pressRef.current = false;
    stopCapture();
    // drop pending playback
    queueRef.current = [];
    const audio = audioRef.current;
    if (audio) {
      audio.onended = null;
      if (!audio.paused) audio.pause();
      if (audio.src) URL.revokeObjectURL(audio.src);
    }
    playingRef.current = false;
    speakerTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    speakerTimersRef.current.clear();
    roomRef.current = null;
    setActiveRoom(null);
    setParticipants([]);
    setSpeaking([]);
    if (socket && room) socket.emit("room:leave", { room });
  };

  // ── socket lifecycle (mount once) ──
  useEffect(() => {
    const socket = io(VOICE_SOCKET_URL, {
      path: "/", // gateway forwards every path as-is — matches the demo pattern
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1200,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      forceNew: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      myIdRef.current = socket.id ?? "";
      setConnected(true);
      setSpeaking([]);
      socket.emit("rooms:list"); // server acks by broadcasting rooms:state
      // mid-session reconnect: re-join the room we were in (the service
      // cleaned our membership up on disconnect)
      const room = roomRef.current;
      if (room) {
        socket.emit(
          "room:join",
          { room, username: usernameRef.current },
          (ack: JoinAck) => {
            if (ack?.ok && ack.room === room) {
              setParticipants(ack.participants ?? []);
            } else {
              roomRef.current = null;
              setActiveRoom(null);
              setParticipants([]);
            }
          }
        );
      }
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", () => setConnected(false));

    // lobby list (also broadcast on every join/leave)
    socket.on("rooms:state", (list: LobbyRoom[]) => {
      if (Array.isArray(list)) setRooms(list);
    });

    // per-room presence
    socket.on("room:state", (state: RoomStatePayload) => {
      if (!state || typeof state.room !== "string" || !Array.isArray(state.participants)) return;
      if (state.room !== roomRef.current) return;
      setParticipants(state.participants);
    });

    // incoming audio → queue + sequential playback + speaking indicator
    socket.on("voice:chunk", (chunk: VoiceChunkPayload) => {
      if (!chunk || typeof chunk.data !== "string" || !chunk.data) return;
      if (chunk.from === socket.id) return; // never play our own echo
      if (!roomRef.current) return;
      queueRef.current.push(chunk);
      if (queueRef.current.length > MAX_QUEUE) {
        queueRef.current.splice(0, queueRef.current.length - MAX_QUEUE);
      }
      playNext();
      setSpeaking((prev) => (prev.includes(chunk.from) ? prev : [...prev, chunk.from]));
      const timers = speakerTimersRef.current;
      const existing = timers.get(chunk.from);
      if (existing) window.clearTimeout(existing);
      timers.set(
        chunk.from,
        window.setTimeout(() => {
          timers.delete(chunk.from);
          setSpeaking((prev) => prev.filter((id) => id !== chunk.from));
        }, CHUNK_TIMESLICE_MS + 200)
      );
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      stopCapture();
      queueRef.current = [];
      const audio = audioRef.current;
      if (audio) {
        audio.onended = null;
        if (!audio.paused) audio.pause();
        if (audio.src) URL.revokeObjectURL(audio.src);
      }
      playingRef.current = false;
      speakerTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      speakerTimersRef.current.clear();
    };
  }, [playNext, stopCapture]);

  // ── lobby bootstrap via REST (socket rooms:state keeps it live) ──
  useEffect(() => {
    let cancelled = false;
    // Gateway path first (Caddy deployments); server proxy as a resilient
    // fallback for environments that bypass the gateway (sandbox preview).
    const load = async (): Promise<RoomsAck | null> => {
      try {
        const res = await fetch(ROOMS_REST_URL, { cache: "no-store" });
        if (res.ok) return (await res.json()) as RoomsAck;
      } catch { /* fall through */ }
      try {
        const res = await fetch("/api/voice/rooms", { cache: "no-store" });
        if (res.ok) return (await res.json()) as RoomsAck;
      } catch { /* offline */ }
      return null;
    };
    load()
      .then((data: RoomsAck | null) => {
        if (!cancelled && data && Array.isArray(data.rooms)) setRooms(data.rooms);
      })
      .catch(() => {
        /* service offline — the socket listener will update when it's back */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── lobby view ─────────────────────────────────────────────

  if (activeRoom === null) {
    return (
      <div dir="auto" className="h-full space-y-4 overflow-y-auto teka-os-scroll p-4">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06]">
              <Radio className="h-5 w-5 text-cyan-300" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-white/90">{L(S.tagline)}</h2>
              <p className="font-mono text-[10px] text-white/40" dir="ltr">
                TEKA VOICE · P2T ROOMS
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] ${
              connected
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-amber-400/30 bg-amber-400/10 text-amber-300"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-amber-400"}`} />
            {connected ? L(S.connected) : L(S.offlineHint)}
          </span>
        </div>

        {/* create room */}
        <div className="flex gap-2">
          <Input
            value={roomDraft}
            onChange={(e) => setRoomDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") joinRoom(roomDraft);
            }}
            maxLength={60}
            placeholder={L(S.roomName)}
            aria-label={L(S.roomName)}
            className="h-10 flex-1 border-white/10 bg-white/[0.04] text-sm text-white/85 placeholder:text-white/30"
          />
          <Button
            onClick={() => joinRoom(roomDraft)}
            disabled={!connected || !roomDraft.trim()}
            className="h-10 gap-1.5 bg-cyan-500/90 px-4 text-white hover:bg-cyan-500"
          >
            <Plus className="h-4 w-4" />
            {L(S.create)}
          </Button>
        </div>

        {/* room list */}
        {rooms.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 text-center text-sm text-white/45">
            {L(S.roomEmpty)}
          </div>
        ) : (
          <div className="space-y-2">
            {rooms.map((room) => (
              <button
                key={room.name}
                type="button"
                onClick={() => joinRoom(room.name)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan-400/25 hover:bg-white/[0.06]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06]">
                    <Radio className="h-4 w-4 text-cyan-300" />
                  </span>
                  <span dir="auto" className="truncate text-sm text-white/85">
                    {room.name}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/50" dir="ltr">
                    <Users className="h-3 w-3" />
                    {room.count}
                  </span>
                  <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] text-cyan-300">
                    {L(S.join)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ─── room view ──────────────────────────────────────────────

  return (
    <div dir="auto" className="h-full space-y-4 overflow-y-auto teka-os-scroll p-4">
      {/* header: room + LIVE + leave */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06]">
            <Radio className="h-5 w-5 text-cyan-300" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span dir="auto" className="truncate text-sm font-semibold text-white/90">
                {activeRoom}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-rose-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                </span>
                LIVE
              </span>
            </div>
            <p className="inline-flex items-center gap-1 font-mono text-[10px] text-white/40" dir="ltr">
              <Users className="h-3 w-3" />
              {participants.length}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={leaveRoom}
          className="gap-1.5 border-white/10 bg-white/[0.04] text-white/75 hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
        >
          <LogOut className="h-3.5 w-3.5" />
          {L(S.leave)}
        </Button>
      </div>

      {/* participants */}
      <section className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70">{L(S.participants)}</h3>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => {
            const isMe = p.id === myIdRef.current;
            const isSpeaking = speaking.includes(p.id);
            return (
              <span
                key={p.id}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  isSpeaking
                    ? "border-rose-400/40 bg-rose-400/10 text-white"
                    : "border-white/10 bg-white/[0.04] text-white/75"
                } ${isMe ? "ring-1 ring-cyan-400/40" : ""}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isSpeaking ? "animate-pulse bg-rose-400" : "bg-emerald-400/70"
                  }`}
                />
                <span dir="auto" className="max-w-40 truncate">
                  {p.username}
                </span>
              </span>
            );
          })}
        </div>
      </section>

      {/* push-to-talk */}
      <section className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <button
          type="button"
          aria-label={talking ? L(S.speaking) : L(S.holdToTalk)}
          aria-pressed={talking}
          disabled={micBusy}
          onPointerDown={(e) => {
            e.preventDefault();
            void startCapture();
          }}
          onPointerUp={releasePress}
          onPointerLeave={releasePress}
          onPointerCancel={releasePress}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              void startCapture();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") releasePress();
          }}
          onContextMenu={(e) => e.preventDefault()}
          className={`relative flex h-24 w-24 touch-none select-none items-center justify-center rounded-full text-white transition-all duration-150 ${
            talking
              ? "scale-105 bg-rose-600 shadow-[0_0_44px_rgba(244,63,94,0.45)]"
              : "bg-emerald-500/90 shadow-[0_0_24px_rgba(16,185,129,0.25)] hover:bg-emerald-500"
          } disabled:cursor-wait disabled:opacity-80`}
        >
          {talking && <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/40" />}
          {micBusy ? <Loader2 className="h-9 w-9 animate-spin" /> : <Mic className="h-9 w-9" />}
        </button>
        <span className={`text-xs ${talking ? "text-rose-300" : "text-white/60"}`}>
          {talking ? L(S.speaking) : L(S.holdToTalk)}
        </span>
        <span className="max-w-sm text-center text-[10px] leading-relaxed text-white/35">
          {L(S.tagline)}
        </span>
      </section>
    </div>
  );
}
