"use client";

// TEKA NEXUS — locale-aware Radix DirectionProvider (Task ws-1 fix).
// Radix primitives (Tabs, DropdownMenu, Dialog, Select…) default to dir="ltr"
// unless a DirectionProvider says otherwise. This wrapper mirrors the i18n
// store so the whole component library flips with the UI language.

import * as React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

import { RTL_LOCALES } from "@/lib/i18n/locales";
import { useI18n } from "@/lib/i18n/store";

export function TekaDirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useI18n((s) => s.locale);
  const dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}
