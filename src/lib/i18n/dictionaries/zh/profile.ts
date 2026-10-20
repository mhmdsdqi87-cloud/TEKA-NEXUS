// TEKA NEXUS — Simplified Chinese dictionary: "profile" namespace (owned by translation agent 2-d).

import type { ProfileDict } from "../en/profile";

export const profile: ProfileDict = {
  actions: {
    follow: "关注",
    following: "已关注",
    blocked: "已屏蔽",
    editProfile: "编辑资料",
    moreActions: "更多操作",
    blockUser: "屏蔽用户",
    unblockUser: "取消屏蔽",
    reportUser: "举报用户",
  },
  stats: {
    followers: "粉丝",
    following: "关注中",
    reputation: "声望",
  },
  tabs: {
    contributions: "贡献",
    about: "关于",
  },
  header: {
    memberSince: "加入于 {date}",
  },
  founder: {
    badge: "创始人",
    verified: "官方认证账号",
  },
  sections: {
    goals: "目标",
    interests: "兴趣",
    skills: "技能",
  },
  contributionTypes: {
    task: "完成了任务",
    release: "发布了版本",
    milestone: "完成了里程碑",
    update: "发布了动态",
    collab: "加入了团队",
    created: "创建了项目",
    other: "做出了贡献",
  },
  contributions: {
    notice: "声望只能通过经过验证的贡献获得——无法购买。",
  },
  empty: {
    projects: {
      title: "还没有公开项目",
      description: "当 {name} 发布项目后，会显示在这里。",
    },
    contributions: {
      title: "暂无贡献记录",
      description: "经过验证的任务、里程碑、版本发布和协作会实时显示在这里。",
    },
    about: {
      title: "这位创作者还没有填写详细资料",
      description: "完成个人资料后，其简介、技能和兴趣会显示在这里。",
    },
  },
  about: {
    bio: "简介",
    noBio: "暂无简介。",
    noneListed: "暂未填写。",
    details: "创作者资料",
    joined: "加入于 {date}",
  },
  notFound: {
    title: "找不到该创作者",
    description: "该个人主页不存在或可能已被删除。",
    action: "探索项目",
  },
  loadFailed: {
    title: "无法加载此个人主页",
    description: "请检查网络连接后重试。",
  },
  report: {
    title: "举报 {name}",
    description: "举报会进入审核队列，由 TEKA 团队进行处理。",
    reason: "原因",
    pickReason: "请选择原因",
    detailsLabel: "详细说明（可选）",
    detailsPlaceholder: "补充任何有助于审核人员了解情况的背景信息。",
    submit: "提交举报",
  },
  reportReasons: {
    spam: "垃圾信息",
    harassment: "骚扰",
    inappropriate: "不当内容",
    copyright: "侵犯版权",
    other: "其他",
  },
  toasts: {
    followed: "已关注 {name}",
    unfollowed: "已取消关注 {name}",
    blocked: "已屏蔽 @{name}",
    unblocked: "已取消屏蔽 @{name}",
    reportSubmitted: "举报已提交——我们的团队会进行审核。",
  },
  errors: {
    loadFailed: "无法加载此个人主页。",
    signInToFollow: "登录后才能关注创作者。",
    followFailed: "关注状态更新失败。",
    signInToBlock: "登录后才能管理屏蔽。",
    blockFailed: "屏蔽状态更新失败。",
    reportFailed: "举报提交失败。",
  },
  shared: {
    openProjectAria: "打开项目 {name}",
    likes: "点赞",
    teamSize: "团队规模",
    updated: "更新于 {time}",
    coverAlt: "{name} 封面",
  },
};
