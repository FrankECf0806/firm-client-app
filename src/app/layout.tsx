import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MuiProvider from "@/providers/MuiProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoloLawyer | Modern Legal Practice Management",
  description:
    "Complete case and practice management for solo attorneys. Streamline your workflow, manage clients, track time, and grow your practice with Firm Case.",
  keywords: [
    "solo lawyer",
    "case management",
    "legal software",
    "practice management",
    "law firm software",
    "attorney tools",
    "legal case tracking",
  ],
  authors: [{ name: "Frank Cruz" }],
  creator: "Frank Cruz",
  publisher: "SoloLawyer",
  openGraph: {
    title: "SoloLawyer - Modern Legal Practice Management",
    description: "Complete case and practice management for solo attorneys.",
    type: "website",
    siteName: "SoloLawyer",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
  // SEO optimization
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add Google Search Console verification here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <MuiProvider>{children}</MuiProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
