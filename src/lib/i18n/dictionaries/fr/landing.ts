// TEKA NEXUS — French dictionary: "landing" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { LandingDict } from "../en/landing";

export const landing: LandingDict = {
  topbar: {
    navAria: "Navigation principale",
    startBuilding: "Commencer à créer",
  },
  hero: {
    badge: "TEKA NEXUS — désormais en bêta ouverte",
    title1: "Là où les idées deviennent ",
    title2: "de la vraie technologie",
    title3: ".",
    subtitle: "Découvrez des projets, trouvez votre équipe et construisez ce qui vient ensuite.",
    exploreProjects: "Explorer les projets",
  },
  orbit: {
    ship: "Livrer",
    teamUp: "Former une équipe",
    fork: "Fork",
    rankUp: "Évoluer",
  },
  live: {
    aria: "Activité en direct",
    label: "Pulsations en direct",
    empty: "Soyez le premier à construire quelque chose de réel.",
  },
  feed: {
    created: "a créé",
    released: "a publié",
    updateOn: "a publié une mise à jour sur",
    taskOn: "a clôturé une tâche sur",
    milestoneOn: "a atteint un jalon sur",
    joined: "a rejoint",
    updated: "a mis à jour",
    someone: "Quelqu’un",
    projectFallback: "un projet",
  },
  workflow: {
    eyebrow: "Le chemin",
    title: "Un seul flux, de l’idée à l’impact.",
    subtitle:
      "Chaque fonctionnalité de TEKA NEXUS correspond à une étape de la même boucle — la façon dont les vrais projets voient le jour.",
    idea: "IDÉE",
    discover: "DÉCOUVRIR",
    findTeam: "TROUVER UNE ÉQUIPE",
    build: "CONSTRUIRE",
    collaborate: "COLLABORER",
    publish: "PUBLIER",
    grow: "GRANDIR",
    monetize: "MONÉTISER",
  },
  features: {
    eyebrow: "Plateforme",
    title: "Tout ce qu’il faut pour passer de zéro à projet livré.",
    howLabel: "Fonctionnement",
    discovery: {
      title: "Découverte Nexus",
      body: "Trouvez des projets par catégorie, statut, tags et compétences requises — des idées au premier commit aux versions publiées. Chaque projet public est indexé dès sa publication.",
      how: "Ouvrez Explorer pour filtrer le catalogue, ou utilisez la recherche pour accéder directement aux projets, aux personnes et aux tags.",
    },
    workspaces: {
      title: "Espaces de travail de projet",
      body: "Chaque projet dispose d’un espace de travail partagé : tableau de tâches, jalons, mises à jour de progression et une équipe aux rôles explicites, du propriétaire au spectateur.",
      how: "Les propriétaires publient le projet et examinent les demandes ; les collaborateurs acceptés planifient et livrent sur le même tableau.",
    },
    reputation: {
      title: "Réputation vérifiée",
      body: "La réputation se gagne, elle ne se revendique pas. Le serveur vérifie chaque contribution et attribue XP et réputation automatiquement — rien n’est auto-déclaré.",
      how: "Terminez des tâches, atteignez des jalons et livrez des versions ; les résultats apparaissent sur votre profil et sont visibles par les équipes.",
    },
  },
  preview: {
    eyebrow: "Dans un projet",
    title: "Un espace de travail conçu pour livrer.",
    subtitle: "Tâches, jalons, mises à jour et toute votre équipe — organisés en un tableau par projet.",
    chip: "Aperçu",
    caption: "Aperçu du produit — disposition illustrative de l’espace de travail d’un projet.",
    backlog: "À faire",
    inProgress: "En cours",
    done: "Terminé",
    taskCard: "Carte de tâche",
    assignee: "Assigné",
  },
  how: {
    eyebrow: "Fonctionnement",
    title: "Commencez en trois étapes.",
    step1: {
      title: "Créez un profil",
      body: "Inscrivez-vous, définissez votre nom affiché, vos compétences et vos centres d’intérêt. La configuration prend moins d’une minute.",
    },
    step2: {
      title: "Publiez ou découvrez un projet",
      body: "Partagez votre idée sous forme de projet avec un slogan et une catégorie, ou parcourez la découverte pour trouver un projet qui vaut la peine de rejoindre.",
    },
    step3: {
      title: "Demandez à collaborer",
      body: "Postulez avec un rôle et une courte présentation. Le propriétaire du projet examine votre demande et vous ajoute à l’équipe.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Des questions, des réponses.",
    q1: "Qu’est-ce que TEKA NEXUS ?",
    a1: "Une plateforme pensée d’abord pour les développeurs, où les idées deviennent de la vraie technologie. Publiez un projet à n’importe quelle étape — d’une idée brute à une version publiée — et trouvez les personnes pour le construire avec vous. Découverte de projets, formation d’équipes et réputation vérifiée, au même endroit.",
    q2: "Est-ce gratuit ?",
    a2: "Oui. TEKA NEXUS est gratuit pendant la bêta ouverte. Les outils de monétisation arriveront dans une phase ultérieure — pour l’instant, la seule monnaie, c’est la réputation.",
    q3: "Comment la réputation est-elle gagnée ?",
    a3: "Elle n’est jamais auto-déclarée. Le serveur attribue XP et réputation automatiquement pour les contributions vérifiées : terminer des tâches, atteindre des jalons, publier des mises à jour, lancer un projet ou voir une demande de collaboration acceptée.",
    q4: "Puis-je l’utiliser sans crypto ?",
    a4: "Oui. TEKA NEXUS est une plateforme web standard — aucun portefeuille, aucun jeton, aucune connaissance de la blockchain requis. Tout fonctionne avec un compte e-mail classique.",
    q5: "Comment fonctionnent les équipes ?",
    a5: "Les projets ont des propriétaires, des admins, des contributeurs et des spectateurs. Pour rejoindre, vous envoyez une demande de collaboration avec le rôle visé et une courte présentation ; le propriétaire l’examine puis l’accepte ou la refuse.",
  },
  footer: {
    tagline: "TEKA NEXUS — Imaginez. Créez. Connectez.",
    previewNote:
      "Chaque projet ici est réel, créé par de vrais membres — rejoignez-nous et lancez le vôtre.",
    navAria: "Pied de page — {section}",
    colProduct: "Produit",
    colCompany: "Entreprise",
    colLegal: "Légal",
    colSupport: "Assistance",
    about: "À propos",
    faq: "FAQ",
    terms: "Conditions",
    privacy: "Confidentialité",
    guidelines: "Charte",
  },
  toast: {
    comingSoon: "Pas encore inclus dans cet aperçu — à venir dans une phase ultérieure.",
  },
};
