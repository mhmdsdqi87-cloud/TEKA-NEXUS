// TEKA NEXUS — French dictionary: "notifications" namespace.
// Owned by translation agent (Task 2-c).

import type { NotificationsDict } from "../en/notifications";

export const notifications: NotificationsDict = {
  someone: "Quelqu’un",
  system: "Notification système",
  fallback: "Vous avez une nouvelle notification",
  types: {
    newFollower: "{name} a commencé à vous suivre",
    newDm: "Nouveau message de {name}",
    commentOn: "{name} a commenté {project}",
    commentOnYours: "{name} a commenté votre projet",
    joinRequest: "{name} a demandé à rejoindre {project}",
    joinRequestPlain: "{name} a envoyé une demande de collaboration",
    requestAccepted: "Votre demande pour rejoindre {project} a été acceptée",
    requestAcceptedPlain: "Votre demande de collaboration a été acceptée",
    requestRejected: "Votre demande pour rejoindre {project} a été refusée",
    requestRejectedPlain: "Votre demande de collaboration a été refusée",
    taskAssigned: "{name} vous a assigné une tâche : {task}",
    taskAssignedPlain: "{name} vous a assigné une nouvelle tâche",
    memberJoined: "{name} a rejoint {project}",
    memberJoinedTeam: "{name} a rejoint votre équipe",
  },
  toasts: {
    loadFailed: "Impossible de charger les notifications.",
    allRead: "Toutes les notifications marquées comme lues",
    markFailed: "Impossible de marquer les notifications comme lues.",
    markOneFailed: "Impossible de marquer cette notification comme lue.",
  },
  auth: {
    title: "Connectez-vous pour voir vos notifications",
    description:
      "L’activité de vos projets, équipes et abonnés s’affiche ici.",
  },
  unreadOne: "{n} notification non lue",
  unreadMany: "{n} notifications non lues",
  allCaughtUp: "Vous êtes à jour",
  markAll: "Tout marquer comme lu",
  a11y: {
    filter: "Filtrer les notifications",
    unreadSuffix: "(non lue)",
  },
  filterAll: "Toutes",
  filterUnread: "Non lues",
  filterUnreadCount: "Non lues · {n}",
  loadFailed: {
    title: "Impossible de charger les notifications",
    description: "Vérifiez votre connexion et réessayez.",
  },
  noUnreadDesc: "Aucune notification non lue pour le moment.",
  emptyDesc:
    "L’activité de vos projets, équipes et abonnés apparaîtra ici.",
};
