// TEKA NEXUS — fr dictionary: "dm" namespace (Task dm-1).

import type { DmDict } from "../en/dm";

export const dm: DmDict = {
  title: "Messages",
  unreadAria: "Messages, {count} non lus",
  listAria: "Liste des conversations",
  chatAria: "Conversation avec {name}",

  signInTitle: "Connecte-toi pour voir tes messages",
  signInDesc: "Tes conversations privées apparaîtront ici.",

  emptyTitle: "Aucune conversation pour le moment",
  emptyDesc: "Démarre une discussion privée depuis le profil d'un utilisateur !",
  loadFailedTitle: "Impossible de charger les conversations",
  loadFailedDesc: "Vérifie ta connexion et réessaie.",

  selectChatTitle: "Choisis une conversation",
  selectChatDesc: "Tes messages avec les autres builders apparaissent ici.",
  backToList: "Retour aux conversations",

  emptyChatTitle: "Aucun message pour l'instant",
  emptyChatDesc: "Dis bonjour 👋",

  placeholder: "Écris un message…",
  send: "Envoyer",
  sendAria: "Envoyer le message",
  you: "Toi",

  toasts: {
    sendFailed: "Impossible d'envoyer le message.",
    loadFailed: "Impossible de charger les messages.",
    conversationFailed: "Impossible d'ouvrir la conversation.",
  },

  profileCta: "Message privé",
};
