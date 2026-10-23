// TEKA NEXUS — Simplified Chinese dictionary: "auth" namespace.
// Owned by Task 2-a (i18n landing/auth/onboarding).

import type { AuthDict } from "../en/auth";

export const auth: AuthDict = {
  brand: {
    p1: "想象。",
    p2: "构建。",
    p3: "连接。",
  },
  brandLine: "开发者网络：处于任何阶段的项目 —— 想法、原型、发布 —— 都能遇到准备好动手构建的人。",
  bullets: {
    discovery: {
      title: "契合你技术栈的探索",
      body: "按分类、状态和所需技能筛选公开项目。",
    },
    teams: {
      title: "由真实申请组建的团队",
      body: "选择角色并附上介绍即可申请；所有者会审核每一份申请。",
    },
    reputation: {
      title: "值得信赖的声誉",
      body: "XP 和声誉由服务器为经验证的贡献自动授予。",
    },
  },
  backHome: "返回首页",
  signupTitle: "创建你的账户",
  loginTitle: "欢迎回来",
  signupSubtitle: "开始发布项目、寻找协作者。Beta 期间免费。",
  loginSubtitle: "登录，继续构建。",
  username: "用户名",
  usernameHint: "3–24 个字符：小写字母、数字、下划线",
  email: "邮箱",
  password: "密码",
  passwordPlaceholderSignup: "至少 8 个字符",
  passwordPlaceholderLogin: "你的密码",
  showPassword: "显示密码",
  hidePassword: "隐藏密码",
  passwordMinHint: "至少 8 个字符。",
  creatingAccount: "正在创建账户…",
  signingIn: "正在登录…",
  haveAccount: "已经有账户了？",
  newToTeka: "第一次使用 TEKA NEXUS？",
  createAccountLink: "创建账户",
  google: {
    setupWhy: "为什么还没有启用？",
    setupTitle: "Google 登录 — 启用指南",
    setupBody: "服务端已全部就绪。只要在部署面板添加两个 OAuth 环境变量，Google 登录立即生效——无需改动代码。",
    setupStep1: "打开 console.cloud.google.com 并创建项目（免费）。",
    setupStep2: "APIs & Services → OAuth consent screen → 选择 External 并填写应用名。",
    setupStep3: "Credentials → Create credentials → OAuth client ID → Web application。",
    setupStep4: "添加下方重定向 URI，然后在 Vercel 设置 GOOGLE_CLIENT_ID 与 GOOGLE_CLIENT_SECRET 并重新部署。",
    setupRedirect: "已授权的重定向 URI",
    button: '使用 Google 登录',
    divider: '或使用邮箱继续',
    redirecting: '正在连接 Google…',
  },
  portal: {
    welcome: '欢迎回来，',
    entering: '正在进入 NEXUS…',
    secured: '会话已加密',
  },
  err: {
    username: "用户名需为 3–24 个字符：小写字母、数字、下划线。",
    passwordShort: "密码至少需要 8 个字符。",
    emailInvalid: "请输入有效的邮箱地址。",
    passwordRequired: "请输入密码。",
    emailTaken: "该邮箱已注册。请直接登录。",
    usernameTaken: "该用户名已被占用。换一个吧。",
    invalidCredentials: "邮箱或密码错误。",
    googleFailed: 'Google 登录失败，请重试。',
    googleCancelled: '已取消 Google 登录。',
    googleNotConfigured: 'Google 登录尚未启用 —— 需要配置 GOOGLE_CLIENT_ID 和 GOOGLE_CLIENT_SECRET（见 docs/GOOGLE_OAUTH.md）。',
    googleState: '该次 Google 登录已过期，请重试。',
  },
};
