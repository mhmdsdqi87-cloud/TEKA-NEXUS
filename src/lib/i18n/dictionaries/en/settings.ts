// TEKA NEXUS — en dictionary: "settings" namespace (owned by translation agent 2-d).
// Source of truth for settings-view.tsx (profile / account / notifications / privacy tabs).

export const settings = {
  subtitle: "Manage your profile, account security, and community preferences.",
  signedOut: {
    title: "Sign in to manage your settings",
    description: "Your profile, account, notification, and privacy controls live here.",
  },
  tabs: {
    profile: "Profile",
    account: "Account",
    notifications: "Notifications",
    privacy: "Privacy",
  },
  profileTab: {
    displayName: "Display name",
    displayNamePlaceholder: "How should the community call you?",
    bio: "Bio",
    bioPlaceholder: "What are you building? What do you care about?",
    website: "Website",
    websiteHint: "Shown as a link on your public profile.",
    websiteError: "Enter a full URL starting with http:// or https://",
    avatarGradient: "Avatar gradient",
    chooseGradient: "Choose avatar gradient",
    gradientName: "Gradient {name}",
    skills: "Skills",
    skillsHint: "Pick everything you can contribute with — teams use these to find you.",
  },
  avatar: {
    title: "Profile photo",
    upload: "Upload photo",
    remove: "Remove photo",
    hint: "JPG, PNG or WebP — auto-cropped to a circle. Up to 400 KB.",
    tooBig: "That image is too large — please choose one under 400 KB.",
    invalid: "Couldn't read that image — try a different file.",
    toastSaved: "Profile photo updated",
    toastRemoved: "Profile photo removed",
    fallback: "Profile photo",
  },
  accountTab: {
    language: "Language",
    languageDescription:
      "Choose your interface language — English, Español, 中文, العربية, فارسی or Français.",
    email: "Email",
    emailHint: "Your sign-in email — read-only during the beta.",
    changePassword: "Change password",
    changePasswordHint: "Changing your password signs out every other device.",
    currentPassword: "Current password",
    newPassword: "New password",
    pwTooShort: "At least 8 characters.",
    confirmPassword: "Confirm new password",
    pwMismatch: "Passwords don't match.",
    updatePassword: "Update password",
    dangerZone: "Danger zone",
    dangerDescription:
      "Deleting your account permanently removes your profile and every project you own, along with their tasks, updates, and milestones. This can't be undone.",
    deleteAccount: "Delete account",
  },
  delete: {
    title: "Delete your account?",
    typeUsername: "This permanently removes your profile and all projects you own. Type your username",
    toContinue: "to continue.",
    usernameAria: "Type your username to confirm",
    confirmTitle: "Confirm with your password",
    confirmDescription:
      "This is the last step — enter your password to permanently delete your account and every project you own.",
    passwordPlaceholder: "Your password",
    passwordAria: "Confirm your password",
    continue: "Continue",
    deleteForever: "Delete forever",
  },
  notificationsTab: {
    projectActivity: {
      title: "Project activity",
      description: "New tasks, updates, releases, and milestones in projects you're part of.",
    },
    collaboration: {
      title: "Collaboration requests",
      description: "Applications to your projects and decisions on requests you've sent.",
    },
    social: {
      title: "Social activity",
      description: "New followers and other activity across your network.",
    },
    toggleAria: "Toggle {name}",
  },
  privacyTab: {
    safetyTitle: "Community safety",
    safetyIntro: "TEKA NEXUS moderation is built on real, transparent behaviors — not promises.",
    safety: {
      reporting: {
        title: "Reporting",
        text: "Report any project, comment, or user from its menu. Reports land in a review queue — nothing is actioned without human review.",
      },
      blocking: {
        title: "Blocking",
        text: "Blocking someone removes follows between you and stops them from following you or interacting with your work.",
      },
      moderation: {
        title: "Moderation queue",
        text: "Every report is reviewed by the TEKA team before any action is taken on an account or project.",
      },
      deletion: {
        title: "Account deletion",
        text: "You can permanently delete your account and owned projects at any time from the Account tab.",
      },
    },
    previewNote: "Preview note: moderation review tools are handled by the TEKA team during beta.",
    blockTitle: "Block a user",
    blockDescription:
      "Enter a username to block them. Blocking also removes follows between you, and it works both ways — submitting a username you've already blocked will unblock them.",
    usernamePlaceholder: "username",
    usernameAria: "Username to block",
    blockButton: "Block user",
  },
  toasts: {
    profileUpdated: "Profile updated",
    passwordChanged: "Password changed — other devices signed out",
    accountDeleted: "Your account has been deleted.",
    prefsUpdated: "Notification preferences updated",
    blocked: "Blocked @{name}",
    unblocked: "Unblocked @{name}",
  },
  errors: {
    emptyDisplayName: "Display name can't be empty.",
    saveFailed: "Couldn't save your profile.",
    enterCurrentPassword: "Enter your current password.",
    pwTooShort: "New password must be at least 8 characters.",
    pwMismatch: "New passwords don't match.",
    pwChangeFailed: "Couldn't change your password.",
    deleteFailed: "Couldn't delete your account.",
    loadPrefsFailed: "Couldn't load notification settings.",
    prefsUpdateFailed: "Couldn't update preferences.",
    blockFailed: "Couldn't update block.",
  },
};

export type SettingsDict = typeof settings;
