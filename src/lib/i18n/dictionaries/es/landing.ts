// TEKA NEXUS — Spanish dictionary: "landing" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { LandingDict } from "../en/landing";

export const landing: LandingDict = {
  topbar: {
    navAria: "Navegación principal",
    startBuilding: "Empieza a construir",
  },
  hero: {
    badge: "TEKA NEXUS — ahora en beta abierta",
    title1: "Donde las ideas se convierten en ",
    title2: "tecnología real",
    title3: ".",
    subtitle: "Descubre proyectos, encuentra a tu gente y construye lo que viene después.",
    exploreProjects: "Explorar proyectos",
  },
  orbit: {
    ship: "Lanzar",
    teamUp: "Formar equipo",
    fork: "Fork",
    rankUp: "Subir de nivel",
  },
  live: {
    aria: "Actividad en vivo",
    label: "Pulso en vivo",
    empty: "Sé el primero en construir algo real.",
  },
  feed: {
    created: "creó",
    released: "lanzó",
    updateOn: "publicó una actualización en",
    taskOn: "cerró una tarea en",
    milestoneOn: "alcanzó un hito en",
    joined: "se unió a",
    updated: "actualizó",
    someone: "Alguien",
    projectFallback: "un proyecto",
  },
  workflow: {
    eyebrow: "El camino",
    title: "Un solo flujo, de la idea al impacto.",
    subtitle:
      "Cada función de TEKA NEXUS corresponde a un paso del mismo ciclo — así es como los proyectos reales llegan a puerto.",
    idea: "IDEA",
    discover: "DESCUBRE",
    findTeam: "ENCUENTRA EQUIPO",
    build: "CONSTRUYE",
    collaborate: "COLABORA",
    publish: "PUBLICA",
    grow: "CRECE",
    monetize: "MONETIZA",
  },
  features: {
    eyebrow: "Plataforma",
    title: "Todo lo que necesitas para pasar de cero a lanzado.",
    howLabel: "Cómo funciona",
    discovery: {
      title: "Descubrimiento Nexus",
      body: "Encuentra proyectos por categoría, estado, etiquetas y las habilidades que necesitan — desde ideas de primer commit hasta versiones lanzadas. Cada proyecto público se indexa en el momento en que se publica.",
      how: "Abre Explorar para filtrar el catálogo, o usa la búsqueda para ir directo a proyectos, personas y etiquetas.",
    },
    workspaces: {
      title: "Espacios de trabajo de proyecto",
      body: "Cada proyecto obtiene un espacio compartido: tablero de tareas, hitos, actualizaciones de progreso y un equipo con roles explícitos, del propietario al espectador.",
      how: "Los propietarios publican el proyecto y revisan solicitudes; los colaboradores aceptados planifican y entregan el trabajo en el mismo tablero.",
    },
    reputation: {
      title: "Reputación verificada",
      body: "La reputación se gana, no se declara. El servidor verifica cada contribución y otorga XP y reputación automáticamente — nada se autoreporta.",
      how: "Termina tareas, alcanza hitos y lanza versiones; los resultados aparecen en tu perfil y son visibles para los equipos.",
    },
  },
  preview: {
    eyebrow: "Dentro de un proyecto",
    title: "Un espacio de trabajo hecho para entregar.",
    subtitle: "Tareas, hitos, actualizaciones y todo tu equipo — organizados en un tablero por proyecto.",
    chip: "Vista previa",
    caption: "Vista previa del producto — diseño ilustrativo del espacio de trabajo de un proyecto.",
    backlog: "Pendiente",
    inProgress: "En curso",
    done: "Hecho",
    taskCard: "Tarjeta de tarea",
    assignee: "Responsable",
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "Empieza en tres pasos.",
    step1: {
      title: "Crea un perfil",
      body: "Regístrate, define tu nombre, tus habilidades y tus intereses. La configuración toma menos de un minuto.",
    },
    step2: {
      title: "Publica o descubre un proyecto",
      body: "Comparte tu idea como proyecto con una frase y una categoría, o explora el catálogo para encontrar algo que valga la pena.",
    },
    step3: {
      title: "Solicita colaborar",
      body: "Postula con un rol y una presentación corta. El propietario del proyecto revisa tu solicitud y te agrega al equipo.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas, respondidas.",
    q1: "¿Qué es TEKA NEXUS?",
    a1: "Una plataforma pensada para desarrolladores donde las ideas se convierten en tecnología real. Publica un proyecto en cualquier etapa — de una idea rugosa a una versión lanzada — y encuentra a la gente para construirlo contigo. Descubrimiento de proyectos, formación de equipos y reputación verificada, todo en un solo lugar.",
    q2: "¿Es gratis?",
    a2: "Sí. TEKA NEXUS es gratis durante la beta abierta. Las herramientas de monetización llegarán en una fase posterior — por ahora, la única moneda es la reputación.",
    q3: "¿Cómo se gana reputación?",
    a3: "Nunca se autoreporta. El servidor otorga XP y reputación automáticamente por contribuciones verificadas: completar tareas, alcanzar hitos, publicar actualizaciones, lanzar un proyecto y que acepten una solicitud de colaboración.",
    q4: "¿Puedo usarlo sin cripto?",
    a4: "Sí. TEKA NEXUS es una plataforma web estándar — sin billetera, tokens ni conocimientos de blockchain. Todo funciona con una cuenta de correo normal.",
    q5: "¿Cómo funcionan los equipos?",
    a5: "Los proyectos tienen propietarios, administradores, colaboradores y espectadores. Para unirte, envías una solicitud de colaboración con el rol que buscas y una presentación corta; el propietario la revisa y la acepta o la rechaza.",
  },
  footer: {
    tagline: "TEKA NEXUS — Imagina. Construye. Conecta.",
    previewNote:
      "Cada proyecto aquí es real, creado por miembros reales — únete y lanza el tuyo.",
    navAria: "Pie de página — {section}",
    colProduct: "Producto",
    colCompany: "Empresa",
    colLegal: "Legal",
    colSupport: "Soporte",
    about: "Acerca de",
    faq: "FAQ",
    terms: "Términos",
    privacy: "Privacidad",
    guidelines: "Lineamientos",
  },
  toast: {
    comingSoon: "Aún no forma parte de esta vista previa — llegará en una fase posterior.",
  },
};
