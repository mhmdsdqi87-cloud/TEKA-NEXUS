// TEKA NEXUS — nav dictionary (ru).

export const nav = {
  // Side navigation (LeftNav / MobileNav)
  newProject: "Новый проект",
  academy: "Академия",
  portal: "Учебный портал",
  founder: "Консоль основателя",
  workspaceHub: "Рабочие пространства",
  primaryNavAria: "Основная навигация",
  mainAria: "Основное содержимое",
  mobileNavAria: "Мобильная навигация",
  alerts: "Оповещения",

  // Top bar
  brandHomeAria: "TEKA NEXUS — на главную",
  notificationsUnreadAria: "Уведомления, непрочитанных: {count}",
  accountMenuAria: "Меню аккаунта",
  account: "Аккаунт",
  viewProfile: "Открыть профиль",
  loggedOutToast: "Вы вышли из аккаунта. До скорой встречи.",
  logoutFailed: "Не удалось выйти",

  // Unread badge
  unreadNotificationsAria: "Непрочитанных уведомлений: {count}",

  // Right rail
  trending: "Популярные проекты",
  trendingEmpty: "Пока нет проектов — станьте первым, кто запустит свой.",
  trendingError: "Не удалось загрузить популярные проекты",
  requestsSection: "Приглашения и заявки в команды",
  requestsAria: "Приглашения и заявки в команды",
  requestsLoading: "Загрузка заявок…",
  requestsEmpty: "Нет заявок в ожидании",
  requestsPending: "Заявок в ожидании: {count}",
  requestsPendingPlural: "Заявок в ожидании: {count}",
  requestsSentSummary: "{sent} отправлено вами · Разобрать в разделе «Команды»",
  reviewInTeams: "Разобрать в «Командах»",
  requestsError: "Не удалось загрузить заявки в команды",
  railAria: "Боковая панель",
  tipAria: "Подсказка",
  tipTitle: "Подсказка",
  tipBefore: "Нажмите",
  tipAfter: "для поиска по всему сайту.",

  // Footer
  footerTagline: "TEKA NEXUS — место, где встречаются создатели",
  footerAria: "Подвал",
};

export type NavDict = typeof nav;
