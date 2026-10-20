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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://teka-nexus.vercel.app"),
  title: {
    default: "TEKA NEXUS — Learn Programming Free, Build Real Projects",
    template: "%s · TEKA NEXUS",
  },
  description:
    "Join TEKA NEXUS: a free programming academy (Python & web development), a social platform to find teammates for real projects, and a verified reputation system that proves your skills. Where ideas become real technology.",
  keywords: [
    "TEKA NEXUS",
    "TEKA Academy",
    "learn programming free",
    "آموزش رایگان برنامه‌نویسی",
    "آموزش پایتون",
    "یادگیری کدنویسی",
    "social platform for developers",
    "find teammates for projects",
    "programming academy",
    "free coding courses",
    "Python course",
    "HTML CSS course",
    "developer community",
    "software collaboration",
    "برنامه‌نویسی",
    "پروژه‌های برنامه‌نویسی",
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
  alternates: { canonical: "/" },
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
    title: "TEKA NEXUS — Where Ideas Become Real Technology",
    description:
      "Free programming academy + a social platform to build real projects together. Learn Python and web development, find teammates, earn verified reputation.",
    siteName: "TEKA NEXUS",
    locale: "en_US",
    alternateLocale: ["fa_IR"],
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
    title: "TEKA NEXUS — Where Ideas Become Real Technology",
    description:
      "Free programming academy + a social platform to build real projects together.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08080d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teka-nexus.vercel.app";

// Structured data for Google Rich Results (WebSite + MobileApplication).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "TEKA NEXUS",
      description:
        "Free programming academy and social platform for building real projects together.",
      inLanguage: ["en", "fa"],
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: "TEKA NEXUS",
      operatingSystem: "ANDROID, WEB",
      applicationCategory: "EducationalApplication",
      description:
        "Learn programming for free (Python & web development), find teammates, and build real projects with a verified reputation system.",
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
