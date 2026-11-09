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
  },
};
