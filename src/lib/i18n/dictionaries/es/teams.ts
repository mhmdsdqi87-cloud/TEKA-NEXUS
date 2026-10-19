// TEKA NEXUS — Spanish dictionary: "teams" namespace.
// Owned by translation agent (Task 2-c).

import type { TeamsDict } from "../en/teams";

export const teams: TeamsDict = {
  tabs: {
    crews: "Mis equipos",
    requests: "Solicitudes",
    discover: "Descubrir",
  },
  auth: {
    title: "Inicia sesión para gestionar tus equipos",
    description:
      "Sigue tus equipos, responde solicitudes de colaboración y descubre proyectos que necesitan tus habilidades.",
  },
  titlePrefix: "Tus",
  titleCrews: "equipos",
  subtitle:
    "Gestiona los proyectos que construís juntos, responde solicitudes y encuentra nuevos colaboradores.",
  a11y: {
    yourRole: "Tu rol: {role}",
    sentAria: "Solicitudes enviadas",
    receivedAria: "Solicitudes recibidas",
    viewProfileAria: "Ver el perfil de {name}",
  },
  crews: {
    emptyTitle: "Aún no perteneces a ningún equipo",
    emptyDesc:
      "Únete a un proyecto o empieza el tuyo: la colaboración es donde se construyen las mejores cosas.",
    explore: "Explorar proyectos",
    start: "Crear un proyecto",
    joined: "te uniste en {date}",
    open: "Abrir espacio de trabajo",
    member: "{n} miembro",
    members: "{n} miembros",
  },
  requests: {
    sent: "Enviadas",
    received: "Recibidas",
    pendingCount: "({n} pendientes)",
    sentEmpty: "No has enviado solicitudes: busca un proyecto y pide unirte.",
    receivedEmpty: "Aún no tienes solicitudes. Sigue construyendo: los desarrolladores te encontrarán.",
    unknownProject: "Proyecto desconocido",
    appliedAs: "Solicitó como {role} · {ago}",
    withdraw: "Retirar",
    wantsToJoin: "Quiere unirse a {project} como {role}",
    wantsToJoinPrefix: "Quiere unirse a ",
    wantsToJoinMiddle: " como ",
    wantsToJoinSuffix: "",
    aProject: "un proyecto",
    viewProject: "Ver proyecto",
  },
  status: {
    PENDING: "Pendiente",
    ACCEPTED: "Aceptada",
    REJECTED: "Rechazada",
    WITHDRAWN: "Retirada",
  },
  accept: "Aceptar",
  reject: "Rechazar",
  toasts: {
    withdrawn: "Solicitud retirada",
    accepted: "Bienvenido a bordo: solicitud aceptada",
    rejected: "Solicitud rechazada",
  },
  errors: {
    generic: "Algo salió mal",
  },
  discover: {
    title: "Equipos que buscan miembros",
    subtitle:
      "Proyectos con habilidades requeridas: encuentra un equipo que necesite lo que tú sabes.",
    emptyTitle: "Ahora no hay proyectos con habilidades requeridas",
    emptyDesc:
      "Mostramos los proyectos más recientes: vuelve pronto a medida que nuevos equipos publiquen sus necesidades.",
  },
  chat: {
    title: "Chat del equipo",
    online: "{n} en línea",
    onlineOne: "Solo tú en línea",
    typing: "{names} está escribiendo…",
    typingMulti: "{names} están escribiendo…",
    placeholder: "Escribe a tu equipo…",
    send: "Enviar",
    empty: "Aún no hay mensajes — saluda 👋",
    emptyHint: "Los mensajes aparecen aquí en tiempo real para todo el equipo.",
    disconnected: "Conexión perdida",
    reconnecting: "Reconectando…",
    deleted: "Mensaje eliminado",
    loginRequired: "Inicia sesión para unirte a la conversación",
    reactAdd: "Añadir reacción",
    rateLimited: "Tranquilo — demasiados mensajes seguidos",
    charsLeft: "{n} caracteres restantes",
    a11y: {
      openChat: "Abrir el chat del equipo {name}",
      closeChat: "Cerrar el chat",
      deleteMessage: "Eliminar mensaje",
      messages: "Mensajes",
    },
  },
};
