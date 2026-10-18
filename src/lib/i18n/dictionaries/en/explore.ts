// TEKA NEXUS — en dictionary: "explore" namespace (owned by translation agent 2-b).
// Strings extracted verbatim from src/views/explore-view.tsx.

export const explore = {
  // Sort tabs
  sortRecent: "Recent",
  sortActive: "Active",
  sortPopular: "Popular",

  // Header
  loading: "Loading projects…",
  loadingAria: "Loading projects",
  projectCount: "{count} project",
  projectCountPlural: "{count} projects",

  // Toolbar
  searchPlaceholder: "Search projects, taglines, tags…",
  searchAria: "Search projects",
  filterCategoryAria: "Filter by category",
  allCategories: "All categories",
  filterStatusAria: "Filter by status",
  allStatuses: "All statuses",
  clear: "Clear",
  sortAria: "Sort projects",

  // States
  loadError: "Failed to load projects",
  errorTitle: "Could not load projects",
  emptyTitle: "No projects match",
  emptyDescription: "Try clearing filters or a different search.",
  clearFilters: "Clear filters",

  // Pagination
  prev: "Prev",
  next: "Next",
  pageStatus: "Page {page} of {pages}",
};

export type ExploreDict = typeof explore;
