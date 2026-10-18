// TEKA NEXUS — Simplified Chinese dictionary: "projectNew" namespace.
// Owned by translation agent (Task 2-c).

import type { ProjectNewDict } from "../en/projectNew";

export const projectNew: ProjectNewDict = {
  auth: {
    title: "需要登录",
    description: "你需要 TEKA NEXUS 账号才能发布项目。",
    goLogin: "前往登录",
  },
  title: "发布一个项目",
  subtitle: "向世界展示你正在构建的东西。",
  form: {
    name: "项目名称",
    namePlaceholder: "例如：Nexus CLI",
    slugHint: "输入名称时，URL 标识会显示在这里。",
    tagline: "一句话简介",
    taglinePlaceholder: "一句话讲清这个创意的卖点",
    category: "分类",
    status: "状态",
    statusPlaceholder: "选择一个状态",
    visibility: "可见性",
    tags: "标签",
    maxTagsReached: "已达 8 个标签上限",
    tagPlaceholder: "输入标签并按回车",
    optional: "（可选）",
    links: "链接",
    description: "项目描述",
    descriptionPlaceholder: "你在构建什么？为谁而做？它有何不同？",
    descriptionHint: "支持纯文本或 Markdown。",
    requiredSkills: "所需技能",
    repoUrl: "仓库 URL",
    demoUrl: "演示 URL",
    websiteUrl: "网站 URL",
  },
  a11y: {
    categoryGroup: "项目分类",
    visibilityGroup: "项目可见性",
    removeTag: "移除标签 {tag}",
  },
  visibilityDesc: {
    PUBLIC: "出现在探索页和实时动态中，任何人都可以查看。",
    UNLISTED: "仅可通过链接直接访问，不出现在探索页和动态中。",
    PRIVATE: "只有你和你的团队成员可以查看此项目。",
  },
  visibilityName: {
    PUBLIC: "公开",
    UNLISTED: "不列出",
    PRIVATE: "私有",
  },
  errors: {
    name: "名称长度需在 3-80 个字符之间。",
    taglineRequired: "请填写一句话简介。",
    taglineMax: "最多 {n} 个字符。",
    category: "请为你的项目选择一个分类。",
    url: "必须以 http:// 或 https:// 开头",
  },
  toasts: {
    maxTags: "最多 {n} 个标签",
    fixFields: "请先修正标红的字段再发布。",
    launched: "项目已发布",
    createFailed: "创建项目失败",
  },
  submitting: "发布中…",
  submit: "发布项目",
};
