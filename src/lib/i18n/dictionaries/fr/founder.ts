export const founder = {
  title: "Console fondateur",
  subtitle: "Tous les membres de TEKA NEXUS, en direct.",
  badge: "Fondateur",
  directoryTitle: "Membres inscrits",
  searchPlaceholder: "Chercher par nom, @pseudo ou e-mail…",
  pendingOnboarding: "Configuration incomplète",
  empty: "Aucun membre ne correspond à cette recherche.",
  loadFailed: "Impossible de charger l’annuaire. Réessaie.",
  stats: {
    users: "Membres au total",
    onboarded: "Configuration terminée",
    totalXp: "XP communautaire",
    totalRep: "REP communautaire",
    projects: "Projets",
    sessions: "Sessions actives",
  },
  supabase: {
      "title": "Cloud Supabase",
      "subtitle": "Lien en direct vers votre projet Supabase",
      "connected": "Connecté",
      "offline": "Injoignable",
      "checking": "Vérification…",
      "auth": "Service d'authentification",
      "mirrored": "Comptes synchronisés",
      "storage": "Stockage des avatars",
      "storageReady": "Bucket teka-avatars actif",
      "dbSync": "Synchro complète de la base",
      "dbSyncWaiting": "En attente du mot de passe de la base",
      "dbSyncActive": "Active",
      "version": "version"
  },
};

export type FounderDict = typeof founder;
