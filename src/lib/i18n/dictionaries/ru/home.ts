// TEKA NEXUS — home dictionary (ru).

export const home = {
  // Feed event sentence fragments (rendered as: {actor} {verb} [“{title}” {on}] {project})
  someone: "Кто-то",
  verbCreated: "создал",
  verbUpdate: "опубликовал обновление в",
  verbMilestone: "завершил веху в",
  verbJoined: "присоединился к",
  verbTask: "выполнил задачу в",
  verbActivityOn: "проявил активность в",
  on: "для проекта",

  // Feed event card a11y
  openProjectAria: "Открыть проект {name}",
  viewProfileAria: "Открыть профиль {name}",

  // Filter chips
  filterAll: "Все",
  filterReleases: "Релизы",
  filterUpdates: "Обновления",
  filterMilestones: "Вехи",
  filterGroupAria: "Фильтр ленты по типу события",

  // Header + welcome strip
  subtitle: "Активность публичных проектов в реальном времени.",
  welcomeBack: "С возвращением, {name}",
  readyToBuild: "@{username} · Готовы что-то создать?",
  yourProfile: "Ваш профиль",

  // States
  feedError: "Не удалось загрузить ленту",
  feedErrorTitle: "Не удалось загрузить ленту",
  emptyTitle: "Здесь пока пусто",
  emptyDescription:
    "Когда люди запускают проекты, выпускают релизы и достигают вех, всё это появляется здесь.",
  createFirstProject: "Создать первый проект",
  noFilterEvents: "В загруженной ленте пока нет событий «{filter}».",
  loadMore: "Загрузить ещё",
  pageStatus: "{total} событий · страница {page} из {pages}",
};

export type HomeDict = typeof home;
