// TEKA NEXUS — founder dictionary (ru).

export const founder = {
  title: "Консоль основателя",
  subtitle: "Каждый участник TEKA NEXUS — в реальном времени.",
  badge: "Основатель",
  directoryTitle: "Зарегистрированные участники",
  searchPlaceholder: "Поиск по имени, @username или email…",
  pendingOnboarding: "Настройка не завершена",
  empty: "Под этот запрос не подходит ни один участник.",
  loadFailed: "Не удалось загрузить список участников. Попробуйте снова.",
  stats: {
    users: "Всего участников",
    onboarded: "Завершили настройку",
    totalXp: "XP сообщества",
    totalRep: "REP сообщества",
    projects: "Проекты",
    sessions: "Активные сессии",
  },
  supabase: {
      "title": "Облако Supabase",
      "subtitle": "Живое подключение к вашему собственному проекту Supabase",
      "connected": "Подключено",
      "offline": "Недоступно",
      "checking": "Проверка…",
      "auth": "Сервис авторизации",
      "mirrored": "Зеркалированные аккаунты",
      "storage": "Хранилище аватаров",
      "storageReady": "Бакет teka-avatars активен",
      "dbSync": "Полная синхронизация БД",
      "dbSyncWaiting": "Ожидание пароля базы данных",
      "dbSyncActive": "Активна",
      "version": "версия"
  },
};

export type FounderDict = typeof founder;
