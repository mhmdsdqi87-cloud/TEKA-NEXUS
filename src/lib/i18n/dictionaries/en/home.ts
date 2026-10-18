// TEKA NEXUS — en dictionary: "home" namespace (owned by translation agent 2-b).
// Strings extracted verbatim from src/views/home-view.tsx.

export const home = {
  // Feed event sentence fragments (rendered as: {actor} {verb} [“{title}” {on}] {project})
  someone: "Someone",
  verbCreated: "created",
  verbUpdate: "published an update on",
  verbMilestone: "completed a milestone on",
  verbJoined: "joined",
  verbTask: "completed a task on",
  verbActivityOn: "activity on",
  on: "on",

  // Feed event card a11y
  openProjectAria: "Open project {name}",
  viewProfileAria: "View {name}'s profile",

  // Filter chips
  filterAll: "All",
  filterReleases: "Releases",
  filterUpdates: "Updates",
  filterMilestones: "Milestones",
  filterGroupAria: "Filter feed by event type",

  // Header + welcome strip
  subtitle: "Live activity from public projects.",
  welcomeBack: "Welcome back, {name}",
  readyToBuild: "@{username} · Ready to build something?",
  yourProfile: "Your profile",

  // States
  feedError: "Failed to load feed",
  feedErrorTitle: "Could not load the feed",
  emptyTitle: "Nothing here yet",
  emptyDescription:
    "When people launch projects, ship releases and hit milestones, it shows up here.",
  createFirstProject: "Create the first project",
  noFilterEvents: "No {filter} events in the loaded feed yet.",
  loadMore: "Load more",
  pageStatus: "{total} events · page {page} of {pages}",
};

export type HomeDict = typeof home;
