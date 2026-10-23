// TEKA NEXUS — notifications dictionary (ru).

export const notifications = {
  someone: "Кто-то",
  system: "Системное уведомление",
  fallback: "У вас новое уведомление",
  types: {
    newFollower: "{name} подписался на вас",
    newDm: "Новое сообщение от {name}",
    commentOn: "{name} прокомментировал проект {project}",
    commentOnYours: "{name} прокомментировал ваш проект",
    joinRequest: "{name} подал заявку на участие в {project}",
    joinRequestPlain: "{name} отправил заявку на сотрудничество",
    requestAccepted: "Ваша заявка на участие в {project} принята",
    requestAcceptedPlain: "Ваша заявка на сотрудничество принята",
    requestRejected: "Ваша заявка на участие в {project} отклонена",
    requestRejectedPlain: "Ваша заявка на сотрудничество отклонена",
    taskAssigned: "{name} назначил вам задачу: {task}",
    taskAssignedPlain: "{name} назначил вам новую задачу",
    memberJoined: "{name} присоединился к проекту {project}",
    memberJoinedTeam: "{name} присоединился к вашей команде",
  },
  toasts: {
    loadFailed: "Не удалось загрузить уведомления.",
    allRead: "Все уведомления отмечены как прочитанные",
    markFailed: "Не удалось отметить уведомления как прочитанные.",
    markOneFailed: "Не удалось отметить это уведомление как прочитанное.",
  },
  auth: {
    title: "Войдите, чтобы увидеть свои уведомления",
    description: "Здесь появится активность из ваших проектов, команд и подписчиков.",
  },
  unreadOne: "{n} непрочитанное уведомление",
  unreadMany: "{n} непрочитанных уведомлений",
  allCaughtUp: "Вы всё прочитали",
  markAll: "Отметить все как прочитанные",
  a11y: {
    filter: "Фильтр уведомлений",
    unreadSuffix: "(непрочитанное)",
  },
  filterAll: "Все",
  filterUnread: "Непрочитанные",
  filterUnreadCount: "Непрочитанные · {n}",
  loadFailed: {
    title: "Не удалось загрузить уведомления",
    description: "Проверьте подключение и попробуйте снова.",
  },
  noUnreadDesc: "Непрочитанных уведомлений сейчас нет.",
  emptyDesc: "Здесь появится активность из ваших проектов, команд и подписчиков.",
};

export type NotificationsDict = typeof notifications;
