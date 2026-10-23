// TEKA NEXUS — English (base) dictionary: "teams" namespace.
// Source of truth extracted from src/views/teams-view.tsx.
// Owned by translation agent (Task 2-c).

export const teams = {
  tabs: {
    crews: "My crews",
    requests: "Requests",
    discover: "Discover",
  },
  auth: {
    title: "Sign in to manage your teams",
    description:
      "Track your crews, review collaboration requests and discover projects that need your skills.",
  },
  titlePrefix: "Your",
  titleCrews: "crews",
  subtitle: "Manage the projects you build together, answer requests and find new collaborators.",
  a11y: {
    yourRole: "Your role: {role}",
    sentAria: "Sent requests",
    receivedAria: "Received requests",
    viewProfileAria: "View profile of {name}",
  },
  crews: {
    emptyTitle: "You’re not part of a crew yet",
    emptyDesc: "Join a project or start your own — collaboration is where the best builds happen.",
    explore: "Explore projects",
    start: "Start a project",
    joined: "joined {date}",
    open: "Open workspace",
    member: "{n} member",
    members: "{n} members",
  },
  requests: {
    sent: "Sent",
    received: "Received",
    pendingCount: "({n} pending)",
    sentEmpty: "No sent requests — find a project and ask to join.",
    receivedEmpty: "No incoming requests yet. Keep shipping — developers will find you.",
    unknownProject: "Unknown project",
    appliedAs: "Applied as {role} · {ago}",
    withdraw: "Withdraw",
    wantsToJoin: "Wants to join {project} as {role}",
    wantsToJoinPrefix: "Wants to join ",
    wantsToJoinMiddle: " as ",
    wantsToJoinSuffix: "",
    aProject: "a project",
    viewProject: "View project",
  },
  status: {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
    WITHDRAWN: "Withdrawn",
  },
  accept: "Accept",
  reject: "Reject",
  toasts: {
    withdrawn: "Request withdrawn",
    accepted: "Welcome aboard — request accepted",
    rejected: "Request rejected",
  },
  errors: {
    generic: "Something went wrong",
  },
  discover: {
    title: "Crews looking for members",
    subtitle: "Projects listing required skills — find a team that needs what you know.",
    emptyTitle: "No projects listing required skills right now",
    emptyDesc: "Showing the latest projects instead — check back as new crews post their needs.",
  },
  chat: {
    title: "Team chat",
    online: "{n} online",
    onlineOne: "Just you online",
    typing: "{names} is typing…",
    typingMulti: "{names} are typing…",
    placeholder: "Message your crew…",
    send: "Send",
    empty: "No messages yet — say hi 👋",
    emptyHint: "Messages land here for the whole crew.",
    synced: "Synced",
    sendError: "Message failed to send",
    unavailable: "Chat is unavailable right now",
    emoji: "Emoji",
    disconnected: "Connection lost",
    reconnecting: "Reconnecting…",
    deleted: "Message deleted",
    loginRequired: "Sign in to join the conversation",
    reactAdd: "Add reaction",
    rateLimited: "Easy there — too many messages in a row",
    charsLeft: "{n} characters left",
    a11y: {
      openChat: "Open team chat for {name}",
      closeChat: "Close chat",
      deleteMessage: "Delete message",
      messages: "Messages",
    },
  },
};

export type TeamsDict = typeof teams;
