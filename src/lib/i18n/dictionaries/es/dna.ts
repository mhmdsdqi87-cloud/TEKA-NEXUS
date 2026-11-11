// TEKA NEXUS — es dictionary: "dna" namespace (NEXUS 2.0 Phase 1).
// Las etiquetas «Calculado» forman parte del contrato de honestidad de datos:
// cada cifra derivada se rotula con honestidad y nunca se presenta como una
// medición real.

import type { DnaDict } from "../en/dna";

export const dna: DnaDict = {
  title: "ADN del proyecto",
  subtitle: "La identidad digital completa de cada proyecto — identidad, arquitectura, hoja de ruta e historial verificado.",
  searchPlaceholder: "Buscar proyectos…",
  error: "No se pudo cargar el ADN de este proyecto.",
  noResults: "Ningún proyecto coincide con tu búsqueda.",
  empty: "Aún no hay proyectos públicos — crea el primero y su ADN empezará a crecer.",
  createFirst: "Crear un proyecto",
  openAria: "Abrir el ADN de {name}",
  updated: "actualizado",
  prevPage: "Anterior",
  nextPage: "Siguiente",
  pageOf: "Página {page} de {pages}",

  notFoundTitle: "ADN no disponible",
  notFoundBody: "Este proyecto no existe o es privado. El ADN privado solo es visible para los miembros del proyecto.",
  backToPicker: "Todos los proyectos",

  privateBadge: "Privado",
  verifiedBadge: "Registros verificados de la plataforma",
  created: "Creado",
  linkRepo: "Repositorio",
  linkDemo: "Demo",
  linkSite: "Sitio web",
  openWorkspace: "Abrir espacio de trabajo",

  countMembers: "Miembros",
  countLikes: "Me gusta",
  countUpdates: "Actualizaciones",
  countTasks: "Tareas",
  countComments: "Comentarios",
  countRequests: "Solicitudes abiertas",

  archTitle: "Mapa de arquitectura",
  archRootLabel: "capas tecnológicas declaradas",
  archDeclaredNote: "Dibujado únicamente a partir de las etiquetas declaradas del proyecto — nada se infiere.",
  emptyStack: "Aún no hay stack declarado — el propietario puede añadir etiquetas en la página del proyecto.",
  layerFrontend: "Frontend",
  layerBackend: "Backend",
  layerData: "Datos",
  layerTools: "Herramientas",
  layerOther: "Declarado (sin categorizar)",

  healthTitle: "Indicadores de salud",
  calculatedBadge: "Calculado",
  healthTaskRate: "Tasa de finalización de tareas",
  healthFormulaTasks: "hechas / total de tareas",
  healthProgress: "Progreso de la hoja de ruta",
  healthFormulaMilestones: "completados / total de hitos",
  healthActivity: "Actividad (30 días)",
  healthFormulaActivity: "eventos de actividad reales",
  healthMomentum: "Impulso",
  healthFormulaMomentum: "actividad ÷ días activos",
  healthDisclaimer: "Todos los indicadores se calculan a partir de registros reales de la plataforma — no son mediciones externas ni predicciones de IA.",
  healthLastActivity: "Última actividad:",

  milestonesTitle: "Hoja de ruta e hitos",
  milestoneAdd: "Añadir hito",
  milestoneProgress: "{percent}% · {done}/{total} completados",
  milestoneTitleLabel: "Título",
  milestoneDueLabel: "Fecha límite (opcional)",
  milestoneSave: "Guardar hito",
  cancel: "Cancelar",
  emptyMilestones: "Aún no hay hitos. Quienes contribuyen pueden añadir el primero para arrancar la hoja de ruta.",
  overdue: "atrasado",
  milestoneDone: "Completado",
  milestoneCompleteAria: "Marcar el hito como completado",
  milestoneUncompleteAria: "Desmarcar el hito como completado",
  milestoneDeleteAria: "Eliminar el hito",

  timelineTitle: "Cronología de desarrollo",
  timelineVerifiedNote: "solo registros verificados",
  emptyTimeline: "Aún no hay eventos registrados.",
  timelineKinds: {
    PROJECT_CREATED: "Proyecto creado",
    MEMBER_JOINED: "Se unió un miembro",
    UPDATE_POSTED: "Actualización publicada",
    MILESTONE_CREATED: "Hito planificado",
    MILESTONE_COMPLETED: "Hito completado",
    TASK_COMPLETED: "Tarea completada",
  },

  contributorsTitle: "Colaboradores",
  contributorsNote: "con recuentos de contribución verificados",
  joined: "Se unió",
  verifiedEvents: "eventos verificados",
};
