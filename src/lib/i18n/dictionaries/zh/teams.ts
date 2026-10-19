// TEKA NEXUS — Simplified Chinese dictionary: "teams" namespace.
// Owned by translation agent (Task 2-c).

import type { TeamsDict } from "../en/teams";

export const teams: TeamsDict = {
  tabs: {
    crews: "我的团队",
    requests: "申请",
    discover: "发现",
  },
  auth: {
    title: "登录后管理你的团队",
    description: "跟踪你的团队、处理协作申请，并发掘需要你技能的项目。",
  },
  titlePrefix: "你的",
  titleCrews: "团队",
  subtitle: "管理你们共同打造的项目，处理申请，寻找新的协作者。",
  a11y: {
    yourRole: "你的角色：{role}",
    sentAria: "已发送的申请",
    receivedAria: "收到的申请",
    viewProfileAria: "查看 {name} 的主页",
  },
  crews: {
    emptyTitle: "你还没有加入任何团队",
    emptyDesc: "加入一个项目或创建自己的项目——协作才能成就最好的作品。",
    explore: "探索项目",
    start: "创建项目",
    joined: "加入于 {date}",
    open: "打开工作区",
    member: "{n} 名成员",
    members: "{n} 名成员",
  },
  requests: {
    sent: "已发送",
    received: "已收到",
    pendingCount: "（{n} 条待处理）",
    sentEmpty: "还没有发送过申请——找一个项目申请加入吧。",
    receivedEmpty: "还没有收到申请。持续输出，开发者们会找上门的。",
    unknownProject: "未知项目",
    appliedAs: "申请角色：{role} · {ago}",
    withdraw: "撤回",
    wantsToJoin: "希望以{role}身份加入 {project}",
    wantsToJoinPrefix: "希望加入 ",
    wantsToJoinMiddle: "，担任 ",
    wantsToJoinSuffix: "",
    aProject: "一个项目",
    viewProject: "查看项目",
  },
  status: {
    PENDING: "待处理",
    ACCEPTED: "已接受",
    REJECTED: "已拒绝",
    WITHDRAWN: "已撤回",
  },
  accept: "接受",
  reject: "拒绝",
  toasts: {
    withdrawn: "申请已撤回",
    accepted: "欢迎加入——申请已接受",
    rejected: "申请已拒绝",
  },
  errors: {
    generic: "出了点问题",
  },
  discover: {
    title: "正在招募成员的团队",
    subtitle: "列出了所需技能的项目——找到需要你所长的团队。",
    emptyTitle: "暂时没有列出所需技能的项目",
    emptyDesc: "先展示最新项目——等新的团队发布需求后再回来看看。",
  },
};
