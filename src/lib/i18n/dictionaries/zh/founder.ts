export const founder = {
  title: "创始人控制台",
  subtitle: "实时掌握 TEKA NEXUS 的每一位成员。",
  badge: "创始人",
  directoryTitle: "已注册成员",
  searchPlaceholder: "按名字、@用户名或邮箱搜索…",
  pendingOnboarding: "未完成设置",
  empty: "没有符合搜索条件的成员。",
  loadFailed: "成员列表加载失败。请重试。",
  stats: {
    users: "成员总数",
    onboarded: "已完成设置",
    totalXp: "社区总 XP",
    totalRep: "社区总 REP",
    projects: "项目数",
    sessions: "活跃会话",
  },
  supabase: {
      "title": "Supabase 云",
      "subtitle": "与你自己的 Supabase 项目实时连接",
      "connected": "已连接",
      "offline": "无法连接",
      "checking": "检查中…",
      "auth": "认证服务",
      "mirrored": "已同步账户",
      "storage": "头像存储",
      "storageReady": "teka-avatars 存储桶已启用",
      "dbSync": "完整数据库同步",
      "dbSyncWaiting": "等待数据库密码",
      "dbSyncActive": "已激活",
      "version": "版本"
  },
};

export type FounderDict = typeof founder;
