// TEKA NEXUS — French dictionary: "projectNew" namespace.
// Owned by translation agent (Task 2-c).

import type { ProjectNewDict } from "../en/projectNew";

export const projectNew: ProjectNewDict = {
  auth: {
    title: "Connexion requise",
    description: "Vous avez besoin d’un compte TEKA NEXUS pour lancer un projet.",
    goLogin: "Aller à la connexion",
  },
  title: "Lancer un projet",
  subtitle: "Dites au monde ce que vous construisez.",
  form: {
    name: "Nom du projet",
    namePlaceholder: "ex. Nexus CLI",
    slugHint: "Votre identifiant d’URL apparaîtra ici au fil de la saisie.",
    tagline: "Slogan",
    taglinePlaceholder: "Une phrase qui vend l’idée",
    category: "Catégorie",
    status: "Statut",
    statusPlaceholder: "Choisissez un statut",
    visibility: "Visibilité",
    tags: "Tags",
    maxTagsReached: "Limite de 8 tags atteinte",
    tagPlaceholder: "Saisissez un tag et appuyez sur Entrée",
    optional: "(facultatif)",
    links: "Liens",
    description: "Description",
    descriptionPlaceholder: "Que construisez-vous ? Pour qui ? Qu’est-ce qui le rend différent ?",
    descriptionHint: "Texte brut ou Markdown.",
    requiredSkills: "Compétences requises",
    repoUrl: "URL du dépôt",
    demoUrl: "URL de la démo",
    websiteUrl: "URL du site web",
    cover: "Image de couverture",
    coverHint: "Choisissez une image ou collez un lien vers la vôtre.",
    coverNone: "Sans couverture",
    coverUrlLabel: "URL d’image personnalisée",
  },
  a11y: {
    categoryGroup: "Catégorie du projet",
    visibilityGroup: "Visibilité du projet",
    removeTag: "Supprimer le tag {tag}",
    coverGroup: "Image de couverture du projet",
    coverNone: "Sans couverture",
    coverOption: "Couverture {name}",
    coverUrlHide: "Masquer le champ d’URL d’image",
  },
  visibilityDesc: {
    PUBLIC:
      "Répertorié dans Explorer et le flux en direct. Tout le monde peut le voir.",
    UNLISTED:
      "Visible via un lien direct. Masqué d’Explorer et du flux.",
    PRIVATE:
      "Vous et les membres de votre équipe seuls pouvez voir ce projet.",
  },
  visibilityName: {
    PUBLIC: "Public",
    UNLISTED: "Non répertorié",
    PRIVATE: "Privé",
  },
  errors: {
    name: "Le nom doit contenir entre 3 et 80 caractères.",
    taglineRequired: "Le slogan est requis.",
    taglineMax: "{n} caractères maximum.",
    category: "Choisissez une catégorie pour votre projet.",
    url: "Doit commencer par http:// ou https://",
    coverUrl: "L’URL de l’image doit commencer par http:// ou https://",
    coverMax: "L’URL de l’image peut contenir au maximum {n} caractères.",
  },
  toasts: {
    maxTags: "{n} tags maximum",
    fixFields: "Corrigez les champs signalés avant de lancer.",
    launched: "Projet lancé",
    createFailed: "Échec de la création du projet",
  },
  submitting: "Lancement…",
  submit: "Lancer le projet",
};
