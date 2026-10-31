// TEKA NEXUS — profile dictionary (ru).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "Подписаться",
    following: "Вы подписаны",
    blocked: "Заблокирован",
    editProfile: "Редактировать профиль",
    moreActions: "Другие действия",
    blockUser: "Заблокировать пользователя",
    unblockUser: "Разблокировать пользователя",
    reportUser: "Пожаловаться на пользователя",
  },
  stats: {
    followers: "Подписчики",
    following: "Подписки",
    reputation: "Репутация",
  },
  tabs: {
    contributions: "Вклад",
    about: "О себе",
  },
  header: {
    memberSince: "Участник с {date}",
  },
  founder: {
    badge: "Основатель",
    verified: "Официально верифицированный аккаунт",
  },
  sections: {
    goals: "Цели",
    interests: "Интересы",
    skills: "Навыки",
  },
  contributionTypes: {
    task: "Выполненная задача",
    release: "Опубликованный релиз",
    milestone: "Завершённая веха",
    update: "Опубликованное обновление",
    collab: "Вступление в команду",
    created: "Созданный проект",
    other: "Внесённый вклад",
  },
  contributions: {
    notice: "Репутация зарабатывается только подтверждённым вкладом — её нельзя купить.",
  },
  empty: {
    projects: {
      title: "Публичных проектов пока нет",
      description: "Когда {name} опубликует проекты, они появятся здесь.",
    },
    contributions: {
      title: "Вклада пока нет",
      description:
        "Подтверждённые задачи, вехи, релизы и совместные проекты будут появляться здесь по мере их выполнения.",
    },
    about: {
      title: "Этот автор пока не добавил подробностей",
      description: "Био, навыки и интересы появятся здесь, как только автор заполнит свой профиль.",
    },
  },
  about: {
    bio: "О себе",
    noBio: "Био пока нет.",
    noneListed: "Пока ничего не указано.",
    details: "Подробности об авторе",
    joined: "Дата регистрации: {date}",
  },
  notFound: {
    title: "Автор не найден",
    description: "Такого профиля не существует или он был удалён.",
    action: "Смотреть проекты",
  },
  loadFailed: {
    title: "Не удалось загрузить профиль",
    description: "Проверьте подключение и попробуйте снова.",
  },
  report: {
    title: "Жалоба на {name}",
    description: "Жалобы попадают в очередь модерации и рассматриваются командой TEKA.",
    reason: "Причина",
    pickReason: "Выберите причину",
    detailsLabel: "Подробности (необязательно)",
    detailsPlaceholder: "Добавьте любой контекст, который поможет модераторам.",
    submit: "Отправить жалобу",
  },
  reportReasons: {
    spam: "Спам",
    harassment: "Травля",
    inappropriate: "Недопустимый контент",
    copyright: "Нарушение авторских прав",
    other: "Другое",
  },
  toasts: {
    followed: "Вы подписались на {name}",
    unfollowed: "Вы отписались от {name}",
    blocked: "Заблокирован: @{name}",
    unblocked: "Разблокирован: @{name}",
    reportSubmitted: "Жалоба отправлена — наша команда её рассмотрит.",
  },
  errors: {
    loadFailed: "Не удалось загрузить этот профиль.",
    signInToFollow: "Войдите, чтобы подписываться на авторов.",
    followFailed: "Не удалось обновить подписку.",
    signInToBlock: "Войдите, чтобы управлять блокировками.",
    blockFailed: "Не удалось обновить блокировку.",
    reportFailed: "Не удалось отправить жалобу.",
  },
  // Shared strings consumed by components/shared/atoms.tsx + project-card.tsx.
  shared: {
    openProjectAria: "Открыть проект {name}",
    likes: "Нравится",
    teamSize: "Размер команды",
    updated: "обновлено {time}",
    coverAlt: "Обложка {name}",
  },
};
