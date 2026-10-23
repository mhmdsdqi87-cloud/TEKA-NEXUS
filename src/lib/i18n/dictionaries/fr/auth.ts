// TEKA NEXUS — French dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "Imaginez. ",
    p2: "Créez.",
    p3: " Connectez.",
  },
  brandLine:
    "Le réseau des développeurs où les projets à chaque étape — idée, prototype, version — rencontrent les personnes prêtes à les construire.",
  bullets: {
    discovery: {
      title: "Une découverte adaptée à votre stack",
      body: "Filtrez les projets publics par catégorie, statut et compétences requises.",
    },
    teams: {
      title: "Des équipes formées par de vraies demandes",
      body: "Postulez avec un rôle et une présentation ; les propriétaires examinent chaque demande.",
    },
    reputation: {
      title: "Une réputation fiable",
      body: "XP et réputation sont attribués par le serveur pour des contributions vérifiées.",
    },
  },
  backHome: "Retour à l’accueil",
  signupTitle: "Créez votre compte",
  loginTitle: "Ravi de vous revoir",
  signupSubtitle: "Commencez à publier des projets et à trouver des collaborateurs. Gratuit pendant la bêta.",
  loginSubtitle: "Connectez-vous pour continuer à construire.",
  username: "Nom d’utilisateur",
  usernameHint: "3 à 24 caractères : lettres minuscules, chiffres et tirets bas",
  email: "E-mail",
  password: "Mot de passe",
  passwordPlaceholderSignup: "Au moins 8 caractères",
  passwordPlaceholderLogin: "Votre mot de passe",
  showPassword: "Afficher le mot de passe",
  hidePassword: "Masquer le mot de passe",
  passwordMinHint: "8 caractères minimum.",
  creatingAccount: "Création du compte…",
  signingIn: "Connexion…",
  haveAccount: "Vous avez déjà un compte ?",
  newToTeka: "Nouveau sur TEKA NEXUS ?",
  createAccountLink: "Créer un compte",
  google: {
    setupWhy: "Pourquoi n'est-il pas encore actif ?",
    setupTitle: "Connexion Google — guide d'activation",
    setupBody: "Tout est déjà prêt côté serveur. La connexion Google s'active dès que les deux variables d'environnement OAuth sont ajoutées au déploiement — sans toucher au code.",
    setupStep1: "Ouvre console.cloud.google.com et crée un projet (gratuit).",
    setupStep2: "APIs & Services → OAuth consent screen → choisis External et enregistre le nom de l'app.",
    setupStep3: "Credentials → Create credentials → OAuth client ID → Web application.",
    setupStep4: "Ajoute l'URI de redirection ci-dessous, puis définis GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET dans Vercel et redéploie.",
    setupRedirect: "URI de redirection autorisée",
    button: 'Continuer avec Google',
    divider: 'ou continuer avec un e-mail',
    redirecting: 'Connexion à Google…',
  },
  portal: {
    welcome: 'Bon retour parmi nous,',
    entering: 'Entrée dans le Nexus…',
    secured: 'Session sécurisée',
  },
  err: {
    username:
      "Le nom d’utilisateur doit comporter 3 à 24 caractères : lettres minuscules, chiffres et tirets bas.",
    passwordShort: "Le mot de passe doit comporter au moins 8 caractères.",
    emailInvalid: "Saisissez une adresse e-mail valide.",
    passwordRequired: "Le mot de passe est requis.",
    emailTaken: "Cet e-mail est déjà inscrit. Essaie de te connecter.",
    usernameTaken: "Ce pseudo est déjà pris. Choisis-en un autre.",
    invalidCredentials: "E-mail ou mot de passe incorrect.",
    googleFailed: 'La connexion Google a échoué. Réessaie.',
    googleCancelled: 'Connexion Google annulée.',
    googleNotConfigured: "La connexion Google n'est pas encore activée — GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET sont requis (voir docs/GOOGLE_OAUTH.md).",
    googleState: 'Cette tentative de connexion Google a expiré. Réessaie.',
  },
};
