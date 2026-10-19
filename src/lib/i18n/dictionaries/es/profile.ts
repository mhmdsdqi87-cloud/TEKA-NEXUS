// TEKA NEXUS — Spanish dictionary: "profile" namespace (owned by translation agent 2-d).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "Seguir",
    following: "Siguiendo",
    blocked: "Bloqueado",
    editProfile: "Editar perfil",
    moreActions: "Más acciones",
    blockUser: "Bloquear usuario",
    unblockUser: "Desbloquear usuario",
    reportUser: "Denunciar usuario",
  },
  stats: {
    followers: "Seguidores",
    following: "Siguiendo",
    reputation: "Reputación",
  },
  tabs: {
    contributions: "Contribuciones",
    about: "Acerca de",
  },
  header: {
    memberSince: "Miembro desde {date}",
  },
  sections: {
    goals: "Objetivos",
    interests: "Intereses",
    skills: "Habilidades",
  },
  contributionTypes: {
    task: "Tarea completada",
    release: "Lanzamiento publicado",
    milestone: "Hito completado",
    update: "Actualización publicada",
    collab: "Se unió a un equipo",
    created: "Creó un proyecto",
    other: "Contribuyó",
  },
  contributions: {
    notice: "La reputación solo se gana con contribuciones verificadas — no se puede comprar.",
  },
  empty: {
    projects: {
      title: "Aún no hay proyectos públicos",
      description: "Cuando {name} publique proyectos, aparecerán aquí.",
    },
    contributions: {
      title: "Aún no hay contribuciones",
      description:
        "Las tareas, hitos, lanzamientos y colaboraciones verificadas aparecerán aquí a medida que ocurran.",
    },
    about: {
      title: "Este creador aún no ha añadido detalles",
      description: "Su bio, habilidades e intereses aparecerán aquí cuando complete su perfil.",
    },
  },
  about: {
    bio: "Bio",
    noBio: "Aún no hay bio.",
    noneListed: "Nada añadido todavía.",
    details: "Detalles del creador",
    joined: "Se unió el {date}",
  },
  notFound: {
    title: "Creador no encontrado",
    description: "Este perfil no existe o puede haber sido eliminado.",
    action: "Explorar proyectos",
  },
  loadFailed: {
    title: "No se pudo cargar este perfil",
    description: "Comprueba tu conexión e inténtalo de nuevo.",
  },
  report: {
    title: "Denunciar a {name}",
    description: "Las denuncias van a la cola de moderación y las revisa el equipo de TEKA.",
    reason: "Motivo",
    pickReason: "Elige un motivo",
    detailsLabel: "Detalles (opcional)",
    detailsPlaceholder: "Añade cualquier contexto que ayude a los moderadores.",
    submit: "Enviar denuncia",
  },
  reportReasons: {
    spam: "Spam",
    harassment: "Acoso",
    inappropriate: "Contenido inapropiado",
    copyright: "Violación de derechos de autor",
    other: "Otra cosa",
  },
  toasts: {
    followed: "Ahora sigues a {name}",
    unfollowed: "Has dejado de seguir a {name}",
    blocked: "Has bloqueado a @{name}",
    unblocked: "Has desbloqueado a @{name}",
    reportSubmitted: "Denuncia enviada — nuestro equipo la revisará.",
  },
  errors: {
    loadFailed: "No se pudo cargar este perfil.",
    signInToFollow: "Inicia sesión para seguir a creadores.",
    followFailed: "No se pudo actualizar el seguimiento.",
    signInToBlock: "Inicia sesión para gestionar bloqueos.",
    blockFailed: "No se pudo actualizar el bloqueo.",
    reportFailed: "No se pudo enviar la denuncia.",
  },
  shared: {
    openProjectAria: "Abrir proyecto {name}",
    likes: "Me gusta",
    teamSize: "Tamaño del equipo",
    updated: "actualizado {time}",
    coverAlt: "Portada de {name}",
  },
};
