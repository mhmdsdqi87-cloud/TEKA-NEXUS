// TEKA NEXUS — English (base) dictionary: "dm" namespace (Task dm-1).
// Direct messages: nav label, conversations list, chat window, toasts.

export const dm = {
  title: "Messages",
  unreadAria: "Messages, {count} unread",
  listAria: "Conversation list",
  chatAria: "Chat with {name}",

  signInTitle: "Sign in to see your messages",
  signInDesc: "Your private conversations will appear here.",

  emptyTitle: "No conversations yet",
  emptyDesc: "Start a private chat from a user's profile!",
  loadFailedTitle: "Couldn't load conversations",
  loadFailedDesc: "Check your connection and try again.",

  selectChatTitle: "Pick a conversation",
  selectChatDesc: "Your messages with other builders show up here.",
  backToList: "Back to conversations",

  emptyChatTitle: "No messages yet",
  emptyChatDesc: "Say hello 👋",

  placeholder: "Write a message…",
  send: "Send",
  sendAria: "Send message",
  you: "You",

  toasts: {
    sendFailed: "Couldn't send the message.",
    loadFailed: "Couldn't load messages.",
    conversationFailed: "Couldn't open the conversation.",
  },

  // Profile action button ("پیام خصوصی")
  profileCta: "Message",
};

export type DmDict = typeof dm;
