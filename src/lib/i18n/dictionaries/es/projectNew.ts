// TEKA NEXUS — Spanish dictionary: "projectNew" namespace.
// Owned by translation agent (Task 2-c).

import type { ProjectNewDict } from "../en/projectNew";

export const projectNew: ProjectNewDict = {
  auth: {
    title: "Inicio de sesión requerido",
    description: "Necesitas una cuenta de TEKA NEXUS para lanzar un proyecto.",
    goLogin: "Ir al inicio de sesión",
  },
  title: "Lanzar un proyecto",
  subtitle: "Cuéntale al mundo qué estás construyendo.",
  form: {
    name: "Nombre del proyecto",
    namePlaceholder: "p. ej. Nexus CLI",
    slugHint: "Tu slug de URL aparecerá aquí mientras escribes.",
    tagline: "Lema",
    taglinePlaceholder: "Una frase que venda la idea",
    category: "Categoría",
    status: "Estado",
    statusPlaceholder: "Elige un estado",
    visibility: "Visibilidad",
    tags: "Etiquetas",
    maxTagsReached: "Máximo 8 etiquetas alcanzado",
    tagPlaceholder: "Escribe una etiqueta y pulsa Enter",
    optional: "(opcional)",
    links: "Enlaces",
    description: "Descripción",
    descriptionPlaceholder: "¿Qué estás construyendo? ¿Para quién es? ¿Qué lo hace diferente?",
    descriptionHint: "Texto plano o Markdown.",
    requiredSkills: "Habilidades requeridas",
    repoUrl: "URL del repositorio",
    demoUrl: "URL de la demo",
    websiteUrl: "URL del sitio web",
  },
  a11y: {
    categoryGroup: "Categoría del proyecto",
    visibilityGroup: "Visibilidad del proyecto",
    removeTag: "Eliminar etiqueta {tag}",
  },
  visibilityDesc: {
    PUBLIC: "Aparece en Explorar y en el feed en vivo. Cualquiera puede verlo.",
    UNLISTED: "Visible solo por enlace directo. Oculto de Explorar y del feed.",
    PRIVATE: "Solo tú y los miembros de tu equipo pueden ver este proyecto.",
  },
  visibilityName: {
    PUBLIC: "Público",
    UNLISTED: "No listado",
    PRIVATE: "Privado",
  },
  errors: {
    name: "El nombre debe tener entre 3 y 80 caracteres.",
    taglineRequired: "El lema es obligatorio.",
    taglineMax: "Máximo {n} caracteres.",
    category: "Elige una categoría para tu proyecto.",
    url: "Debe empezar por http:// o https://",
  },
  toasts: {
    maxTags: "Máximo {n} etiquetas",
    fixFields: "Corrige los campos señalados antes de lanzar.",
    launched: "Proyecto lanzado",
    createFailed: "No se pudo crear el proyecto",
  },
  submitting: "Lanzando…",
  submit: "Lanzar proyecto",
};
