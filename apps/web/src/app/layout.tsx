import type { Metadata } from "next";
import { Geist, Funnel_Sans, Funnel_Display } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/qurey-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"]
})

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: {
    default: "Aayeshol",
    template: "%s | Aayeshol",
  },
  description:
    "Aayeshol is an AI-powered automation platform that helps you generate trending social media posts automatically.",
  keywords: [
    "AI automation",
    "social media automation",
    "AI post generator",
    "content automation",
    "Aayeshol",
  ],
  authors: [{ name: "Aayeshol Team" }],
  creator: "Aayeshol",
  metadataBase: new URL("https://aayeshol.com"),
  openGraph: {
    title: "Aayeshol",
    description:
      "Generate trending posts automatically with AI automation.",
    url: "https://aayeshol.com",
    siteName: "Aayeshol",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${funnelSans.variable} ${funnelDisplay.variable} text-zinc-200 antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
          {children}
          <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
