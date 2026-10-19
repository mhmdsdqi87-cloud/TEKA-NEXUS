// TEKA NEXUS — en dictionary: "landing" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding). Source of truth: landing-view.tsx strings.

export const landing = {
  topbar: {
    navAria: "Primary",
    startBuilding: "Start Building",
  },
  hero: {
    badge: "TEKA NEXUS — now in open beta",
    title1: "Where Ideas Become ",
    title2: "Real Technology",
    title3: ".",
    subtitle: "Discover projects, find your people, and build what comes next.",
    exploreProjects: "Explore Projects",
  },
  orbit: {
    ship: "Ship",
    teamUp: "Team up",
    fork: "Fork",
    rankUp: "Rank up",
  },
  live: {
    aria: "Live activity",
    label: "Live pulse",
    empty: "Be the first to build something real.",
  },
  feed: {
    created: "created",
    released: "released",
    updateOn: "posted an update on",
    taskOn: "closed a task on",
    milestoneOn: "hit a milestone on",
    joined: "joined",
    updated: "updated",
    someone: "Someone",
    projectFallback: "a project",
  },
  workflow: {
    eyebrow: "The path",
    title: "One workflow, idea to impact.",
    subtitle:
      "Every feature in TEKA NEXUS maps to a step of the same loop — the way real projects actually ship.",
    idea: "IDEA",
    discover: "DISCOVER",
    findTeam: "FIND A TEAM",
    build: "BUILD",
    collaborate: "COLLABORATE",
    publish: "PUBLISH",
    grow: "GROW",
    monetize: "MONETIZE",
  },
  features: {
    eyebrow: "Platform",
    title: "Everything you need to go from zero to shipped.",
    howLabel: "How it works",
    discovery: {
      title: "Nexus Discovery",
      body: "Find projects by category, status, tags, and the skills they need — from first-commit ideas to released builds. Every public project is indexed the moment it is published.",
      how: "Open Explore to filter the catalog, or use search to jump straight to projects, people, and tags.",
    },
    workspaces: {
      title: "Project Workspaces",
      body: "Every project gets a shared workspace: a task board, milestones, progress updates, and a team roster with explicit roles from owner to viewer.",
      how: "Owners publish a project and review requests; accepted collaborators plan and ship work on the same board.",
    },
    reputation: {
      title: "Verified Reputation",
      body: "Reputation is earned, not claimed. The server verifies every contribution and awards XP and reputation automatically — nothing is self-reported.",
      how: "Finish tasks, hit milestones, and ship releases; the results appear on your profile and are visible to teams.",
    },
  },
  preview: {
    eyebrow: "Inside a project",
    title: "A workspace built for shipping.",
    subtitle: "Tasks, milestones, updates, and your whole team — organized in one board per project.",
    chip: "Preview",
    caption: "Product preview — illustrative layout of a project workspace.",
    backlog: "Backlog",
    inProgress: "In Progress",
    done: "Done",
    taskCard: "Task card",
    assignee: "Assignee",
  },
  how: {
    eyebrow: "How it works",
    title: "Start in three steps.",
    step1: {
      title: "Create a profile",
      body: "Sign up, set your display name, skills, and interests. Onboarding takes under a minute.",
    },
    step2: {
      title: "Publish or discover a project",
      body: "Share your own idea as a project with a tagline and category, or browse discovery for something worth joining.",
    },
    step3: {
      title: "Request to collaborate",
      body: "Apply with a role and a short introduction. The project owner reviews your request and adds you to the team.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    q1: "What is TEKA NEXUS?",
    a1: "A developer-first platform where ideas become real technology. Publish a project at any stage — from a rough idea to a released build — and find the people to build it with. Project discovery, team formation, and verified reputation live in one place.",
    q2: "Is it free?",
    a2: "Yes. TEKA NEXUS is free while we're in open beta. Monetization tools are planned for a later phase — for now, the only currency is reputation.",
    q3: "How is reputation earned?",
    a3: "It is never self-reported. The server awards XP and reputation automatically for verified contributions: completing tasks, completing milestones, posting updates, releasing a project, and having a collaboration request accepted.",
    q4: "Can I use it without crypto?",
    a4: "Yes. TEKA NEXUS is a standard web platform — no wallet, tokens, or blockchain knowledge required. Everything works with a regular email account.",
    q5: "How do teams work?",
    a5: "Projects have owners, admins, contributors, and viewers. To join, you send a collaboration request with your intended role and a short introduction; the project owner reviews and accepts or rejects it.",
  },
  footer: {
    tagline: "TEKA NEXUS — Imagine. Build. Connect.",
    previewNote:
      "Every project here is real, built by real members — join in and ship yours.",
    navAria: "Footer — {section}",
    colProduct: "Product",
    colCompany: "Company",
    colLegal: "Legal",
    colSupport: "Support",
    about: "About",
    faq: "FAQ",
    terms: "Terms",
    privacy: "Privacy",
    guidelines: "Guidelines",
  },
  toast: {
    comingSoon: "Not part of this preview yet — coming in a later phase.",
  },
};

export type LandingDict = typeof landing;
