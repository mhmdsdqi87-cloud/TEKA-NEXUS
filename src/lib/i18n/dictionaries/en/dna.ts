// TEKA NEXUS — en dictionary: "dna" namespace (NEXUS 2.0 Phase 1).
// Project DNA workspace — strings mirror src/components/dna/dna-view.tsx.
// "Calculated" labels are part of the honesty contract: derived numbers are
// always labeled, never presented as measured facts.

export const dna = {
  title: "Project DNA",
  subtitle: "The complete digital identity of every project — identity, architecture, roadmap, and verified history.",
  searchPlaceholder: "Search projects…",
  error: "Couldn't load this project's DNA.",
  noResults: "No projects match your search.",
  empty: "No public projects yet — create the first one and its DNA will start growing.",
  createFirst: "Create a project",
  openAria: "Open DNA of {name}",
  updated: "updated",
  prevPage: "Previous",
  nextPage: "Next",
  pageOf: "Page {page} of {pages}",

  notFoundTitle: "DNA unavailable",
  notFoundBody: "This project doesn't exist or is private. Private DNA is only visible to the project's members.",
  backToPicker: "All projects",

  privateBadge: "Private",
  verifiedBadge: "Verified platform records",
  created: "Created",
  linkRepo: "Repository",
  linkDemo: "Demo",
  linkSite: "Website",
  openWorkspace: "Open workspace",

  countMembers: "Members",
  countLikes: "Likes",
  countUpdates: "Updates",
  countTasks: "Tasks",
  countComments: "Comments",
  countRequests: "Open requests",

  archTitle: "Architecture map",
  archRootLabel: "declared stack layers",
  archDeclaredNote: "Rendered from the project's declared tags — nothing is inferred.",
  emptyStack: "No stack declared yet — the owner can add tags on the project.",
  layerFrontend: "Frontend",
  layerBackend: "Backend",
  layerData: "Data",
  layerTools: "Tools",
  layerOther: "Declared (uncategorized)",

  healthTitle: "Health indicators",
  calculatedBadge: "Calculated",
  healthTaskRate: "Task completion rate",
  healthFormulaTasks: "done / total tasks",
  healthProgress: "Roadmap progress",
  healthFormulaMilestones: "completed / total milestones",
  healthActivity: "Activity (30 days)",
  healthFormulaActivity: "real activity events",
  healthMomentum: "Momentum",
  healthFormulaMomentum: "activity ÷ active days",
  healthDisclaimer: "All indicators are calculated from real platform records — they are not external measurements and not AI predictions.",
  healthLastActivity: "Last activity:",

  milestonesTitle: "Roadmap & milestones",
  milestoneAdd: "Add milestone",
  milestoneProgress: "{percent}% · {done}/{total} completed",
  milestoneTitleLabel: "Title",
  milestoneDueLabel: "Due date (optional)",
  milestoneSave: "Save milestone",
  cancel: "Cancel",
  emptyMilestones: "No milestones yet. Contributors can add the first milestone to start the roadmap.",
  overdue: "overdue",
  milestoneDone: "Completed",
  milestoneCompleteAria: "Mark milestone complete",
  milestoneUncompleteAria: "Mark milestone incomplete",
  milestoneDeleteAria: "Delete milestone",

  timelineTitle: "Development timeline",
  timelineVerifiedNote: "verified records only",
  emptyTimeline: "No recorded events yet.",
  timelineKinds: {
    PROJECT_CREATED: "Project created",
    MEMBER_JOINED: "Member joined",
    UPDATE_POSTED: "Update posted",
    MILESTONE_CREATED: "Milestone planned",
    MILESTONE_COMPLETED: "Milestone completed",
    TASK_COMPLETED: "Task completed",
  },

  contributorsTitle: "Contributors",
  contributorsNote: "with verified contribution counts",
  joined: "Joined",
  verifiedEvents: "verified events",
}

export type DnaDict = typeof dna;
