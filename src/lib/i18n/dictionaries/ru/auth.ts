// TEKA NEXUS — auth dictionary (ru).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "Представляй. ",
    p2: "Создавай.",
    p3: " Объединяйся.",
  },
  brandLine:
    "Сеть разработчиков, где проекты на любом этапе — идея, прототип, релиз — встречают людей, готовых их воплощать.",
  bullets: {
    discovery: {
      title: "Поиск, который подходит под ваш стек",
      body: "Фильтруйте открытые проекты по категории, статусу и нужным навыкам.",
    },
    teams: {
      title: "Команды складываются из реальных заявок",
      body: "Откликайтесь с ролью и рассказом о себе — владельцы рассматривают каждую заявку.",
    },
    reputation: {
      title: "Репутация, которой можно доверять",
      body: "XP и репутацию начисляет сервер за подтверждённый вклад.",
    },
  },
  backHome: "На главную",
  signupTitle: "Создайте аккаунт",
  loginTitle: "С возвращением",
  signupSubtitle: "Начните публиковать проекты и находить соавторов. Бесплатно в бета-версии.",
  loginSubtitle: "Войдите, чтобы продолжить разработку.",
  username: "Имя пользователя",
  usernameHint: "3–24 символа: буквы, цифры и подчёркивания",
  email: "Email",
  password: "Пароль",
  passwordPlaceholderSignup: "Минимум 8 символов",
  passwordPlaceholderLogin: "Ваш пароль",
  showPassword: "Показать пароль",
  hidePassword: "Скрыть пароль",
  passwordMinHint: "Минимум 8 символов.",
  creatingAccount: "Создаём аккаунт…",
  signingIn: "Выполняем вход…",
  haveAccount: "Уже есть аккаунт?",
  newToTeka: "Впервые в TEKA NEXUS?",
  createAccountLink: "Создать аккаунт",
  google: {
    setupWhy: "Почему он пока не активен?",
    setupTitle: "Вход через Google — инструкция по включению",
    setupBody: "Всё уже готово на стороне сервера. Вход через Google заработает, как только две переменные окружения OAuth будут добавлены в деплой — код не нужен.",
    setupStep1: "Откройте console.cloud.google.com → создайте проект (бесплатно).",
    setupStep2: "APIs & Services → OAuth consent screen → External → укажите название приложения и сохраните.",
    setupStep3: "Credentials → Create credentials → OAuth client ID → Web application.",
    setupStep4: "Добавьте redirect URI ниже, затем задайте GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET в Vercel → Settings → Environment Variables и выполните повторный деплой.",
    setupRedirect: "Авторизованный redirect URI",
    button: "Войти через Google",
    divider: "или войти по email",
    redirecting: "Подключаемся к Google…",
  },
  portal: {
    welcome: "С возвращением,",
    entering: "Входим в Nexus…",
    secured: "Сессия защищена",
  },
  err: {
    username: "Имя пользователя должно быть длиной 3–24 символа: строчные буквы, цифры и подчёркивания.",
    passwordShort: "Пароль должен содержать минимум 8 символов.",
    emailInvalid: "Введите корректный email.",
    passwordRequired: "Введите пароль.",
    emailTaken: "Этот email уже зарегистрирован. Попробуйте войти.",
    usernameTaken: "Это имя пользователя уже занято. Выберите другое.",
    invalidCredentials: "Неверный email или пароль.",
    googleFailed: "Не удалось войти через Google. Попробуйте ещё раз.",
    googleCancelled: "Вход через Google отменён.",
    googleNotConfigured: "Вход через Google пока не включён — требуются GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET (см. docs/GOOGLE_OAUTH.md).",
    googleState: "Срок действия этой попытки входа через Google истёк. Попробуйте ещё раз.",
  },
};
