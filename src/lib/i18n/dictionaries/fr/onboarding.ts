// TEKA NEXUS — French dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "Configuration du profil",
  guard: {
    title: "Connectez-vous pour configurer votre profil",
    body: "La configuration fait partie du parcours du compte — créez d’abord votre compte ou connectez-vous.",
    cta: "Aller à la connexion",
  },
  stepsAria: "Étapes de configuration",
  steps: {
    identity: {
      label: "Identité",
      hint: "Qui vous êtes sur TEKA NEXUS",
    },
    skills: {
      label: "Compétences",
      hint: "Ce que vous pouvez apporter",
    },
    interests: {
      label: "Intérêts",
      hint: "Ce sur quoi vous voulez travailler",
    },
    goals: {
      label: "Objectifs",
      hint: "Ce que vous êtes venu faire",
    },
  },
  stepOf: "Étape {n} sur {total}",
  identity: {
    title: "Configurez votre identité",
    subtitle: "C’est ainsi que les autres créateurs vous verront dans les projets et les équipes.",
    displayName: "Nom affiché *",
    displayNamePlaceholder: "ex. Maya Chen",
    bio: "Bio",
    bioPlaceholder: "Que construisez-vous ? Que recherchez-vous ?",
    website: "Site web",
    websiteHint: "Facultatif — doit être une URL http(s) complète.",
    avatarGradient: "Dégradé de l’avatar",
    avatarGradientAria: "Dégradé de l’avatar : {name}",
  },
  skills: {
    title: "Que savez-vous faire ?",
    subtitle: "Choisissez les compétences que vous pouvez apporter à une équipe.",
  },
  interests: {
    title: "Sur quoi voulez-vous travailler ?",
    subtitle: "Nous adaptons la découverte à vos intérêts.",
  },
  goals: {
    title: "Pourquoi êtes-vous ici ?",
    subtitle: "Vos objectifs façonnent les recommandations et les personnes qui vous contactent.",
  },
  nSelected: "{n} sélectionné(s).",
  selectAtLeastOne: "Choisissez-en au moins une — ou passez pour l’instant.",
  pickAtLeastOne: "Choisissez-en au moins un — ou passez pour l’instant.",
  review: {
    title: "Aperçu du profil",
    skills: "Compétences",
    interests: "Intérêts",
    goals: "Objectifs",
    note: "Ce que vous avez passé reçoit une valeur par défaut pertinente ; votre profil reste fonctionnel.",
  },
  continue: "Continuer",
  skipForNow: "Passer pour l’instant",
  skip: "Passer",
  finish: "Terminer",
  saving: "Enregistrement…",
  err: {
    displayName: "Le nom affiché est obligatoire (1 à 60 caractères).",
    website: "Le site web doit être une URL http(s) valide, ex. https://your-site.dev",
    save: "Impossible d’enregistrer votre profil. Veuillez réessayer.",
  },
  toastWelcome: "Bienvenue sur TEKA NEXUS",
};
