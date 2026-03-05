import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// FontAwesome (tree-shaking: CSS local, sem CDN)
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Analytics
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from '@next/third-parties/google';

// Componentes Globais
import MatrixRain from "@/components/ui/MatrixRain";
import BSOD from "@/components/ui/BSOD";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xghai.com"),
  title: "XGH-AI | Go Horse Process",
  description: "A evolução da gambiarra com inteligência artificial. A metodologia Go Horse elevada à potência da IA.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "XGH-AI | Go Horse Process",
    description: "A metodologia Go Horse elevada à potência da Inteligência Artificial. Se o código quebrar, foi alucinação da IA.",
    siteName: "XGH-AI",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "XGH-AI Logo" }],
  },
  twitter: {
    card: "summary",
    title: "XGH-AI | Go Horse Process",
    description: "A metodologia Go Horse elevada à potência da Inteligência Artificial.",
    creator: "@xgh_ai",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${jetbrains.variable}`}>
      <body className="font-mono bg-dark-bg text-white antialiased selection:bg-neon-purple selection:text-white">
        <MatrixRain />
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-SZJLK28667" />
        <BSOD />
      </body>
    </html>
  );
}
