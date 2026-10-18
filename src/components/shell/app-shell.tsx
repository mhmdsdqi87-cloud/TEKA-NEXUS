"use client";

// TEKA NEXUS — App shell (Task 2-b).
// 3-region desktop layout (left nav / content / right rail) + mobile chrome
// (top bar actions + bottom nav), global search dialog, notification polling.

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  Bell,
  Bookmark,
  CircleUserRound,
  Compass,
  FileCode2,
  FolderGit2,
  Hash,
  House,
  Lightbulb,
  Loader2,
  LogOut,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApp, type View } from "@/lib/store";
import { get, post, qs } from "@/lib/api";
import {
  type CollabRequestDTO,
  type ProjectCard,
  type SearchResults,
} from "@/lib/dto";

import { Logo, LogoMark, Wordmark } from "@/components/brand/logo";
import { ReputationChip, UserAvatar } from "@/components/shared/atoms";
import { ProjectCardView } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Unread badge ────────────────────────────────────────────
function UnreadBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex min-w-[18px] h-[18px] px-1 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[10px] font-semibold leading-none",
        className
      )}
      aria-label={`${count} unread notifications`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ─── Desktop left nav item ───────────────────────────────────
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center gap-3 w-full rounded-lg px-3 py-2.5 min-h-[44px] text-sm font-medium transition-colors outline-none focus-glow",
        active
          ? "text-cyan-300 bg-white/5"
          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
      )}
    >
      {active && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-cyan-400"
        />
      )}
      <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-cyan-300" : "text-muted-foreground")} />
      <span className="truncate">{label}</span>
      {typeof badge === "number" && badge > 0 && <UnreadBadge count={badge} className="ml-auto" />}
    </button>
  );
}

function LeftNav() {
  const user = useApp((s) => s.user);
  const view = useApp((s) => s.view);
  const unreadCount = useApp((s) => s.unreadCount);
  const navigate = useApp((s) => s.navigate);

  const go = (v: View) => () => navigate(v);

  return (
    <aside
      className="hidden md:flex w-60 shrink-0 flex-col sticky top-0 h-screen glass z-30"
      aria-label="Primary navigation"
    >
      <div className="h-14 flex items-center px-4 shrink-0">
        <Logo onClick={() => navigate({ name: "landing" })} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1" aria-label="Main">
        <NavItem icon={House} label="Home" active={view.name === "home"} onClick={go({ name: "home" })} />
        <NavItem icon={Compass} label="Explore" active={view.name === "explore"} onClick={go({ name: "explore" })} />
        <NavItem
          icon={FolderGit2}
          label="Projects"
          active={view.name === "project"}
          onClick={go({ name: "explore" })}
        />

        <button
          onClick={go({ name: "projectNew" })}
          className="btn-hero inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 min-h-[44px] text-sm mt-3 mb-2 w-full focus-glow"
        >
          <Plus className="h-4 w-4" />
          New project
        </button>

        {user && (
          <>
            <NavItem icon={Users} label="Teams" active={view.name === "teams"} onClick={go({ name: "teams" })} />
            <NavItem
              icon={Bell}
              label="Notifications"
              active={view.name === "notifications"}
              onClick={go({ name: "notifications" })}
              badge={unreadCount}
            />
            <NavItem icon={Bookmark} label="Saved" active={view.name === "saved"} onClick={go({ name: "saved" })} />
          </>
        )}
      </nav>

      {user && (
        <div className="px-3 pb-4 flex flex-col gap-1 shrink-0">
          <NavItem
            icon={CircleUserRound}
            label="Profile"
            active={view.name === "profile" && view.username === user.username}
            onClick={go({ name: "profile", username: user.username })}
          />
          <NavItem icon={Settings} label="Settings" active={view.name === "settings"} onClick={go({ name: "settings" })} />
        </div>
      )}
    </aside>
  );
}

// ─── Top bar ─────────────────────────────────────────────────
function TopBar() {
  const user = useApp((s) => s.user);
  const unreadCount = useApp((s) => s.unreadCount);
  const navigate = useApp((s) => s.navigate);
  const setSearchOpen = useApp((s) => s.setSearchOpen);
  const setUser = useApp((s) => s.setUser);
  const setUnreadCount = useApp((s) => s.setUnreadCount);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await post("/api/auth/logout");
      setUnreadCount(0);
      setUser(null);
      navigate({ name: "landing" });
      toast.success("Logged out. See you soon.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="glass sticky top-0 z-40 h-14 flex items-center gap-2 md:gap-3 px-4 md:px-6">
      {/* Mobile logo (compact) */}
      <button
        onClick={() => navigate({ name: "landing" })}
        className="md:hidden flex items-center gap-2 outline-none focus-glow rounded-lg"
        aria-label="TEKA NEXUS home"
      >
        <LogoMark size={24} />
        <Wordmark className="text-base" compact />
      </button>

      {/* Desktop global search trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center gap-2.5 h-9 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-muted-foreground hover:bg-white/[0.06] hover:text-foreground transition-colors w-full max-w-md ml-1 outline-none focus-glow"
        aria-label="Search projects, people and tags"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="truncate">Search projects, people, tags…</span>
        <kbd className="ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.05]" aria-hidden="true">
          /
        </kbd>
      </button>

      <div className="flex-1" />

      {/* Mobile actions: search + bell */}
      <div className="flex md:hidden items-center gap-1">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors outline-none focus-glow"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={() => navigate({ name: "notifications" })}
          className="relative flex items-center justify-center h-11 w-11 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors outline-none focus-glow"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="h-5 w-5" />
          <UnreadBadge count={unreadCount} className="absolute top-1.5 right-1.5" />
        </button>
      </div>

      {/* Desktop right side: XP/REP + account */}
      {user ? (
        <div className="hidden md:flex items-center gap-4">
          <ReputationChip xp={user.xp} reputation={user.reputation} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2.5 rounded-lg pl-1.5 pr-2 py-1.5 min-h-[44px] hover:bg-white/[0.05] transition-colors outline-none focus-glow"
                aria-label="Account menu"
              >
                <UserAvatar user={user} size={30} />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-medium text-foreground">{user.displayName}</span>
                  <span className="text-[11px] text-muted-foreground">@{user.username}</span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ name: "profile", username: user.username })}>
                <CircleUserRound className="h-4 w-4" /> View profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ name: "saved" })}>
                <Bookmark className="h-4 w-4" /> Saved projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ name: "settings" })}>
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={loggingOut}
                onClick={handleLogout}
                className="text-rose-400 focus:text-rose-300"
              >
                {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />} Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="hidden md:inline-flex"
          onClick={() => navigate({ name: "login" })}
        >
          Sign in
        </Button>
      )}
    </header>
  );
}

// ─── Mobile bottom nav ───────────────────────────────────────
function MobileTab({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(
        "relative flex flex-col items-center justify-center gap-1 w-full min-h-[44px] text-[10px] font-medium transition-colors outline-none focus-glow",
        active ? "text-cyan-300" : "text-muted-foreground"
      )}
    >
      <span className="relative">
        <Icon className="h-5 w-5" />
        {typeof badge === "number" && badge > 0 && (
          <UnreadBadge count={badge} className="absolute -top-1.5 -right-2.5" />
        )}
      </span>
      {label}
    </button>
  );
}

function MobileNav() {
  const user = useApp((s) => s.user);
  const view = useApp((s) => s.view);
  const unreadCount = useApp((s) => s.unreadCount);
  const navigate = useApp((s) => s.navigate);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 glass pb-safe"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 items-stretch h-16">
        <MobileTab icon={House} label="Home" active={view.name === "home"} onClick={() => navigate({ name: "home" })} />
        <MobileTab icon={Compass} label="Explore" active={view.name === "explore"} onClick={() => navigate({ name: "explore" })} />
        <div className="flex items-start justify-center">
          <button
            onClick={() => navigate({ name: "projectNew" })}
            className="btn-hero h-14 w-14 rounded-full flex items-center justify-center -translate-y-3 outline-none focus-glow"
            aria-label="New project"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        <MobileTab
          icon={Bell}
          label="Alerts"
          active={view.name === "notifications"}
          onClick={() => navigate({ name: "notifications" })}
          badge={unreadCount}
        />
        <MobileTab
          icon={CircleUserRound}
          label={user ? "Profile" : "Sign in"}
          active={view.name === "profile" || view.name === "settings"}
          onClick={() => (user ? navigate({ name: "profile", username: user.username }) : navigate({ name: "login" }))}
        />
      </div>
    </nav>
  );
}

// ─── Global search dialog ────────────────────────────────────
export function SearchDialog() {
  const open = useApp((s) => s.searchOpen);
  const setSearchOpen = useApp((s) => s.setSearchOpen);
  const navigate = useApp((s) => s.navigate);

  const [query, setQuery] = useState("");
  const [data, setData] = useState<{ q: string; results: SearchResults } | null>(null);
  const reqId = useRef(0);

  // Debounced server search (250ms, min 2 chars).
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const id = ++reqId.current;
    const timer = setTimeout(async () => {
      try {
        const res = await get<SearchResults>(`/api/search${qs({ q })}`);
        if (reqId.current === id) setData({ q, results: res });
      } catch {
        if (reqId.current === id) setData({ q, results: { projects: [], users: [], tags: [] } });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Close + reset (event handler, not an effect).
  const handleOpenChange = (next: boolean) => {
    setSearchOpen(next);
    if (!next) {
      reqId.current++;
      setQuery("");
      setData(null);
    }
  };

  const q = query.trim();
  // Results are only shown when they belong to the current query;
  // a newer query with no response yet renders the "Searching…" state.
  const results = data && data.q === q ? data.results : null;
  const searching = q.length >= 2 && results === null;
  const hasResults =
    results && (results.projects.length > 0 || results.users.length > 0 || results.tags.length > 0);

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Search TEKA NEXUS"
      description="Search projects, people and tags"
      showCloseButton={false}
      className="max-w-xl top-[15%] translate-y-0"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search projects, people, tags…"
        aria-label="Search query"
      />
      <CommandList>
        {q.length < 2 ? (
          <div className="py-8 px-4 text-center text-sm text-muted-foreground">
            Type at least 2 characters to search.
          </div>
        ) : searching ? (
          <div className="py-8 px-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Searching…
          </div>
        ) : hasResults ? (
          <>
            {results!.projects.length > 0 && (
              <CommandGroup heading="Projects">
                {results!.projects.map((p) => (
                  <CommandItem
                    key={p.id}
                    value={`${q} ${p.name}`}
                    onSelect={() => {
                      setSearchOpen(false);
                      navigate({ name: "project", slug: p.slug });
                    }}
                  >
                    <FileCode2 className="text-cyan-300" />
                    <span className="truncate">{p.name}</span>
                    <span className="ml-auto truncate max-w-[45%] text-xs text-muted-foreground">{p.tagline}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results!.users.length > 0 && (
              <CommandGroup heading="Users">
                {results!.users.map((u) => (
                  <CommandItem
                    key={u.id}
                    value={`${q} ${u.displayName} ${u.username}`}
                    onSelect={() => {
                      setSearchOpen(false);
                      navigate({ name: "profile", username: u.username });
                    }}
                  >
                    <UserAvatar user={u} size={20} />
                    <span className="truncate">{u.displayName}</span>
                    <span className="ml-auto text-xs text-muted-foreground">@{u.username}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results!.tags.length > 0 && (
              <CommandGroup heading="Tags">
                {results!.tags.map((t) => (
                  <CommandItem
                    key={t.tag}
                    value={`${q} ${t.tag}`}
                    onSelect={() => {
                      setSearchOpen(false);
                      navigate({ name: "explore", query: t.tag });
                    }}
                  >
                    <Hash className="text-violet-300" />
                    <span className="font-mono">#{t.tag}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{t.count} project{t.count === 1 ? "" : "s"}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        ) : (
          <CommandEmpty>No results for &ldquo;{q}&rdquo;</CommandEmpty>
        )}
      </CommandList>
    </CommandDialog>
  );
}

// ─── Right rail ──────────────────────────────────────────────
function RailSectionSkeleton() {
  return (
    <div className="glass-card rounded-xl p-3 space-y-2">
      <Skeleton className="h-4 w-2/3 bg-white/[0.06]" />
      <Skeleton className="h-3 w-full bg-white/[0.04]" />
    </div>
  );
}

function RightRail() {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);

  const [trending, setTrending] = useState<ProjectCard[] | null>(null);
  const [requests, setRequests] = useState<{ ownerId: string; received: number; sent: number } | null>(
    null
  );

  const userId = user?.id ?? null;

  // Trending projects (public, popular first, top 3).
  useEffect(() => {
    let cancelled = false;
    get<{ projects: ProjectCard[]; page: number; pages: number; total: number }>(
      `/api/projects${qs({ sort: "popular", page: 1 })}`
    )
      .then((res) => {
        if (!cancelled) setTrending(res.projects.slice(0, 3));
      })
      .catch((e) => {
        if (!cancelled) toast.error(e instanceof Error ? e.message : "Failed to load trending projects");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Pending team invitations & requests (authed only).
  // State is tagged with the owner id so a stale result never leaks to another user.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    get<{ sent: CollabRequestDTO[]; received: CollabRequestDTO[] }>("/api/me/requests")
      .then((res) => {
        if (!cancelled) {
          setRequests({
            ownerId: userId,
            received: res.received.filter((r) => r.status === "PENDING").length,
            sent: res.sent.filter((r) => r.status === "PENDING").length,
          });
        }
      })
      .catch((e) => {
        if (!cancelled) toast.error(e instanceof Error ? e.message : "Failed to load team requests");
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const requestData = requests && user && requests.ownerId === user.id ? requests : null;

  return (
    <aside
      className="hidden xl:block w-72 shrink-0 sticky top-0 h-screen glass z-30"
      aria-label="Sidebar highlights"
    >
      <div className="h-full overflow-y-auto px-4 py-6 flex flex-col gap-6">
        {/* Trending projects */}
        <section aria-label="Trending projects">
          <h2 className="font-display text-sm font-semibold flex items-center gap-2 px-1 mb-3">
            <TrendingUp className="h-4 w-4 text-cyan-300" /> Trending projects
          </h2>
          {trending === null ? (
            <div className="flex flex-col gap-3">
              <RailSectionSkeleton />
              <RailSectionSkeleton />
              <RailSectionSkeleton />
            </div>
          ) : trending.length === 0 ? (
            <p className="text-sm text-muted-foreground px-1">No projects yet — be the first to launch one.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {trending.map((p) => (
                <ProjectCardView key={p.id} project={p} compact />
              ))}
            </div>
          )}
        </section>

        {/* Team invitations & requests */}
        {user && (
          <section aria-label="Team invitations and requests">
            <h2 className="font-display text-sm font-semibold flex items-center gap-2 px-1 mb-3">
              <Users className="h-4 w-4 text-violet-300" /> Team invitations &amp; requests
            </h2>
            <button
              onClick={() => navigate({ name: "teams" })}
              className="glass-card rounded-xl p-4 w-full text-left outline-none focus-glow cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-violet-500/15 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-violet-300" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {requestData === null
                      ? "Loading requests…"
                      : requestData.received === 0
                        ? "No pending requests"
                        : `${requestData.received} pending request${requestData.received === 1 ? "" : "s"}`}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {requestData === null
                      ? "Review in Teams"
                      : `${requestData.sent} sent by you · Review in Teams`}
                  </p>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* Preview tip */}
        <section aria-label="Tip">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-cyan-300" /> Preview tip
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Press{" "}
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.05] text-foreground">
                /
              </kbd>{" "}
              to search anywhere.
            </p>
          </div>
        </section>
      </div>
    </aside>
  );
}

// ─── Shell ───────────────────────────────────────────────────
export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useApp((s) => s.user);
  const setUnreadCount = useApp((s) => s.setUnreadCount);
  const setSearchOpen = useApp((s) => s.setSearchOpen);
  const userId = user?.id ?? null;

  // Poll unread notification count every 45s while signed in.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    const poll = async () => {
      try {
        const res = await get<{ notifications: unknown[]; unread: number }>("/api/notifications");
        if (!cancelled) setUnreadCount(res.unread);
      } catch {
        /* silent — background badge poll */
      }
    };
    poll();
    const timer = setInterval(poll, 45_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [userId, setUnreadCount]);

  // "/" opens global search (ignored while typing in form fields).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;
      e.preventDefault();
      setSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex">
        <LeftNav />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 pb-24 md:pb-10" id="main-content">
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </div>
          </main>
          <footer className="py-4 text-center text-xs text-muted-foreground/70 select-none" aria-label="Footer">
            TEKA NEXUS — demo preview
          </footer>
        </div>

        <RightRail />
        <MobileNav />
        <SearchDialog />
      </div>
    </MotionConfig>
  );
}
