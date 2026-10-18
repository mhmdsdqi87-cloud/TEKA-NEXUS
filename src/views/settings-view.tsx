"use client";

// TEKA NEXUS — SettingsView (Task 2-d): settings hub (spec §25).
// Runs inside AppShell — no nav of its own.

import { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { toast } from "sonner";
import {
  Ban,
  Bell,
  Flag,
  KeyRound,
  Loader2,
  Lock,
  Scale,
  Shield,
  ShieldCheck,
  Trash2,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { del, get, patch, post } from "@/lib/api";
import { useApp, SessionUser } from "@/lib/store";
import { ProfileDetail } from "@/lib/dto";
import { AVATAR_GRADIENTS, AVATAR_GRADIENT_KEYS, LIMITS, SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type SettingsTab = "profile" | "account" | "notifications" | "privacy";

type Prefs = {
  projectActivity: boolean;
  collaborationRequests: boolean;
  socialActivity: boolean;
};

const NAV_TABS: { value: SettingsTab; label: string; icon: LucideIcon }[] = [
  { value: "profile", label: "Profile", icon: UserRound },
  { value: "account", label: "Account", icon: KeyRound },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "privacy", label: "Privacy", icon: Shield },
];

export function SettingsView({ tab }: { tab?: SettingsTab }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:py-8">
        <EmptyState
          icon={Lock}
          title="Sign in to manage your settings"
          description="Your profile, account, notification, and privacy controls live here."
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              Sign in
            </Button>
          }
        />
      </div>
    );
  }

  // Key by tab so an external navigation to a specific tab remounts the content
  // with the right tab active (no setState-in-effect needed).
  return <SettingsContent key={tab ?? "profile"} user={user} initialTab={tab} />;
}

function SettingsContent({ user, initialTab }: { user: SessionUser; initialTab?: SettingsTab }) {
  const [active, setActive] = useState<SettingsTab>(initialTab ?? "profile");

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 md:py-8">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="font-display text-2xl font-bold md:text-3xl">Settings</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Manage your profile, account security, and community preferences.
          </p>
        </motion.header>

        <Tabs value={active} onValueChange={(v) => setActive(v as SettingsTab)}>
          <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
            {/* Mini-nav: horizontal scroll chips on mobile, vertical radio list on desktop */}
            <TabsList className="h-auto w-full flex-row items-center gap-1 overflow-x-auto rounded-xl bg-transparent p-1 md:flex-col md:items-stretch md:justify-start">
              {NAV_TABS.map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="h-auto w-auto shrink-0 justify-start gap-2 rounded-lg border border-transparent px-3.5 py-2.5 text-sm text-muted-foreground data-[state=active]:border-white/10 data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground data-[state=active]:shadow-none md:w-full"
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-w-0">
              <TabsContent value="profile" className="mt-0">
                <ProfileTab user={user} />
              </TabsContent>
              <TabsContent value="account" className="mt-0">
                <AccountTab user={user} />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <NotificationsTab />
              </TabsContent>
              <TabsContent value="privacy" className="mt-0">
                <PrivacyTab />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MotionConfig>
  );
}

// ─── PROFILE ────────────────────────────────────────────────────

function ProfileTab({ user }: { user: SessionUser }) {
  const setUser = useApp((s) => s.setUser);

  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(user.websiteUrl ?? "");
  const [avatarColor, setAvatarColor] = useState(user.avatarColor);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState<string | null>(null);

  // SessionUser doesn't carry skills — load them from the public profile.
  useEffect(() => {
    let alive = true;
    get<{ user: ProfileDetail }>(`/api/users/${encodeURIComponent(user.username)}`)
      .then((res) => {
        if (!alive) return;
        setSkills(res.user.skills);
        setSkillsLoaded(true);
      })
      .catch(() => {
        if (alive) setSkillsLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, [user.username]);

  async function saveProfile() {
    const name = displayName.trim();
    if (!name) {
      toast.error("Display name can't be empty.");
      return;
    }
    const site = websiteUrl.trim();
    if (site && !/^https?:\/\/\S+$/i.test(site)) {
      setWebsiteError("Enter a full URL starting with http:// or https://");
      return;
    }
    setWebsiteError(null);
    setSaving(true);
    try {
      const res = await patch<{ user: SessionUser }>("/api/me/profile", {
        displayName: name,
        bio,
        websiteUrl: site,
        avatarColor,
        // Only replace skills once the current set has loaded, so we never wipe them.
        ...(skillsLoaded ? { skills } : {}),
      });
      setUser(res.user);
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't save your profile.");
    } finally {
      setSaving(false);
    }
  }

  function toggleSkill(slug: string) {
    setSkills((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  return (
    <div className="space-y-5">
      <section className="glass-card space-y-5 rounded-xl p-5">
        <div className="space-y-2">
          <Label htmlFor="display-name">Display name</Label>
          <Input
            id="display-name"
            value={displayName}
            maxLength={60}
            onChange={(e) => setDisplayName(e.target.value)}
            className="focus-glow"
            placeholder="How should the community call you?"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio">Bio</Label>
            <span
              className={cn(
                "font-mono text-[10px]",
                bio.length > LIMITS.bio ? "text-rose-300" : "text-muted-foreground"
              )}
            >
              {bio.length} / {LIMITS.bio}
            </span>
          </div>
          <Textarea
            id="bio"
            rows={4}
            maxLength={LIMITS.bio}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="What are you building? What do you care about?"
            className="focus-glow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={websiteUrl}
            onChange={(e) => {
              setWebsiteUrl(e.target.value);
              setWebsiteError(null);
            }}
            placeholder="https://your-site.dev"
            className={cn("font-mono text-sm focus-glow", websiteError && "border-rose-500/50")}
          />
          {websiteError ? (
            <p className="text-xs text-rose-300">{websiteError}</p>
          ) : (
            <p className="text-xs text-muted-foreground">Shown as a link on your public profile.</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Avatar gradient</Label>
          <div className="flex flex-wrap items-center gap-4">
            <UserAvatar user={{ ...user, avatarColor }} size={56} />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose avatar gradient">
              {AVATAR_GRADIENT_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAvatarColor(key)}
                  aria-label={`Gradient ${key}`}
                  aria-pressed={avatarColor === key}
                  className={cn(
                    "h-9 w-9 rounded-full bg-gradient-to-br transition-all focus-glow",
                    AVATAR_GRADIENTS[key],
                    avatarColor === key
                      ? "scale-110 ring-2 ring-cyan-300 ring-offset-2 ring-offset-[#0b0b12]"
                      : "opacity-70 hover:scale-105 hover:opacity-100"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-card space-y-3 rounded-xl p-5">
        <div>
          <Label>Skills</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Pick everything you can contribute with — teams use these to find you.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const selected = skills.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggleSkill(s.slug)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors focus-glow",
                  selected
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={saveProfile} disabled={saving} className="btn-hero min-w-32">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </div>
    </div>
  );
}

// ─── ACCOUNT ────────────────────────────────────────────────────

function AccountTab({ user }: { user: SessionUser }) {
  const setUser = useApp((s) => s.setUser);
  const navigate = useApp((s) => s.navigate);

  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwPending, setPwPending] = useState(false);

  const [delOpen, setDelOpen] = useState(false);
  const [delStage, setDelStage] = useState<"username" | "password">("username");
  const [delConfirm, setDelConfirm] = useState("");
  const [delPassword, setDelPassword] = useState("");
  const [delPending, setDelPending] = useState(false);
  const [delError, setDelError] = useState<string | null>(null);

  const pwTooShort = pwNew.length > 0 && pwNew.length < 8;
  const pwMismatch = pwConfirm.length > 0 && pwNew !== pwConfirm;

  async function changePassword() {
    if (!pwCurrent) {
      toast.error("Enter your current password.");
      return;
    }
    if (pwNew.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (pwNew !== pwConfirm) {
      toast.error("New passwords don't match.");
      return;
    }
    setPwPending(true);
    try {
      await patch("/api/me/password", { currentPassword: pwCurrent, newPassword: pwNew });
      toast.success("Password changed — other devices signed out");
      setPwCurrent("");
      setPwNew("");
      setPwConfirm("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't change your password.");
    } finally {
      setPwPending(false);
    }
  }

  async function deleteAccount() {
    setDelPending(true);
    setDelError(null);
    try {
      await del("/api/me/account", { password: delPassword });
      setDelOpen(false);
      setUser(null);
      toast.success("Your account has been deleted.");
      navigate({ name: "landing" });
    } catch (e) {
      setDelError(e instanceof Error ? e.message : "Couldn't delete your account.");
    } finally {
      setDelPending(false);
    }
  }

  function closeDeleteDialog(open: boolean) {
    setDelOpen(open);
    if (!open) {
      setDelStage("username");
      setDelConfirm("");
      setDelPassword("");
      setDelError(null);
    }
  }

  return (
    <div className="space-y-5">
      <section className="glass-card space-y-5 rounded-xl p-5">
        <div className="space-y-2">
          <Label htmlFor="account-email">Email</Label>
          <Input
            id="account-email"
            value={user.email}
            readOnly
            className="cursor-default font-mono text-sm focus-glow"
            aria-describedby="account-email-hint"
          />
          <p id="account-email-hint" className="text-xs text-muted-foreground">
            Your sign-in email — read-only during the beta.
          </p>
        </div>
      </section>

      <section className="glass-card space-y-4 rounded-xl p-5">
        <div>
          <h3 className="font-display font-semibold">Change password</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Changing your password signs out every other device.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="pw-current">Current password</Label>
            <Input
              id="pw-current"
              type="password"
              autoComplete="current-password"
              value={pwCurrent}
              onChange={(e) => setPwCurrent(e.target.value)}
              className="focus-glow"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw-new">New password</Label>
            <Input
              id="pw-new"
              type="password"
              autoComplete="new-password"
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className={cn("focus-glow", pwTooShort && "border-rose-500/50")}
            />
            {pwTooShort && <p className="text-xs text-rose-300">At least 8 characters.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw-confirm">Confirm new password</Label>
            <Input
              id="pw-confirm"
              type="password"
              autoComplete="new-password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              className={cn("focus-glow", pwMismatch && "border-rose-500/50")}
            />
            {pwMismatch && <p className="text-xs text-rose-300">Passwords don&apos;t match.</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={changePassword}
            disabled={pwPending || !pwCurrent || !pwNew || !pwConfirm}
            className="min-w-36"
          >
            {pwPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Update password
          </Button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border border-rose-500/25 bg-rose-500/[0.04] p-5">
        <h3 className="font-display font-semibold text-rose-200">Danger zone</h3>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          Deleting your account permanently removes your profile and every project you own, along
          with their tasks, updates, and milestones. This can&apos;t be undone.
        </p>
        <AlertDialog open={delOpen} onOpenChange={closeDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4">
              <Trash2 className="h-4 w-4" />
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            {delStage === "username" ? (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">Delete your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This permanently removes your profile and all projects you own. Type your
                    username{" "}
                    <span className="font-mono text-foreground">{user.username}</span> to continue.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  value={delConfirm}
                  onChange={(e) => setDelConfirm(e.target.value)}
                  placeholder={user.username}
                  autoComplete="off"
                  className="font-mono focus-glow"
                  aria-label="Type your username to confirm"
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={delConfirm !== user.username}
                    className="bg-rose-600 text-white hover:bg-rose-600/90"
                    onClick={(e) => {
                      e.preventDefault(); // keep the dialog open, advance to password step
                      setDelStage("password");
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            ) : (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">
                    Confirm with your password
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This is the last step — enter your password to permanently delete your account
                    and every project you own.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={delPassword}
                  onChange={(e) => {
                    setDelPassword(e.target.value);
                    setDelError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && delPassword && !delPending) deleteAccount();
                  }}
                  placeholder="Your password"
                  className="focus-glow"
                  aria-label="Confirm your password"
                />
                {delError && <p className="text-sm text-rose-300">{delError}</p>}
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDelStage("username")}>
                    Back
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={delPending || !delPassword}
                    className="bg-rose-600 text-white hover:bg-rose-600/90"
                    onClick={(e) => {
                      e.preventDefault(); // keep dialog open until the request succeeds
                      deleteAccount();
                    }}
                  >
                    {delPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete forever
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}

// ─── NOTIFICATIONS ──────────────────────────────────────────────

function NotificationsTab() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [pendingField, setPendingField] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    get<{ prefs: Prefs }>("/api/me/settings")
      .then((res) => {
        if (alive) setPrefs(res.prefs);
      })
      .catch((e) => {
        toast.error(e instanceof Error ? e.message : "Couldn't load notification settings.");
      });
    return () => {
      alive = false;
    };
  }, []);

  async function togglePref(field: keyof Prefs, value: boolean) {
    if (!prefs) return;
    const previous = prefs;
    setPrefs({ ...prefs, [field]: value }); // optimistic
    setPendingField(field);
    try {
      const res = await patch<{ prefs: Prefs }>("/api/me/settings", { [field]: value });
      setPrefs(res.prefs);
      toast.success("Notification preferences updated");
    } catch (e) {
      setPrefs(previous); // revert on error
      toast.error(e instanceof Error ? e.message : "Couldn't update preferences.");
    } finally {
      setPendingField(null);
    }
  }

  if (!prefs) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[76px] w-full rounded-xl bg-white/[0.05]" />
        ))}
      </div>
    );
  }

  const rows: { field: keyof Prefs; title: string; description: string }[] = [
    {
      field: "projectActivity",
      title: "Project activity",
      description: "New tasks, updates, releases, and milestones in projects you're part of.",
    },
    {
      field: "collaborationRequests",
      title: "Collaboration requests",
      description:
        "Applications to your projects and decisions on requests you've sent.",
    },
    {
      field: "socialActivity",
      title: "Social activity",
      description: "New followers and other activity across your network.",
    },
  ];

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.field}
          className="glass-card flex items-center justify-between gap-4 rounded-xl p-4"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium">{row.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              {row.description}
            </p>
          </div>
          <Switch
            checked={prefs[row.field]}
            disabled={pendingField !== null}
            onCheckedChange={(v) => togglePref(row.field, v)}
            aria-label={`Toggle ${row.title}`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── PRIVACY ────────────────────────────────────────────────────

function PrivacyTab() {
  const [blockUsername, setBlockUsername] = useState("");
  const [blockPending, setBlockPending] = useState(false);

  const safetyItems: { icon: LucideIcon; title: string; text: string; tone: string }[] = [
    {
      icon: Flag,
      title: "Reporting",
      text: "Report any project, comment, or user from its menu. Reports land in a review queue — nothing is actioned without human review.",
      tone: "bg-cyan-500/10 text-cyan-300",
    },
    {
      icon: Ban,
      title: "Blocking",
      text: "Blocking someone removes follows between you and stops them from following you or interacting with your work.",
      tone: "bg-rose-500/10 text-rose-300",
    },
    {
      icon: Scale,
      title: "Moderation queue",
      text: "Every report is reviewed by the TEKA team before any action is taken on an account or project.",
      tone: "bg-violet-500/10 text-violet-300",
    },
    {
      icon: ShieldCheck,
      title: "Account deletion",
      text: "You can permanently delete your account and owned projects at any time from the Account tab.",
      tone: "bg-emerald-500/10 text-emerald-300",
    },
  ];

  async function submitBlock(e: React.FormEvent) {
    e.preventDefault();
    const uname = blockUsername.trim().toLowerCase().replace(/^@/, "");
    if (!uname) return;
    setBlockPending(true);
    try {
      const res = await post<{ blocked: boolean }>(
        `/api/users/${encodeURIComponent(uname)}/block`
      );
      toast.success(res.blocked ? `Blocked @${uname}` : `Unblocked @${uname}`);
      if (res.blocked) setBlockUsername("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update block.");
    } finally {
      setBlockPending(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="glass-card rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
            <Shield className="h-5 w-5 text-cyan-300" />
          </span>
          <div>
            <h3 className="font-display font-semibold">Community safety</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              TEKA NEXUS moderation is built on real, transparent behaviors — not promises.
            </p>
          </div>
        </div>
        <ul className="mt-4 space-y-3">
          {safetyItems.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                  item.tone
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs italic text-muted-foreground">
          Preview note: moderation review tools are handled by the TEKA team during beta.
        </p>
      </section>

      <section className="glass-card rounded-xl p-5">
        <h3 className="flex items-center gap-2 font-display font-semibold">
          <Ban className="h-4 w-4 text-rose-300" />
          Block a user
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Enter a username to block them. Blocking also removes follows between you, and it works
          both ways — submitting a username you&apos;ve already blocked will unblock them.
        </p>
        <form onSubmit={submitBlock} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            value={blockUsername}
            onChange={(e) => setBlockUsername(e.target.value)}
            placeholder="username"
            autoComplete="off"
            aria-label="Username to block"
            className="font-mono focus-glow"
          />
          <Button
            type="submit"
            variant="outline"
            disabled={blockPending || !blockUsername.trim()}
            className="shrink-0"
          >
            {blockPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
            Block user
          </Button>
        </form>
      </section>
    </div>
  );
}
