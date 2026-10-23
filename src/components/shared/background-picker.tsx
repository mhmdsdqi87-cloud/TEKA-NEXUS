"use client";

// TEKA NEXUS — BackgroundPicker (Task 13: personalized project backgrounds).
// Shared by the project edit dialog and the launch form: preset gallery +
// custom image URL + live preview. Value is "" (none), a /covers path, or an
// https URL — mirrored by API validation on both POST and PATCH.

import { useState } from "react";
import { ImageIcon, X } from "lucide-react";

import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PROJECT_COVER_GALLERY } from "@/lib/constants";
import { ProjectCover } from "@/components/shared/atoms";
import { Input } from "@/components/ui/input";

const MAX_URL = 500;

export function BackgroundPicker({
  value,
  onChange,
  name,
  seed,
}: {
  value: string;
  onChange: (v: string) => void;
  /** Project name for the gradient preview fallback. */
  name: string;
  seed?: number;
}) {
  const t = useT();
  const [custom, setCustom] = useState(value.startsWith("http") ? value : "");

  const isPreset = value.startsWith("/covers/");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
          <ImageIcon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          {t("project.edit.background")}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setCustom("");
            }}
            className="focus-glow inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground transition hover:text-rose-300"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            {t("project.edit.bgNone")}
          </button>
        )}
      </div>

      {/* live preview */}
      <div className="relative h-20 overflow-hidden rounded-xl border border-white/[0.08]">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <ProjectCover name={name} seed={seed ?? 0} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080d]/70 via-transparent to-transparent" />
      </div>

      {/* presets */}
      <div
        className="grid grid-cols-4 gap-1.5 sm:grid-cols-8"
        role="radiogroup"
        aria-label={t("project.edit.background")}
      >
        {PROJECT_COVER_GALLERY.map((preset) => (
          <button
            key={preset}
            type="button"
            role="radio"
            aria-checked={isPreset && value === preset}
            onClick={() => onChange(value === preset ? "" : preset)}
            className={cn(
              "focus-glow relative h-12 overflow-hidden rounded-lg border transition",
              isPreset && value === preset
                ? "border-cyan-400/60 ring-2 ring-cyan-400/30"
                : "border-white/[0.08] hover:border-white/25"
            )}
            title={preset}
          >
            <img src={preset} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* custom URL */}
      <div className="space-y-1">
        <label htmlFor="bg-custom" className="block text-[11px] text-muted-foreground">
          {t("project.edit.bgCustom")}
        </label>
        <Input
          id="bg-custom"
          dir="ltr"
          value={custom}
          onChange={(e) => {
            const v = e.target.value.trim();
            setCustom(v);
            onChange(v.slice(0, MAX_URL));
          }}
          placeholder={t("project.edit.bgCustomPlaceholder")}
          maxLength={MAX_URL}
          className="h-8 bg-white/[0.03] text-xs"
        />
      </div>

      <p className="text-[11px] leading-4 text-muted-foreground">{t("project.edit.bgHint")}</p>
    </div>
  );
}
