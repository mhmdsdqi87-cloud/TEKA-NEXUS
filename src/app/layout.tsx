import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono, Vazirmatn, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PWARegister } from "@/components/shared/pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// RTL script fonts — Persian (Vazirmatn) and Arabic (Noto Sans Arabic).
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

// Google Search Console / Bing / Yandex verification via env vars —
// set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel (or skip and use the HTML-file method).
const verification: Record<string, string> = {};
if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
  verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION)
  verification.other = { "msvalidate.01": [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION] };

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
