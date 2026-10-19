// TEKA NEXUS — Spanish dictionary: "settings" namespace (owned by translation agent 2-d).

import type { SettingsDict } from "../en/settings";

export const settings: SettingsDict = {
  subtitle: "Gestiona tu perfil, la seguridad de tu cuenta y tus preferencias de comunidad.",
  signedOut: {
    title: "Inicia sesión para gestionar tu configuración",
    description: "Los controles de tu perfil, cuenta, notificaciones y privacidad están aquí.",
  },
  tabs: {
    profile: "Perfil",
    account: "Cuenta",
    notifications: "Notificaciones",
    privacy: "Privacidad",
  },
  profileTab: {
    displayName: "Nombre visible",
    displayNamePlaceholder: "¿Cómo quieres que te llame la comunidad?",
    bio: "Bio",
    bioPlaceholder: "¿Qué estás construyendo? ¿Qué te importa?",
    website: "Sitio web",
    websiteHint: "Se muestra como enlace en tu perfil público.",
    websiteError: "Introduce una URL completa que empiece por http:// o https://",
    avatarGradient: "Degradado de avatar",
    chooseGradient: "Elegir degradado de avatar",
    gradientName: "Degradado {name}",
    skills: "Habilidades",
    skillsHint: "Marca todo lo que puedas aportar — los equipos usan esto para encontrarte.",
  },
  avatar: {
    title: "Foto de perfil",
    upload: "Subir foto",
    remove: "Eliminar foto",
    hint: "JPG, PNG o WebP: se recorta automáticamente en círculo. Hasta 400 KB.",
    tooBig: "Esa imagen es demasiado grande; elige una de menos de 400 KB.",
    invalid: "No se pudo leer esa imagen; prueba con otro archivo.",
    toastSaved: "Foto de perfil actualizada",
    toastRemoved: "Foto de perfil eliminada",
    fallback: "Foto de perfil",
  },
  accountTab: {
    language: "Idioma",
    languageDescription:
      "Elige el idioma de la interfaz — English, Español, 中文, العربية, فارسی or Français.",
    email: "Correo electrónico",
    emailHint: "Tu correo de inicio de sesión — de solo lectura durante la beta.",
    changePassword: "Cambiar contraseña",
    changePasswordHint: "Al cambiar la contraseña se cierra la sesión en todos los demás dispositivos.",
    currentPassword: "Contraseña actual",
    newPassword: "Nueva contraseña",
    pwTooShort: "Al menos 8 caracteres.",
    confirmPassword: "Confirmar nueva contraseña",
    pwMismatch: "Las contraseñas no coinciden.",
    updatePassword: "Actualizar contraseña",
    dangerZone: "Zona de peligro",
    dangerDescription:
      "Eliminar tu cuenta borra permanentemente tu perfil y todos los proyectos que posees, junto con sus tareas, actualizaciones e hitos. No se puede deshacer.",
    deleteAccount: "Eliminar cuenta",
  },
  delete: {
    title: "¿Eliminar tu cuenta?",
    typeUsername: "Esto elimina permanentemente tu perfil y todos los proyectos que posees. Escribe tu nombre de usuario",
    toContinue: "para continuar.",
    usernameAria: "Escribe tu nombre de usuario para confirmar",
    confirmTitle: "Confirma con tu contraseña",
    confirmDescription:
      "Este es el último paso — introduce tu contraseña para eliminar permanentemente tu cuenta y todos los proyectos que posees.",
    passwordPlaceholder: "Tu contraseña",
    passwordAria: "Confirma tu contraseña",
    continue: "Continuar",
    deleteForever: "Eliminar para siempre",
  },
  notificationsTab: {
    projectActivity: {
      title: "Actividad de proyectos",
      description: "Nuevas tareas, actualizaciones, lanzamientos e hitos en los proyectos de los que formas parte.",
    },
    collaboration: {
      title: "Solicitudes de colaboración",
      description: "Candidaturas a tus proyectos y decisiones sobre las solicitudes que enviaste.",
    },
    social: {
      title: "Actividad social",
      description: "Nuevos seguidores y otra actividad en tu red.",
    },
    toggleAria: "Activar o desactivar {name}",
  },
  privacyTab: {
    safetyTitle: "Seguridad de la comunidad",
    safetyIntro: "La moderación de TEKA NEXUS se basa en comportamientos reales y transparentes — no en promesas.",
    safety: {
      reporting: {
        title: "Denuncias",
        text: "Denuncia cualquier proyecto, comentario o usuario desde su menú. Las denuncias llegan a una cola de revisión — no se toma ninguna medida sin revisión humana.",
      },
      blocking: {
        title: "Bloqueos",
        text: "Bloquear a alguien elimina los seguimientos entre ustedes y le impide seguirte o interactuar con tu trabajo.",
      },
      moderation: {
        title: "Cola de moderación",
        text: "Cada denuncia es revisada por el equipo de TEKA antes de tomar cualquier medida sobre una cuenta o proyecto.",
      },
      deletion: {
        title: "Eliminación de cuenta",
        text: "Puedes eliminar permanentemente tu cuenta y los proyectos que posees en cualquier momento desde la pestaña Cuenta.",
      },
    },
    previewNote: "Nota de vista previa: las herramientas de revisión de moderación las gestiona el equipo de TEKA durante la beta.",
    blockTitle: "Bloquear a un usuario",
    blockDescription:
      "Introduce un nombre de usuario para bloquearlo. Bloquear también elimina los seguimientos entre ustedes, y funciona en ambos sentidos — si envías un nombre de usuario que ya bloqueaste, lo desbloquearás.",
    usernamePlaceholder: "usuario",
    usernameAria: "Nombre de usuario a bloquear",
    blockButton: "Bloquear usuario",
  },
  toasts: {
    profileUpdated: "Perfil actualizado",
    passwordChanged: "Contraseña cambiada — se cerró la sesión en los demás dispositivos",
    accountDeleted: "Tu cuenta ha sido eliminada.",
    prefsUpdated: "Preferencias de notificaciones actualizadas",
    blocked: "Has bloqueado a @{name}",
    unblocked: "Has desbloqueado a @{name}",
  },
  errors: {
    emptyDisplayName: "El nombre visible no puede estar vacío.",
    saveFailed: "No se pudo guardar tu perfil.",
    enterCurrentPassword: "Introduce tu contraseña actual.",
    pwTooShort: "La nueva contraseña debe tener al menos 8 caracteres.",
    pwMismatch: "Las nuevas contraseñas no coinciden.",
    pwChangeFailed: "No se pudo cambiar tu contraseña.",
    deleteFailed: "No se pudo eliminar tu cuenta.",
    loadPrefsFailed: "No se pudo cargar la configuración de notificaciones.",
    prefsUpdateFailed: "No se pudieron actualizar las preferencias.",
    blockFailed: "No se pudo actualizar el bloqueo.",
  },
};
