"use client";

// TEKA NEXUS — SettingsView (Task 2-d): settings hub (spec §25).
// Runs inside AppShell — no nav of its own.

import { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { toast } from "sonner";
import {
  Ban,
  Bell,
  Flag,
  ImagePlus,
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
import { useT, useLabeled } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/store";
import { LOCALES } from "@/lib/i18n/locales";
import { ProfileDetail } from "@/lib/dto";
import { AVATAR_GRADIENTS, AVATAR_GRADIENT_KEYS, LIMITS, SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { EmptyState, UserAvatar } from "@/components/shared/atoms";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { EASE, FadeIn, Reveal, TapScale } from "@/components/shared/motion";
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

const NAV_TABS: { value: SettingsTab; icon: LucideIcon }[] = [
  { value: "profile", icon: UserRound },
  { value: "account", icon: KeyRound },
  { value: "notifications", icon: Bell },
  { value: "privacy", icon: Shield },
];

export function SettingsView({ tab }: { tab?: SettingsTab }) {
  const user = useApp((s) => s.user);
  const navigate = useApp((s) => s.navigate);
  const t = useT();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:py-8">
        <EmptyState
          icon={Lock}
          title={t("settings.signedOut.title")}
          description={t("settings.signedOut.description")}
          action={
            <Button className="btn-hero" onClick={() => navigate({ name: "login" })}>
              {t("common.signIn")}
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
  const t = useT();

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 md:py-8">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="font-display text-2xl font-bold md:text-3xl">{t("common.settings")}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {t("settings.subtitle")}
          </p>
        </motion.header>

        <Tabs value={active} onValueChange={(v) => setActive(v as SettingsTab)}>
          <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
            {/* Mini-nav: horizontal scroll chips on mobile, vertical radio list on desktop */}
            <TabsList className="h-auto w-full flex-row items-center gap-1 overflow-x-auto rounded-xl bg-transparent p-1 md:flex-col md:items-stretch md:justify-start">
              {NAV_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-auto w-auto shrink-0 justify-start gap-2 rounded-lg border border-transparent px-3.5 py-2.5 text-sm text-muted-foreground data-[state=active]:border-white/10 data-[state=active]:bg-white/[0.06] data-[state=active]:text-foreground data-[state=active]:shadow-none md:w-full"
                >
                  <tab.icon className="h-4 w-4" />
                  {t(`settings.tabs.${tab.value}`)}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-w-0">
              {/* no AnimatePresence here: Radix swaps TabsContent instantly and mode="wait"
                  would briefly hold two children (the framer "multiple children" warning) */}
              <TabsContent key="profile" value="profile" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <ProfileTab user={user} />
                </motion.div>
              </TabsContent>
              <TabsContent key="account" value="account" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <AccountTab user={user} />
                </motion.div>
              </TabsContent>
              <TabsContent key="notifications" value="notifications" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <NotificationsTab />
                </motion.div>
              </TabsContent>
              <TabsContent key="privacy" value="privacy" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <PrivacyTab />
                </motion.div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MotionConfig>
  );
}

// ─── PROFILE ────────────────────────────────────────────────────

// ── Avatar upload helpers (client-side resize → data URL) ──────

// Must match the API's data-URL budget (src/app/api/me/avatar/route.ts).
const MAX_AVATAR_LENGTH = 400 * 1024;
const AVATAR_SIZE = 256; // final square size, cover-cropped

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("read-failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("decode-failed"));
    img.src = src;
  });
}

// Draw the image cover-cropped into a 256×256 square and encode it as WebP
// (PNG when the browser can't encode WebP), stepping quality down until the
// data URL fits the 400 KB budget. Returns null when even the lowest quality
// is still too large.
async function resizeAvatarFile(file: File): Promise<string | null> {
  const src = await readFileAsDataUrl(file);
  const img = await loadImage(src);
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  if (side <= 0) throw new Error("empty-image");

  const canvas = document.createElement("canvas");
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    (img.naturalWidth - side) / 2,
    (img.naturalHeight - side) / 2,
    side,
    side,
    0,
    0,
    AVATAR_SIZE,
    AVATAR_SIZE
  );

  for (const quality of [0.92, 0.82, 0.72, 0.6, 0.5]) {
    const out = canvas.toDataURL("image/webp", quality);
    if (out.length <= MAX_AVATAR_LENGTH) return out;
  }
  const png = canvas.toDataURL("image/png");
  return png.length <= MAX_AVATAR_LENGTH ? png : null;
}

function ProfileTab({ user }: { user: SessionUser }) {
  const setUser = useApp((s) => s.setUser);
  const t = useT();
  const lbl = useLabeled();

  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(user.websiteUrl ?? "");
  const [avatarColor, setAvatarColor] = useState(user.avatarColor);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsLoaded, setSkillsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      toast.error(t("settings.errors.emptyDisplayName"));
      return;
    }
    const site = websiteUrl.trim();
    if (site && !/^https?:\/\/\S+$/i.test(site)) {
      setWebsiteError(t("settings.profileTab.websiteError"));
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
      toast.success(t("settings.toasts.profileUpdated"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("settings.errors.saveFailed"));
    } finally {
      setSaving(false);
    }
  }

  function toggleSkill(slug: string) {
    setSkills((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  async function uploadAvatar(file: File) {
    setUploading(true);
    try {
      const dataUrl = await resizeAvatarFile(file);
      if (!dataUrl) {
        toast.error(t("settings.avatar.tooBig"));
        return;
      }
      const res = await post<{ user: SessionUser }>("/api/me/avatar", { dataUrl });
      setUser(res.user);
      toast.success(t("settings.avatar.toastSaved"));
    } catch {
      toast.error(t("settings.avatar.invalid"));
    } finally {
      setUploading(false);
    }
  }

  async function removeAvatar() {
    setRemoving(true);
    try {
      const res = await del<{ user: SessionUser }>("/api/me/avatar");
      setUser(res.user);
      toast.success(t("settings.avatar.toastRemoved"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("settings.errors.saveFailed"));
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="space-y-5">
      <FadeIn y={10}>
        <section className="glass-card space-y-4 rounded-xl p-5">
          <div className="space-y-1">
            <Label htmlFor="avatar-upload-input">{t("settings.avatar.title")}</Label>
            <p className="text-xs text-muted-foreground">{t("settings.avatar.hint")}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <UserAvatar user={user} size={88} />
              {uploading && (
                <div
                  className="absolute inset-0 grid place-items-center rounded-full bg-black/55"
                  aria-hidden="true"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-cyan-200" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <TapScale>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || removing}
                  className="focus-glow"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <ImagePlus className="h-4 w-4" aria-hidden="true" />
                  )}
                  {t("settings.avatar.upload")}
                </Button>
              </TapScale>
              {user.avatarUrl ? (
                <TapScale>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeAvatar}
                    disabled={uploading || removing}
                    className="text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 focus-glow"
                  >
                    {removing ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {t("settings.avatar.remove")}
                  </Button>
                </TapScale>
              ) : null}
            </div>
          </div>
          <input
            ref={fileInputRef}
            id="avatar-upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            aria-label={t("settings.avatar.upload")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = ""; // allow re-picking the same file
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                toast.error(t("settings.avatar.invalid"));
                return;
              }
              void uploadAvatar(file);
            }}
          />
        </section>
      </FadeIn>

      <Reveal y={10}>
        <section className="glass-card space-y-5 rounded-xl p-5">
          <div className="space-y-2">
            <Label htmlFor="display-name">{t("settings.profileTab.displayName")}</Label>
          <Input
            id="display-name"
            value={displayName}
            maxLength={60}
            onChange={(e) => setDisplayName(e.target.value)}
            className="focus-glow"
            placeholder={t("settings.profileTab.displayNamePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio">{t("settings.profileTab.bio")}</Label>
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
            placeholder={t("settings.profileTab.bioPlaceholder")}
            className="focus-glow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">{t("settings.profileTab.website")}</Label>
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
            <p className="text-xs text-muted-foreground">{t("settings.profileTab.websiteHint")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{t("settings.profileTab.avatarGradient")}</Label>
          <div className="flex flex-wrap items-center gap-4">
            <UserAvatar user={{ ...user, avatarColor }} size={56} />
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("settings.profileTab.chooseGradient")}>
              {AVATAR_GRADIENT_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAvatarColor(key)}
                  aria-label={t("settings.profileTab.gradientName", { name: key })}
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
      </Reveal>

      <Reveal y={10} delay={0.06}>
      <section className="glass-card space-y-3 rounded-xl p-5">
        <div>
          <Label>{t("settings.profileTab.skills")}</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("settings.profileTab.skillsHint")}
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
                {lbl("project.skills", s.slug, s.name)}
              </button>
            );
          })}
        </div>
      </section>
      </Reveal>

      <div className="flex justify-end">
        <TapScale>
          <Button onClick={saveProfile} disabled={saving} className="btn-hero min-w-32">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("common.saveChanges")}
          </Button>
        </TapScale>
      </div>
    </div>
  );
}

// ─── ACCOUNT ────────────────────────────────────────────────────

function AccountTab({ user }: { user: SessionUser }) {
  const setUser = useApp((s) => s.setUser);
  const navigate = useApp((s) => s.navigate);
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const activeLocaleNative = LOCALES.find((l) => l.code === locale)?.native ?? "English";

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
      toast.error(t("settings.errors.enterCurrentPassword"));
      return;
    }
    if (pwNew.length < 8) {
      toast.error(t("settings.errors.pwTooShort"));
      return;
    }
    if (pwNew !== pwConfirm) {
      toast.error(t("settings.errors.pwMismatch"));
      return;
    }
    setPwPending(true);
    try {
      await patch("/api/me/password", { currentPassword: pwCurrent, newPassword: pwNew });
      toast.success(t("settings.toasts.passwordChanged"));
      setPwCurrent("");
      setPwNew("");
      setPwConfirm("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("settings.errors.pwChangeFailed"));
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
      toast.success(t("settings.toasts.accountDeleted"));
      navigate({ name: "landing" });
    } catch (e) {
      setDelError(e instanceof Error ? e.message : t("settings.errors.deleteFailed"));
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
      <Reveal y={10}>
      <section className="glass-card space-y-4 rounded-xl p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display font-semibold">{t("settings.accountTab.language")}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("settings.accountTab.languageDescription")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted-foreground" aria-hidden="true">
              {activeLocaleNative}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal y={10} delay={0.05}>
      <section className="glass-card space-y-5 rounded-xl p-5">
        <div className="space-y-2">
          <Label htmlFor="account-email">{t("settings.accountTab.email")}</Label>
          <Input
            id="account-email"
            value={user.email}
            readOnly
            className="cursor-default font-mono text-sm focus-glow"
            aria-describedby="account-email-hint"
          />
          <p id="account-email-hint" className="text-xs text-muted-foreground">
            {t("settings.accountTab.emailHint")}
          </p>
        </div>
      </section>
      </Reveal>

      <Reveal y={10} delay={0.1}>
      <section className="glass-card space-y-4 rounded-xl p-5">
        <div>
          <h3 className="font-display font-semibold">{t("settings.accountTab.changePassword")}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("settings.accountTab.changePasswordHint")}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="pw-current">{t("settings.accountTab.currentPassword")}</Label>
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
            <Label htmlFor="pw-new">{t("settings.accountTab.newPassword")}</Label>
            <Input
              id="pw-new"
              type="password"
              autoComplete="new-password"
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className={cn("focus-glow", pwTooShort && "border-rose-500/50")}
            />
            {pwTooShort && <p className="text-xs text-rose-300">{t("settings.accountTab.pwTooShort")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw-confirm">{t("settings.accountTab.confirmPassword")}</Label>
            <Input
              id="pw-confirm"
              type="password"
              autoComplete="new-password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              className={cn("focus-glow", pwMismatch && "border-rose-500/50")}
            />
            {pwMismatch && <p className="text-xs text-rose-300">{t("settings.accountTab.pwMismatch")}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <TapScale>
            <Button
              onClick={changePassword}
              disabled={pwPending || !pwCurrent || !pwNew || !pwConfirm}
              className="min-w-36"
            >
              {pwPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("settings.accountTab.updatePassword")}
            </Button>
          </TapScale>
        </div>
      </section>
      </Reveal>

      {/* Danger zone */}
      <section className="rounded-xl border border-rose-500/25 bg-rose-500/[0.04] p-5">
        <h3 className="font-display font-semibold text-rose-200">{t("settings.accountTab.dangerZone")}</h3>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          {t("settings.accountTab.dangerDescription")}
        </p>
        <AlertDialog open={delOpen} onOpenChange={closeDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mt-4">
              <Trash2 className="h-4 w-4" />
              {t("settings.accountTab.deleteAccount")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            {delStage === "username" ? (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">{t("settings.delete.title")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.delete.typeUsername")}{" "}
                    <span className="font-mono text-foreground">{user.username}</span>{" "}
                    {t("settings.delete.toContinue")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                  value={delConfirm}
                  onChange={(e) => setDelConfirm(e.target.value)}
                  placeholder={user.username}
                  autoComplete="off"
                  className="font-mono focus-glow"
                  aria-label={t("settings.delete.usernameAria")}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={delConfirm !== user.username}
                    className="bg-rose-600 text-white hover:bg-rose-600/90"
                    onClick={(e) => {
                      e.preventDefault(); // keep the dialog open, advance to password step
                      setDelStage("password");
                    }}
                  >
                    {t("settings.delete.continue")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            ) : (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display">
                    {t("settings.delete.confirmTitle")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("settings.delete.confirmDescription")}
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
                  placeholder={t("settings.delete.passwordPlaceholder")}
                  className="focus-glow"
                  aria-label={t("settings.delete.passwordAria")}
                />
                {delError && <p className="text-sm text-rose-300">{delError}</p>}
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDelStage("username")}>
                    {t("common.back")}
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
                    {t("settings.delete.deleteForever")}
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
  const t = useT();
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [pendingField, setPendingField] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    get<{ prefs: Prefs }>("/api/me/settings")
      .then((res) => {
        if (alive) setPrefs(res.prefs);
      })
      .catch((e) => {
        toast.error(e instanceof Error ? e.message : t("settings.errors.loadPrefsFailed"));
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
      toast.success(t("settings.toasts.prefsUpdated"));
    } catch (e) {
      setPrefs(previous); // revert on error
      toast.error(e instanceof Error ? e.message : t("settings.errors.prefsUpdateFailed"));
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
      title: t("settings.notificationsTab.projectActivity.title"),
      description: t("settings.notificationsTab.projectActivity.description"),
    },
    {
      field: "collaborationRequests",
      title: t("settings.notificationsTab.collaboration.title"),
      description: t("settings.notificationsTab.collaboration.description"),
    },
    {
      field: "socialActivity",
      title: t("settings.notificationsTab.social.title"),
      description: t("settings.notificationsTab.social.description"),
    },
  ];

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <Reveal key={row.field} y={10} delay={i * 0.05}>
          <div
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
              aria-label={t("settings.notificationsTab.toggleAria", { name: row.title })}
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── PRIVACY ────────────────────────────────────────────────────

function PrivacyTab() {
  const t = useT();
  const [blockUsername, setBlockUsername] = useState("");
  const [blockPending, setBlockPending] = useState(false);

  const safetyItems: { icon: LucideIcon; title: string; text: string; tone: string }[] = [
    {
      icon: Flag,
      title: t("settings.privacyTab.safety.reporting.title"),
      text: t("settings.privacyTab.safety.reporting.text"),
      tone: "bg-cyan-500/10 text-cyan-300",
    },
    {
      icon: Ban,
      title: t("settings.privacyTab.safety.blocking.title"),
      text: t("settings.privacyTab.safety.blocking.text"),
      tone: "bg-rose-500/10 text-rose-300",
    },
    {
      icon: Scale,
      title: t("settings.privacyTab.safety.moderation.title"),
      text: t("settings.privacyTab.safety.moderation.text"),
      tone: "bg-violet-500/10 text-violet-300",
    },
    {
      icon: ShieldCheck,
      title: t("settings.privacyTab.safety.deletion.title"),
      text: t("settings.privacyTab.safety.deletion.text"),
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
      toast.success(
        res.blocked
          ? t("settings.toasts.blocked", { name: uname })
          : t("settings.toasts.unblocked", { name: uname })
      );
      if (res.blocked) setBlockUsername("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("settings.errors.blockFailed"));
    } finally {
      setBlockPending(false);
    }
  }

  return (
    <div className="space-y-5">
      <Reveal y={10}>
      <section className="glass-card rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
            <Shield className="h-5 w-5 text-cyan-300" />
          </span>
          <div>
            <h3 className="font-display font-semibold">{t("settings.privacyTab.safetyTitle")}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("settings.privacyTab.safetyIntro")}
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
          {t("settings.privacyTab.previewNote")}
        </p>
      </section>
      </Reveal>

      <Reveal y={10} delay={0.06}>
      <section className="glass-card rounded-xl p-5">
        <h3 className="flex items-center gap-2 font-display font-semibold">
          <Ban className="h-4 w-4 text-rose-300" />
          {t("settings.privacyTab.blockTitle")}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {t("settings.privacyTab.blockDescription")}
        </p>
        <form onSubmit={submitBlock} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            value={blockUsername}
            onChange={(e) => setBlockUsername(e.target.value)}
            placeholder={t("settings.privacyTab.usernamePlaceholder")}
            autoComplete="off"
            aria-label={t("settings.privacyTab.usernameAria")}
            className="font-mono focus-glow"
          />
          <TapScale className="shrink-0">
            <Button
              type="submit"
              variant="outline"
              disabled={blockPending || !blockUsername.trim()}
            >
              {blockPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
              {t("settings.privacyTab.blockButton")}
            </Button>
          </TapScale>
        </form>
      </section>
      </Reveal>
    </div>
  );
}
