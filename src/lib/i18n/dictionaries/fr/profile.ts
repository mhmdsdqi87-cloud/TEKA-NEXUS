// TEKA NEXUS — French dictionary: "profile" namespace (owned by translation agent 2-d).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "Suivre",
    following: "Suivi(e)",
    blocked: "Bloqué",
    editProfile: "Modifier le profil",
    moreActions: "Plus d'actions",
    blockUser: "Bloquer l'utilisateur",
    unblockUser: "Débloquer l'utilisateur",
    reportUser: "Signaler l'utilisateur",
  },
  stats: {
    followers: "Abonnés",
    following: "Abonnements",
    reputation: "Réputation",
  },
  tabs: {
    contributions: "Contributions",
    about: "À propos",
  },
  header: {
    memberSince: "Membre depuis {date}",
  },
  sections: {
    goals: "Objectifs",
    interests: "Centres d'intérêt",
    skills: "Compétences",
  },
  contributionTypes: {
    task: "Tâche terminée",
    release: "Version publiée",
    milestone: "Jalon atteint",
    update: "Mise à jour publiée",
    collab: "A rejoint une équipe",
    created: "A créé un projet",
    other: "A contribué",
  },
  contributions: {
    notice: "La réputation s'acquiert uniquement par des contributions vérifiées — elle ne peut pas s'acheter.",
  },
  empty: {
    projects: {
      title: "Aucun projet public pour le moment",
      description: "Quand {name} publiera des projets, ils apparaîtront ici.",
    },
    contributions: {
      title: "Aucune contribution pour le moment",
      description:
        "Les tâches, jalons, versions et collaborations vérifiées apparaîtront ici au fur et à mesure.",
    },
    about: {
      title: "Ce créateur n'a pas encore ajouté de détails",
      description: "Sa bio, ses compétences et ses centres d'intérêt apparaîtront ici une fois son profil complété.",
    },
  },
  about: {
    bio: "Bio",
    noBio: "Pas encore de bio.",
    noneListed: "Rien de listé pour le moment.",
    details: "Détails du créateur",
    joined: "Membre depuis le {date}",
  },
  notFound: {
    title: "Créateur introuvable",
    description: "Ce profil n'existe pas ou a peut-être été supprimé.",
    action: "Explorer les projets",
  },
  loadFailed: {
    title: "Impossible de charger ce profil",
    description: "Vérifiez votre connexion et réessayez.",
  },
  report: {
    title: "Signaler {name}",
    description: "Les signalements vont dans la file de modération et sont examinés par l'équipe TEKA.",
    reason: "Motif",
    pickReason: "Choisissez un motif",
    detailsLabel: "Détails (facultatif)",
    detailsPlaceholder: "Ajoutez tout contexte utile aux modérateurs.",
    submit: "Envoyer le signalement",
  },
  reportReasons: {
    spam: "Spam",
    harassment: "Harcèlement",
    inappropriate: "Contenu inapproprié",
    copyright: "Violation du droit d'auteur",
    other: "Autre chose",
  },
  toasts: {
    followed: "Vous suivez maintenant {name}",
    unfollowed: "Vous ne suivez plus {name}",
    blocked: "Vous avez bloqué @{name}",
    unblocked: "Vous avez débloqué @{name}",
    reportSubmitted: "Signalement envoyé — notre équipe l'examinera.",
  },
  errors: {
    loadFailed: "Impossible de charger ce profil.",
    signInToFollow: "Connectez-vous pour suivre des créateurs.",
    followFailed: "Impossible de mettre à jour le suivi.",
    signInToBlock: "Connectez-vous pour gérer les blocages.",
    blockFailed: "Impossible de mettre à jour le blocage.",
    reportFailed: "Impossible d'envoyer le signalement.",
  },
  shared: {
    openProjectAria: "Ouvrir le projet {name}",
    likes: "J'aime",
    teamSize: "Taille de l'équipe",
    updated: "mis à jour {time}",
    coverAlt: "Couverture de {name}",
  },
};
