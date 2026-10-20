// TEKA NEXUS — es dictionary: "dm" namespace (Task dm-1).

import type { DmDict } from "../en/dm";

export const dm: DmDict = {
  title: "Mensajes",
  unreadAria: "Mensajes, {count} sin leer",
  listAria: "Lista de conversaciones",
  chatAria: "Chat con {name}",

  signInTitle: "Inicia sesión para ver tus mensajes",
  signInDesc: "Tus conversaciones privadas aparecerán aquí.",

  emptyTitle: "Aún no hay conversaciones",
  emptyDesc: "¡Empieza un chat privado desde el perfil de alguien!",
  loadFailedTitle: "No se pudieron cargar las conversaciones",
  loadFailedDesc: "Revisa tu conexión e inténtalo de nuevo.",

  selectChatTitle: "Elige una conversación",
  selectChatDesc: "Tus mensajes con otros builders aparecen aquí.",
  backToList: "Volver a las conversaciones",

  emptyChatTitle: "Aún no hay mensajes",
  emptyChatDesc: "¡Di hola 👋",

  placeholder: "Escribe un mensaje…",
  send: "Enviar",
  sendAria: "Enviar mensaje",
  you: "Tú",

  toasts: {
    sendFailed: "No se pudo enviar el mensaje.",
    loadFailed: "No se pudieron cargar los mensajes.",
    conversationFailed: "No se pudo abrir la conversación.",
  },

  profileCta: "Mensaje",
};
