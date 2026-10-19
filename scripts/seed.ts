/**
 * TEKA NEXUS — production-style content seeder.
 * Creates a realistic, thriving community: members with real histories,
 * projects across every category, active workspaces and a live feed.
 * Run: bun run scripts/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Deterministic pseudo-random for reproducible seeds
let seedState = 1337;
function rand(max: number) {
  seedState = (seedState * 1664525 + 1013904223) % 4294967296;
  return seedState % max;
}
const chance = (pct: number) => rand(100) < pct;
const daysAgo = (d: number, hourJitter = 0) =>
  new Date(Date.now() - d * 86400000 - hourJitter * 3600000);
const inDays = (d: number) => new Date(Date.now() + d * 86400000);

async function wipe() {
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
  "frontend-development", "backend-development", "mobile-development", "game-development",
  "ai-and-data", "ui-ux", "qa-testing", "devops", "technical-writing", "product-management",
  "hardware-iot", "other",
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
  console.log("🌱 Seeding TEKA NEXUS community…");
  await wipe();

  // ── Skill taxonomy ───────────────────────────────────────
  for (const slug of SKILL_SLUGS) {
    await db.skill.upsert({ where: { slug }, update: {}, create: { slug, name: SKILL_NAMES[slug] ?? slug } });
  }
  const skillRows = await db.skill.findMany();
  const skillId = (slug: string) => skillRows.find((s) => s.slug === slug)!.id;

  const passwordHash = (await import("../src/lib/password")).hashPasswordForSeed("Nexus!2025");

  // ── Members ──────────────────────────────────────────────
  type UserSpec = {
    username: string; email: string; displayName: string; avatarColor: string;
    bio: string; skills: string[]; website?: string; interests: string[];
  };

  const members: UserSpec[] = [
    { username: "maya", email: "maya.chen@gmail.com", displayName: "Maya Chen", avatarColor: "cyan", bio: "Design systems engineer. I turn messy tokens into tidy primitives and ship them in public. Ex-agency, current OSS maintainer.", skills: ["frontend-development", "ui-ux"], website: "https://mayachen.design", interests: ["OPEN_SOURCE", "DESIGN_TOOLS", "WEB_DEVELOPMENT"] },
    { username: "dario", email: "dario.vlahovic@proton.me", displayName: "Dario Vlahović", avatarColor: "violet", bio: "Backend & infrastructure. Postgres, queues, and the occasional cursed cron job. I believe boring tech is a feature.", skills: ["backend-development", "devops"], interests: ["DEVELOPER_TOOLS", "OPEN_SOURCE", "CYBERSECURITY"] },
    { username: "aylin", email: "aylin.kaya@fastmail.com", displayName: "Aylin Kaya", avatarColor: "ember", bio: "ML engineer focused on visual explanations. Building tools that make neural networks less like magic and more like math.", skills: ["ai-and-data", "frontend-development"], website: "https://aylinkaya.dev", interests: ["ARTIFICIAL_INTELLIGENCE", "DATA_SCIENCE", "OPEN_SOURCE"] },
    { username: "tomas", email: "tomas.rivera@outlook.com", displayName: "Tomás Rivera", avatarColor: "lime", bio: "Indie game developer. Shaders, sprites, and shipping small weird games. Godot person. Will talk about lighting for hours.", skills: ["game-development", "other"], interests: ["INDIE_GAMES", "DESIGN_TOOLS", "OTHER_TECHNOLOGY"] },
    { username: "nadia", email: "nadia.osei@gmail.com", displayName: "Nadia Osei", avatarColor: "rose", bio: "Mobile-first everything. Flutter by day, React Native by night. Obsessed with 60fps on mid-range phones.", skills: ["mobile-development", "ui-ux"], interests: ["MOBILE_DEVELOPMENT", "HARDWARE_IOT", "WEB_DEVELOPMENT"] },
    { username: "kenji", email: "kenji.watanabe@proton.me", displayName: "Kenji Watanabe", avatarColor: "gold", bio: "Security researcher. Breaking things politely since 2016. CTF organizer, honeypot enthusiast, occasional CVE author.", skills: ["backend-development", "qa-testing"], interests: ["CYBERSECURITY", "DEVELOPER_TOOLS", "OPEN_SOURCE"] },
    { username: "elena", email: "elena.petrova@gmail.com", displayName: "Elena Petrova", avatarColor: "violet", bio: "Frontend architect and docs nerd. I write the README so you don't have to. Static-site maximalist.", skills: ["frontend-development", "technical-writing"], website: "https://elenapetrova.io", interests: ["WEB_DEVELOPMENT", "OPEN_SOURCE", "DESIGN_TOOLS"] },
    { username: "omar", email: "omar.farouk@outlook.com", displayName: "Omar Farouk", avatarColor: "ember", bio: "Mobile dev with a backend habit. Currently deep in offline-sync purgatory and honestly? kind of enjoying it.", skills: ["mobile-development", "backend-development"], interests: ["MOBILE_DEVELOPMENT", "ARTIFICIAL_INTELLIGENCE", "WEB_DEVELOPMENT"] },
    { username: "priya", email: "priya.sharma@gmail.com", displayName: "Priya Sharma", avatarColor: "cyan", bio: "Applied ML. Speech and audio. If it hums, clicks, or talks, I want to transcribe it, locally, without phoning home.", skills: ["ai-and-data", "product-management"], interests: ["ARTIFICIAL_INTELLIGENCE", "DATA_SCIENCE", "MOBILE_DEVELOPMENT"] },
    { username: "lucas", email: "lucas.meyer@fastmail.com", displayName: "Lucas Meyer", avatarColor: "lime", bio: "Platform engineer. Terraform, policy-as-code, and making auditors happy without making developers miserable.", skills: ["devops", "backend-development"], interests: ["CYBERSECURITY", "DEVELOPER_TOOLS", "BLOCKCHAIN"] },
    { username: "zoe", email: "zoe.adler@gmail.com", displayName: "Zoe Adler", avatarColor: "rose", bio: "Product designer who codes. Motion, typography, and presentations that don't put people to sleep.", skills: ["ui-ux", "frontend-development"], website: "https://zoe.works", interests: ["DESIGN_TOOLS", "WEB_DEVELOPMENT", "INDIE_GAMES"] },
    { username: "ravi", email: "ravi.nair@proton.me", displayName: "Ravi Nair", avatarColor: "gold", bio: "Data engineer. Warehouses, pipelines, notebooks. I make small teams feel like they have a data platform team.", skills: ["backend-development", "ai-and-data"], interests: ["DATA_SCIENCE", "ARTIFICIAL_INTELLIGENCE", "DEVELOPER_TOOLS"] },
    { username: "sofia", email: "sofia.marino@gmail.com", displayName: "Sofia Marino", avatarColor: "violet", bio: "Technical writer & devrel. I translate engineer brain into human sentences. API docs, tutorials, changelogs.", skills: ["technical-writing", "product-management"], interests: ["OPEN_SOURCE", "WEB_DEVELOPMENT", "DEVELOPER_TOOLS"] },
    { username: "jonas", email: "jonas.berg@outlook.com", displayName: "Jonas Berg", avatarColor: "lime", bio: "Tactics-game obsessive. Drawing my own spells since grid paper was still a viable engine.", skills: ["game-development", "ui-ux"], interests: ["INDIE_GAMES", "DESIGN_TOOLS", "OTHER_TECHNOLOGY"] },
    { username: "amara", email: "amara.diallo@gmail.com", displayName: "Amara Diallo", avatarColor: "ember", bio: "PM for hardware-adjacent things. Roadmaps, BOMs, and keeping engineers honest about timelines. Solar punk at heart.", skills: ["product-management", "hardware-iot"], interests: ["HARDWARE_IOT", "OTHER_TECHNOLOGY", "DATA_SCIENCE"] },
    { username: "felix", email: "felix.alvarez@fastmail.com", displayName: "Felix Alvarez", avatarColor: "cyan", bio: "QA engineer. I break your app before your users do. Automation-first, flaky-test-zero tolerance.", skills: ["qa-testing", "devops"], interests: ["DEVELOPER_TOOLS", "CYBERSECURITY", "MOBILE_DEVELOPMENT"] },
    { username: "mei", email: "mei.lin@gmail.com", displayName: "Mei Lin", avatarColor: "rose", bio: "Hardware hacker. ESP32s, servos, and drones that definitely obey the laws of physics. Mostly.", skills: ["hardware-iot", "other"], interests: ["HARDWARE_IOT", "OTHER_TECHNOLOGY", "INDIE_GAMES"] },
    { username: "gabriel", email: "gabriel.costa@gmail.com", displayName: "Gabriel Costa", avatarColor: "gold", bio: "Smart-contract dev learning formal verification the hard way. Frontend escapee. Coffee-powered.", skills: ["frontend-development", "mobile-development"], interests: ["BLOCKCHAIN", "WEB_DEVELOPMENT", "CYBERSECURITY"] },
  ];

  const users: Record<string, { id: string }> = {};
  for (const [i, u] of members.entries()) {
    const created = await db.user.create({
      data: {
        username: u.username,
        email: u.email,
        passwordHash,
        displayName: u.displayName,
        avatarColor: u.avatarColor,
        bio: u.bio,
        websiteUrl: u.website ?? "",
        goals: JSON.stringify([["build", "contribute", "learn", "discover"][i % 4], "discover"]),
        interests: JSON.stringify(u.interests),
        onboardingCompleted: true,
        createdAt: daysAgo(210 - i * 11, rand(20)),
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
    members?: [string, string][]; createdDaysAgo: number; updatedHoursAgo: number;
  };

  const projects: ProjSpec[] = [
    {
      slug: "nexus-core", name: "Nexus Core", category: "OPEN_SOURCE", status: "RELEASED", owner: "maya",
      tagline: "The open-source design system powering the TEKA ecosystem — tokens, primitives, docs.",
      description:
        "Nexus Core is a component and token library extracted from the TEKA design language.\n\n## What's inside\n- 42 accessible primitives (New York style)\n- Design tokens as CSS variables — dark graphite & cyan/violet accents\n- First-class TypeScript, zero runtime CSS-in-JS\n- Docs site with live playground and copy-paste recipes\n\n## Status\nv1.1 shipped. We're hardening the theming API and looking for contributors on docs, RTL support and a11y audits.",
      cover: "/covers/nexus-core.png", tags: ["design-system", "react", "typescript", "a11y", "rtl"],
      skills: ["frontend-development", "ui-ux", "technical-writing"],
      repo: "https://github.com/nexus-core/nexus-core", demo: "https://nexus-core.dev", site: "https://teka.dev",
      members: [["dario", "ADMIN"], ["nadia", "CONTRIBUTOR"], ["kenji", "CONTRIBUTOR"], ["zoe", "CONTRIBUTOR"], ["elena", "CONTRIBUTOR"]],
      createdDaysAgo: 205, updatedHoursAgo: 3,
    },
    {
      slug: "pulseboard", name: "PulseBoard", category: "DEVELOPER_TOOLS", status: "IN_DEVELOPMENT", owner: "dario",
      tagline: "Real-time observability for tiny teams — logs, traces, and heartbeats in one keyboard-driven pane.",
      description:
        "PulseBoard aggregates structured logs, uptime heartbeats, and OpenTelemetry traces into a single keyboard-driven dashboard. Self-hostable in under five minutes with SQLite or Postgres.\n\n## Why\nSmall teams don't need an observability empire — they need answers fast. PulseBoard is the minimal, honest option.\n\n## Roadmap\n- [x] Log ingest API\n- [x] Live tail view (12k lines/s)\n- [x] Trace waterfall\n- [ ] Alert rules engine\n- [ ] Public status pages",
      cover: "/covers/pulseboard.png", tags: ["observability", "golang", "sqlite", "self-hosted"],
      skills: ["backend-development", "devops", "frontend-development"],
      repo: "https://github.com/pulseboard/pulseboard",
      members: [["maya", "ADMIN"], ["felix", "CONTRIBUTOR"], ["lucas", "CONTRIBUTOR"]],
      createdDaysAgo: 168, updatedHoursAgo: 7,
    },
    {
      slug: "neuron-forge", name: "NeuronForge", category: "ARTIFICIAL_INTELLIGENCE", status: "BETA", owner: "aylin",
      tagline: "Build, train, and understand small neural networks visually — right in your browser.",
      description:
        "NeuronForge is a visual playground for small neural networks. Drag layers, wire tensors, and watch gradients flow in real time. Every visualization is grounded in the actual math — no black boxes.\n\n## Current beta\nWebGL2 backend, MNIST-class models, one-click ONNX export. Educational mode narrates backprop as it happens.\n\n## Looking for\nContributors with WebGL or PyTorch experience, plus technical writers for the tutorial track.",
      cover: "/covers/neuron-forge.png", tags: ["deep-learning", "webgl", "education", "onnx"],
      skills: ["ai-and-data", "frontend-development", "technical-writing"],
      demo: "https://neuronforge.app", repo: "https://github.com/neuron-forge/forge",
      members: [["tomas", "CONTRIBUTOR"], ["priya", "CONTRIBUTOR"]],
      createdDaysAgo: 140, updatedHoursAgo: 26,
    },
    {
      slug: "voidrunner", name: "Voidrunner", category: "INDIE_GAMES", status: "IN_DEVELOPMENT", owner: "tomas",
      tagline: "An isometric roguelike about parkour across collapsing sky islands.",
      description:
        "Voidrunner is a hand-crafted isometric roguelike. Every run the sky islands rearrange; chain wall-runs and grapples before the void eats the floor.\n\n## Stack\nGodot 4, custom lighting, procedural island grammar. Demo build targets 60fps on integrated GPUs.\n\n## Help wanted\nPixel artists and a sound designer would change this project's life.",
      cover: "/covers/voidrunner.png", tags: ["godot", "roguelike", "pixel-art", "gamedev"],
      skills: ["game-development", "ui-ux", "other"],
      demo: "https://voidrunner.game",
      members: [["nadia", "CONTRIBUTOR"], ["jonas", "CONTRIBUTOR"]],
      createdDaysAgo: 122, updatedHoursAgo: 40,
    },
    {
      slug: "sentinel-mesh", name: "Sentinel Mesh", category: "CYBERSECURITY", status: "PLANNING", owner: "kenji",
      tagline: "A distributed honeypot mesh that maps scanner behavior across community-run nodes.",
      description:
        "Sentinel Mesh pools anonymized attacker telemetry from community honeypot nodes into a shared threat map. Think weather radar for internet background noise.\n\n## Phase\nPlanning. Protocol draft v0 lives in the repo wiki. We need Rust and Go folks, plus someone who enjoys dashboards more than they should.",
      cover: "/covers/sentinel-mesh.png", tags: ["security", "honeypot", "rust", "golang"],
      skills: ["backend-development", "devops", "ai-and-data"],
      repo: "https://github.com/sentinel-mesh/protocol",
      members: [["felix", "CONTRIBUTOR"]],
      createdDaysAgo: 96, updatedHoursAgo: 52,
    },
    {
      slug: "hivemote", name: "HiveMote", category: "HARDWARE_IOT", status: "IDEA", owner: "nadia",
      tagline: "One ESP32 hub that unifies orphaned smart-home remotes into a single honest local API.",
      description:
        "HiveMote is an idea-stage project: one ESP32-based hub that speaks IR, 433MHz RF, BLE, and Wi-Fi so your shelf of orphaned remotes becomes one clean local API.\n\n## Status\nIdea. BOM draft in the works. Looking for hardware folks and a mobile dev for the companion app.",
      cover: "/covers/hivemote.png", tags: ["esp32", "iot", "smart-home", "hardware"],
      skills: ["hardware-iot", "mobile-development", "backend-development"],
      members: [["mei", "CONTRIBUTOR"]],
      createdDaysAgo: 74, updatedHoursAgo: 90,
    },
    {
      slug: "webloom", name: "WebLoom", category: "WEB_DEVELOPMENT", status: "RELEASED", owner: "elena",
      tagline: "Turn a folder of markdown into a blazing-fast website — no config, no lock-in.",
      description:
        "WebLoom watches a folder of markdown, MDX and assets and weaves it into a static site with incremental builds, typed frontmatter and zero required configuration.\n\n## Highlights\n- 40k pages/s incremental build on a laptop\n- Content validation with typed schemas\n- First-class code blocks with live previews\n- Deploy to any static host — output is just files\n\n## v1.0\nStable and used in production by a dozen docs teams. v1.1 focus: image pipeline and i18n routing.",
      cover: "/covers/webloom.png", tags: ["static-site", "markdown", "dx", "performance"],
      skills: ["frontend-development", "technical-writing", "backend-development"],
      repo: "https://github.com/webloom/webloom", demo: "https://webloom.sh", site: "https://webloom.sh/docs",
      members: [["maya", "CONTRIBUTOR"], ["sofia", "CONTRIBUTOR"], ["dario", "CONTRIBUTOR"]],
      createdDaysAgo: 188, updatedHoursAgo: 12,
    },
    {
      slug: "whisperpipe", name: "WhisperPipe", category: "ARTIFICIAL_INTELLIGENCE", status: "IN_DEVELOPMENT", owner: "priya",
      tagline: "Local-first speech transcription pipeline that never phones home.",
      description:
        "WhisperPipe turns long-form audio into searchable, speaker-tagged text entirely on your machine. Batch folders, watch directories, or pipe from a mic.\n\n## Design principles\n- No cloud, ever. Model weights are the only download.\n- Speaker diarization that survives real-world meetings\n- Exports to SRT, VTT, JSON and plain markdown\n- Runs on a 2019 laptop (quantized models) or Apple Silicon\n\n## Current focus\nCutting word-error-rate on noisy multi-speaker audio and a watch-folder daemon.",
      cover: "/covers/whisperpipe.png", tags: ["asr", "privacy", "local-first", "whisper"],
      skills: ["ai-and-data", "backend-development", "other"],
      repo: "https://github.com/whisperpipe/whisperpipe",
      members: [["aylin", "ADMIN"], ["ravi", "CONTRIBUTOR"]],
      createdDaysAgo: 88, updatedHoursAgo: 19,
    },
    {
      slug: "guardrail", name: "Guardrail", category: "CYBERSECURITY", status: "BETA", owner: "lucas",
      tagline: "Policy-as-code linter for cloud infrastructure — with explanations humans actually read.",
      description:
        "Guardrail scans your IaC (Terraform, Pulumi, CloudFormation) against a policy pack and explains every violation in plain language, with a suggested fix and the reason it matters.\n\n## Beta features\n- 180 built-in rules mapped to CIS benchmarks\n- Custom policies in a friendly DSL (no Rego required)\n- CI mode that comments on PRs\n- Baseline mode: only flag new drift\n\n## Ask\nBeta testers with messy real-world Terraform. Bring your worst.",
      cover: "/covers/guardrail.png", tags: ["policy-as-code", "terraform", "compliance", "ci"],
      skills: ["devops", "qa-testing", "backend-development"],
      demo: "https://guardrail.dev/try", repo: "https://github.com/guardrail-dev/guardrail",
      members: [["kenji", "ADMIN"], ["felix", "CONTRIBUTOR"]],
      createdDaysAgo: 110, updatedHoursAgo: 33,
    },
    {
      slug: "echoform", name: "Echoform", category: "MOBILE_DEVELOPMENT", status: "BETA", owner: "omar",
      tagline: "Offline-first field research app that syncs when the signal comes back.",
      description:
        "Echoform lets researchers design structured forms, collect data in airplane-mode wilderness, and sync conflict-free when connectivity returns.\n\n## Highlights\n- CRDT-based sync — no merge dialogs, ever\n- GPS, audio and photo attachments on any field\n- Encrypted-at-rest local store\n- React Native core with a Rust sync engine\n\n## Beta\nTwo field teams run daily builds. Next: media compression ladder and a web review console.",
      cover: "/covers/echoform.png", tags: ["offline-first", "react-native", "crdt", "research"],
      skills: ["mobile-development", "backend-development", "ui-ux"],
      repo: "https://github.com/echoform/app",
      members: [["nadia", "CONTRIBUTOR"], ["felix", "CONTRIBUTOR"]],
      createdDaysAgo: 80, updatedHoursAgo: 9,
    },
    {
      slug: "pitchframe", name: "PitchFrame", category: "DESIGN_TOOLS", status: "IN_DEVELOPMENT", owner: "zoe",
      tagline: "Canvas-first presentation editor with live embeds, version history and taste.",
      description:
        "PitchFrame is an infinite-canvas presentation tool for technical talks. Embed live terminals, charts and repos that render at present time, not screenshot time.\n\n## Why another deck tool\nBecause technical content deserves better than bullet points. Live embeds mean your demo can't be stale.\n\n## In the workshop\n- Infinite canvas with spatial sections\n- Version history with visual diff\n- Presenter mode with speaker notes and timers\n- Export to PDF/web",
      cover: "/covers/pitchframe.png", tags: ["canvas", "presentations", "wysiwyg", "crdt"],
      skills: ["ui-ux", "frontend-development", "other"],
      repo: "https://github.com/pitchframe/editor",
      members: [["maya", "CONTRIBUTOR"], ["jonas", "CONTRIBUTOR"]],
      createdDaysAgo: 64, updatedHoursAgo: 15,
    },
    {
      slug: "datadock", name: "DataDock", category: "DATA_SCIENCE", status: "IN_DEVELOPMENT", owner: "ravi",
      tagline: "Self-hosted warehouse, ingestion and notebooks for teams that can't afford a data platform team.",
      description:
        "DataDock is a batteries-included analytics stack in a single binary: ingestion connectors, a columnar warehouse, scheduled dbt-style transforms and a notebook UI.\n\n## Architecture\n- Embedded columnar engine (Arrow-based)\n- 30+ ingestion connectors (Stripe, Postgres, CSV/S3, GA4…)\n- Git-versioned transform graphs\n- Notebooks that render as dashboards\n\n## Status\nCore engine stable, connector zoo growing. Help wanted on the scheduler UI.",
      cover: "/covers/datadock.png", tags: ["analytics", "self-hosted", "arrow", "etl"],
      skills: ["backend-development", "ai-and-data", "frontend-development"],
      repo: "https://github.com/datadock/datadock",
      members: [["priya", "CONTRIBUTOR"], ["lucas", "CONTRIBUTOR"]],
      createdDaysAgo: 71, updatedHoursAgo: 28,
    },
    {
      slug: "herald", name: "Herald", category: "DEVELOPER_TOOLS", status: "RELEASED", owner: "felix",
      tagline: "Turns merged PRs into release notes humans actually read.",
      description:
        "Herald watches your repositories, groups merged PRs into curated changelog entries, and publishes release notes to GitHub, your site, or Discord — in your tone of voice.\n\n## Features\n- Conventional-commit aware with smart grouping\n- Breaking-change detection with migration hints\n- Tone presets: terse, friendly, or enterprise\n- Runs as GitHub Action or standalone CLI\n\n## v1.0\nShipped and battle-tested on 40+ repos. v1.1 adds semantic version suggestions.",
      cover: "/covers/herald.png", tags: ["changelog", "github-actions", "dx", "automation"],
      skills: ["backend-development", "technical-writing", "product-management"],
      repo: "https://github.com/herald-sh/herald", site: "https://herald.sh",
      members: [["sofia", "CONTRIBUTOR"], ["dario", "CONTRIBUTOR"]],
      createdDaysAgo: 132, updatedHoursAgo: 60,
    },
    {
      slug: "sigil-tactics", name: "Sigil Tactics", category: "INDIE_GAMES", status: "PLANNING", owner: "jonas",
      tagline: "A run-based tactics game where spells are drawn, not clicked.",
      description:
        "In Sigil Tactics, every spell is a glyph you draw with your mouse or finger. Draw a arc for fire, a jagged line for lightning, a spiral for time magic — sloppy glyphs fizzle, elegant ones crit.\n\n## Vision\n- Hex-grid tactics with hand-drawn spellcasting\n- Ink-and-parchment art direction\n- Runs of 20-30 minutes, roguelite progression\n- Local co-op on one screen\n\n## Phase\nPlanning. Prototype of the glyph recognizer already detects 12 shapes at 94% accuracy. Looking for artists and a second gameplay programmer.",
      cover: "/covers/sigil-tactics.png", tags: ["tactics", "hand-drawn", "roguelite", "godot"],
      skills: ["game-development", "ui-ux", "ai-and-data"],
      members: [["tomas", "ADMIN"]],
      createdDaysAgo: 45, updatedHoursAgo: 47,
    },
    {
      slug: "choreograph", name: "Choreograph", category: "OTHER_TECHNOLOGY", status: "IDEA", owner: "mei",
      tagline: "Motion sequencing studio for hobby robot arms, drones and animatronics.",
      description:
        "Choreograph is an idea-stage visual sequencer for hobby robotics: keyframe joint angles on a timeline, blend trajectories, and export to whatever firmware your contraption speaks.\n\n## The dream\nTimeline editing as smooth as a video editor, with physics-aware easing and collision previews.\n\n## Status\nIdea + a hacked-together prototype that moves a 6-DOF arm convincingly. Looking for anyone who enjoys inverse kinematics more than sleep.",
      cover: "/covers/choreograph.png", tags: ["robotics", "motion", "timeline", "firmware"],
      skills: ["hardware-iot", "other", "ui-ux"],
      members: [],
      createdDaysAgo: 30, updatedHoursAgo: 70,
    },
    {
      slug: "quantum-ledger", name: "Quantum Ledger", category: "BLOCKCHAIN", status: "PLANNING", owner: "gabriel",
      tagline: "Smart-contract toolkit with formal verification templates that don't require a PhD.",
      description:
        "Quantum Ledger pairs a contract scaffold with formal-verification templates so ordinary developers can prove (not hope) that their contracts behave.\n\n## Plan\n- Scaffold CLI with audited patterns\n- Property-based test generation from specs\n- One-command symbolic execution for common invariants\n- Template library: vesting, escrow, governance\n\n## Phase\nPlanning. Core spec in the repo wiki, first templates sketched. Want Rust/Solidity folks and someone patient enough to explain SMT solvers to the rest of us.",
      cover: "/covers/quantum-ledger.png", tags: ["solidity", "formal-verification", "toolkit", "web3"],
      skills: ["backend-development", "qa-testing", "other"],
      members: [["kenji", "CONTRIBUTOR"]],
      createdDaysAgo: 38, updatedHoursAgo: 55,
    },
    {
      slug: "sol-nest", name: "SolNest", category: "HARDWARE_IOT", status: "PLANNING", owner: "amara",
      tagline: "Open solar + battery telemetry kit for balconies, sheds and off-grid cabins.",
      description:
        "SolNest is an open hardware + software kit that monitors small solar setups: panel output, battery health, load consumption — with honest efficiency math and no subscription.\n\n## Scope\n- ESP32-based sensor board (v0 BOM drafted)\n- Home Assistant + MQTT integration\n- Local dashboard with long-term forecasting\n- Open schematics, open firmware\n\n## Phase\nPlanning. Mei is prototyping the sense board; looking for firmware and dashboard help.",
      cover: "/covers/solarnest.png", tags: ["solar", "esp32", "energy", "open-hardware"],
      skills: ["hardware-iot", "frontend-development", "backend-development"],
      members: [["mei", "ADMIN"], ["nadia", "CONTRIBUTOR"]],
      createdDaysAgo: 52, updatedHoursAgo: 36,
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
        createdAt: daysAgo(p.createdDaysAgo, i), updatedAt: daysAgo(0, p.updatedHoursAgo),
      },
    });
    projIds[p.slug] = created.id;
    await db.projectMember.create({
      data: { projectId: created.id, userId: users[p.owner].id, role: "OWNER", joinedAt: daysAgo(p.createdDaysAgo, i) },
    });
    for (const [uname, role] of p.members ?? []) {
      await db.projectMember.create({
        data: { projectId: created.id, userId: users[uname].id, role, joinedAt: daysAgo(Math.max(1, p.createdDaysAgo - rand(25) - 3), i) },
      });
    }
    await db.projectTag.createMany({ data: p.tags.map((t) => ({ projectId: created.id, tag: t })) });
    await db.projectRequiredSkill.createMany({
      data: p.skills.map((s) => ({ projectId: created.id, skillId: skillId(s) })),
    });
  }

  // ── Updates ──────────────────────────────────────────────
  const updates: [string, string, string, string, number][] = [
    ["nexus-core", "maya", "v1.1 — Theming API frozen, RTL tokens land", "After three betas the theming API is stable. v1.1 ships logical-property tokens for RTL, a 30% smaller core bundle, and 9 new primitives including Combobox and Toast. Thanks to the 14 contributors who filed 120+ issues.", 1],
    ["nexus-core", "zoe", "Motion spec: durations, easings, reduced-motion", "Wrote the full motion spec — every primitive now documents its choreography, and prefers-reduced-motion strips all transforms. Playground lets you toggle it live.", 4],
    ["nexus-core", "elena", "Docs overhaul: every primitive gets a recipe", "Rebuilt the docs nav and added copy-paste recipes for the 20 most common patterns (tables, dialogs, forms). Feedback thread is open in comments.", 8],
    ["pulseboard", "dario", "Ingest v2: 12k lines/s on a $5 VPS", "Rewrote the ingest path with adaptive batching — live tail now sustains 12k lines/s on a $5 VPS with 40MB RSS. Trace waterfall shipped last week; alert rules are next.", 2],
    ["pulseboard", "lucas", "Helm chart + single-binary mode", "You can now run PulseBoard as a single binary or via the new Helm chart with sensible defaults. Grafana users: there's an exporter.", 6],
    ["pulseboard", "felix", "Load test suite: 48h soak, zero leaks", "Ran a 48-hour soak at 8k lines/s — heap stable, no FD leaks, p99 tail latency 90ms. Full methodology in the repo.", 10],
    ["neuron-forge", "aylin", "Beta 0.9 — ONNX export + narrated backprop", "Export your trained models to ONNX in one click. Educational mode now narrates backprop layer by layer as it runs. Feedback welcome in comments!", 3],
    ["neuron-forge", "priya", "Convnet tutorial track: first 3 lessons up", "Wrote the first three lessons of the tutorial track: tensors as pictures, your first convnet, and why pooling is a scam (mostly). More coming.", 7],
    ["voidrunner", "tomas", "Grapple + weather systems island grammar", "New traversal verb: the grapple. Islands now generate in coherent weather systems instead of pure noise — storms literally rearrange the route mid-run. Demo build soon.", 5],
    ["voidrunner", "jonas", "Lighting: fake GI that doesn't look fake", "Rebuilt the lighting with a baked-radiosity trick — 2ms/frame on integrated GPUs and the islands finally feel like a place, not a tech demo.", 9],
    ["sentinel-mesh", "kenji", "Protocol draft v0 published", "The v0 protocol draft is up: node enrollment, telemetry envelope, and the anonymization pipeline. Ripping it apart is encouraged — that's what the repo wiki is for.", 4],
    ["webloom", "elena", "v1.0 is out", "One year after the first commit: WebLoom 1.0. Incremental builds, typed frontmatter, zero config. Twelve docs teams run on it in production. Thank you all.", 2],
    ["webloom", "sofia", "Authoring guide: from folder to site in 10 minutes", "New authoring guide walks you from an empty folder to a deployed site in ten minutes, including frontmatter validation and image handling.", 5],
    ["webloom", "maya", "v1.1 roadmap: image pipeline + i18n routing", "Community vote results are in — v1.1 focuses on the image pipeline (AVIF, responsive srcsets) and locale-aware routing. RFC drafts linked in the repo.", 1],
    ["whisperpipe", "priya", "Diarization v3: 31% fewer speaker flips", "New diarization model cuts speaker-flip errors by 31% on real meeting audio. It also runs 1.8× faster. Benchmark set and methodology are in the repo.", 3],
    ["whisperpipe", "ravi", "Watch-folder daemon ships in nightly", "Drop audio into a folder, get transcriptions automatically. The nightly daemon handles 40 formats and survives reboots. Try it and break it.", 6],
    ["guardrail", "lucas", "Beta: 180 rules + PR comments", "Guardrail beta now ships 180 rules mapped to CIS benchmarks and comments inline on pull requests. The baseline mode only flags new drift — upgrade safely.", 3],
    ["guardrail", "kenji", "Threat-model doc: what Guardrail does NOT catch", "Wrote the honest threat model: six attack classes Guardrail explicitly doesn't catch and which tools to pair it with. Security is a stack, not a linter.", 8],
    ["echoform", "omar", "CRDT sync survives the field test", "Two field teams, 4,200 submissions, zero merge conflicts and one dropped phone in a river (the data survived — encryption + sync both held).", 2],
    ["echoform", "nadia", "60fps form rendering on a $120 phone", "Profiled the form renderer down to 60fps on a $120 Android. The trick was virtualizing attachments, not the fields. Write-up in the repo.", 6],
    ["pitchframe", "zoe", "Canvas alpha: infinite slides, no slide size", "The canvas alpha is out: slides are spatial sections now, not fixed frames. Version history diffs visually. It's weird and we love it.", 4],
    ["pitchframe", "jonas", "Live terminal embed lands", "You can now embed a live terminal in a frame — it renders at present time, so your demo can never be stale. Watch your typing speed though.", 7],
    ["datadock", "ravi", "Engine benchmark: 10GB CSV → dashboard in 90s", "End-to-end benchmark: 10GB of raw CSV ingested, transformed and dashboarded in 90 seconds on a 4-core box. Numbers and methodology in the repo.", 3],
    ["datadock", "lucas", "Connector zoo: 30 and counting", "Shipped 8 new connectors including GA4, Stripe and Postgres CDC. The connector API is documented if you want to add your own.", 9],
    ["herald", "felix", "v1.0 — Herald is stable", "After 400+ releases across 40 dogfood repos, Herald 1.0 is stable. Thanks to everyone who fed it their worst merge messages.", 2],
    ["herald", "sofia", "Tone presets: terse, friendly, enterprise", "Release notes now come in three voices: terse (for changelogs), friendly (for players), enterprise (for stakeholders, sadly). Your mileage may vary.", 5],
    ["sigil-tactics", "jonas", "Glyph recognizer: 12 shapes, 94% accuracy", "The recognizer detects 12 glyph shapes at 94% accuracy, including sloppy morning-coffee handwriting. Next: chord glyphs for combo spells.", 4],
    ["sol-nest", "amara", "BOM v0 drafted, sense board ordered", "First bill of materials is drafted and the v0 sense board is at the fab. Target: under $18 per board at qty 100. Thread with the cost breakdown linked.", 5],
  ];
  for (const [slug, author, title, body, d] of updates) {
    await db.projectUpdate.create({
      data: { projectId: projIds[slug], authorId: users[author].id, title, body, createdAt: daysAgo(d, rand(10)), updatedAt: daysAgo(d, rand(10)) },
    });
  }

  // ── Milestones ───────────────────────────────────────────
  const milestones: [string, string, string, number | null, string][] = [
    ["nexus-core", "v1.0 stable release", "Tokens frozen, docs live, 40 primitives audited.", null, "maya"],
    ["nexus-core", "RTL support across primitives", "Logical properties, mirrored icons, RTL test suite.", 21, "maya"],
    ["nexus-core", "A11y gold pass", "Every primitive passes keyboard + screen-reader audit.", 45, "zoe"],
    ["pulseboard", "Ingest v2", "Batched ingest, 10k+ lines/s.", null, "dario"],
    ["pulseboard", "Alert rules engine", "Threshold + anomaly alerts with silencing windows.", 18, "dario"],
    ["pulseboard", "Public status pages", "Shareable uptime pages on your own domain.", 40, "dario"],
    ["neuron-forge", "ONNX export", "One-click model export.", null, "aylin"],
    ["neuron-forge", "Tutorial track complete", "10 lessons from tensors to training loops.", 25, "priya"],
    ["neuron-forge", "1.0 — classroom ready", "Curriculum pack + teacher dashboard.", 60, "aylin"],
    ["voidrunner", "Vertical slice demo", "3 biomes, grapple, one boss.", 12, "tomas"],
    ["voidrunner", "Sound design pass", "Adaptive music + full SFX kit.", 35, "tomas"],
    ["sentinel-mesh", "Protocol v1 + reference node", "Signed telemetry envelope, two reference sensors.", 28, "kenji"],
    ["webloom", "v1.0 release", "Stable core, 12 production teams.", null, "elena"],
    ["webloom", "Image pipeline", "AVIF, responsive srcsets, zero-config.", 15, "elena"],
    ["whisperpipe", "Diarization v3", "Speaker-flip errors down 31%.", null, "priya"],
    ["whisperpipe", "1.0 — laptop-grade release", "Installer for macOS/Win/Linux, quantized models.", 30, "priya"],
    ["guardrail", "Beta GA", "180 rules, CI mode, baseline drift.", null, "lucas"],
    ["guardrail", "1.0 — audit season ready", "SOC2 mapping, CSV exports, team roles.", 42, "lucas"],
    ["echoform", "Field beta", "CRDT sync proven with 2 field teams.", null, "omar"],
    ["echoform", "Web review console", "Browse, export and audit submissions on desktop.", 20, "omar"],
    ["pitchframe", "Canvas alpha", "Infinite canvas + visual version diff.", null, "zoe"],
    ["pitchframe", "Presenter mode", "Speaker notes, timers, rehearsal mode.", 16, "zoe"],
    ["datadock", "Engine benchmark v1", "10GB → dashboard in 90s on 4 cores.", null, "ravi"],
    ["datadock", "Scheduler UI", "Visual transform graphs with run history.", 22, "ravi"],
    ["herald", "v1.0 stable", "400+ dogfood releases, 40 repos.", null, "felix"],
    ["herald", "Semver suggestions", "Opinionated next-version proposals from the diff.", 14, "felix"],
    ["sigil-tactics", "Glyph recognizer PoC", "12 shapes at 94% accuracy.", null, "jonas"],
    ["sigil-tactics", "Playable prototype", "One encounter, 6 spells, local co-op.", 26, "jonas"],
    ["quantum-ledger", "Spec v1", "Invariant templates + scaffold CLI design.", 24, "gabriel"],
    ["sol-nest", "Sense board v0", "BOM under $18, first fab run.", 17, "mei"],
  ];
  for (const [slug, title, description, dueInDays, creator] of milestones) {
    await db.milestone.create({
      data: {
        projectId: projIds[slug], title, description, createdById: users[creator].id,
        dueAt: dueInDays ? inDays(dueInDays) : null,
        completedAt: dueInDays ? null : daysAgo(rand(10) + 1, rand(20)),
        createdAt: daysAgo(rand(20) + 6),
      },
    });
  }

  // ── Tasks (kanban across all columns) ────────────────────
  type TaskSpec = { slug: string; title: string; description?: string; status: string; priority: string; assignee?: string; createdBy: string };
  const tasks: TaskSpec[] = [
    // nexus-core
    { slug: "nexus-core", title: "Audit Dialog focus trap on iOS Safari", description: "VoiceOver escapes the trap after two Tab presses.", status: "IN_PROGRESS", priority: "HIGH", assignee: "nadia", createdBy: "maya" },
    { slug: "nexus-core", title: "Write migration guide v0.x → v1.1", status: "TODO", priority: "NORMAL", assignee: "elena", createdBy: "maya" },
    { slug: "nexus-core", title: "Ship Combobox with async options", status: "IN_REVIEW", priority: "HIGH", assignee: "zoe", createdBy: "maya" },
    { slug: "nexus-core", title: "RTL: mirror directional icons", status: "IN_PROGRESS", priority: "NORMAL", assignee: "maya", createdBy: "dario" },
    { slug: "nexus-core", title: "Deprecate legacy token names", status: "TODO", priority: "LOW", createdBy: "dario" },
    { slug: "nexus-core", title: "Ship Toast component", status: "DONE", priority: "NORMAL", assignee: "maya", createdBy: "maya" },
    { slug: "nexus-core", title: "Freeze theming API", status: "DONE", priority: "URGENT", assignee: "dario", createdBy: "maya" },
    { slug: "nexus-core", title: "Docs recipes: top 20 patterns", status: "DONE", priority: "NORMAL", assignee: "elena", createdBy: "elena" },
    { slug: "nexus-core", title: "Focus-ring tokens audit", status: "DONE", priority: "NORMAL", assignee: "zoe", createdBy: "zoe" },
    { slug: "nexus-core", title: "Explore headless table primitive", status: "BACKLOG", priority: "LOW", createdBy: "maya" },
    // pulseboard
    { slug: "pulseboard", title: "Alert rules engine", description: "Thresholds + anomaly detection, silencing windows.", status: "IN_PROGRESS", priority: "URGENT", assignee: "dario", createdBy: "dario" },
    { slug: "pulseboard", title: "Trace waterfall: span drill-down", status: "IN_REVIEW", priority: "HIGH", assignee: "dario", createdBy: "maya" },
    { slug: "pulseboard", title: "Status page templates", status: "TODO", priority: "NORMAL", createdBy: "dario" },
    { slug: "pulseboard", title: "Helm chart CI smoke test", status: "TODO", priority: "NORMAL", assignee: "lucas", createdBy: "lucas" },
    { slug: "pulseboard", title: "Dark graphite default theme", status: "DONE", priority: "LOW", assignee: "maya", createdBy: "dario" },
    { slug: "pulseboard", title: "Adaptive ingest batching", status: "DONE", priority: "URGENT", assignee: "dario", createdBy: "dario" },
    { slug: "pulseboard", title: "48h soak test harness", status: "DONE", priority: "HIGH", assignee: "felix", createdBy: "felix" },
    { slug: "pulseboard", title: "Webhook sink for alerts", status: "BACKLOG", priority: "NORMAL", createdBy: "dario" },
    // neuron-forge
    { slug: "neuron-forge", title: "Narrate backprop in educational mode", status: "DONE", priority: "HIGH", assignee: "aylin", createdBy: "aylin" },
    { slug: "neuron-forge", title: "Tutorial: your first convnet", status: "DONE", priority: "NORMAL", assignee: "priya", createdBy: "aylin" },
    { slug: "neuron-forge", title: "WebGL2 fallback for Safari 16", status: "IN_PROGRESS", priority: "HIGH", assignee: "tomas", createdBy: "aylin" },
    { slug: "neuron-forge", title: "Lesson 4: why pooling is a scam", status: "TODO", priority: "NORMAL", assignee: "priya", createdBy: "priya" },
    { slug: "neuron-forge", title: "ONNX opset coverage matrix", status: "IN_REVIEW", priority: "NORMAL", createdBy: "aylin" },
    { slug: "neuron-forge", title: "Model zoo: 5 pretrained toys", status: "BACKLOG", priority: "LOW", createdBy: "priya" },
    // voidrunner
    { slug: "voidrunner", title: "Grapple physics tuning pass", description: "Feels floaty above 3 islands; retune spring constants.", status: "IN_PROGRESS", priority: "HIGH", assignee: "tomas", createdBy: "tomas" },
    { slug: "voidrunner", title: "Storm event: route reshuffle mid-run", status: "IN_REVIEW", priority: "URGENT", assignee: "tomas", createdBy: "jonas" },
    { slug: "voidrunner", title: "Pixel art: second biome tileset", status: "TODO", priority: "HIGH", createdBy: "jonas" },
    { slug: "voidrunner", title: "Sky grammar v2: weather systems", status: "DONE", priority: "NORMAL", assignee: "tomas", createdBy: "tomas" },
    { slug: "voidrunner", title: "Fake GI lighting pass", status: "DONE", priority: "NORMAL", assignee: "jonas", createdBy: "jonas" },
    { slug: "voidrunner", title: "Boss: the Cartographer", status: "BACKLOG", priority: "NORMAL", createdBy: "tomas" },
    // sentinel-mesh
    { slug: "sentinel-mesh", title: "Protocol v1: signed telemetry envelope", status: "IN_PROGRESS", priority: "URGENT", assignee: "kenji", createdBy: "kenji" },
    { slug: "sentinel-mesh", title: "Pick honeypot sensor baseline", status: "TODO", priority: "NORMAL", assignee: "felix", createdBy: "kenji" },
    { slug: "sentinel-mesh", title: "Threat map tile server spike", status: "BACKLOG", priority: "NORMAL", createdBy: "kenji" },
    { slug: "sentinel-mesh", title: "Anonymization pipeline review", status: "IN_REVIEW", priority: "HIGH", assignee: "felix", createdBy: "kenji" },
    // webloom
    { slug: "webloom", title: "AVIF encode pipeline", status: "IN_PROGRESS", priority: "HIGH", assignee: "maya", createdBy: "elena" },
    { slug: "webloom", title: "i18n routing RFC", status: "IN_REVIEW", priority: "NORMAL", assignee: "sofia", createdBy: "elena" },
    { slug: "webloom", title: "Incremental cache invalidation bug on Windows", status: "TODO", priority: "URGENT", createdBy: "sofia" },
    { slug: "webloom", title: "Typed frontmatter validation", status: "DONE", priority: "HIGH", assignee: "elena", createdBy: "elena" },
    { slug: "webloom", title: "v1.0 release chores", status: "DONE", priority: "NORMAL", assignee: "elena", createdBy: "elena" },
    { slug: "webloom", title: "Live code-block previews", status: "DONE", priority: "NORMAL", assignee: "maya", createdBy: "elena" },
    { slug: "webloom", title: "Plugin API sketch", status: "BACKLOG", priority: "LOW", createdBy: "dario" },
    // whisperpipe
    { slug: "whisperpipe", title: "Diarization v3 evaluation set", status: "DONE", priority: "HIGH", assignee: "priya", createdBy: "priya" },
    { slug: "whisperpipe", title: "Watch-folder daemon hardening", status: "IN_PROGRESS", priority: "HIGH", assignee: "ravi", createdBy: "ravi" },
    { slug: "whisperpipe", title: "SRT export: subtitle line-length rules", status: "TODO", priority: "LOW", createdBy: "priya" },
    { slug: "whisperpipe", title: "Apple Silicon benchmark pass", status: "IN_REVIEW", priority: "NORMAL", assignee: "aylin", createdBy: "priya" },
    // guardrail
    { slug: "guardrail", title: "CIS mapping: services 40-60", status: "IN_PROGRESS", priority: "NORMAL", assignee: "lucas", createdBy: "lucas" },
    { slug: "guardrail", title: "PR comment formatter v2", status: "TODO", priority: "NORMAL", assignee: "felix", createdBy: "lucas" },
    { slug: "guardrail", title: "Baseline drift detection", status: "DONE", priority: "HIGH", assignee: "lucas", createdBy: "lucas" },
    { slug: "guardrail", title: "Threat-model documentation", status: "DONE", priority: "NORMAL", assignee: "kenji", createdBy: "kenji" },
    { slug: "guardrail", title: "DSL: multi-condition rules", status: "BACKLOG", priority: "NORMAL", createdBy: "lucas" },
    // echoform
    { slug: "echoform", title: "Media compression ladder", status: "IN_PROGRESS", priority: "HIGH", assignee: "nadia", createdBy: "omar" },
    { slug: "echoform", title: "Web review console: submission browser", status: "TODO", priority: "HIGH", assignee: "omar", createdBy: "omar" },
    { slug: "echoform", title: "CRDT sync engine", status: "DONE", priority: "URGENT", assignee: "omar", createdBy: "omar" },
    { slug: "echoform", title: "Encrypted local store audit", status: "DONE", priority: "HIGH", assignee: "felix", createdBy: "omar" },
    { slug: "echoform", title: "GPS drift indicator", status: "BACKLOG", priority: "LOW", createdBy: "nadia" },
    // pitchframe
    { slug: "pitchframe", title: "Visual version diff", status: "DONE", priority: "HIGH", assignee: "zoe", createdBy: "zoe" },
    { slug: "pitchframe", title: "Live terminal embed", status: "DONE", priority: "NORMAL", assignee: "jonas", createdBy: "zoe" },
    { slug: "pitchframe", title: "Presenter mode: notes + timers", status: "IN_PROGRESS", priority: "HIGH", assignee: "zoe", createdBy: "zoe" },
    { slug: "pitchframe", title: "PDF export fidelity pass", status: "TODO", priority: "NORMAL", createdBy: "maya" },
    { slug: "pitchframe", title: "Collab cursors via CRDT", status: "BACKLOG", priority: "LOW", createdBy: "zoe" },
    // datadock
    { slug: "datadock", title: "Scheduler UI: run history view", status: "IN_PROGRESS", priority: "HIGH", assignee: "ravi", createdBy: "ravi" },
    { slug: "datadock", title: "Postgres CDC connector", status: "DONE", priority: "HIGH", assignee: "lucas", createdBy: "ravi" },
    { slug: "datadock", title: "GA4 connector", status: "DONE", priority: "NORMAL", assignee: "lucas", createdBy: "ravi" },
    { slug: "datadock", title: "Notebook → dashboard renderer", status: "IN_REVIEW", priority: "NORMAL", assignee: "priya", createdBy: "ravi" },
    { slug: "datadock", title: "Connector developer guide", status: "TODO", priority: "LOW", createdBy: "sofia" },
    // herald
    { slug: "herald", title: "Semver suggestion engine", status: "IN_PROGRESS", priority: "NORMAL", assignee: "felix", createdBy: "felix" },
    { slug: "herald", title: "Enterprise tone preset", status: "DONE", priority: "LOW", assignee: "sofia", createdBy: "sofia" },
    { slug: "herald", title: "Discord publisher", status: "DONE", priority: "NORMAL", assignee: "dario", createdBy: "felix" },
    { slug: "herald", title: "Monorepo changelog splitting", status: "TODO", priority: "NORMAL", createdBy: "felix" },
    // sigil-tactics
    { slug: "sigil-tactics", title: "Chord glyphs for combo spells", status: "IN_PROGRESS", priority: "NORMAL", assignee: "jonas", createdBy: "jonas" },
    { slug: "sigil-tactics", title: "Ink-and-parchment UI kit", status: "TODO", priority: "HIGH", assignee: "zoe", createdBy: "jonas" },
    { slug: "sigil-tactics", title: "Glyph recognizer PoC (12 shapes)", status: "DONE", priority: "HIGH", assignee: "jonas", createdBy: "jonas" },
    // sol-nest
    { slug: "sol-nest", title: "Sense board v0 schematic review", status: "IN_PROGRESS", priority: "URGENT", assignee: "mei", createdBy: "amara" },
    { slug: "sol-nest", title: "Home Assistant discovery integration", status: "TODO", priority: "NORMAL", createdBy: "amara" },
    { slug: "sol-nest", title: "MQTT topic taxonomy doc", status: "TODO", priority: "LOW", assignee: "sofia", createdBy: "mei" },
    { slug: "sol-nest", title: "BOM v0 under $18", status: "DONE", priority: "HIGH", assignee: "mei", createdBy: "amara" },
    // hivemote
    { slug: "hivemote", title: "BOM draft: RF + IR frontend", status: "IN_PROGRESS", priority: "NORMAL", assignee: "mei", createdBy: "nadia" },
    { slug: "hivemote", title: "Companion app wireframes", status: "TODO", priority: "NORMAL", assignee: "nadia", createdBy: "nadia" },
    { slug: "hivemote", title: "Which protocols actually matter? research", status: "BACKLOG", priority: "LOW", createdBy: "mei" },
    // quantum-ledger
    { slug: "quantum-ledger", title: "Escrow template: invariant list", status: "IN_PROGRESS", priority: "HIGH", assignee: "gabriel", createdBy: "gabriel" },
    { slug: "quantum-ledger", title: "SMT solver explainer for humans", status: "TODO", priority: "NORMAL", assignee: "kenji", createdBy: "gabriel" },
    { slug: "quantum-ledger", title: "Scaffold CLI: first commands", status: "BACKLOG", priority: "NORMAL", createdBy: "gabriel" },
    // choreograph
    { slug: "choreograph", title: "6-DOF arm: trajectory blending demo", status: "IN_PROGRESS", priority: "NORMAL", assignee: "mei", createdBy: "mei" },
    { slug: "choreograph", title: "Timeline editor UX sketch", status: "TODO", priority: "NORMAL", createdBy: "mei" },
  ];
  let taskPos = 0;
  for (const [i, t] of tasks.entries()) {
    const done = t.status === "DONE";
    const createdDays = rand(25) + 2;
    taskPos += 1000;
    await db.task.create({
      data: {
        projectId: projIds[t.slug], title: t.title, description: t.description ?? "",
        status: t.status, priority: t.priority,
        assigneeId: t.assignee ? users[t.assignee].id : null,
        createdById: users[t.createdBy].id,
        position: taskPos,
        dueAt: done ? daysAgo(rand(5) + 1) : (chance(45) ? inDays(rand(20) + 2) : null),
        completedAt: done ? daysAgo(rand(9) + 1, rand(20)) : null,
        createdAt: daysAgo(createdDays, i % 20), updatedAt: daysAgo(done ? rand(9) + 1 : rand(4), i % 12),
      },
    });
  }

  // ── Collaboration requests ───────────────────────────────
  const requests: [string, string, string, string, string, number][] = [
    ["nexus-core", "kenji", "CONTRIBUTOR", "ACCEPTED", "I maintain a UI library at work and ran an a11y audit on Nexus Core last month — found 3 focus issues with patches ready. Would love to contribute properly.", 34],
    ["nexus-core", "priya", "CONTRIBUTOR", "PENDING", "I'd love to help with the Combobox async options work — I built something similar for an internal design system and can own the docs for it too.", 2],
    ["nexus-core", "omar", "CONTRIBUTOR", "PENDING", "Mobile WebKit is my usual haunt. Happy to take the iOS focus-trap audit and the touch target sizing pass.", 1],
    ["pulseboard", "elena", "CONTRIBUTOR", "PENDING", "I run docs for two OSS tools and would love to own PulseBoard's getting-started and alerting guides. Sample docs rewrite attached to my profile site.", 3],
    ["pulseboard", "felix", "CONTRIBUTOR", "ACCEPTED", "QA engineer here. I already run a 48h soak harness against the nightly — let me make it official and wire it into CI.", 21],
    ["neuron-forge", "jonas", "CONTRIBUTOR", "PENDING", "Game dev with heavy WebGL experience (see Voidrunner lighting). I'd like to own the Safari fallback work.", 2],
    ["webloom", "sofia", "CONTRIBUTOR", "ACCEPTED", "Technical writer. I drafted the authoring guide on a fork before writing this — it's yours if you want it.", 26],
    ["sigil-tactics", "zoe", "CONTRIBUTOR", "PENDING", "The ink-and-parchment direction is exactly my thing. Portfolio has two shipped tactics UIs. Would love to own the UI kit.", 1],
    ["sigil-tactics", "tomas", "ADMIN", "ACCEPTED", "I can co-pilot the gameplay side and share the Voidrunner island grammar learnings. Let's build the recognizer demo together.", 18],
    ["datadock", "gabriel", "CONTRIBUTOR", "PENDING", "I'd take the connector developer guide — I wrote connector docs for two data tools and learn best by documenting.", 2],
    ["quantum-ledger", "kenji", "CONTRIBUTOR", "PENDING", "Formal verification is my白天 job — happy to own the SMT explainer and review the invariant templates.", 3],
  ];
  for (const [slug, applicant, role, status, intro, d] of requests) {
    await db.collaborationRequest.create({
      data: {
        projectId: projIds[slug], applicantId: users[applicant].id, requestedRole: role,
        introduction: intro, status,
        reviewedById: status === "PENDING" ? null : users[projOwnerOf(projects, slug)].id,
        reviewedAt: status === "PENDING" ? null : daysAgo(Math.max(1, d - 2), rand(8)),
        createdAt: daysAgo(d, rand(12)),
      },
    });
  }

  function projOwnerOf(list: ProjSpec[], slug: string): string {
    return list.find((p) => p.slug === slug)!.owner;
  }

  // ── Project comments ─────────────────────────────────────
  const comments: [string, string, string, number, string?][] = [
    ["nexus-core", "dario", "The token freeze is such a relief — migrated our internal dashboard in one afternoon with zero visual diffs.", 1],
    ["nexus-core", "tomas", "Any chance of a Godot-flavored token export? Asking for a very biased friend (me).", 2],
    ["nexus-core", "maya", "Prototype exists on the rtl-tokens branch — ping me and I'll walk you through it.", 2, "tomas"],
    ["nexus-core", "kenji", "Ran the v1.1 a11y pass with a screen reader: Combobox and Toast both pass keyboard-only. Great work.", 1],
    ["pulseboard", "kenji", "12k lines/s on a $5 VPS is legitimately impressive. What's the memory footprint holding that rate?", 2],
    ["pulseboard", "dario", "40MB RSS at that rate — the batcher caps buffer memory regardless of input speed.", 2, "kenji"],
    ["pulseboard", "sofia", "The getting-started took me four minutes including the Helm detour. Docs team approves.", 1],
    ["neuron-forge", "maya", "The narrated backprop is the best explanation I've seen outside a classroom. Sent it to two juniors already.", 2],
    ["neuron-forge", "aylin", "That's exactly the audience we hoped for — the teacher pack lands with 1.0.", 2, "maya"],
    ["voidrunner", "nadia", "Played the vertical slice build — the storm reshuffling mid-run is *chefs kiss*. 60fps on my old phone too.", 3],
    ["voidrunner", "jonas", "Wait until you see what the grapple does to route planning. Spoiler: chaos.", 3, "nadia"],
    ["webloom", "sofia", "Migrated a 900-page docs site over lunch. The typed frontmatter caught 14 broken pages automatically.", 1],
    ["webloom", "elena", "This is exactly the story we built it for. The broken-page report gets friendlier in 1.1.", 1, "sofia"],
    ["guardrail", "lucas", "Shoutout to the beta testers who brought genuinely cursed Terraform. The baseline mode exists because of you.", 2],
    ["echoform", "priya", "Using this for oral-history interviews in rural areas — offline sync is a game changer for field work.", 4],
    ["pitchframe", "maya", "The live terminal embed alone justifies the switch. My demos can never be stale again.", 3],
    ["datadock", "ravi", "Benchmark methodology is now in the repo — reproducible with one docker command. Tear it apart.", 2],
    ["herald", "dario", "Herald wrote better release notes for PulseBoard than I ever did manually. Slightly offended, mostly relieved.", 1],
    ["sigil-tactics", "tomas", "Drew a fire arc while sneezing and it crit'd. The recognizer is too kind. 94% well earned.", 2],
    ["sol-nest", "mei", "Sense board gerbers ordered — public repo will have the full BOM with distributor links this week.", 3],
  ];
  const commentIds: string[] = [];
  for (const [slug, author, body, d, replyTo] of comments) {
    let parentId: string | null = null;
    if (replyTo) {
      const parent = commentIds.find((id) => id.endsWith(`:${slug}:${replyTo}`));
      parentId = parent ?? null;
    }
    const created = await db.projectComment.create({
      data: { projectId: projIds[slug], authorId: users[author].id, parentId, body, createdAt: daysAgo(d, rand(14)) },
    });
    commentIds.push(`${created.id}:${slug}:${author}`);
  }

  // ── Task comments ────────────────────────────────────────
  const taskCommentBodies: [string, string, string, string][] = [
    ["nexus-core", "Audit Dialog focus trap on iOS Safari", "nadia", "Repro: VoiceOver + two Tab presses. It's the focus-event ordering, not the trap itself."],
    ["nexus-core", "Audit Dialog focus trap on iOS Safari", "maya", "Nice find — Safari dispatches focus before the portal mounts. Try the rAF shim from #482."],
    ["pulseboard", "Alert rules engine", "dario", "Silencing windows land first, anomaly detection behind a flag."],
    ["voidrunner", "Grapple physics tuning pass", "jonas", "Above 3 islands it's floaty because spring dampening scales with distance — try clamping it."],
    ["sigil-tactics", "Chord glyphs for combo spells", "zoe", "Sketch attached to the wiki: two-stroke chords read better than one-stroke for new players."],
    ["sol-nest", "Sense board v0 schematic review", "amara", "Cost table updated: $17.42 at qty 100 with the cheaper shunt."],
  ];
  for (const [slug, taskTitle, author, body] of taskCommentBodies) {
    const task = await db.task.findFirst({ where: { projectId: projIds[slug], title: taskTitle } });
    if (task) {
      await db.taskComment.create({
        data: { taskId: task.id, authorId: users[author].id, body, createdAt: daysAgo(rand(6) + 1, rand(20)) },
      });
    }
  }

  // ── Follows / likes / saves ──────────────────────────────
  const allUsernames = members.map((m) => m.username);
  for (const uname of allUsernames) {
    for (const other of allUsernames) {
      if (uname !== other && chance(52)) {
        await db.follow.create({ data: { followerId: users[uname].id, followingId: users[other].id } });
      }
    }
  }
  for (const slug of Object.keys(projIds)) {
    for (const uname of allUsernames) {
      if (uname !== projOwnerOf(projects, slug) && chance(58)) {
        await db.projectLike.create({ data: { userId: users[uname].id, projectId: projIds[slug], createdAt: daysAgo(rand(20) + 1, rand(22)) } });
      }
    }
  }
  const saveMap: Record<string, string[]> = {
    maya: ["pulseboard", "voidrunner", "guardrail", "sigil-tactics"],
    dario: ["nexus-core", "datadock", "herald"],
    aylin: ["whisperpipe", "voidrunner", "webloom"],
    tomas: ["neuron-forge", "sigil-tactics", "choreograph"],
    nadia: ["nexus-core", "echoform", "sol-nest"],
    kenji: ["guardrail", "quantum-ledger", "sentinel-mesh", "nexus-core"],
    elena: ["nexus-core", "herald", "pitchframe"],
    omar: ["echoform", "hivemote", "whisperpipe"],
    priya: ["neuron-forge", "datadock", "whisperpipe"],
    lucas: ["guardrail", "pulseboard", "datadock"],
    zoe: ["pitchframe", "nexus-core", "sigil-tactics"],
    ravi: ["datadock", "whisperpipe", "pulseboard"],
    sofia: ["webloom", "herald", "nexus-core"],
    jonas: ["sigil-tactics", "voidrunner", "pitchframe"],
    amara: ["sol-nest", "hivemote", "choreograph"],
    felix: ["guardrail", "pulseboard", "echoform"],
    mei: ["sol-nest", "choreograph", "hivemote"],
    gabriel: ["quantum-ledger", "guardrail", "webloom"],
  };
  for (const [uname, slugs] of Object.entries(saveMap)) {
    for (const slug of slugs) {
      await db.projectSave.create({ data: { userId: users[uname].id, projectId: projIds[slug], createdAt: daysAgo(rand(14) + 1, rand(20)) } });
    }
  }

  // ── Contribution events → XP/REP derived from real actions ──
  type Contrib = { user: string; eventType: string; sourceType: string; sourceId: string; xp: number; reputation: number; at: Date; projectId?: string };
  const contribs: Contrib[] = [];
  const RULES: Record<string, { xp: number; reputation: number }> = {
    PROJECT_CREATED: { xp: 15, reputation: 0 },
    TASK_COMPLETED: { xp: 10, reputation: 5 },
    UPDATE_POSTED: { xp: 5, reputation: 0 },
    MILESTONE_COMPLETED: { xp: 20, reputation: 10 },
    RELEASE_PUBLISHED: { xp: 30, reputation: 15 },
    COLLABORATION_ACCEPTED: { xp: 25, reputation: 10 },
  };
  const addContrib = (user: string, eventType: string, sourceType: string, sourceId: string, at: Date, projectId?: string) => {
    const r = RULES[eventType];
    contribs.push({ user, eventType, sourceType, sourceId, xp: r.xp, reputation: r.reputation, at, projectId });
  };
  for (const p of projects) {
    addContrib(p.owner, "PROJECT_CREATED", "project", `${p.slug}-created`, daysAgo(p.createdDaysAgo, rand(10)), p.slug);
    if (p.status === "RELEASED") {
      addContrib(p.owner, "RELEASE_PUBLISHED", "project", `${p.slug}-release`, daysAgo(rand(3) + 1, rand(20)), p.slug);
    }
  }
  // Task completions (assignees)
  const doneTasks: [string, string][] = [];
  for (const t of tasks) {
    if (t.status === "DONE" && t.assignee) doneTasks.push([t.slug, t.assignee]);
  }
  doneTasks.forEach(([slug, assignee], i) => {
    addContrib(assignee, "TASK_COMPLETED", "task", `${slug}-task-${i}`, daysAgo(rand(9) + 1, rand(20)), slug);
  });
  // Updates posted
  updates.forEach(([slug, author], i) => {
    addContrib(author, "UPDATE_POSTED", "update", `${slug}-update-${i}`, daysAgo(updates[i][4], rand(10)), slug);
  });
  // Completed milestones
  milestones.forEach(([slug, title, , dueInDays, creator], i) => {
    if (!dueInDays) {
      addContrib(creator, "MILESTONE_COMPLETED", "milestone", `${slug}-ms-${i}`, daysAgo(rand(10) + 1, rand(20)), slug);
    }
  });
  // Accepted collaborations
  for (const [slug, applicant, , status, , d] of requests) {
    if (status === "ACCEPTED") {
      addContrib(applicant, "COLLABORATION_ACCEPTED", "request", `${slug}-collab-${applicant}`, daysAgo(Math.max(1, d - 2)), slug);
    }
  }
  for (const c of contribs) {
    await db.contributionEvent.create({
      data: {
        userId: users[c.user].id, projectId: c.projectId ? projIds[c.projectId] : null,
        eventType: c.eventType, sourceType: c.sourceType, sourceId: c.sourceId,
        xp: c.xp, reputation: c.reputation, verifiedAt: c.at, createdAt: c.at,
      },
    }).catch(() => { /* idempotent unique collision — skip */ });
  }
  // Derive XP / reputation totals from events
  for (const uname of allUsernames) {
    const mine = contribs.filter((c) => c.user === uname);
    const xp = mine.reduce((s, c) => s + c.xp, 0);
    const rep = mine.reduce((s, c) => s + c.reputation, 0);
    await db.user.update({ where: { id: users[uname].id }, data: { xp, reputation: rep } });
  }

  // ── Activity feed (the living pulse) ─────────────────────
  const feed: [string, string, string | null, Record<string, string>, number][] = [];
  for (const p of projects) feed.push([p.slug, "PROJECT_CREATED", p.owner, {}, p.createdDaysAgo]);
  for (const [slug, author, title, , d] of updates) feed.push([slug, "UPDATE_POSTED", author, { updateTitle: title }, d]);
  for (const [slug, title, , dueInDays, creator] of milestones) {
    if (!dueInDays) feed.push([slug, "MILESTONE_COMPLETED", creator, { milestoneTitle: title }, rand(10) + 1]);
  }
  doneTasks.forEach(([slug, assignee], i) => {
    const t = tasks.filter((x) => x.slug === slug && x.status === "DONE" && x.assignee === assignee)[i % 999] ?? tasks.find((x) => x.slug === slug && x.status === "DONE" && x.assignee === assignee);
    if (t) feed.push([slug, "TASK_COMPLETED", assignee, { taskTitle: t.title }, rand(9) + 1]);
  });
  for (const p of projects) {
    for (const [uname, role] of p.members ?? []) {
      if (role !== "VIEWER") feed.push([p.slug, "MEMBER_JOINED", uname, { memberName: members.find((m) => m.username === uname)!.displayName }, Math.max(1, p.createdDaysAgo - rand(20) - 2)]);
    }
  }
  feed.push(["nexus-core", "RELEASE_PUBLISHED", "maya", { title: "Nexus Core v1.1 released" }, 1]);
  feed.push(["webloom", "RELEASE_PUBLISHED", "elena", { title: "WebLoom v1.0 released" }, 2]);
  feed.push(["herald", "RELEASE_PUBLISHED", "felix", { title: "Herald v1.0 released" }, 2]);
  // shuffle-ish: sort by day desc
  feed.sort((a, b) => b[4] - a[4]);
  for (const [slug, eventType, actor, metadata, d] of feed) {
    await db.projectActivity.create({
      data: {
        projectId: projIds[slug], actorId: actor ? users[actor].id : null, eventType,
        metadata: JSON.stringify(metadata), createdAt: daysAgo(d, rand(23)),
      },
    });
  }

  // ── Notifications (realistic mixes, some unread) ─────────
  type NotifRow = {
    recipient: string; actor: string | null; type: string; payload: Record<string, string>;
    d: number; read: boolean; entityType?: string; entityId?: string;
  };
  const notif = (recipient: string, actor: string | null, type: string, payload: Record<string, string>, d: number, read: boolean, entityType?: string, entityId?: string): NotifRow =>
    ({ recipient, actor, type, payload, d, read, entityType, entityId });
  const notifRows: NotifRow[] = [
    // maya (owns nexus-core)
    notif("maya", "kenji", "COLLAB_REQUEST", { applicantName: "Kenji Watanabe", projectName: "Nexus Core", projectSlug: "nexus-core" }, 34, true, "project", "nexus-core"),
    notif("maya", "dario", "PROJECT_COMMENT", { commenterName: "Dario Vlahović", projectName: "Nexus Core", projectSlug: "nexus-core" }, 1, false, "project", "nexus-core"),
    notif("maya", "priya", "COLLAB_REQUEST", { applicantName: "Priya Sharma", projectName: "Nexus Core", projectSlug: "nexus-core" }, 2, false, "project", "nexus-core"),
    notif("maya", "omar", "COLLAB_REQUEST", { applicantName: "Omar Farouk", projectName: "Nexus Core", projectSlug: "nexus-core" }, 1, false, "project", "nexus-core"),
    notif("maya", "elena", "NEW_FOLLOWER", { displayName: "Elena Petrova" }, 3, true),
    notif("maya", "dario", "TASK_ASSIGNED", { displayName: "Dario Vlahović", taskTitle: "RTL: mirror directional icons", projectSlug: "nexus-core", projectName: "Nexus Core" }, 2, false, "task"),
    notif("maya", "zoe", "MEMBER_JOINED", { memberName: "Zoe Adler", projectName: "Nexus Core", projectSlug: "nexus-core" }, 12, true, "project", "nexus-core"),
    // dario (owns pulseboard)
    notif("dario", "maya", "PROJECT_COMMENT", { commenterName: "Maya Chen", projectName: "PulseBoard", projectSlug: "pulseboard" }, 1, false, "project", "pulseboard"),
    notif("dario", "elena", "COLLAB_REQUEST", { applicantName: "Elena Petrova", projectName: "PulseBoard", projectSlug: "pulseboard" }, 3, false, "project", "pulseboard"),
    notif("dario", "kenji", "PROJECT_COMMENT", { commenterName: "Kenji Watanabe", projectName: "PulseBoard", projectSlug: "pulseboard" }, 2, true, "project", "pulseboard"),
    notif("dario", "felix", "TASK_ASSIGNED", { displayName: "Felix Alvarez", taskTitle: "48h soak test harness", projectSlug: "pulseboard", projectName: "PulseBoard" }, 8, true, "task"),
    notif("dario", "sofia", "NEW_FOLLOWER", { displayName: "Sofia Marino" }, 4, true),
    // aylin (owns neuron-forge)
    notif("aylin", "jonas", "COLLAB_REQUEST", { applicantName: "Jonas Berg", projectName: "NeuronForge", projectSlug: "neuron-forge" }, 2, false, "project", "neuron-forge"),
    notif("aylin", "maya", "PROJECT_COMMENT", { commenterName: "Maya Chen", projectName: "NeuronForge", projectSlug: "neuron-forge" }, 2, true, "project", "neuron-forge"),
    notif("aylin", "priya", "MEMBER_JOINED", { memberName: "Priya Sharma", projectName: "NeuronForge", projectSlug: "neuron-forge" }, 20, true, "project", "neuron-forge"),
    // tomas (owns voidrunner)
    notif("tomas", "nadia", "PROJECT_COMMENT", { commenterName: "Nadia Osei", projectName: "Voidrunner", projectSlug: "voidrunner" }, 3, false, "project", "voidrunner"),
    notif("tomas", "zoe", "NEW_FOLLOWER", { displayName: "Zoe Adler" }, 5, true),
    // kenji (owns sentinel-mesh)
    notif("kenji", "maya", "REQUEST_ACCEPTED", { projectName: "Nexus Core", projectSlug: "nexus-core" }, 33, true, "project", "nexus-core"),
    notif("kenji", "felix", "MEMBER_JOINED", { memberName: "Felix Alvarez", projectName: "Sentinel Mesh", projectSlug: "sentinel-mesh" }, 15, true, "project", "sentinel-mesh"),
    notif("kenji", "gabriel", "COLLAB_REQUEST", { applicantName: "Gabriel Costa", projectName: "Quantum Ledger", projectSlug: "quantum-ledger" }, 3, false, "project", "quantum-ledger"),
    // nadia (owns hivemote)
    notif("nadia", "mei", "MEMBER_JOINED", { memberName: "Mei Lin", projectName: "HiveMote", projectSlug: "hivemote" }, 30, true, "project", "hivemote"),
    notif("nadia", "omar", "PROJECT_COMMENT", { commenterName: "Omar Farouk", projectName: "Echoform", projectSlug: "echoform" }, 2, false, "project", "echoform"),
    // elena (owns webloom)
    notif("elena", "sofia", "PROJECT_COMMENT", { commenterName: "Sofia Marino", projectName: "WebLoom", projectSlug: "webloom" }, 1, false, "project", "webloom"),
    notif("elena", "maya", "MEMBER_JOINED", { memberName: "Maya Chen", projectName: "WebLoom", projectSlug: "webloom" }, 24, true, "project", "webloom"),
    // omar (owns echoform)
    notif("omar", "nadia", "UPDATE_POSTED", { displayName: "Nadia Osei", projectName: "Echoform", projectSlug: "echoform" }, 6, true, "project", "echoform"),
    // priya (owns whisperpipe)
    notif("priya", "ravi", "MEMBER_JOINED", { memberName: "Ravi Nair", projectName: "WhisperPipe", projectSlug: "whisperpipe" }, 40, true, "project", "whisperpipe"),
    // lucas (owns guardrail)
    notif("lucas", "kenji", "PROJECT_COMMENT", { commenterName: "Kenji Watanabe", projectName: "Guardrail", projectSlug: "guardrail" }, 8, true, "project", "guardrail"),
    // zoe (owns pitchframe)
    notif("zoe", "maya", "PROJECT_COMMENT", { commenterName: "Maya Chen", projectName: "PitchFrame", projectSlug: "pitchframe" }, 3, false, "project", "pitchframe"),
    notif("zoe", "jonas", "MEMBER_JOINED", { memberName: "Jonas Berg", projectName: "PitchFrame", projectSlug: "pitchframe" }, 30, true, "project", "pitchframe"),
    // ravi (owns datadock)
    notif("ravi", "lucas", "MEMBER_JOINED", { memberName: "Lucas Meyer", projectName: "DataDock", projectSlug: "datadock" }, 33, true, "project", "datadock"),
    // felix (owns herald)
    notif("felix", "sofia", "MEMBER_JOINED", { memberName: "Sofia Marino", projectName: "Herald", projectSlug: "herald" }, 60, true, "project", "herald"),
    notif("felix", "dario", "PROJECT_COMMENT", { commenterName: "Dario Vlahović", projectName: "Herald", projectSlug: "herald" }, 1, false, "project", "herald"),
    // jonas (owns sigil-tactics)
    notif("jonas", "zoe", "COLLAB_REQUEST", { applicantName: "Zoe Adler", projectName: "Sigil Tactics", projectSlug: "sigil-tactics" }, 1, false, "project", "sigil-tactics"),
    notif("jonas", "tomas", "PROJECT_COMMENT", { commenterName: "Tomás Rivera", projectName: "Sigil Tactics", projectSlug: "sigil-tactics" }, 2, true, "project", "sigil-tactics"),
    // amara (owns sol-nest)
    notif("amara", "mei", "MEMBER_JOINED", { memberName: "Mei Lin", projectName: "SolNest", projectSlug: "sol-nest" }, 26, true, "project", "sol-nest"),
    // others
    notif("mei", "amara", "TASK_ASSIGNED", { displayName: "Amara Diallo", taskTitle: "Sense board v0 schematic review", projectSlug: "sol-nest", projectName: "SolNest" }, 4, false, "task"),
    notif("gabriel", "kenji", "NEW_FOLLOWER", { displayName: "Kenji Watanabe" }, 6, true),
    notif("sofia", "felix", "REQUEST_ACCEPTED", { projectName: "Herald", projectSlug: "herald" }, 58, true, "project", "herald"),
    notif("elena", null, "SYSTEM", { message: "Welcome to TEKA NEXUS! Complete your profile to get better project recommendations." }, 205, true),
  ];
  for (const row of notifRows) {
    await db.notification.create({
      data: {
        recipientId: users[row.recipient].id, actorId: row.actor ? users[row.actor].id : null,
        type: row.type, entityType: row.entityType ?? null, entityId: row.entityId ?? null,
        payload: JSON.stringify(row.payload),
        readAt: row.read ? daysAgo(Math.max(0.1, row.d - 0.5), rand(10)) : null,
        createdAt: daysAgo(row.d, rand(10)),
      },
    });
  }

  const counts = {
    users: await db.user.count(),
    projects: await db.project.count(),
    members: await db.projectMember.count(),
    tasks: await db.task.count(),
    updates: await db.projectUpdate.count(),
    milestones: await db.milestone.count(),
    comments: await db.projectComment.count(),
    requests: await db.collaborationRequest.count(),
    notifications: await db.notification.count(),
    activities: await db.projectActivity.count(),
    follows: await db.follow.count(),
  };
  console.log("✅ Seed complete:", counts);
  console.log("   All members share password: Nexus!2025 (e.g. maya.chen@gmail.com)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
