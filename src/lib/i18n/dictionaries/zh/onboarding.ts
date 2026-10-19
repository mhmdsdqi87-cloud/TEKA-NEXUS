// TEKA NEXUS — Simplified Chinese dictionary: "onboarding" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { OnboardingDict } from "../en/onboarding";

export const onboarding: OnboardingDict = {
  topbar: "个人资料设置",
  guard: {
    title: "登录以设置你的个人主页",
    body: "引导设置是账户流程的一部分 —— 请先创建或登录你的账户。",
    cta: "前往登录",
  },
  stepsAria: "引导步骤",
  steps: {
    identity: {
      label: "身份",
      hint: "你在 TEKA NEXUS 是谁",
    },
    skills: {
      label: "技能",
      hint: "你能贡献什么",
    },
    interests: {
      label: "兴趣",
      hint: "你想做什么方向",
    },
    goals: {
      label: "目标",
      hint: "你来到这里想做什么",
    },
  },
  stepOf: "第 {n} 步，共 {total} 步",
  identity: {
    title: "设置你的身份",
    subtitle: "这是其他构建者在项目和团队中看到你的方式。",
    displayName: "显示名称 *",
    displayNamePlaceholder: "例如：Maya Chen",
    bio: "个人简介",
    bioPlaceholder: "你在构建什么？你在寻找什么？",
    website: "个人网站",
    websiteHint: "可选 —— 必须是完整的 http(s) 链接。",
    avatarGradient: "头像渐变色",
    avatarGradientAria: "头像渐变色：{name}",
  },
  skills: {
    title: "你能做什么？",
    subtitle: "选出你能带给团队的技能。",
  },
  interests: {
    title: "你想做什么方向？",
    subtitle: "我们会根据你的兴趣为你定制探索内容。",
  },
  goals: {
    title: "你为什么来这里？",
    subtitle: "你的目标会影响推荐内容，以及谁会主动联系你。",
  },
  nSelected: "已选 {n} 个。",
  selectAtLeastOne: "至少选择一个 —— 也可以先跳过。",
  pickAtLeastOne: "至少选一个 —— 也可以先跳过。",
  review: {
    title: "主页预览",
    skills: "技能",
    interests: "兴趣",
    goals: "目标",
    note: "跳过的部分会使用合理的默认值，你的主页依然可用。",
  },
  continue: "继续",
  skipForNow: "暂时跳过",
  skip: "跳过",
  finish: "完成",
  saving: "保存中…",
  err: {
    displayName: "显示名称为必填项（1–60 个字符）。",
    website: "网站必须是有效的 http(s) 链接，例如 https://your-site.dev",
    save: "无法保存你的主页。请重试。",
  },
  toastWelcome: "欢迎来到 TEKA NEXUS",
};
