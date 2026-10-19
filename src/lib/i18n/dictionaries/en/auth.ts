// TEKA NEXUS — en dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding). Source of truth: auth-view.tsx strings.

export const auth = {
  brand: {
    p1: "Imagine. ",
    p2: "Build.",
    p3: " Connect.",
  },
  brandLine:
    "The developer network where projects at every stage — idea, prototype, release — meet the people ready to build them.",
  bullets: {
    discovery: {
      title: "Discovery that fits your stack",
      body: "Filter public projects by category, status, and the skills they need.",
    },
    teams: {
      title: "Teams formed by real requests",
      body: "Apply with a role and introduction; owners review every request.",
    },
    reputation: {
      title: "Reputation you can trust",
      body: "XP and reputation are awarded by the server for verified contributions.",
    },
  },
  backHome: "Back to home",
  signupTitle: "Create your account",
  loginTitle: "Welcome back",
  signupSubtitle: "Start publishing projects and finding collaborators. Free during beta.",
  loginSubtitle: "Sign in to continue building.",
  username: "Username",
  usernameHint: "3–24 chars, letters/numbers/underscores",
  email: "Email",
  password: "Password",
  passwordPlaceholderSignup: "At least 8 characters",
  passwordPlaceholderLogin: "Your password",
  showPassword: "Show password",
  hidePassword: "Hide password",
  passwordMinHint: "Minimum 8 characters.",
  creatingAccount: "Creating account…",
  signingIn: "Signing in…",
  haveAccount: "Already have an account?",
  newToTeka: "New to TEKA NEXUS?",
  createAccountLink: "Create an account",
  err: {
    username: "Username must be 3–24 characters: lowercase letters, numbers, underscores.",
    passwordShort: "Password must be at least 8 characters.",
    emailInvalid: "Enter a valid email address.",
    passwordRequired: "Password is required.",
    emailTaken: "This email is already registered. Try signing in instead.",
    usernameTaken: "That username is already taken. Pick another one.",
    invalidCredentials: "Invalid email or password.",
  },
};

export type AuthDict = typeof auth;
