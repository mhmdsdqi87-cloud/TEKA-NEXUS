import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// All fonts are SELF-HOSTED (woff2 in ./fonts) instead of next/font/google.
// Reason: Google-font fetching at build time made Vercel builds fail hard
// (module-not-found inside generated font CSS when the fetch flakes).
// Self-hosted files make the build hermetic — zero font network dependency.
// Arabic-script fonts ship their Arabic subset; Latin glyphs inside Persian/
// Arabic text fall back to Geist via the CSS stacks in globals.css.
import { Toaster } from "@/components/ui/sonner";
import { PWARegister } from "@/components/shared/pwa-register";

const geistSans = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 800",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

// RTL script fonts — Persian (Vazirmatn) and Arabic (Noto Sans Arabic).
const vazirmatn = localFont({
  src: "./fonts/vazirmatn-arabic-wght-normal.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  display: "swap",
});

const notoArabic = localFont({
  src: "./fonts/noto-sans-arabic-arabic-wght-normal.woff2",
  variable: "--font-noto-arabic",
  weight: "100 900",
  display: "swap",
});

// Google Search Console / Bing / Yandex verification.
// The token is public by design — it ships in every page's HTML head.
// Env var (NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) wins if set in Vercel;
// the literal below is the fallback so verification works without extra config.
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "mMKxL_BAaptdW6S8jh3E_YcjtaWew5cXS_QXEKaC_ug";
const verification: Metadata["verification"] = {};
if (GOOGLE_SITE_VERIFICATION) verification.google = GOOGLE_SITE_VERIFICATION;
if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION)
  verification.other = { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION };

// Build marker shipped in every page's <head> — curl-verifiable proof of which
// commit is actually serving on Vercel (deployment-failure forensics).
const BUILD_VERSION = "v1.74.0";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://teka-nexus.vercel.app"),
  title: {
    // Persian-first: the target audience searches Google in Persian —
    // «تکا» must appear in the raw <title> for the brand query to hit.
    default: "تکا نکسوس — آموزش رایگان برنامه‌نویسی و ساخت پروژه واقعی | TEKA NEXUS",
    template: "%s | تکا نکسوس",
  },
  description:
    "تکا نکسوس: آکادمی رایگان برنامه‌نویسی (پایتون و وب) + شبکه اجتماعی برای پیدا کردن هم‌تیمی و ساخت پروژه واقعی. با آزمون و گواهینامه. ایده‌ها رو به تکنولوژی واقعی تبدیل کن.",
  keywords: [
    // Brand — Persian spellings users actually type in Google:
    "تکا",
    "تکا نکسوس",
    "اکادمی تکا",
    "آکادمی تکا",
    "سایت تکا",
    "تکا نکسوس آموزش برنامه نویسی",
    "TEKA NEXUS",
    "Teka",
    "TEKA Academy",
    // Persian intent queries:
    "آموزش رایگان برنامه‌نویسی",
    "آموزش پایتون",
    "آموزش پایتون از صفر",
    "یادگیری کدنویسی",
    "برنامه‌نویسی",
    "پروژه‌های برنامه‌نویسی",
    "گواهینامه برنامه نویسی",
    "شبکه اجتماعی برنامه نویسان",
    // English intent queries:
    "learn programming free",
    "social platform for developers",
    "find teammates for projects",
    "programming academy",
    "free coding courses",
    "Python course",
    "HTML CSS course",
    "developer community",
    "software collaboration",
  ],
  authors: [{ name: "TEKA" }],
  creator: "TEKA",
  publisher: "TEKA NEXUS",
  applicationName: "TEKA NEXUS",
  manifest: "/manifest.webmanifest",
  other: { "teka-build": BUILD_VERSION },
  appleWebApp: {
    capable: true,
    title: "TEKA",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
    // The SPA serves one URL; declare both audience languages for it.
    languages: {
      "fa-IR": "/",
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "تکا نکسوس — آموزش رایگان برنامه‌نویسی و ساخت پروژه واقعی",
    description:
      "آکادمی رایگان برنامه‌نویسی + شبکه اجتماعی برای ساخت پروژه واقعی با هم‌تیمی. پایتون و وب رو یاد بگیر، اعتبار تأییدشده بگیر.",
    siteName: "تکا نکسوس",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1440,
        height: 736,
        alt: "TEKA NEXUS — Where Ideas Become Real Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تکا نکسوس — آموزش رایگان برنامه‌نویسی",
    description:
      "آکادمی رایگان برنامه‌نویسی + شبکه اجتماعی برای ساخت پروژه واقعی با هم‌تیمی.",
    images: ["/og.png"],
  },
  verification,
};

export const viewport: Viewport = {
  themeColor: "#08080d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teka-nexus.vercel.app";

// Structured data for Google Rich Results — teaches Google the Persian
// brand name «تکا نکسوس» via alternateName so the brand query maps to us.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "TEKA NEXUS",
      alternateName: ["تکا نکسوس", "تکا", "Teka", "TEKA"],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icons/icon-512.png`,
      description:
        "تکا نکسوس: آکادمی رایگان برنامه‌نویسی و شبکه اجتماعی ساخت پروژه واقعی برای برنامه‌نویسان.",
      sameAs: ["https://github.com/mhmdsdqi87-cloud/TEKA-NEXUS"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "تکا نکسوس",
      alternateName: ["TEKA NEXUS", "تکا"],
      publisher: { "@id": `${SITE_URL}/#org` },
      description:
        "آکادمی رایگان برنامه‌نویسی (پایتون و وب) + شبکه اجتماعی پیدا کردن هم‌تیمی و ساخت پروژه واقعی.",
      inLanguage: ["fa", "en"],
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: "تکا نکسوس",
      alternateName: "TEKA NEXUS",
      operatingSystem: "ANDROID, WEB",
      applicationCategory: "EducationalApplication",
      description:
        "برنامه‌نویسی رو رایگان یاد بگیر (پایتون و وب)، هم‌تیمی پیدا کن و پروژه واقعی بساز با سیستم اعتبار تأییدشده.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      url: `${SITE_URL}/`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${vazirmatn.variable} ${notoArabic.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="nexus-bg" aria-hidden="true" />
        <PWARegister />
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
