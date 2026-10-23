// TEKA NEXUS — French dictionary: "settings" namespace (owned by translation agent 2-d).

import type { SettingsDict } from "../en/settings";

export const settings: SettingsDict = {
  subtitle: "Gérez votre profil, la sécurité de votre compte et vos préférences communautaires.",
  signedOut: {
    title: "Connectez-vous pour gérer vos paramètres",
    description: "Vos contrôles de profil, de compte, de notifications et de confidentialité se trouvent ici.",
  },
  tabs: {
    profile: "Profil",
    account: "Compte",
    notifications: "Notifications",
    privacy: "Confidentialité",
  },
  profileTab: {
    displayName: "Nom affiché",
    displayNamePlaceholder: "Comment la communauté doit-elle vous appeler ?",
    bio: "Bio",
    bioPlaceholder: "Que construisez-vous ? Qu'est-ce qui vous tient à cœur ?",
    website: "Site web",
    websiteHint: "Affiché sous forme de lien sur votre profil public.",
    websiteError: "Saisissez une URL complète commençant par http:// ou https://",
    avatarGradient: "Dégradé d'avatar",
    chooseGradient: "Choisir le dégradé de l'avatar",
    gradientName: "Dégradé {name}",
    skills: "Compétences",
    skillsHint: "Sélectionnez tout ce en quoi vous pouvez contribuer — les équipes s'en servent pour vous trouver.",
  },
  avatar: {
    title: "Photo de profil",
    upload: "Importer une photo",
    remove: "Retirer la photo",
    hint: "JPG, PNG ou WebP — recadrée automatiquement en cercle. 400 Ko max.",
    tooBig: "Cette image est trop lourde — choisissez-en une de moins de 400 Ko.",
    invalid: "Impossible de lire cette image — essayez un autre fichier.",
    toastSaved: "Photo de profil mise à jour",
    toastRemoved: "Photo de profil retirée",
    fallback: "Photo de profil",
  },
  accountTab: {
    language: "Langue",
    languageDescription:
      "Choisissez la langue de l'interface — English, Español, 中文, العربية, فارسی, Français or Русский.",
    email: "E-mail",
    emailHint: "Votre e-mail de connexion — en lecture seule pendant la bêta.",
    changePassword: "Changer le mot de passe",
    changePasswordHint: "Changer votre mot de passe déconnecte tous vos autres appareils.",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    pwTooShort: "Au moins 8 caractères.",
    confirmPassword: "Confirmer le nouveau mot de passe",
    pwMismatch: "Les mots de passe ne correspondent pas.",
    updatePassword: "Mettre à jour le mot de passe",
    dangerZone: "Zone de danger",
    dangerDescription:
      "La suppression de votre compte efface définitivement votre profil et tous les projets que vous possédez, ainsi que leurs tâches, mises à jour et jalons. Cette action est irréversible.",
    deleteAccount: "Supprimer le compte",
  },
  delete: {
    title: "Supprimer votre compte ?",
    typeUsername:
      "Cette action supprime définitivement votre profil et tous les projets que vous possédez. Tapez votre nom d'utilisateur",
    toContinue: "pour continuer.",
    usernameAria: "Tapez votre nom d'utilisateur pour confirmer",
    confirmTitle: "Confirmez avec votre mot de passe",
    confirmDescription:
      "C'est la dernière étape — saisissez votre mot de passe pour supprimer définitivement votre compte et tous les projets que vous possédez.",
    passwordPlaceholder: "Votre mot de passe",
    passwordAria: "Confirmez votre mot de passe",
    continue: "Continuer",
    deleteForever: "Supprimer définitivement",
  },
  notificationsTab: {
    projectActivity: {
      title: "Activité des projets",
      description: "Nouvelles tâches, mises à jour, versions et jalons dans les projets auxquels vous participez.",
    },
    collaboration: {
      title: "Demandes de collaboration",
      description: "Candidatures reçues sur vos projets et décisions sur les demandes que vous avez envoyées.",
    },
    social: {
      title: "Activité sociale",
      description: "Nouveaux abonnés et autres activités au sein de votre réseau.",
    },
    toggleAria: "Activer/désactiver {name}",
  },
  privacyTab: {
    safetyTitle: "Sécurité de la communauté",
    safetyIntro: "La modération de TEKA NEXUS repose sur des comportements réels et transparents — pas sur des promesses.",
    safety: {
      reporting: {
        title: "Signalement",
        text: "Signalez n'importe quel projet, commentaire ou utilisateur depuis son menu. Les signalements arrivent dans une file d'examen — aucune mesure n'est prise sans revue humaine.",
      },
      blocking: {
        title: "Blocage",
        text: "Bloquer quelqu'un supprime les abonnements entre vous et l'empêche de vous suivre ou d'interagir avec vos travaux.",
      },
      moderation: {
        title: "File de modération",
        text: "Chaque signalement est examiné par l'équipe TEKA avant toute mesure sur un compte ou un projet.",
      },
      deletion: {
        title: "Suppression de compte",
        text: "Vous pouvez supprimer définitivement votre compte et vos projets à tout moment depuis l'onglet Compte.",
      },
    },
    previewNote: "Note d'aperçu : les outils d'examen de la modération sont gérés par l'équipe TEKA pendant la bêta.",
    blockTitle: "Bloquer un utilisateur",
    blockDescription:
      "Saisissez un nom d'utilisateur pour le bloquer. Le blocage supprime également les abonnements entre vous, et fonctionne dans les deux sens — soumettre un nom d'utilisateur déjà bloqué le débloquera.",
    usernamePlaceholder: "nom d'utilisateur",
    usernameAria: "Nom d'utilisateur à bloquer",
    blockButton: "Bloquer l'utilisateur",
  },
  toasts: {
    profileUpdated: "Profil mis à jour",
    passwordChanged: "Mot de passe modifié — vos autres appareils ont été déconnectés",
    accountDeleted: "Votre compte a été supprimé.",
    prefsUpdated: "Préférences de notification mises à jour",
    blocked: "Vous avez bloqué @{name}",
    unblocked: "Vous avez débloqué @{name}",
  },
  errors: {
    emptyDisplayName: "Le nom affiché ne peut pas être vide.",
    saveFailed: "Impossible d'enregistrer votre profil.",
    enterCurrentPassword: "Saisissez votre mot de passe actuel.",
    pwTooShort: "Le nouveau mot de passe doit comporter au moins 8 caractères.",
    pwMismatch: "Les nouveaux mots de passe ne correspondent pas.",
    pwChangeFailed: "Impossible de changer votre mot de passe.",
    deleteFailed: "Impossible de supprimer votre compte.",
    loadPrefsFailed: "Impossible de charger les paramètres de notification.",
    prefsUpdateFailed: "Impossible de mettre à jour les préférences.",
    blockFailed: "Impossible de mettre à jour le blocage.",
  },
};
