/**
 * TEKA NEXUS — demo data seeder.
 * All content below is clearly-labeled DEMO CONTENT for the sandbox preview.
 * Demo accounts all use password: demo1234
 * Run: bunx tsx scripts/seed.ts  (or bun run scripts/seed.ts)
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Deterministic pseudo-random for reproducible-ish seeds
let seedState = 42;
function rand(max: number) {
  seedState = (seedState * 1664525 + 1013904223) % 4294967296;
  return seedState % max;
}
const daysAgo = (d: number, hourJitter = 0) =>
  new Date(Date.now() - d * 86400000 - hourJitter * 3600000);

async function wipe() {
  // child-most first, though most relations cascade
  await db.contributionEvent.deleteMany();
  await db.projectActivity.deleteMany();
  await db.notification.deleteMany();
  await db.report.deleteMany();
  await db.userBlock.deleteMany();
  await db.taskComment.deleteMany();
  await db.task.deleteMany();
  await db.milestone.deleteMany();
  await db.projectUpdate.deleteMany();
  await db.collaborationRequest.deleteMany();
  await db.projectComment.deleteMany();
  await db.projectLike.deleteMany();
  await db.projectSave.deleteMany();
  await db.follow.deleteMany();
  await db.projectMember.deleteMany();
  await db.projectTag.deleteMany();
  await db.projectRequiredSkill.deleteMany();
  await db.project.deleteMany();
  await db.userSkill.deleteMany();
  await db.userNotificationPrefs.deleteMany();
  await db.session.deleteMany();
  await db.user.deleteMany();
}

const SKILL_SLUGS = [
  "frontend-development","backend-development","mobile-development","game-development",
  "ai-and-data","ui-ux","qa-testing","devops","technical-writing","product-management",
  "hardware-iot","other",
];

const SKILL_NAMES: Record<string, string> = {
  "frontend-development": "Frontend Development",
  "backend-development": "Backend Development",
  "mobile-development": "Mobile Development",
  "game-development": "Game Development",
  "ai-and-data": "AI and Data",
  "ui-ux": "UI/UX",
  "qa-testing": "QA and Testing",
  "devops": "DevOps",
  "technical-writing": "Technical Writing",
  "product-management": "Product Management",
  "hardware-iot": "Hardware & IoT",
  "other": "Other",
};

async function main() {
  console.log("🌱 Seeding TEKA NEXUS demo content…");
  await wipe();

  // Seed the skill taxonomy first (FK target for user/project skills)
  for (const slug of SKILL_SLUGS) {
    await db.skill.upsert({ where: { slug }, update: {}, create: { slug, name: SKILL_NAMES[slug] ?? slug } });
  }
  const skillRows = await db.skill.findMany();
  const skillId = (slug: string) => skillRows.find((s) => s.slug === slug)!.id;

  const passwordHash = (await import("../src/lib/password")).hashPasswordForSeed("demo1234");

  // ── Users ────────────────────────────────────────────────
  const usersData = [
    { username: "maya", email: "maya@teka.dev", displayName: "Maya Chen", avatarColor: "cyan", bio: "Design systems nerd. I turn messy tokens into tidy primitives. Currently building in public.", skills: ["frontend-development","ui-ux"], website: "https://mayachen.example", xp: 340, reputation: 150 },
    { username: "dario", email: "dario@teka.dev", displayName: "Dario Vlahović", avatarColor: "violet", bio: "Backend & infra. Postgres, queues, and the occasional cursed cron job.", skills: ["backend-development","devops"], website: "", xp: 520, reputation: 240 },
    { username: "aylin", email: "aylin@teka.dev", displayName: "Aylin Kaya", avatarColor: "ember", bio: "ML engineer. Visual explanations > dense papers. Building tools that make AI less magic.", skills: ["ai-and-data","frontend-development"], website: "https://aylinkaya.example", xp: 415, reputation: 190 },
    { username: "tomas", email: "tomas@teka.dev", displayName: "Tomás Rivera", avatarColor: "lime", bio: "Indie game dev. Shaders, sprites, and shipping small weird games.", skills: ["game-development","other"], website: "", xp: 260, reputation: 95 },
    { username: "nadia", email: "nadia@teka.dev", displayName: "Nadia Osei", avatarColor: "rose", bio: "Mobile-first everything. Flutter by day, React Native by night.", skills: ["mobile-development","ui-ux"], website: "", xp: 310, reputation: 120 },
    { username: "kenji", email: "kenji@teka.dev", displayName: "Kenji Watanabe", avatarColor: "gold", bio: "Security researcher. Breaking things politely since 2016.", skills: ["backend-development","qa-testing"], website: "", xp: 480, reputation: 210 },
  ];

  const users: Record<string, { id: string }> = {};
  for (const [i, u] of usersData.entries()) {
    const created = await db.user.create({
      data: {
        username: u.username,
        email: u.email,
        passwordHash,
        displayName: u.displayName,
        avatarColor: u.avatarColor,
        bio: u.bio,
        websiteUrl: u.website,
        goals: JSON.stringify([["build","contribute","learn","discover"][i % 4], "discover"]),
        interests: JSON.stringify([["OPEN_SOURCE","DEVELOPER_TOOLS","ARTIFICIAL_INTELLIGENCE","INDIE_GAMES","MOBILE_DEVELOPMENT","CYBERSECURITY"][i]]),
        xp: u.xp,
        reputation: u.reputation,
        onboardingCompleted: true,
        createdAt: daysAgo(40 - i * 3),
      },
    });
    users[u.username] = created;
    await db.userSkill.createMany({
      data: u.skills.map((s) => ({ userId: created.id, skillId: skillId(s) })),
    });
    await db.userNotificationPrefs.create({ data: { userId: created.id } });
  }

  // ── Projects ─────────────────────────────────────────────
  type ProjSpec = {
    slug: string; name: string; tagline: string; description: string;
    category: string; status: string; owner: string; cover: string;
    tags: string[]; skills: string[]; repo?: string; demo?: string; site?: string;
    members?: [string, string][]; // [username, role]
  };

  const projects: ProjSpec[] = [
    {
      slug: "nexus-core", name: "Nexus Core", category: "OPEN_SOURCE", status: "RELEASED", owner: "maya",
      tagline: "The open-source design system powering the TEKA ecosystem — tokens, primitives, docs.",
      description:
        "Nexus Core is a component and token library extracted from the TEKA design language.\n\n## What's inside\n- 40+ accessible primitives (New York style)\n- Design tokens as CSS variables — dark graphite & cyan/violet accents\n- First-class TypeScript, zero runtime CSS-in-JS\n- Docs site with live playground\n\n## Status\nv1.0 released. We're stabilizing the theming API and looking for contributors on docs and a11y audits.",
      cover: "/covers/nexus-core.png", tags: ["design-system","react","typescript","a11y"],
      skills: ["frontend-development","ui-ux","technical-writing"],
      repo: "https://github.com/teka/nexus-core", demo: "https://nexus-core.example", site: "https://teka.dev",
      members: [["dario","ADMIN"],["nadia","CONTRIBUTOR"],["kenji","CONTRIBUTOR"]],
    },
    {
      slug: "pulseboard", name: "PulseBoard", category: "DEVELOPER_TOOLS", status: "IN_DEVELOPMENT", owner: "dario",
      tagline: "Real-time observability dashboard for tiny teams — logs, traces, and heartbeats in one pane.",
      description:
        "PulseBoard aggregates structured logs, uptime heartbeats, and OpenTelemetry traces into a single keyboard-driven dashboard. Self-hostable in under five minutes with SQLite or Postgres.\n\n## Why\nSmall teams don't need an observability empire — they need answers fast. PulseBoard is the minimal, honest option.\n\n## Roadmap\n- [x] Log ingest API\n- [x] Live tail view\n- [ ] Trace waterfall\n- [ ] Alert rules\n- [ ] Public status pages",
      cover: "/covers/pulseboard.png", tags: ["observability","golang","sqlite","self-hosted"],
      skills: ["backend-development","devops","frontend-development"],
      repo: "https://github.com/teka/pulseboard", demo: "",
      members: [["maya","CONTRIBUTOR"],["kenji","VIEWER"]],
    },
    {
      slug: "neuron-forge", name: "NeuronForge", category: "ARTIFICIAL_INTELLIGENCE", status: "BETA", owner: "aylin",
      tagline: "Build, train, and understand small neural networks visually — right in your browser.",
      description:
        "NeuronForge is a visual playground for small neural networks. Drag layers, wire tensors, and watch gradients flow in real time. Every visualization is grounded in the actual math — no black boxes.\n\n## Current beta\nWebGL2 backend, MNIST-class models, export to ONNX. Educational mode explains each operation as it runs.\n\n## Looking for\nContributors with WebGL or PyTorch experience, plus technical writers for the tutorial track.",
      cover: "/covers/neuron-forge.png", tags: ["deep-learning","webgl","education","onnx"],
      skills: ["ai-and-data","frontend-development","technical-writing"],
      demo: "https://neuronforge.example", repo: "https://github.com/teka/neuron-forge",
      members: [["tomas","CONTRIBUTOR"]],
    },
    {
      slug: "voidrunner", name: "Voidrunner", category: "INDIE_GAMES", status: "IN_DEVELOPMENT", owner: "tomas",
      tagline: "An isometric roguelike about parkour across collapsing sky islands.",
      description:
        "Voidrunner is a hand-crafted isometric roguelike. Every run the sky islands rearrange; chain wall-runs and grapples before the void eats the floor.\n\n## Stack\nGodot 4, custom lighting, procedural island grammar. Demo build targets 60fps on integrated GPUs.\n\n## Help wanted\nPixel artists and a sound designer would change this project's life.",
      cover: "/covers/voidrunner.png", tags: ["godot","roguelike","pixel-art","gamedev"],
      skills: ["game-development","ui-ux","other"],
      demo: "",
      members: [["nadia","CONTRIBUTOR"]],
    },
    {
      slug: "sentinel-mesh", name: "Sentinel Mesh", category: "CYBERSECURITY", status: "PLANNING", owner: "kenji",
      tagline: "A distributed honeypot mesh that maps scanner behavior across community-run nodes.",
      description:
        "Sentinel Mesh pools anonymized attacker telemetry from community honeypot nodes into a shared threat map. Think of it as weather radar for internet background noise.\n\n## Phase\nPlanning. Protocol draft v0 lives in the repo wiki. We need Rust and Go folks, plus someone who enjoys dashboards more than they should.",
      cover: "/covers/sentinel-mesh.png", tags: ["security","honeypot","rust","golang"],
      skills: ["backend-development","devops","ai-and-data"],
      repo: "https://github.com/teka/sentinel-mesh",
      members: [],
    },
    {
      slug: "hivemote", name: "HiveMote", category: "HARDWARE_IOT", status: "IDEA", owner: "nadia",
      tagline: "An ESP32 hub that unifies orphaned smart-home remotes into one honest API.",
      description:
        "HiveMote is an idea-stage project: one ESP32-based hub that speaks IR, 433MHz RF, BLE, and Wi-Fi so your shelf of orphaned remotes becomes a single clean local API.\n\n## Status\nIdea. BOM draft in the works. Looking for hardware folks and a mobile dev for the companion app.",
      cover: "/covers/hivemote.png", tags: ["esp32","iot","smart-home","hardware"],
      skills: ["hardware-iot","mobile-development","backend-development"],
      members: [],
    },
  ];

  const projIds: Record<string, string> = {};
  for (const [i, p] of projects.entries()) {
    const created = await db.project.create({
      data: {
        slug: p.slug, name: p.name, tagline: p.tagline, description: p.description,
        category: p.category, status: p.status, visibility: "PUBLIC",
        coverImage: p.cover, ownerId: users[p.owner].id,
        repositoryUrl: p.repo ?? "", demoUrl: p.demo ?? "", websiteUrl: p.site ?? "",
        createdAt: daysAgo(30 - i * 4, i), updatedAt: daysAgo(rand(6), i),
      },
    });
    projIds[p.slug] = created.id;

    await db.projectMember.create({
      data: { projectId: created.id, userId: users[p.owner].id, role: "OWNER", joinedAt: created.createdAt },
    });
    for (const [uname, role] of p.members ?? []) {
      await db.projectMember.create({
        data: { projectId: created.id, userId: users[uname].id, role, joinedAt: daysAgo(rand(20) + 1, i) },
      });
    }
    await db.projectTag.createMany({ data: p.tags.map((t) => ({ projectId: created.id, tag: t })) });
    await db.projectRequiredSkill.createMany({
      data: p.skills.filter((s) => SKILL_SLUGS.includes(s)).map((s) => ({ projectId: created.id, skillId: skillId(s) })),
    });
  }

  // ── Updates ──────────────────────────────────────────────
  const updates: [string, string, string, string, number][] = [
    ["nexus-core", "maya", "v1.0 — Theming API is stable", "After 3 betas, the theming API is frozen. Tokens now ship as plain CSS variables with an optional TS helper. Breaking changes (if any) will wait for v2. Huge thanks to early adopters who filed 60+ issues.", 1],
    ["nexus-core", "nadia", "A11y audit: first pass done", "Ran keyboard-only and screen-reader passes on all 40 primitives. Fixed focus traps in Dialog and Popover. Full report lands in the repo wiki this week.", 4],
    ["pulseboard", "dario", "Live tail hits 12k lines/s", "Rewrote the ingest path with batching — live tail now sustains 12k lines/s on a $5 VPS. Next up: trace waterfall.", 2],
    ["pulseboard", "maya", "New: keyboard-first navigation", "Every panel is reachable with j/k and fuzzy filter. Vim folks, I got you.", 5],
    ["neuron-forge", "aylin", "Beta 0.9 — ONNX export", "You can now export trained models to ONNX. Educational mode narrates backprop as it happens. Feedback welcome in comments!", 3],
    ["voidrunner", "tomas", "Grappling hook + sky grammar v2", "New traversal verb: the grapple. Islands now generate in coherent weather systems instead of pure noise. Demo soon.", 6],
  ];
  for (const [slug, author, title, body, d] of updates) {
    await db.projectUpdate.create({
      data: { projectId: projIds[slug], authorId: users[author].id, title, body, createdAt: daysAgo(d, rand(8)), updatedAt: daysAgo(d, rand(8)) },
    });
  }

  // ── Milestones ───────────────────────────────────────────
  const milestones: [string, string, string, number | null, string][] = [
    ["nexus-core", "v1.0 stable release", "Tokens frozen, docs live, 40 primitives audited.", null, "maya"],
    ["nexus-core", "A11y gold pass", "Every primitive passes keyboard + SR audit.", 14, "maya"],
    ["pulseboard", "Ingest v2", "Batched ingest, 10k+ lines/s.", null, "dario"],
    ["pulseboard", "Trace waterfall", "OpenTelemetry waterfall view.", 21, "dario"],
    ["neuron-forge", "ONNX export", "One-click model export.", null, "aylin"],
    ["voidrunner", "Vertical slice demo", "3 biomes, grapple, one boss.", 30, "tomas"],
  ];
  for (const [slug, title, description, dueInDays, creator] of milestones) {
    await db.milestone.create({
      data: {
        projectId: projIds[slug], title, description, createdById: users[creator].id,
        dueAt: dueInDays ? new Date(Date.now() + dueInDays * 86400000) : null,
        completedAt: dueInDays ? null : daysAgo(rand(5) + 1),
        createdAt: daysAgo(rand(15) + 5),
      },
    });
  }

  // ── Tasks ────────────────────────────────────────────────
  type TaskSpec = { slug: string; title: string; description?: string; status: string; priority: string; assignee?: string; createdBy: string; done?: boolean };
  const tasks: TaskSpec[] = [
    { slug: "nexus-core", title: "Audit Dialog focus trap on iOS Safari", status: "IN_PROGRESS", priority: "HIGH", assignee: "nadia", createdBy: "maya" },
    { slug: "nexus-core", title: "Write migration guide v0.x → v1", status: "TODO", priority: "NORMAL", createdBy: "maya" },
    { slug: "nexus-core", title: "Ship Toast component", status: "DONE", priority: "NORMAL", assignee: "maya", createdBy: "maya", done: true },
    { slug: "nexus-core", title: "Explore RTL support for primitives", status: "BACKLOG", priority: "LOW", createdBy: "dario" },
    { slug: "pulseboard", title: "Trace waterfall view", description: "OpenTelemetry spans rendered as waterfall with drill-down.", status: "IN_REVIEW", priority: "URGENT", assignee: "dario", createdBy: "dario" },
    { slug: "pulseboard", title: "Alert rules engine", status: "TODO", priority: "HIGH", createdBy: "dario" },
    { slug: "pulseboard", title: "Dark graphite default theme", status: "DONE", priority: "LOW", assignee: "maya", createdBy: "dario", done: true },
    { slug: "neuron-forge", title: "Narrate backprop in educational mode", status: "IN_PROGRESS", priority: "NORMAL", assignee: "aylin", createdBy: "aylin" },
    { slug: "neuron-forge", title: "Tutorial: your first convnet", status: "TODO", priority: "NORMAL", createdBy: "aylin" },
    { slug: "voidrunner", title: "Grapple physics tuning pass", status: "IN_PROGRESS", priority: "HIGH", assignee: "tomas", createdBy: "tomas" },
    { slug: "voidrunner", title: "Sky grammar v2: weather systems", status: "DONE", priority: "NORMAL", assignee: "tomas", createdBy: "tomas", done: true },
    { slug: "sentinel-mesh", title: "Draft protocol v0 spec", status: "IN_PROGRESS", priority: "URGENT", assignee: "kenji", createdBy: "kenji" },
    { slug: "sentinel-mesh", title: "Pick honeypot sensor baseline", status: "BACKLOG", priority: "NORMAL", createdBy: "kenji" },
  ];
  for (const [i, t] of tasks.entries()) {
    await db.task.create({
      data: {
        projectId: projIds[t.slug], title: t.title, description: t.description ?? "",
        status: t.status, priority: t.priority,
        assigneeId: t.assignee ? users[t.assignee].id : null,
        createdById: users[t.createdBy].id,
        position: (i + 1) * 1000,
        completedAt: t.done ? daysAgo(rand(7) + 1) : null,
        createdAt: daysAgo(rand(18) + 2, i), updatedAt: daysAgo(rand(5), i),
      },
    });
  }

  // ── Collaboration requests ───────────────────────────────
  const requests: [string, string, string, string][] = [
    ["nexus-core", "kenji", "CONTRIBUTOR", "Hi! I maintain UI libs at work and ran an a11y audit on Nexus Core last weekend — found 3 focus issues with patches ready. Would love to contribute."],
    ["neuron-forge", "nadia", "CONTRIBUTOR", "Mobile WebGL perf is my bread and butter. I'd like to help make the playground smooth on mid-range phones, and I can own the touch UX."],
    ["pulseboard", "tomas", "VIEWER", "I run a tiny game studio and would love early access to give feedback from the 'small team that hates dashboards' perspective."],
  ];
  for (const [slug, applicant, role, intro] of requests) {
    await db.collaborationRequest.create({
      data: {
        projectId: projIds[slug], applicantId: users[applicant].id, requestedRole: role,
        introduction: intro, status: "PENDING", createdAt: daysAgo(rand(4) + 1, rand(10)),
      },
    });
  }

  // ── Project comments ─────────────────────────────────────
  const comments: [string, string, string, number][] = [
    ["nexus-core", "dario", "The token freeze is such a relief — upgraded our internal dashboard in an afternoon.", 1],
    ["nexus-core", "tomas", "Any plan for a Godot-flavored token export? Asking for a very biased friend (me).", 2],
    ["pulseboard", "kenji", "12k lines/s on a $5 VPS is legitimately impressive. What's the memory footprint at that rate?", 2],
    ["neuron-forge", "maya", "The narrated backprop is the best explanation I've seen outside a classroom.", 2],
  ];
  for (const [slug, author, body, d] of comments) {
    await db.projectComment.create({
      data: { projectId: projIds[slug], authorId: users[author].id, body, createdAt: daysAgo(d, rand(12)) },
    });
  }

  // ── Likes / saves / follows ──────────────────────────────
  const allUsernames = usersData.map((u) => u.username);
  for (const slug of Object.keys(projIds)) {
    for (const uname of allUsernames) {
      if (rand(100) < 55) await db.projectLike.create({ data: { userId: users[uname].id, projectId: projIds[slug] } });
    }
  }
  for (const uname of allUsernames) {
    for (const other of allUsernames) {
      if (uname !== other && rand(100) < 50) {
        await db.follow.create({ data: { followerId: users[uname].id, followingId: users[other].id } });
      }
    }
  }

  // ── Activity feed (public projects, spread over 2 weeks) ──
  const feed: [string, string, string | null, string, number][] = [
    ["nexus-core", "RELEASE_PUBLISHED", "maya", JSON.stringify({ title: "Nexus Core v1.0 released" }), 1],
    ["pulseboard", "UPDATE_POSTED", "dario", JSON.stringify({ updateTitle: "Live tail hits 12k lines/s" }), 2],
    ["neuron-forge", "UPDATE_POSTED", "aylin", JSON.stringify({ updateTitle: "Beta 0.9 — ONNX export" }), 3],
    ["nexus-core", "MEMBER_JOINED", "nadia", JSON.stringify({ memberName: "Nadia Osei" }), 4],
    ["voidrunner", "UPDATE_POSTED", "tomas", JSON.stringify({ updateTitle: "Grappling hook + sky grammar v2" }), 6],
    ["nexus-core", "UPDATE_POSTED", "nadia", JSON.stringify({ updateTitle: "A11y audit: first pass done" }), 4],
    ["pulseboard", "TASK_COMPLETED", "dario", JSON.stringify({ taskTitle: "Dark graphite default theme" }), 5],
    ["voidrunner", "TASK_COMPLETED", "tomas", JSON.stringify({ taskTitle: "Sky grammar v2: weather systems" }), 7],
    ["neuron-forge", "MEMBER_JOINED", "tomas", JSON.stringify({ memberName: "Tomás Rivera" }), 8],
    ["pulseboard", "MILESTONE_COMPLETED", "dario", JSON.stringify({ milestoneTitle: "Ingest v2" }), 9],
    ["nexus-core", "UPDATE_POSTED", "maya", JSON.stringify({ updateTitle: "v1.0 — Theming API is stable" }), 1],
    ["pulseboard", "PROJECT_CREATED", "dario", JSON.stringify({}), 26],
    ["neuron-forge", "PROJECT_CREATED", "aylin", JSON.stringify({}), 22],
    ["voidrunner", "PROJECT_CREATED", "tomas", JSON.stringify({}), 18],
    ["nexus-core", "PROJECT_CREATED", "maya", JSON.stringify({}), 30],
    ["sentinel-mesh", "PROJECT_CREATED", "kenji", JSON.stringify({}), 14],
    ["hivemote", "PROJECT_CREATED", "nadia", JSON.stringify({}), 10],
  ];
  for (const [slug, eventType, actor, metadata, d] of feed) {
    await db.projectActivity.create({
      data: { projectId: projIds[slug], actorId: actor ? users[actor].id : null, eventType, metadata, createdAt: daysAgo(d, rand(20)) },
    });
  }

  // ── Contribution events (consistent with XP rules) ───────
  const contrib: [string, string, string, string, number, number, number][] = [
    ["maya", "PROJECT_CREATED", "project", "nexus-core", 15, 0, 30],
    ["maya", "RELEASE_PUBLISHED", "project", "nexus-core", 30, 15, 1],
    ["maya", "TASK_COMPLETED", "project", "nexus-core", 10, 5, 8],
    ["dario", "PROJECT_CREATED", "project", "pulseboard", 15, 0, 26],
    ["dario", "MILESTONE_COMPLETED", "project", "pulseboard", 20, 10, 9],
    ["dario", "TASK_COMPLETED", "project", "pulseboard", 10, 5, 5],
    ["aylin", "PROJECT_CREATED", "project", "neuron-forge", 15, 0, 22],
    ["aylin", "UPDATE_POSTED", "project", "neuron-forge", 5, 0, 3],
    ["tomas", "PROJECT_CREATED", "project", "voidrunner", 15, 0, 18],
    ["tomas", "TASK_COMPLETED", "project", "voidrunner", 10, 5, 7],
    ["kenji", "PROJECT_CREATED", "project", "sentinel-mesh", 15, 0, 14],
    ["nadia", "PROJECT_CREATED", "project", "hivemote", 15, 0, 10],
  ];
  for (const [uname, eventType, sourceType, slug, xp, reputation, d] of contrib) {
    await db.contributionEvent.create({
      data: {
        userId: users[uname].id, projectId: projIds[slug],
        eventType, sourceType, sourceId: `${slug}-${eventType}-${rand(9999)}`,
        xp, reputation, verifiedAt: daysAgo(d), createdAt: daysAgo(d),
      },
    });
  }

  const counts = {
    users: await db.user.count(),
    projects: await db.project.count(),
    tasks: await db.task.count(),
    updates: await db.projectUpdate.count(),
    activities: await db.projectActivity.count(),
    requests: await db.collaborationRequest.count(),
  };
  console.log("✅ Seed complete:", counts);
  console.log("   Demo logins (password demo1234): maya@teka.dev, dario@teka.dev, aylin@teka.dev, tomas@teka.dev, nadia@teka.dev, kenji@teka.dev");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
