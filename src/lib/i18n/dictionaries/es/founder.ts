export const founder = {
  title: "Consola del fundador",
  subtitle: "Todos los miembros de TEKA NEXUS, en vivo.",
  badge: "Fundador",
  directoryTitle: "Miembros registrados",
  searchPlaceholder: "Busca por nombre, @usuario o correo…",
  pendingOnboarding: "Configuración incompleta",
  empty: "Ningún miembro coincide con esa búsqueda.",
  loadFailed: "No se pudo cargar el directorio. Inténtalo de nuevo.",
  stats: {
    users: "Miembros totales",
    onboarded: "Configuración completa",
    totalXp: "XP de la comunidad",
    totalRep: "REP de la comunidad",
    projects: "Proyectos",
    sessions: "Sesiones activas",
  },
  supabase: {
      "title": "Nube Supabase",
      "subtitle": "Enlace en vivo a tu proyecto de Supabase",
      "connected": "Conectado",
      "offline": "Inaccesible",
      "checking": "Comprobando…",
      "auth": "Servicio de autenticación",
      "mirrored": "Cuentas sincronizadas",
      "storage": "Almacén de avatares",
      "storageReady": "Bucket teka-avatars activo",
      "dbSync": "Sincronización completa",
      "dbSyncWaiting": "Esperando la contraseña de la base de datos",
      "dbSyncActive": "Activa",
      "version": "versión"
  },
};

export type FounderDict = typeof founder;
