// TEKA NEXUS — pulse dictionary (ru).

export type PulseDict = {
  title: string;
  subtitle: string;
  // общие подписи событий (терминал + лента активности)
  events: {
    join: string;
    project: string;
    like: string;
    comment: string;
    chat: string;
    update: string;
    follow: string;
    save: string;
    member: string;
    task: string;
    file: string;
  };
  live: {
    title: string;
    subtitle: string;
    badge: string;
    feedTitle: string;
    feedSubtitle: string;
    countersTitle: string;
    filterAll: string;
    empty: string;
    loadError: string;
    openCommand: string;
    ctaFromExplore: string;
    ctaSubtitle: string;
    counters: {
      users: string;
      projects: string;
      likes: string;
      comments: string;
      chats: string;
      follows: string;
    };
  };
  ai: {
    title: string;
    tagline: string;
    badge: string;
    placeholder: string;
    greeting: string;
    quickPrompts: string[];
    send: string;
    clearChat: string;
    retry: string;
    typing: string;
    offlineBadge: string;
    errGeneric: string;
    loginRequired: string;
    disclaimer: string;
    contextChip: string;
  };
  hub: {
    title: string;
    subtitle: string;
    platformRepo: string;
    platformRepoDesc: string;
    communityRepos: string;
    communityReposEmpty: string;
    stars: string;
    forks: string;
    issues: string;
    noReposCta: string;
  };
  challenge: {
    badge: string;
    daysLeft: string;
    hoursLeft: string;
    joinedCount: string;
    completedCount: string;
    join: string;
    joined: string;
    progressOf: string;
    completed: string;
    loginRequired: string;
    loadError: string;
  };
  leaderboard: {
    title: string;
    week: string;
    allTime: string;
    score: string;
    xp: string;
    you: string;
    level: string;
    empty: string;
    levelTitles: { rookie: string; explorer: string; builder: string; veteran: string; master: string; legend: string };
  };
  chat: {
    tab: string;
    title: string;
    live: string;
    placeholder: string;
    empty: string;
    loginRequired: string;
    tooFast: string;
    loadError: string;
    sendError: string;
  };
  github: {
    title: string;
    live: string;
    commits: string;
    openRepo: string;
    notFound: string;
    loadError: string;
  };
  terminal: {
    title: string;
    expand: string;
    collapse: string;
    welcome: string;
    helpHint: string;
    guest: string;
    notFound: string;
    matrixOn: string;
    easterEgg: string;
  };
};

export const pulse: PulseDict = {
  title: "Пульс сообщества",
  subtitle: "Живой челлендж, таблица лидеров и пульс всего сообщества",
  events: {
    join: "присоединяется",
    project: "запускает",
    like: "отмечает «нравится»",
    comment: "комментирует",
    chat: "пишет в чате",
    update: "публикует обновление в",
    follow: "подписывается на",
    save: "сохраняет",
    member: "вступает в команду",
    task: "выполняет задачу в",
    file: "создал файл в",
  },
  live: {
    title: "Командный центр Nexus",
    subtitle: "Живое бьющееся сердце сообщества — настоящая активность в реальном времени",
    badge: "LIVE",
    feedTitle: "Активность сообщества",
    feedSubtitle: "Каждое действие каждого участника — в прямом эфире",
    countersTitle: "Счётчики в реальном времени",
    filterAll: "Все",
    empty: "Пока тихо — сделайте что-нибудь, и это появится здесь!",
    loadError: "Не удалось загрузить живую ленту",
    openCommand: "Открыть командный центр",
    ctaFromExplore: "Открыть командный центр",
    ctaSubtitle: "Живой терминал, активность в реальном времени, NEXUS AI и GitHub-хаб — всё в одном месте",
    counters: {
      users: "Участники",
      projects: "Проекты",
      likes: "Лайки",
      comments: "Комментарии",
      chats: "Сообщения",
      follows: "Подписки",
    },
  },
  ai: {
    title: "NEXUS AI",
    tagline: "Твой мощный копилот — знает всю платформу в реальном времени",
    badge: "AI",
    placeholder: "Спроси меня о чём угодно — о платформе или коде…",
    greeting:
      "Привет! Я NEXUS AI 🤖\nЯ вижу живой пульс этой платформы — реальную статистику, топ-проекты, недельный челлендж и твой профиль.\nПопроси меня порекомендовать проекты, найти тиммейтов, прокачать XP, помочь с кодом или превратить идею в проект!",
    quickPrompts: [
      "К какому проекту мне присоединиться?",
      "Как быстрее зарабатывать XP?",
      "Предложи название для моего проекта",
      "Расскажи про недельный челлендж",
      "Помоги отладить цикл на Python",
    ],
    send: "Отправить",
    clearChat: "Очистить чат",
    retry: "Попробовать снова",
    typing: "NEXUS AI думает…",
    offlineBadge: "офлайн-режим — реальные данные платформы",
    errGeneric: "NEXUS AI сейчас не отвечает",
    loginRequired: "Войдите, чтобы общаться с NEXUS AI",
    disclaimer: "NEXUS AI видит живой срез статистики платформы — он не исполняет код и не выходит в интернет. Важное перепроверяйте.",
    contextChip: "живые данные подключены",
  },
  hub: {
    title: "Командный центр GitHub",
    subtitle: "Машинное отделение — наш собственный репозиторий и все проекты сообщества с кодом",
    platformRepo: "Репозиторий платформы",
    platformRepoDesc: "Сам TEKA NEXUS разрабатывается открыто — каждый коммит попадает сюда",
    communityRepos: "Репозитории сообщества",
    communityReposEmpty: "Ни один проект сообщества пока не подключил GitHub-репозиторий — добавьте свой в настройках проекта!",
    stars: "звёзд",
    forks: "форков",
    issues: "ишью",
    noReposCta: "Подключить репозиторий",
  },
  challenge: {
    badge: "Недельный челлендж",
    daysLeft: "Осталось {days} дн.",
    hoursLeft: "Осталось {hours} ч",
    joinedCount: "{count} бойцов в игре",
    completedCount: "{count} уже прошли",
    join: "Присоединиться к челленджу",
    joined: "Вы в деле — вперёд!",
    progressOf: "{done} / {target} активностей",
    completed: "Готово! Получено +{xp} XP",
    loginRequired: "Войдите, чтобы присоединиться к челленджу",
    loadError: "Не удалось загрузить челлендж",
  },
  leaderboard: {
    title: "Таблица лидеров",
    week: "За неделю",
    allTime: "За всё время",
    score: "{score} баллов",
    xp: "{xp} XP",
    you: "Вы",
    level: "Ур. {level}",
    empty: "На этой неделе очков ещё нет — будьте первым!",
    levelTitles: {
      rookie: "Новичок",
      explorer: "Исследователь",
      builder: "Строитель",
      veteran: "Ветеран",
      master: "Мастер",
      legend: "Легенда",
    },
  },
  chat: {
    tab: "Живой чат",
    title: "Командный чат",
    live: "LIVE",
    placeholder: "Напишите сообщение…",
    empty: "Скажите привет первым ⚡",
    loginRequired: "Войдите, чтобы отправлять сообщения",
    tooFast: "Помедленнее! Попробуйте через минуту.",
    loadError: "Не удалось загрузить чат",
    sendError: "Не удалось отправить сообщение",
  },
  github: {
    title: "Репозиторий на GitHub",
    live: "LIVE",
    commits: "Последние коммиты",
    openRepo: "Открыть на GitHub",
    notFound: "Репозиторий не найден или приватный",
    loadError: "Данные GitHub сейчас недоступны",
  },
  terminal: {
    title: "NEXUS TERMINAL v3.0",
    expand: "Развернуть",
    collapse: "Свернуть",
    welcome: "Соединение с живым ретранслятором пульса установлено",
    helpHint: "Введите «help» — увидите список команд",
    guest: "гость",
    notFound: "команда не найдена — попробуйте «help»",
    matrixOn: "входим в матрицу…",
    easterEgg: "сила персидского dev-сообщества 🇮🇷",
  },
};
