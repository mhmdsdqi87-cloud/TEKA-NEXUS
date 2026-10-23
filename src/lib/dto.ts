// TEKA NEXUS — shared DTOs returned by the API (client-safe).

export type UserCard = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl?: string | null;
  bio?: string;
  reputation?: number;
  xp?: number;
};

export type ProjectCard = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  visibility: string;
  coverImage: string;
  tags: string[];
  requiredSkills: string[];
  owner: UserCard;
  likeCount: number;
  memberCount: number;
  taskOpenCount?: number;
  taskDoneCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectDetail = ProjectCard & {
  description: string;
  repositoryUrl: string;
  demoUrl: string;
  websiteUrl: string;
  bgImage: string;
};

export type ProjectMemberDTO = {
  id: string;
  role: string;
  joinedAt: string;
  user: UserCard;
};

export type TaskDTO = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  position: number;
  dueAt: string | null;
  completedAt: string | null;
  createdAt: string;
  assignee: UserCard | null;
  creator: UserCard;
  commentCount?: number;
};

export type CommentDTO = {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  author: UserCard;
  replies?: CommentDTO[];
};

export type ProjectUpdateDTO = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: UserCard;
};

export type MilestoneDTO = {
  id: string;
  title: string;
  description: string;
  dueAt: string | null;
  completedAt: string | null;
  createdAt: string;
  creator: UserCard;
};

export type CollabRequestDTO = {
  id: string;
  status: string;
  requestedRole: string;
  introduction: string;
  portfolioUrl: string;
  createdAt: string;
  reviewedAt: string | null;
  applicant: UserCard;
  project?: Pick<ProjectCard, "id" | "slug" | "name" | "tagline" | "coverImage" | "status" | "category">;
};

export type FeedEvent = {
  id: string;
  eventType: string;
  createdAt: string;
  metadata: Record<string, unknown>;
  actor: UserCard | null;
  project: {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    category: string;
    status: string;
    coverImage: string;
  };
};

export type NotificationDTO = {
  id: string;
  type: string;
  entityType: string | null;
  entityId: string | null;
  payload: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
  actor: UserCard | null;
};

export type ProfileDetail = UserCard & {
  websiteUrl: string;
  role: string;
  goals: string[];
  interests: string[];
  skills: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  projectCount: number;
  isFollowing: boolean;
  isSelf: boolean;
};

export type ContributionDTO = {
  id: string;
  eventType: string;
  sourceType: string;
  xp: number;
  reputation: number;
  createdAt: string;
  project?: { slug: string; name: string } | null;
};

export type SearchResults = {
  projects: ProjectCard[];
  users: UserCard[];
  tags: { tag: string; count: number }[];
};

// ─── Direct messages (Task dm-1) ─────────────────────────────

export type DmPartner = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
};

export type DmMessageDTO = {
  id: string;
  senderId: string;
  body: string;
  readAt: string | null;
  createdAt: string;
};

export type DmConversationDTO = {
  id: string;
  other: DmPartner;
  lastMessage: { body: string; senderId: string; createdAt: string } | null;
  unreadCount: number;
  lastMessageAt: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pages: number;
  total: number;
};

export type ProjectDetailResponse = {
  project: ProjectDetail;
  myRole: "OWNER" | "ADMIN" | "CONTRIBUTOR" | "VIEWER" | null;
  liked: boolean;
  saved: boolean;
  likeCount: number;
  saveCount?: number;
  myRequest: CollabRequestDTO | null;
};

export type MembersResponse = {
  members: ProjectMemberDTO[];
  canManage: boolean;
};

// ─── Workspace (Task ws-1) ───────────────────────────────────

export type WsActor = {
  id: string;
  username: string;
  displayName: string;
  avatarColor: string;
  avatarUrl: string | null;
} | null;

export type WsFileMeta = {
  id: string;
  name: string;
  folder: string;
  isFolder: boolean;
  language: string;
  size: number;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: WsActor;
  updatedBy: WsActor;
};

export type WsFileFull = WsFileMeta & {
  content: string;
};

export type WsRevisionMeta = {
  id: string;
  size: number;
  editorName: string | null;
  createdAt: string;
};

export type WsDebugLog = {
  id: string;
  level: string;
  source: string;
  message: string;
  user: WsActor;
  createdAt: string;
};

export type WsStats = {
  files: number;
  folders: number;
  totalSize: number;
  starred: number;
  languages: { id: string; count: number }[];
};

export type WorkspaceResponse = {
  files: WsFileMeta[];
  logs: WsDebugLog[];
  stats: WsStats;
};

export type WorkspaceFileResponse = {
  file: WsFileFull;
  revisions: WsRevisionMeta[];
};
