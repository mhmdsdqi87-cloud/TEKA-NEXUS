// TEKA NEXUS — English (base) dictionary: "projectNew" namespace.
// Source of truth extracted from src/views/project-new-view.tsx.
// Owned by translation agent (Task 2-c).

export const projectNew = {
  auth: {
    title: "Sign in required",
    description: "You need a TEKA NEXUS account to launch a project.",
    goLogin: "Go to login",
  },
  title: "Launch a project",
  subtitle: "Tell the world what you’re building.",
  form: {
    name: "Project name",
    namePlaceholder: "e.g. Nexus CLI",
    slugHint: "Your URL slug appears here as you type.",
    tagline: "Tagline",
    taglinePlaceholder: "One line that sells the idea",
    category: "Category",
    status: "Status",
    statusPlaceholder: "Pick a status",
    visibility: "Visibility",
    tags: "Tags",
    maxTagsReached: "Max 8 tags reached",
    tagPlaceholder: "Type a tag and press Enter",
    optional: "(optional)",
    links: "Links",
    description: "Description",
    descriptionPlaceholder: "What are you building? Who is it for? What makes it different?",
    descriptionHint: "Plain text or Markdown.",
    requiredSkills: "Required skills",
    repoUrl: "Repository URL",
    demoUrl: "Demo URL",
    websiteUrl: "Website URL",
    cover: "Cover image",
    coverHint: "Pick an image or paste a link to your own.",
    coverNone: "No cover",
    coverUrlLabel: "Custom image URL",
  },
  a11y: {
    categoryGroup: "Project category",
    visibilityGroup: "Project visibility",
    removeTag: "Remove tag {tag}",
    coverGroup: "Project cover image",
    coverNone: "No cover",
    coverOption: "Cover {name}",
    coverUrlHide: "Hide image URL field",
  },
  visibilityDesc: {
    PUBLIC: "Listed in Explore and the live feed. Anyone can view it.",
    UNLISTED: "Viewable by direct link. Hidden from Explore and the feed.",
    PRIVATE: "Only you and your team members can view this project.",
  },
  visibilityName: {
    PUBLIC: "Public",
    UNLISTED: "Unlisted",
    PRIVATE: "Private",
  },
  errors: {
    name: "Name must be 3-80 characters.",
    taglineRequired: "Tagline is required.",
    taglineMax: "Max {n} characters.",
    category: "Pick a category for your project.",
    url: "Must start with http:// or https://",
    coverUrl: "Image URL must start with http:// or https://",
    coverMax: "Image URL can be at most {n} characters.",
  },
  toasts: {
    maxTags: "Max {n} tags",
    fixFields: "Fix the highlighted fields before launching.",
    launched: "Project launched",
    createFailed: "Failed to create project",
  },
  submitting: "Launching…",
  submit: "Launch project",
};

export type ProjectNewDict = typeof projectNew;
