// TEKA NEXUS — fr dictionary: "dna" namespace (NEXUS 2.0 Phase 1).
// Les étiquettes « Calculé » font partie du contrat d'honnêteté des données :
// chaque chiffre dérivé est étiqueté honnêtement et jamais présenté comme
// une mesure réelle.

import type { DnaDict } from "../en/dna";

export const dna: DnaDict = {
  title: "ADN du projet",
  subtitle: "L'identité numérique complète de chaque projet — identité, architecture, feuille de route et historique vérifié.",
  searchPlaceholder: "Rechercher des projets…",
  error: "Impossible de charger l'ADN de ce projet.",
  noResults: "Aucun projet ne correspond à votre recherche.",
  empty: "Aucun projet public pour l'instant — créez le premier et son ADN commencera à pousser.",
  createFirst: "Créer un projet",
  openAria: "Ouvrir l'ADN de {name}",
  updated: "mis à jour",
  prevPage: "Précédent",
  nextPage: "Suivant",
  pageOf: "Page {page} sur {pages}",

  notFoundTitle: "ADN indisponible",
  notFoundBody: "Ce projet n'existe pas ou est privé. L'ADN privé n'est visible que par les membres du projet.",
  backToPicker: "Tous les projets",

  privateBadge: "Privé",
  verifiedBadge: "Registres vérifiés de la plateforme",
  created: "Créé",
  linkRepo: "Dépôt",
  linkDemo: "Démo",
  linkSite: "Site web",
  openWorkspace: "Ouvrir l'espace de travail",

  countMembers: "Membres",
  countLikes: "J'aime",
  countUpdates: "Mises à jour",
  countTasks: "Tâches",
  countComments: "Commentaires",
  countRequests: "Demandes ouvertes",

  archTitle: "Carte d'architecture",
  archRootLabel: "couches techniques déclarées",
  archDeclaredNote: "Dessinée uniquement à partir des tags déclarés du projet — rien n'est déduit.",
  emptyStack: "Aucune stack déclarée pour l'instant — le propriétaire peut ajouter des tags sur la page du projet.",
  layerFrontend: "Frontend",
  layerBackend: "Backend",
  layerData: "Données",
  layerTools: "Outils",
  layerOther: "Déclaré (non catégorisé)",

  healthTitle: "Indicateurs de santé",
  calculatedBadge: "Calculé",
  healthTaskRate: "Taux de tâches terminées",
  healthFormulaTasks: "terminées / total des tâches",
  healthProgress: "Avancement de la feuille de route",
  healthFormulaMilestones: "atteints / total des jalons",
  healthActivity: "Activité (30 jours)",
  healthFormulaActivity: "événements d'activité réels",
  healthMomentum: "Dynamique",
  healthFormulaMomentum: "activité ÷ jours actifs",
  healthDisclaimer: "Tous les indicateurs sont calculés à partir de registres réels de la plateforme — ni mesures externes, ni prédictions par IA.",
  healthLastActivity: "Dernière activité :",

  milestonesTitle: "Feuille de route et jalons",
  milestoneAdd: "Ajouter un jalon",
  milestoneProgress: "{percent}% · {done}/{total} terminés",
  milestoneTitleLabel: "Titre",
  milestoneDueLabel: "Échéance (facultatif)",
  milestoneSave: "Enregistrer le jalon",
  cancel: "Annuler",
  emptyMilestones: "Aucun jalon pour l'instant. Les contributeurs peuvent ajouter le premier pour lancer la feuille de route.",
  overdue: "en retard",
  milestoneDone: "Terminé",
  milestoneCompleteAria: "Marquer le jalon comme terminé",
  milestoneUncompleteAria: "Marquer le jalon comme non terminé",
  milestoneDeleteAria: "Supprimer le jalon",

  timelineTitle: "Chronologie du développement",
  timelineVerifiedNote: "registres vérifiés uniquement",
  emptyTimeline: "Aucun événement enregistré pour l'instant.",
  timelineKinds: {
    PROJECT_CREATED: "Projet créé",
    MEMBER_JOINED: "Un membre a rejoint",
    UPDATE_POSTED: "Mise à jour publiée",
    MILESTONE_CREATED: "Jalon planifié",
    MILESTONE_COMPLETED: "Jalon atteint",
    TASK_COMPLETED: "Tâche terminée",
  },

  contributorsTitle: "Contributeurs",
  contributorsNote: "avec des compteurs de contribution vérifiés",
  joined: "Arrivé",
  verifiedEvents: "événements vérifiés",
};
