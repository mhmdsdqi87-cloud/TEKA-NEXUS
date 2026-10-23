// TEKA NEXUS — en dictionary: "pulse" namespace (Live Pulse features).

export type PulseDict = {
  title: string;
  subtitle: string;
  // shared event labels (terminal + activity feed)
  events: {
    join: string;
    project: string;
    like: string;
    comment: string;
    chat: string;
    update: string;
    follow: string;
    save: string;
    member: string;
    task: string;
    file: string;
  };
  live: {
    title: string;
    subtitle: string;
    badge: string;
    feedTitle: string;
    feedSubtitle: string;
    countersTitle: string;
    filterAll: string;
    empty: string;
    loadError: string;
    openCommand: string;
    ctaFromExplore: string;
    ctaSubtitle: string;
    counters: {
      users: string;
      projects: string;
      likes: string;
      comments: string;
      chats: string;
      follows: string;
    };
  };
  ai: {
    title: string;
    tagline: string;
    badge: string;
    placeholder: string;
    greeting: string;
    quickPrompts: string[];
    send: string;
    clearChat: string;
    retry: string;
    typing: string;
    offlineBadge: string;
    errGeneric: string;
    loginRequired: string;
    disclaimer: string;
    contextChip: string;
  };
  hub: {
    title: string;
    subtitle: string;
    platformRepo: string;
    platformRepoDesc: string;
    communityRepos: string;
    communityReposEmpty: string;
    stars: string;
    forks: string;
    issues: string;
    noReposCta: string;
  };
  challenge: {
    badge: string;
    daysLeft: string;
    hoursLeft: string;
    joinedCount: string;
    completedCount: string;
    join: string;
    joined: string;
    progressOf: string;
    completed: string;
    loginRequired: string;
    loadError: string;
  };
  leaderboard: {
    title: string;
    week: string;
    allTime: string;
    score: string;
    xp: string;
    you: string;
    level: string;
    empty: string;
    levelTitles: { rookie: string; explorer: string; builder: string; veteran: string; master: string; legend: string };
  };
  chat: {
    tab: string;
    title: string;
    live: string;
    placeholder: string;
    empty: string;
    loginRequired: string;
    tooFast: string;
    loadError: string;
    sendError: string;
  };
  github: {
    title: string;
    live: string;
    commits: string;
    openRepo: string;
    notFound: string;
    loadError: string;
  };
  terminal: {
    title: string;
    expand: string;
    collapse: string;
    welcome: string;
    helpHint: string;
    guest: string;
    notFound: string;
    matrixOn: string;
    easterEgg: string;
  };
};

export const pulse: PulseDict = {
  title: "Community Pulse",
  subtitle: "Live challenge, leaderboard and the pulse of the whole community",
  events: {
    join: "joined",
    project: "launched",
    like: "liked",
    comment: "commented on",
    chat: "messaged in",
    update: "posted an update to",
    follow: "started following",
    save: "saved",
    member: "joined the team of",
    task: "completed a task in",
    file: "created a file in",
  },
  live: {
    title: "Nexus Command Center",
    subtitle: "The live beating heart of the community — real activity, real time",
    badge: "LIVE",
    feedTitle: "Community activity",
    feedSubtitle: "Every action by every member, streamed in real time",
    countersTitle: "Live counters",
    filterAll: "All",
    empty: "Quiet for now — do something and watch it appear here!",
    loadError: "Live feed failed to load",
    openCommand: "Open Command Center",
    ctaFromExplore: "Open the Command Center",
    ctaSubtitle: "Live terminal, real-time activity, NEXUS AI and GitHub hub — all in one place",
    counters: {
      users: "Members",
      projects: "Projects",
      likes: "Likes",
      comments: "Comments",
      chats: "Chat msgs",
      follows: "Follows",
    },
  },
  ai: {
    title: "NEXUS AI",
    tagline: "Your powerful copilot — knows the whole platform, live",
    badge: "AI",
    placeholder: "Ask me anything about the platform or coding…",
    greeting:
      "Hi! I'm NEXUS AI 🤖\nI see the live pulse of this platform — real stats, top projects, the weekly challenge and your own profile.\nAsk me to recommend projects, find teammates, boost your XP, help with code, or shape your idea into a project!",
    quickPrompts: [
      "Which project should I join?",
      "How do I earn XP faster?",
      "Suggest a name for my project idea",
      "Explain the weekly challenge",
      "Help me debug a Python loop",
    ],
    send: "Send",
    clearChat: "Clear chat",
    retry: "Try again",
    typing: "NEXUS AI is thinking…",
    offlineBadge: "offline mode — real platform data",
    errGeneric: "NEXUS AI is unreachable right now",
    loginRequired: "Sign in to chat with NEXUS AI",
    disclaimer: "NEXUS AI sees a live snapshot of platform stats — it can't run code or browse the web. Verify anything important.",
    contextChip: "live data attached",
  },
  hub: {
    title: "GitHub Command Center",
    subtitle: "The engine room — our own repo and every community project with code",
    platformRepo: "Platform repository",
    platformRepoDesc: "TEKA NEXUS itself is built in the open — every commit lands here",
    communityRepos: "Community repos",
    communityReposEmpty: "No community project has connected a GitHub repo yet — add yours in project settings!",
    stars: "stars",
    forks: "forks",
    issues: "issues",
    noReposCta: "Connect your repo",
  },
  challenge: {
    badge: "Weekly Challenge",
    daysLeft: "{days} days left",
    hoursLeft: "{hours}h left",
    joinedCount: "{count} fighters in",
    completedCount: "{count} finished it",
    join: "Join the challenge",
    joined: "You're in — go!",
    progressOf: "{done} / {target} activities",
    completed: "Completed! +{xp} XP earned",
    loginRequired: "Sign in to join the challenge",
    loadError: "Challenge failed to load",
  },
  leaderboard: {
    title: "Leaderboard",
    week: "This week",
    allTime: "All-time",
    score: "{score} pts",
    xp: "{xp} XP",
    you: "You",
    level: "Lv {level}",
    empty: "No scores yet this week — be the first!",
    levelTitles: {
      rookie: "Rookie",
      explorer: "Explorer",
      builder: "Builder",
      veteran: "Veteran",
      master: "Master",
      legend: "Legend",
    },
  },
  chat: {
    tab: "Live chat",
    title: "Team chat",
    live: "LIVE",
    placeholder: "Write a message…",
    empty: "Be the first to say hi ⚡",
    loginRequired: "Sign in to send messages",
    tooFast: "Slow down! Try again in a minute.",
    loadError: "Chat failed to load",
    sendError: "Message failed to send",
  },
  github: {
    title: "GitHub repository",
    live: "LIVE",
    commits: "Latest commits",
    openRepo: "Open on GitHub",
    notFound: "Repository not found or private",
    loadError: "GitHub data unavailable right now",
  },
  terminal: {
    title: "NEXUS TERMINAL v3.0",
    expand: "Expand",
    collapse: "Collapse",
    welcome: "Connected to the live pulse relay",
    helpHint: "Type 'help' for commands",
    guest: "guest",
    notFound: "command not found — try 'help'",
    matrixOn: "entering the matrix…",
    easterEgg: "the power of the Persian dev community 🇮🇷",
  },
};
