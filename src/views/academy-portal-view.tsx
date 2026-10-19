"use client";

// TEKA NEXUS ACADEMY — dedicated learning portal (root view).
// A standalone-feeling learning product that lives inside the SPA: its own
// wordmark, its own back link to TEKA NEXUS, and five deep-linkable sections
// (dashboard / paths / tools / tutor / certificates) driven by internal state
// that stays in sync with the `section` prop from the store's View union.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { EASE } from "@/components/shared/motion";
import { PortalHeader } from "@/components/academy-portal/portal-shell";
import { HubSection } from "@/components/academy-portal/portal-hub";
import { PathsSection } from "@/components/academy-portal/portal-paths";
import { ToolsSection } from "@/components/academy-portal/portal-tools";
import { TutorSection } from "@/components/academy-portal/portal-tutor";
import { CertificatesSection } from "@/components/academy-portal/portal-certificates";
import {
  PORTAL_SECTIONS,
  usePortalData,
  usePortalDict,
  type PortalSection,
} from "@/components/academy-portal/portal-data";

export type AcademyPortalSection = PortalSection;

export function AcademyPortalView({
  section,
}: {
  section?: "dashboard" | "paths" | "tools" | "tutor" | "certificates";
}) {
  const dict = usePortalDict();
  const data = usePortalData();

  // Internal state is the runtime source of truth. The `section` prop (from
  // navigate({ name: "academyPortal", section }) deep links) seeds it — page.tsx
  // keys this view by section, so any prop change remounts with fresh state.
  const [active, setActive] = useState<PortalSection>(
    section && PORTAL_SECTIONS.includes(section) ? section : "dashboard",
  );
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [active]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8" aria-label={dict.meta.portalAria}>
      <PortalHeader active={active} onNavigate={setActive} dict={dict} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.14, ease: "easeIn" } }}
          transition={{ duration: 0.28, ease: EASE }}
          className="mt-6 sm:mt-8"
        >
          {active === "dashboard" && <HubSection data={data} dict={dict} onNavigate={setActive} />}
          {active === "paths" && <PathsSection data={data} dict={dict} onNavigate={setActive} />}
          {active === "tools" && <ToolsSection dict={dict} />}
          {active === "tutor" && <TutorSection dict={dict} />}
          {active === "certificates" && <CertificatesSection data={data} dict={dict} />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
