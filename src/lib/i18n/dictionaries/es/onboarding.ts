// TEKA NEXUS — Spanish dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "Configuración del perfil",
  guard: {
    title: "Inicia sesión para configurar tu perfil",
    body: "La configuración inicial es parte del flujo de cuenta — primero crea tu cuenta o accede a ella.",
    cta: "Ir a iniciar sesión",
  },
  stepsAria: "Pasos de configuración",
  steps: {
    identity: {
      label: "Identidad",
      hint: "Quién eres en TEKA NEXUS",
    },
    skills: {
      label: "Habilidades",
      hint: "Qué puedes aportar",
    },
    interests: {
      label: "Intereses",
      hint: "En qué quieres trabajar",
    },
    goals: {
      label: "Objetivos",
      hint: "Para qué estás aquí",
    },
  },
  stepOf: "Paso {n} de {total}",
  identity: {
    title: "Configura tu identidad",
    subtitle: "Así te verán los demás creadores en los proyectos y equipos.",
    displayName: "Nombre para mostrar *",
    displayNamePlaceholder: "p. ej. Maya Chen",
    bio: "Bio",
    bioPlaceholder: "¿Qué construyes? ¿Qué buscas?",
    website: "Sitio web",
    websiteHint: "Opcional — debe ser una URL http(s) completa.",
    avatarGradient: "Degradado del avatar",
    avatarGradientAria: "Degradado del avatar: {name}",
  },
  skills: {
    title: "¿Qué sabes hacer?",
    subtitle: "Elige las habilidades que puedes aportar a un equipo.",
  },
  interests: {
    title: "¿En qué quieres trabajar?",
    subtitle: "Adaptamos el descubrimiento a tus intereses.",
  },
  goals: {
    title: "¿Por qué estás aquí?",
    subtitle: "Tus objetivos dan forma a las recomendaciones y a quién te contacta.",
  },
  nSelected: "Seleccionaste {n}.",
  selectAtLeastOne: "Elige al menos una — u omítelo por ahora.",
  pickAtLeastOne: "Elige al menos uno — u omítelo por ahora.",
  review: {
    title: "Vista previa del perfil",
    skills: "Habilidades",
    interests: "Intereses",
    goals: "Objetivos",
    note: "Lo que omitas recibe un valor predeterminado sensato para que tu perfil funcione igual.",
  },
  continue: "Continuar",
  skipForNow: "Omitir por ahora",
  skip: "Omitir",
  finish: "Finalizar",
  saving: "Guardando…",
  err: {
    displayName: "El nombre para mostrar es obligatorio (1–60 caracteres).",
    website: "El sitio web debe ser una URL http(s) válida, p. ej. https://your-site.dev",
    save: "No se pudo guardar tu perfil. Inténtalo de nuevo.",
  },
  toastWelcome: "Te damos la bienvenida a TEKA NEXUS",
};
