// TEKA NEXUS — explore dictionary (ru).

export const explore = {
  // Sort tabs
  sortRecent: "Недавние",
  sortActive: "Активные",
  sortPopular: "Популярные",

  // Header
  loading: "Загрузка проектов…",
  loadingAria: "Загрузка проектов",
  projectCount: "{count} проект",
  projectCountPlural: "{count} проектов",

  // Toolbar
  searchPlaceholder: "Поиск по проектам, описаниям и тегам…",
  searchAria: "Поиск проектов",
  filterCategoryAria: "Фильтр по категории",
  allCategories: "Все категории",
  filterStatusAria: "Фильтр по статусу",
  allStatuses: "Все статусы",
  clear: "Сбросить",
  sortAria: "Сортировка проектов",

  // States
  loadError: "Не удалось загрузить проекты",
  errorTitle: "Не удалось загрузить проекты",
  emptyTitle: "Ничего не найдено",
  emptyDescription: "Попробуйте сбросить фильтры или изменить поисковый запрос.",
  clearFilters: "Сбросить фильтры",

  // Pagination
  prev: "Назад",
  next: "Вперёд",
  pageStatus: "Страница {page} из {pages}",
};

export type ExploreDict = typeof explore;
