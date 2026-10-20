// TEKA NEXUS — zh dictionary: "dm" namespace (Task dm-1).

import type { DmDict } from "../en/dm";

export const dm: DmDict = {
  title: "私信",
  unreadAria: "私信，{count} 条未读",
  listAria: "会话列表",
  chatAria: "与 {name} 的聊天",

  signInTitle: "登录后查看你的私信",
  signInDesc: "你的私密会话将显示在这里。",

  emptyTitle: "还没有会话",
  emptyDesc: "去其他用户的资料页发起私信吧！",
  loadFailedTitle: "会话加载失败",
  loadFailedDesc: "请检查网络连接后重试。",

  selectChatTitle: "选择一个会话",
  selectChatDesc: "你与其他创作者的私信会显示在这里。",
  backToList: "返回会话列表",

  emptyChatTitle: "还没有消息",
  emptyChatDesc: "打个招呼吧 👋",

  placeholder: "输入消息…",
  send: "发送",
  sendAria: "发送消息",
  you: "你",

  toasts: {
    sendFailed: "消息发送失败。",
    loadFailed: "消息加载失败。",
    conversationFailed: "会话打开失败。",
  },

  profileCta: "私信",
};
