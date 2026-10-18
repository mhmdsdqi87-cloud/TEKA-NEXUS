"use client";

// TEKA NEXUS — language switcher.
// Globe button + dropdown listing all 6 locales with native names.
// Used in the shell top bar, the landing top bar and Settings.

import { Check, Globe } from "lucide-react";

import { useI18n } from "@/lib/i18n/store";
import { LOCALES } from "@/lib/i18n/locales";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useT();
  const locale = useI18n((s) => s.locale);
  const setLocale = useI18n((s) => s.setLocale);
  const active = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-center gap-1.5 h-11 w-11 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors outline-none focus-glow",
            className
          )}
          aria-label={`${t("common.language")}: ${active.english}`}
          title={`${t("common.language")}: ${active.native}`}
        >
          <Globe className="h-5 w-5" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
          {t("common.language")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            lang={l.code}
            dir={l.dir}
            onClick={() => setLocale(l.code)}
            className="gap-2.5"
          >
            <span aria-hidden="true" className="text-base leading-none">
              {l.flag}
            </span>
            <span className="flex-1">{l.native}</span>
            {l.code === locale && <Check className="h-4 w-4 text-cyan-300" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
