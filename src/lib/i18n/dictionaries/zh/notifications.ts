// TEKA NEXUS — Simplified Chinese dictionary: "notifications" namespace.
// Owned by translation agent (Task 2-c).

import type { NotificationsDict } from "../en/notifications";

export const notifications: NotificationsDict = {
  someone: "有人",
  system: "系统通知",
  fallback: "你有一条新通知",
  types: {
    newFollower: "{name} 关注了你",
    commentOn: "{name} 评论了 {project}",
    commentOnYours: "{name} 评论了你的项目",
    joinRequest: "{name} 申请加入 {project}",
    joinRequestPlain: "{name} 发送了协作申请",
    requestAccepted: "你加入 {project} 的申请已被接受",
    requestAcceptedPlain: "你的协作申请已被接受",
    requestRejected: "你加入 {project} 的申请已被拒绝",
    requestRejectedPlain: "你的协作申请已被拒绝",
    taskAssigned: "{name} 给你分配了任务：{task}",
    taskAssignedPlain: "{name} 给你分配了新任务",
    memberJoined: "{name} 加入了 {project}",
    memberJoinedTeam: "{name} 加入了你的团队",
  },
  toasts: {
    loadFailed: "通知加载失败。",
    allRead: "所有通知已标记为已读",
    markFailed: "无法将通知标记为已读。",
    markOneFailed: "无法将此通知标记为已读。",
  },
  auth: {
    title: "登录后查看你的通知",
    description: "你的项目、团队和关注者的动态都会显示在这里。",
  },
  unreadOne: "{n} 条未读通知",
  unreadMany: "{n} 条未读通知",
  allCaughtUp: "全部处理完毕",
  markAll: "全部标为已读",
  a11y: {
    filter: "筛选通知",
    unreadSuffix: "（未读）",
  },
  filterAll: "全部",
  filterUnread: "未读",
  filterUnreadCount: "未读 · {n}",
  loadFailed: {
    title: "通知加载失败",
    description: "请检查网络连接后重试。",
  },
  noUnreadDesc: "当前没有未读通知。",
  emptyDesc: "你的项目、团队和关注者的动态将会显示在这里。",
};
