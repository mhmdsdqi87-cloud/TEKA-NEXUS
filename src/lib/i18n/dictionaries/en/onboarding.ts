// TEKA NEXUS — en dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding). Source of truth: onboarding-view.tsx strings.

export const onboarding = {
  topbar: "Profile setup",
  guard: {
    title: "Sign in to set up your profile",
    body: "Onboarding is part of the account flow — create or access your account first.",
    cta: "Go to sign in",
  },
  stepsAria: "Onboarding steps",
  steps: {
    identity: {
      label: "Identity",
      hint: "Who you are on TEKA NEXUS",
    },
    skills: {
      label: "Skills",
      hint: "What you can contribute",
    },
    interests: {
      label: "Interests",
      hint: "What you want to work on",
    },
    goals: {
      label: "Goals",
      hint: "What you are here to do",
    },
  },
  stepOf: "Step {n} of {total}",
  identity: {
    title: "Set up your identity",
    subtitle: "This is how other builders will see you across projects and teams.",
    displayName: "Display name *",
    displayNamePlaceholder: "e.g. Maya Chen",
    bio: "Bio",
    bioPlaceholder: "What do you build? What are you looking for?",
    website: "Website",
    websiteHint: "Optional — must be a full http(s) URL.",
    avatarGradient: "Avatar gradient",
    avatarGradientAria: "Avatar gradient: {name}",
  },
  skills: {
    title: "What can you do?",
    subtitle: "Pick the skills you can bring to a team.",
  },
  interests: {
    title: "What do you want to work on?",
    subtitle: "We tailor discovery to your interests.",
  },
  goals: {
    title: "Why are you here?",
    subtitle: "Your goals shape recommendations and who reaches out to you.",
  },
  nSelected: "{n} selected.",
  selectAtLeastOne: "Select at least one — or skip for now.",
  pickAtLeastOne: "Pick at least one — or skip for now.",
  review: {
    title: "Profile preview",
    skills: "Skills",
    interests: "Interests",
    goals: "Goals",
    note: "Anything you skipped gets a sensible default so your profile still works.",
  },
  continue: "Continue",
  skipForNow: "Skip for now",
  skip: "Skip",
  finish: "Finish",
  saving: "Saving…",
  err: {
    displayName: "Display name is required (1–60 characters).",
    website: "Website must be a valid http(s) URL, e.g. https://your-site.dev",
    save: "Could not save your profile. Please try again.",
  },
  toastWelcome: "Welcome to TEKA NEXUS",
};

export type OnboardingDict = typeof onboarding;
