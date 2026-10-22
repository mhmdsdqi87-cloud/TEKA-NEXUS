// TEKA NEXUS — en dictionary: "pulse" namespace (Live Pulse features).

export type PulseDict = {
  title: string;
  subtitle: string;
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
    eventLabels: { join: string; project: string; like: string; comment: string; chat: string; update: string };
    matrixOn: string;
    easterEgg: string;
  };
};

export const pulse: PulseDict = {
  title: "Community Pulse",
  subtitle: "Live challenge, leaderboard and the pulse of the whole community",
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
    title: "NEXUS TERMINAL v2.6",
    expand: "Expand",
    collapse: "Collapse",
    welcome: "Connected to the live pulse relay",
    helpHint: "Type 'help' for commands",
    guest: "guest",
    notFound: "command not found — try 'help'",
    eventLabels: { join: "joined", project: "launched", like: "liked", comment: "commented on", chat: "messaged in", update: "posted an update to" },
    matrixOn: "entering the matrix…",
    easterEgg: "the power of the Persian dev community 🇮🇷",
  },
};
