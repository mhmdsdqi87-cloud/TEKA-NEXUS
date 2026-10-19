// E2E chat-service smoke test: register → create project → join room →
// send message → react → verify broadcasts. Run: bun scripts/chat-e2e.ts
import { io, Socket } from "socket.io-client";

const BASE = "http://localhost:3000";
const CHAT = "http://localhost:3030";
const STAMP = Date.now().toString(36).slice(-6);
const EMAIL = `chattest-${STAMP}@teka.dev`;
const PASSWORD = "ChatTest123";
const results: string[] = [];
const ok = (name: string, pass: boolean, extra = "") =>
  results.push(`${pass ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);

async function main() {
  // 1. register
  const reg = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD, username: `chattest${STAMP}`.slice(0, 20) }),
  });
  const regBody = await reg.json();
  ok("register", reg.ok && !!regBody?.token, `status=${reg.status}`);

  const token: string = regBody.token;

  // 2. create project
  const proj = await fetch(`${BASE}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: `teka_session=${token}` },
    body: JSON.stringify({
      name: `Chat E2E ${STAMP}`,
      tagline: "Automated smoke test",
      category: "WEB_DEVELOPMENT",
      tags: ["e2e"],
    }),
  });
  const projBody = await proj.json();
  const projectId: string | undefined = projBody?.project?.id ?? projBody?.id;
  ok("create project", proj.ok && !!projectId, `id=${projectId ?? "none"}`);
  if (!projectId) throw new Error("no project id: " + JSON.stringify(projBody).slice(0, 200));

  // 3. socket connect + join
  const socket: Socket = io(CHAT, {
    transports: ["websocket", "polling"],
    auth: { token },
    path: "/",
  });
  const connected = await new Promise<boolean>((resolve) => {
    const t = setTimeout(() => resolve(false), 8000);
    socket.on("connect", () => { clearTimeout(t); resolve(true); });
    socket.on("connect_error", () => { clearTimeout(t); resolve(false); });
  });
  ok("socket connect + session auth", connected);

  const joinAck: any = await new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), 8000);
    socket.emit("chat:join", { projectId }, (r: any) => { clearTimeout(t); resolve(r); });
  });
  ok("chat:join ack", joinAck?.ok === true, `messages=${joinAck?.messages?.length ?? "?"} presence=${joinAck?.presence?.length ?? "?"}`);

  // 4. send message — sender is in the room, so broadcast comes back
  const received: any[] = await new Promise((resolve) => {
    const msgs: any[] = [];
    const t = setTimeout(() => resolve(msgs), 5000);
    socket.on("chat:message", (m: any) => { msgs.push(m); if (msgs.length >= 1) { clearTimeout(t); resolve(msgs); } });
    socket.emit("chat:message", { projectId, text: `hello from e2e ${STAMP}`, clientTag: `t-${STAMP}` });
  });
  ok("chat:message broadcast", received.length >= 1 && received[0]?.text?.includes(STAMP), `text="${received[0]?.text ?? "none"}"`);
  const messageId: string | undefined = received[0]?.id;

  // 5. react to the message
  const reaction: any = await new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), 5000);
    socket.on("chat:react:update", (r: any) => { clearTimeout(t); resolve(r); });
    if (messageId) socket.emit("chat:react", { projectId, messageId, emoji: "🔥" });
    else { clearTimeout(t); resolve(null); }
  });
  ok("chat:react update", !!reaction && reaction?.projectId === projectId, JSON.stringify(reaction?.tallies ?? reaction ?? {}).slice(0, 80));

  // 6. typing indicator — needs a SECOND socket in the room, because
  // socket.to(room) deliberately excludes the sending socket only.
  const socket2: Socket = io(CHAT, {
    transports: ["websocket", "polling"],
    auth: { token },
    path: "/",
  });
  const connected2 = await new Promise<boolean>((resolve) => {
    const t = setTimeout(() => resolve(false), 8000);
    socket2.on("connect", () => { clearTimeout(t); resolve(true); });
    socket2.on("connect_error", () => { clearTimeout(t); resolve(false); });
  });
  await new Promise((resolve) => {
    const t = setTimeout(resolve, 4000);
    socket2.emit("chat:join", { projectId }, () => { clearTimeout(t); resolve(null); });
  });
  const typing: any = await new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), 4000);
    socket2.on("chat:typing", (r: any) => { clearTimeout(t); resolve(r); });
    if (connected2) socket.emit("chat:typing", { projectId, isTyping: true });
    else { clearTimeout(t); resolve(null); }
  });
  ok("chat:typing (second socket hears it)", !!typing && typing?.isTyping === true, `user=@${typing?.username ?? "?"}`);

  socket.close();
  socket2.close();

  // 7. cleanup: delete the user (cascades project + members)
  const del = await fetch(`${BASE}/api/me/account`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Cookie: `teka_session=${token}` },
    body: JSON.stringify({ password: PASSWORD }),
  });
  ok("cleanup test user", del.ok || del.status === 404, `status=${del.status}`);

  console.log(results.join("\n"));
  const failed = results.filter((r) => r.startsWith("FAIL")).length;
  console.log(failed === 0 ? "\nALL CHAT E2E CHECKS PASSED ✅" : `\n${failed} CHECK(S) FAILED ❌`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("E2E crashed:", e?.message ?? e);
  console.log(results.join("\n"));
  process.exit(1);
});
