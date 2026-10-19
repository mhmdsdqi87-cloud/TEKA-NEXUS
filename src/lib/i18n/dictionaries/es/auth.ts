// TEKA NEXUS — Spanish dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "Imagina. ",
    p2: "Construye.",
    p3: " Conecta.",
  },
  brandLine:
    "La red de desarrolladores donde los proyectos en cada etapa — idea, prototipo, lanzamiento — se encuentran con las personas listas para construirlos.",
  bullets: {
    discovery: {
      title: "Descubrimiento que encaja con tu stack",
      body: "Filtra proyectos públicos por categoría, estado y las habilidades que necesitan.",
    },
    teams: {
      title: "Equipos formados por solicitudes reales",
      body: "Postula con un rol y una presentación; los propietarios revisan cada solicitud.",
    },
    reputation: {
      title: "Reputación en la que puedes confiar",
      body: "El servidor otorga XP y reputación por contribuciones verificadas.",
    },
  },
  backHome: "Volver al inicio",
  signupTitle: "Crea tu cuenta",
  loginTitle: "Bienvenido de nuevo",
  signupSubtitle: "Empieza a publicar proyectos y a encontrar colaboradores. Gratis durante la beta.",
  loginSubtitle: "Inicia sesión para seguir construyendo.",
  username: "Nombre de usuario",
  usernameHint: "3–24 caracteres: letras, números y guiones bajos",
  email: "Correo electrónico",
  password: "Contraseña",
  passwordPlaceholderSignup: "Al menos 8 caracteres",
  passwordPlaceholderLogin: "Tu contraseña",
  showPassword: "Mostrar contraseña",
  hidePassword: "Ocultar contraseña",
  passwordMinHint: "Mínimo 8 caracteres.",
  creatingAccount: "Creando cuenta…",
  signingIn: "Iniciando sesión…",
  haveAccount: "¿Ya tienes una cuenta?",
  newToTeka: "¿Nuevo en TEKA NEXUS?",
  createAccountLink: "Crear una cuenta",
  err: {
    username:
      "El nombre de usuario debe tener 3–24 caracteres: letras minúsculas, números y guiones bajos.",
    passwordShort: "La contraseña debe tener al menos 8 caracteres.",
    emailInvalid: "Introduce un correo electrónico válido.",
    passwordRequired: "La contraseña es obligatoria.",
  },
};
