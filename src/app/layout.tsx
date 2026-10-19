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
  title: {
    default: "TEKA NEXUS — Where Ideas Become Real Technology",
    template: "%s · TEKA NEXUS",
  },
  description:
    "Discover projects, find your people, and build what comes next. Free programming academy (Python & HTML/CSS), real team collaboration, and a verified reputation system.",
  keywords: [
    "TEKA NEXUS",
    "TEKA Academy",
    "learn programming free",
    "آموزش برنامه‌نویسی رایگان",
    "Python",
    "HTML CSS",
    "developers",
    "projects",
    "collaboration",
    "teams",
  ],
  authors: [{ name: "TEKA" }],
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
  openGraph: {
    title: "TEKA NEXUS",
    description:
      "Where Ideas Become Real Technology. Free programming academy + real collaboration community.",
    siteName: "TEKA NEXUS",
    type: "website",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "TEKA NEXUS" }],
  },
  twitter: {
    card: "summary",
    title: "TEKA NEXUS",
    description: "Free programming academy + real collaboration community.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        <div className="nexus-bg" aria-hidden="true" />
        <PWARegister />
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
