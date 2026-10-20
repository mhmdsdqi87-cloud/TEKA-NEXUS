// TEKA NEXUS — en dictionary: "profile" namespace (owned by translation agent 2-d).
// Source of truth for profile-view.tsx + shared strings used by atoms.tsx / project-card.tsx.

export const profile = {
  actions: {
    follow: "Follow",
    following: "Following",
    blocked: "Blocked",
    editProfile: "Edit profile",
    moreActions: "More actions",
    blockUser: "Block user",
    unblockUser: "Unblock user",
    reportUser: "Report user",
  },
  stats: {
    followers: "Followers",
    following: "Following",
    reputation: "Reputation",
  },
  tabs: {
    contributions: "Contributions",
    about: "About",
  },
  header: {
    memberSince: "Member since {date}",
  },
  founder: {
    badge: "Founder",
    verified: "Officially verified account",
  },
  sections: {
    goals: "Goals",
    interests: "Interests",
    skills: "Skills",
  },
  contributionTypes: {
    task: "Completed task",
    release: "Published release",
    milestone: "Completed milestone",
    update: "Posted update",
    collab: "Joined a team",
    created: "Created project",
    other: "Contributed",
  },
  contributions: {
    notice: "Reputation is earned through verified contributions only — it can't be bought.",
  },
  empty: {
    projects: {
      title: "No public projects yet",
      description: "When {name} publishes projects, they'll show up here.",
    },
    contributions: {
      title: "No contributions yet",
      description:
        "Verified tasks, milestones, releases, and collaborations will appear here as they happen.",
    },
    about: {
      title: "This creator hasn't added details yet",
      description: "Their bio, skills, and interests will appear here once they complete their profile.",
    },
  },
  about: {
    bio: "Bio",
    noBio: "No bio yet.",
    noneListed: "None listed yet.",
    details: "Creator details",
    joined: "Joined {date}",
  },
  notFound: {
    title: "Creator not found",
    description: "This profile doesn't exist or may have been removed.",
    action: "Explore projects",
  },
  loadFailed: {
    title: "Couldn't load this profile",
    description: "Check your connection and try again.",
  },
  report: {
    title: "Report {name}",
    description: "Reports go to the moderation queue and are reviewed by the TEKA team.",
    reason: "Reason",
    pickReason: "Pick a reason",
    detailsLabel: "Details (optional)",
    detailsPlaceholder: "Add any context that helps the moderators.",
    submit: "Submit report",
  },
  reportReasons: {
    spam: "Spam",
    harassment: "Harassment",
    inappropriate: "Inappropriate content",
    copyright: "Copyright violation",
    other: "Something else",
  },
  toasts: {
    followed: "Following {name}",
    unfollowed: "Unfollowed {name}",
    blocked: "Blocked @{name}",
    unblocked: "Unblocked @{name}",
    reportSubmitted: "Report submitted — our team will review it.",
  },
  errors: {
    loadFailed: "Couldn't load this profile.",
    signInToFollow: "Sign in to follow creators.",
    followFailed: "Couldn't update follow.",
    signInToBlock: "Sign in to manage blocks.",
    blockFailed: "Couldn't update block.",
    reportFailed: "Couldn't submit report.",
  },
  // Shared strings consumed by components/shared/atoms.tsx + project-card.tsx.
  shared: {
    openProjectAria: "Open project {name}",
    likes: "Likes",
    teamSize: "Team size",
    updated: "updated {time}",
    coverAlt: "{name} cover",
  },
};

export type ProfileDict = typeof profile;
