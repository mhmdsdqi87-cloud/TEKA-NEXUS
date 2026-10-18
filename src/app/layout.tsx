import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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

export const metadata: Metadata = {
  title: "TEKA NEXUS — Where Ideas Become Real Technology",
  description:
    "Discover projects, find your people, and build what comes next. TEKA NEXUS is a developer-first platform to discover technology projects, find collaborators, build together, and grow your reputation.",
  keywords: ["TEKA NEXUS", "developers", "projects", "collaboration", "teams", "open source"],
  authors: [{ name: "TEKA" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "TEKA NEXUS",
    description: "Where Ideas Become Real Technology. Discover projects, find your people, and build what comes next.",
    siteName: "TEKA NEXUS",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <div className="nexus-bg" aria-hidden="true" />
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
