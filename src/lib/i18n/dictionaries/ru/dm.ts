// TEKA NEXUS — dm dictionary (ru).

export const dm = {
  title: "Сообщения",
  unreadAria: "Сообщения, непрочитанных: {count}",
  listAria: "Список бесед",
  chatAria: "Чат с {name}",

  signInTitle: "Войдите, чтобы увидеть свои сообщения",
  signInDesc: "Здесь появятся ваши личные переписки.",

  emptyTitle: "Бесед пока нет",
  emptyDesc: "Начните личный чат из профиля пользователя!",
  loadFailedTitle: "Не удалось загрузить беседы",
  loadFailedDesc: "Проверьте подключение и попробуйте снова.",

  selectChatTitle: "Выберите беседу",
  selectChatDesc: "Здесь показываются ваши сообщения с другими создателями.",
  backToList: "Назад к беседам",

  emptyChatTitle: "Сообщений пока нет",
  emptyChatDesc: "Поздоровайтесь 👋",

  placeholder: "Напишите сообщение…",
  send: "Отправить",
  sendAria: "Отправить сообщение",
  you: "Вы",

  toasts: {
    sendFailed: "Не удалось отправить сообщение.",
    loadFailed: "Не удалось загрузить сообщения.",
    conversationFailed: "Не удалось открыть беседу.",
  },

  // Profile action button
  profileCta: "Написать",
};

export type DmDict = typeof dm;
