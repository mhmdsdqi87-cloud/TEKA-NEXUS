// TEKA NEXUS — English (base) dictionary: "notifications" namespace.
// Source of truth extracted from src/views/notifications-view.tsx.
// Owned by translation agent (Task 2-c).

export const notifications = {
  someone: "Someone",
  system: "System notification",
  fallback: "You have a new notification",
  types: {
    newFollower: "{name} started following you",
    commentOn: "{name} commented on {project}",
    commentOnYours: "{name} commented on your project",
    joinRequest: "{name} requested to join {project}",
    joinRequestPlain: "{name} sent a collaboration request",
    requestAccepted: "Your request to join {project} was accepted",
    requestAcceptedPlain: "Your collaboration request was accepted",
    requestRejected: "Your request to join {project} was rejected",
    requestRejectedPlain: "Your collaboration request was rejected",
    taskAssigned: "{name} assigned you a task: {task}",
    taskAssignedPlain: "{name} assigned you a new task",
    memberJoined: "{name} joined {project}",
    memberJoinedTeam: "{name} joined your team",
  },
  toasts: {
    loadFailed: "Couldn't load notifications.",
    allRead: "All notifications marked as read",
    markFailed: "Couldn't mark notifications as read.",
    markOneFailed: "Couldn't mark this notification as read.",
  },
  auth: {
    title: "Sign in to view your notifications",
    description: "Activity from your projects, teams, and followers shows up here.",
  },
  unreadOne: "{n} unread notification",
  unreadMany: "{n} unread notifications",
  allCaughtUp: "You're all caught up",
  markAll: "Mark all read",
  a11y: {
    filter: "Filter notifications",
    unreadSuffix: "(unread)",
  },
  filterAll: "All",
  filterUnread: "Unread",
  filterUnreadCount: "Unread · {n}",
  loadFailed: {
    title: "Couldn't load notifications",
    description: "Check your connection and try again.",
  },
  noUnreadDesc: "No unread notifications right now.",
  emptyDesc: "Activity from your projects, teams, and followers will appear here.",
};

export type NotificationsDict = typeof notifications;
