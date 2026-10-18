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
  demoTitle: "Compte de démonstration",
  demoBody: "Explorez la plateforme avec des données de démo préchargées. Mot de passe :",
  demoUse: "Utiliser {email}",
  haveAccount: "Vous avez déjà un compte ?",
  newToTeka: "Nouveau sur TEKA NEXUS ?",
  createAccountLink: "Créer un compte",
  err: {
    username:
      "Le nom d’utilisateur doit comporter 3 à 24 caractères : lettres minuscules, chiffres et tirets bas.",
    passwordShort: "Le mot de passe doit comporter au moins 8 caractères.",
    emailInvalid: "Saisissez une adresse e-mail valide.",
    passwordRequired: "Le mot de passe est requis.",
  },
};
