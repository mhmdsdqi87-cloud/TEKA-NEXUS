// TEKA NEXUS — French dictionary: "teams" namespace.
// Owned by translation agent (Task 2-c).

import type { TeamsDict } from "../en/teams";

export const teams: TeamsDict = {
  tabs: {
    crews: "Mes équipes",
    requests: "Demandes",
    discover: "Découvrir",
  },
  auth: {
    title: "Connectez-vous pour gérer vos équipes",
    description:
      "Suivez vos équipes, traitez les demandes de collaboration et découvrez des projets qui ont besoin de vos compétences.",
  },
  titlePrefix: "Vos",
  titleCrews: "équipes",
  subtitle:
    "Gérez les projets que vous construisez ensemble, répondez aux demandes et trouvez de nouveaux collaborateurs.",
  a11y: {
    yourRole: "Votre rôle : {role}",
    sentAria: "Demandes envoyées",
    receivedAria: "Demandes reçues",
    viewProfileAria: "Voir le profil de {name}",
  },
  crews: {
    emptyTitle: "Vous ne faites pas encore partie d’une équipe",
    emptyDesc:
      "Rejoignez un projet ou lancez le vôtre — la collaboration donne naissance aux meilleures réalisations.",
    explore: "Explorer les projets",
    start: "Lancer un projet",
    joined: "membre depuis {date}",
    open: "Ouvrir l’espace de travail",
    member: "{n} membre",
    members: "{n} membres",
  },
  requests: {
    sent: "Envoyées",
    received: "Reçues",
    pendingCount: "({n} en attente)",
    sentEmpty:
      "Aucune demande envoyée — trouvez un projet et demandez à le rejoindre.",
    receivedEmpty:
      "Aucune demande reçue pour l’instant. Continuez de livrer — les développeurs vous trouveront.",
    unknownProject: "Projet inconnu",
    appliedAs: "Candidature comme {role} · {ago}",
    withdraw: "Retirer",
    wantsToJoin: "Veut rejoindre {project} en tant que {role}",
    wantsToJoinPrefix: "Veut rejoindre ",
    wantsToJoinMiddle: " en tant que ",
    wantsToJoinSuffix: "",
    aProject: "un projet",
    viewProject: "Voir le projet",
  },
  status: {
    PENDING: "En attente",
    ACCEPTED: "Acceptée",
    REJECTED: "Refusée",
    WITHDRAWN: "Retirée",
  },
  accept: "Accepter",
  reject: "Refuser",
  toasts: {
    withdrawn: "Demande retirée",
    accepted: "Bienvenue à bord — demande acceptée",
    rejected: "Demande refusée",
  },
  errors: {
    generic: "Une erreur est survenue",
  },
  discover: {
    title: "Des équipes cherchent des membres",
    subtitle:
      "Projets listant des compétences requises — trouvez une équipe qui a besoin de ce que vous savez faire.",
    emptyTitle: "Aucun projet ne liste de compétences requises pour l’instant",
    emptyDesc:
      "Les projets les plus récents s’affichent à la place — revenez quand de nouvelles équipes publieront leurs besoins.",
  },
  chat: {
    title: "Chat d’équipe",
    online: "{n} en ligne",
    onlineOne: "Tu es seul en ligne",
    typing: "{names} écrit…",
    typingMulti: "{names} écrivent…",
    placeholder: "Écris à ton équipe…",
    send: "Envoyer",
    empty: "Aucun message — dis bonjour 👋",
    emptyHint: "Les messages arrivent ici pour toute l’équipe.",
    synced: "Synchronisé",
    sendError: "Échec de l’envoi du message",
    unavailable: "Le chat est indisponible pour le moment",
    emoji: "Émoji",
    disconnected: "Connexion perdue",
    reconnecting: "Reconnexion…",
    deleted: "Message supprimé",
    loginRequired: "Connecte-toi pour rejoindre la discussion",
    reactAdd: "Ajouter une réaction",
    rateLimited: "Doucement — trop de messages d’affilée",
    charsLeft: "{n} caractères restants",
    a11y: {
      openChat: "Ouvrir le chat de l’équipe {name}",
      closeChat: "Fermer le chat",
      deleteMessage: "Supprimer le message",
      messages: "Messages",
    },
  },
};
