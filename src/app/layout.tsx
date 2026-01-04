import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MuiProvider from "@/providers/MuiProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoloLawyer",
  description: "App for solo lawyers to manage their practice efficiently.",
  icons: {
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon_dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiProvider>{children}</MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
