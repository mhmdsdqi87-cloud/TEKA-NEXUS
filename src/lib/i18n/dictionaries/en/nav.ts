// TEKA NEXUS — en dictionary: "nav" namespace (owned by translation agent 2-b).
// Shell chrome: side nav, top bar, mobile nav, right rail, footer.
// Strings extracted verbatim from src/components/shell/app-shell.tsx.

export const nav = {
  // Side navigation (LeftNav / MobileNav)
  newProject: "New project",
  academy: "Academy",
  founder: "Founder Console",
  primaryNavAria: "Primary navigation",
  mainAria: "Main",
  mobileNavAria: "Mobile navigation",
  alerts: "Alerts",

  // Top bar
  brandHomeAria: "TEKA NEXUS home",
  notificationsUnreadAria: "Notifications, {count} unread",
  accountMenuAria: "Account menu",
  account: "Account",
  viewProfile: "View profile",
  loggedOutToast: "Logged out. See you soon.",
  logoutFailed: "Logout failed",

  // Unread badge
  unreadNotificationsAria: "{count} unread notifications",

  // Right rail
  trending: "Trending projects",
  trendingEmpty: "No projects yet — be the first to launch one.",
  trendingError: "Failed to load trending projects",
  requestsSection: "Team invitations & requests",
  requestsAria: "Team invitations and requests",
  requestsLoading: "Loading requests…",
  requestsEmpty: "No pending requests",
  requestsPending: "{count} pending request",
  requestsPendingPlural: "{count} pending requests",
  requestsSentSummary: "{sent} sent by you · Review in Teams",
  reviewInTeams: "Review in Teams",
  requestsError: "Failed to load team requests",
  railAria: "Sidebar highlights",
  tipAria: "Tip",
  tipTitle: "Preview tip",
  tipBefore: "Press",
  tipAfter: "to search anywhere.",

  // Footer
  footerTagline: "TEKA NEXUS — where builders meet",
  footerAria: "Footer",
};

export type NavDict = typeof nav;
