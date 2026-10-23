"use client";

// TEKA NEXUS — Share menu: native share sheet (when available), Telegram,
// WhatsApp, X and copy-link. URL is always window.location.href at click
// time; the share text template lives in the common.share i18n namespace.

import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { Link2, MessageCircle, Send, Share2, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// No external store to subscribe to — we only need the client-vs-server
// snapshot machinery to read a browser-only capability safely.
const noopSubscribe = () => () => {};

export function ShareMenu({
  title,
  className,
  size = "default",
}: {
  title: string;
  className?: string;
  size?: "sm" | "default";
}) {
  const t = useT();
  // navigator.share only exists in the browser — useSyncExternalStore renders
  // false on the server/hydration pass, then flips after mount without a
  // hydration mismatch.
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false
  );

  function composeText() {
    return t("common.share.shareText", { title });
  }

  async function shareNative() {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch (e) {
      // User dismissed the share sheet — nothing to do.
      if (e instanceof DOMException && e.name === "AbortError") return;
      toast.error(t("common.share.shareFailed"));
    }
  }

  function shareTelegram() {
    const url = window.location.href;
    openExternal(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(composeText())}`
    );
  }

  function shareWhatsApp() {
    const url = window.location.href;
    openExternal(`https://wa.me/?text=${encodeURIComponent(`${composeText()} ${url}`)}`);
  }

  function shareX() {
    const url = window.location.href;
    openExternal(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(composeText())}&url=${encodeURIComponent(url)}`
    );
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(t("common.share.linkCopied"));
    } catch {
      toast.error(t("common.share.copyFailed"));
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          className={cn(size === "sm" && "h-9", "gap-1.5", className)}
          aria-label={t("common.share.label")}
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">{t("common.share.label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canNativeShare && (
          <DropdownMenuItem onClick={shareNative}>
            <Share2 className="h-4 w-4" /> {t("common.share.native")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={shareTelegram}>
          <Send className="h-4 w-4" /> {t("common.share.telegram")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareWhatsApp}>
          <MessageCircle className="h-4 w-4" /> {t("common.share.whatsapp")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareX}>
          <Twitter className="h-4 w-4" /> {t("common.share.x")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          <Link2 className="h-4 w-4" /> {t("common.share.copyLink")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
