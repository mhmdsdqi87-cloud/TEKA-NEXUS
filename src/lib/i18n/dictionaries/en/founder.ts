export const founder = {
  title: "Founder Console",
  subtitle: "Every member of TEKA NEXUS, live.",
  badge: "Founder",
  directoryTitle: "Registered members",
  searchPlaceholder: "Search by name, @username or email…",
  pendingOnboarding: "Setup incomplete",
  empty: "No members match that search.",
  loadFailed: "Could not load the directory. Try again.",
  stats: {
    users: "Total members",
    onboarded: "Completed setup",
    totalXp: "Community XP",
    totalRep: "Community REP",
    projects: "Projects",
    sessions: "Active sessions",
  },
  supabase: {
      "title": "Supabase cloud",
      "subtitle": "Live link to your own Supabase project",
      "connected": "Connected",
      "offline": "Unreachable",
      "checking": "Checking…",
      "auth": "Auth service",
      "mirrored": "Mirrored accounts",
      "storage": "Avatar storage",
      "storageReady": "teka-avatars bucket live",
      "dbSync": "Full DB sync",
      "dbSyncWaiting": "Waiting for database password",
      "dbSyncActive": "Active",
      "version": "version"
  },
};

export type FounderDict = typeof founder;
