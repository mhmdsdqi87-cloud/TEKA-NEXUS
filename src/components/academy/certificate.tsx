"use client";

// TEKA NEXUS — TEKA Academy certificate dialog + canvas PNG export.
// Pure client-side: renders a beautiful certificate and can rasterize it to a
// 1400×990 PNG via canvas — no server round-trip, no dependencies.
//
// Two variants:
//  - "completion" (default): classic Certificate of Completion.
//  - "license": OFFICIAL TEKA LICENSE — earned by passing the secure final
//    exam. Seal-like double ring, license code, verify hint.

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ShieldCheck, X } from "lucide-react";

import { EASE } from "@/components/shared/motion";
import type { Course } from "@/lib/academy/types";
import type { TFunc } from "@/lib/i18n";

export type CertVariant = "completion" | "license";
export type CertInfo = {
  courseTitle: string;
  recipient: string;
  code: string;
  issuedAt: string;
  emoji: string;
  variant?: CertVariant;
};

function drawCertificate(canvas: HTMLCanvasElement, info: CertInfo, license: boolean, labels: { license: string; licenseSeal: string; verifyHint: string }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = (canvas.width = 1400);
  const H = (canvas.height = 990);

  // background
  ctx.fillStyle = "#0a0f1c";
  ctx.fillRect(0, 0, W, H);

  // gradient frame
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#22d3ee");
  grad.addColorStop(0.5, "#a78bfa");
  grad.addColorStop(1, "#34d399");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 52, W - 104, H - 104);

  // soft glows
  const glow1 = ctx.createRadialGradient(W * 0.2, H * 0.15, 0, W * 0.2, H * 0.15, 500);
  glow1.addColorStop(0, "rgba(34,211,238,0.14)");
  glow1.addColorStop(1, "rgba(34,211,238,0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, W, H);
  const glow2 = ctx.createRadialGradient(W * 0.85, H * 0.85, 0, W * 0.85, H * 0.85, 550);
  glow2.addColorStop(0, "rgba(167,139,250,0.13)");
  glow2.addColorStop(1, "rgba(167,139,250,0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";

  // brand
  ctx.fillStyle = "#22d3ee";
  ctx.font = "bold 34px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("TEKA NEXUS", W / 2, 150);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 24px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("ACADEMY", W / 2, 190);

  // title
  ctx.fillStyle = "#ffffff";
  ctx.font = license ? "bold 64px Georgia, 'Times New Roman', serif" : "bold 74px Georgia, 'Times New Roman', serif";
  ctx.fillText(license ? labels.license : "Certificate of Completion", W / 2, license ? 310 : 320);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "26px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(license ? "This certifies that" : "This certifies that", W / 2, license ? 390 : 400);

  // recipient
  ctx.fillStyle = "#a78bfa";
  ctx.font = "bold 58px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(info.recipient, W / 2, license ? 470 : 480);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "26px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(license ? "has passed the secure final exam for the course" : "has successfully completed the free course", W / 2, license ? 530 : 540);

  // course
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 46px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(`${info.emoji}  ${info.courseTitle}`, W / 2, license ? 615 : 625);

  // divider
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 160, 675);
  ctx.lineTo(W / 2 + 160, 675);
  ctx.stroke();

  // footer
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "22px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(`${license ? "License" : "Certificate"} code: ${info.code}`, W / 2, 760);
  ctx.fillText(license ? `Issued ${info.issuedAt} · ${labels.verifyHint}` : `Issued ${info.issuedAt} · 100% free, built with curiosity`, W / 2, 800);

  // seal
  if (license) {
    // Seal-like double ring with brand text
    const cx = W / 2;
    const cy = 900;
    const r1 = 62;
    const r2 = 50;
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(167,139,250,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "bold 15px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("TEKA NEXUS", cx, cy - 8);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "12px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("OFFICIAL", cx, cy + 12);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "10px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("VERIFIED", cx, cy + 30);
  } else {
    ctx.font = "90px 'Segoe UI', system-ui, sans-serif";
    ctx.fillText("🏆", W / 2, 905);
  }
}

export function CertificateDialog({
  cert,
  course,
  open,
  onClose,
  t,
}: {
  cert: CertInfo | null;
  course?: Course;
  open: boolean;
  onClose: () => void;
  t: TFunc;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const license = cert?.variant === "license";

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cert) return;
    drawCertificate(canvas, cert, license, {
      license: t("academy.exam.license"),
      licenseSeal: t("academy.exam.licenseSeal"),
      verifyHint: t("academy.exam.verifyHint"),
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `teka-${license ? "license" : "certificate"}-${cert.code}.png`;
    a.click();
  };

  return (
    <AnimatePresence>
      {open && cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={license ? t("academy.exam.license") : t("academy.certLabel")}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 -end-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#0d1526] text-muted-foreground shadow-lg transition hover:text-foreground focus-glow"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/50">
              <div
                className="relative bg-[#0a0f1c] p-6 text-center sm:p-10"
                style={{
                  backgroundImage: license
                    ? "radial-gradient(600px 300px at 15% 10%, rgba(52,211,153,0.13), transparent), radial-gradient(600px 300px at 85% 90%, rgba(34,211,238,0.13), transparent)"
                    : "radial-gradient(600px 300px at 15% 10%, rgba(34,211,238,0.12), transparent), radial-gradient(600px 300px at 85% 90%, rgba(167,139,250,0.12), transparent)",
                }}
              >
                <div className="pointer-events-none absolute inset-3 rounded-xl border border-cyan-400/25" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-4 rounded-lg border border-white/[0.06]" aria-hidden="true" />

                {license ? (
                  <>
                    <p className="font-mono text-sm font-bold tracking-widest text-emerald-300">TEKA NEXUS · ACADEMY</p>
                    <h2 className="mt-6 flex flex-wrap items-center justify-center gap-3 font-serif text-2xl font-bold tracking-wide text-white sm:text-4xl">
                      <ShieldCheck className="h-7 w-7 shrink-0 text-emerald-300 sm:h-9 sm:w-9" aria-hidden="true" />
                      {t("academy.exam.license")}
                    </h2>
                    {/* seal-like ring */}
                    <div className="relative mx-auto mt-6 grid h-24 w-24 place-items-center rounded-full" aria-hidden="true">
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-400/60" />
                      <div className="absolute inset-2 rounded-full border border-cyan-400/40" />
                      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-md" />
                      <div className="relative text-center leading-tight">
                        <p className="text-[9px] font-bold tracking-widest text-emerald-200">TEKA NEXUS</p>
                        <p className="text-[8px] tracking-widest text-white/60">OFFICIAL</p>
                        <p className="text-[8px] tracking-widest text-white/40">VERIFIED</p>
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-white/60">{t("academy.exam.licenseBody")}</p>
                    <p className="mt-2 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {cert.recipient}
                    </p>
                    <p className="mt-4 text-sm text-white/60">
                      {t("academy.exam.score")}: <span className="font-semibold text-emerald-300">passed</span> · {cert.courseTitle}
                    </p>
                    <div className="mx-auto mt-6 h-px w-48 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true" />
                    <p className="mt-6 font-mono text-xs text-white/50">
                      {t("academy.exam.licenseCode")}: <span className="text-emerald-300">{cert.code}</span>
                    </p>
                    <p className="mt-1 font-mono text-xs text-white/40">
                      {t("academy.certIssued")} {cert.issuedAt} · {t("academy.exam.verifyHint")}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-sm font-bold tracking-widest text-cyan-300">TEKA NEXUS · ACADEMY</p>
                    <h2 className="mt-6 font-serif text-2xl font-bold text-white sm:text-4xl">{t("academy.certLabel")}</h2>
                    <p className="mt-6 text-sm text-white/60">{t("academy.hubTitle")}</p>
                    <p className="mt-2 bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      {cert.recipient}
                    </p>
                    <p className="mt-4 text-sm text-white/60">{t("academy.certBody")}</p>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                      {cert.emoji} {cert.courseTitle}
                    </p>
                    <div className="mx-auto mt-6 h-px w-48 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" aria-hidden="true" />
                    <p className="mt-6 font-mono text-xs text-white/50">
                      {t("academy.certCode")}: <span className="text-cyan-300">{cert.code}</span>
                    </p>
                    <p className="mt-1 font-mono text-xs text-white/40">
                      {t("academy.certIssued")} {cert.issuedAt}
                    </p>
                    <p className="mt-4 text-4xl" aria-hidden="true">🏆</p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={download}
                className="btn-hero inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 text-sm font-semibold focus-glow"
              >
                <Download className="h-4 w-4" />
                {t("academy.downloadPng")}
              </button>
            </div>

            {/* hidden rasterizer */}
            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
