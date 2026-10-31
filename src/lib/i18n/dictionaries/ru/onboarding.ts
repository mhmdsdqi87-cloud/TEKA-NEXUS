// TEKA NEXUS — onboarding dictionary (ru).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "Настройка профиля",
  guard: {
    title: "Войдите, чтобы настроить профиль",
    body: "Онбординг — часть процесса работы с аккаунтом: сначала создайте аккаунт или войдите в него.",
    cta: "Перейти ко входу",
  },
  stepsAria: "Шаги настройки профиля",
  steps: {
    identity: {
      label: "Профиль",
      hint: "Кем вы будете на TEKA NEXUS",
    },
    skills: {
      label: "Навыки",
      hint: "Чем вы можете быть полезны",
    },
    interests: {
      label: "Интересы",
      hint: "Чем хотите заниматься",
    },
    goals: {
      label: "Цели",
      hint: "Зачем вы здесь",
    },
  },
  stepOf: "Шаг {n} из {total}",
  identity: {
    title: "Расскажите, кто вы",
    subtitle: "Так вас будут видеть другие разработчики во всех проектах и командах.",
    displayName: "Отображаемое имя *",
    displayNamePlaceholder: "например, Майя Чен",
    bio: "О себе",
    bioPlaceholder: "Что вы создаёте? Что вы ищете?",
    website: "Веб-сайт",
    websiteHint: "Необязательно — должен быть полный URL http(s).",
    avatarGradient: "Градиент аватара",
    avatarGradientAria: "Градиент аватара: {name}",
  },
  skills: {
    title: "Что вы умеете?",
    subtitle: "Выберите навыки, которые вы можете привнести в команду.",
  },
  interests: {
    title: "Чем хотите заниматься?",
    subtitle: "Мы подстроим рекомендации под ваши интересы.",
  },
  goals: {
    title: "Зачем вы здесь?",
    subtitle: "Ваши цели влияют на рекомендации и на то, кто вам напишет.",
  },
  nSelected: "Выбрано: {n}.",
  selectAtLeastOne: "Выберите хотя бы один — или пока пропустите.",
  pickAtLeastOne: "Отметьте хотя бы один — или пока пропустите.",
  review: {
    title: "Предпросмотр профиля",
    skills: "Навыки",
    interests: "Интересы",
    goals: "Цели",
    note: "Для всего, что вы пропустили, мы подставим разумные значения по умолчанию — профиль всё равно будет работать.",
  },
  continue: "Продолжить",
  skipForNow: "Пока пропустить",
  skip: "Пропустить",
  finish: "Завершить",
  saving: "Сохранение…",
  err: {
    displayName: "Укажите отображаемое имя (1–60 символов).",
    website: "Веб-сайт должен быть корректным URL http(s), например https://your-site.dev",
    save: "Не удалось сохранить профиль. Попробуйте ещё раз.",
  },
  toastWelcome: "Добро пожаловать в TEKA NEXUS",
};
