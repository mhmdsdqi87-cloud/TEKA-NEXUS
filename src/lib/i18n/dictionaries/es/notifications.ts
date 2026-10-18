// TEKA NEXUS — Spanish dictionary: "notifications" namespace.
// Owned by translation agent (Task 2-c).

import type { NotificationsDict } from "../en/notifications";

export const notifications: NotificationsDict = {
  someone: "Alguien",
  system: "Notificación del sistema",
  fallback: "Tienes una nueva notificación",
  types: {
    newFollower: "{name} empezó a seguirte",
    commentOn: "{name} comentó en {project}",
    commentOnYours: "{name} comentó en tu proyecto",
    joinRequest: "{name} solicitó unirse a {project}",
    joinRequestPlain: "{name} envió una solicitud de colaboración",
    requestAccepted: "Tu solicitud para unirte a {project} fue aceptada",
    requestAcceptedPlain: "Tu solicitud de colaboración fue aceptada",
    requestRejected: "Tu solicitud para unirte a {project} fue rechazada",
    requestRejectedPlain: "Tu solicitud de colaboración fue rechazada",
    taskAssigned: "{name} te asignó una tarea: {task}",
    taskAssignedPlain: "{name} te asignó una nueva tarea",
    memberJoined: "{name} se unió a {project}",
    memberJoinedTeam: "{name} se unió a tu equipo",
  },
  toasts: {
    loadFailed: "No se pudieron cargar las notificaciones.",
    allRead: "Todas las notificaciones marcadas como leídas",
    markFailed: "No se pudieron marcar las notificaciones como leídas.",
    markOneFailed: "No se pudo marcar esta notificación como leída.",
  },
  auth: {
    title: "Inicia sesión para ver tus notificaciones",
    description:
      "La actividad de tus proyectos, equipos y seguidores aparece aquí.",
  },
  unreadOne: "{n} notificación sin leer",
  unreadMany: "{n} notificaciones sin leer",
  allCaughtUp: "Estás al día",
  markAll: "Marcar todo como leído",
  a11y: {
    filter: "Filtrar notificaciones",
    unreadSuffix: "(sin leer)",
  },
  filterAll: "Todas",
  filterUnread: "Sin leer",
  filterUnreadCount: "Sin leer · {n}",
  loadFailed: {
    title: "No se pudieron cargar las notificaciones",
    description: "Comprueba tu conexión e inténtalo de nuevo.",
  },
  noUnreadDesc: "No hay notificaciones sin leer por ahora.",
  emptyDesc: "La actividad de tus proyectos, equipos y seguidores aparecerá aquí.",
};
