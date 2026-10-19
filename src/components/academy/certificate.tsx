"use client";

// TEKA NEXUS — TEKA Academy certificate dialog + canvas PNG export.
// Pure client-side: renders a beautiful certificate and can rasterize it to a
// 1400×990 PNG via canvas — no server round-trip, no dependencies.

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

import { EASE } from "@/components/shared/motion";
import type { Course } from "@/lib/academy/types";
import type { TFunc } from "@/lib/i18n";

export type CertInfo = { courseTitle: string; recipient: string; code: string; issuedAt: string; emoji: string };

function drawCertificate(canvas: HTMLCanvasElement, info: CertInfo) {
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
  ctx.font = "bold 74px Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Completion", W / 2, 320);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "26px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("This certifies that", W / 2, 400);

  // recipient
  ctx.fillStyle = "#a78bfa";
  ctx.font = "bold 58px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(info.recipient, W / 2, 480);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "26px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("has successfully completed the free course", W / 2, 540);

  // course
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 46px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText(`${info.emoji}  ${info.courseTitle}`, W / 2, 625);

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
  ctx.fillText(`Certificate code: ${info.code}`, W / 2, 760);
  ctx.fillText(`Issued ${info.issuedAt} · 100% free, built with curiosity`, W / 2, 800);

  // seal
  ctx.font = "90px 'Segoe UI', system-ui, sans-serif";
  ctx.fillText("🏆", W / 2, 905);
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

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cert) return;
    drawCertificate(canvas, cert);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `teka-certificate-${cert.code}.png`;
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
          aria-label={t("academy.certLabel")}
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
                  backgroundImage:
                    "radial-gradient(600px 300px at 15% 10%, rgba(34,211,238,0.12), transparent), radial-gradient(600px 300px at 85% 90%, rgba(167,139,250,0.12), transparent)",
                }}
              >
                <div className="pointer-events-none absolute inset-3 rounded-xl border border-cyan-400/25" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-4 rounded-lg border border-white/[0.06]" aria-hidden="true" />

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
