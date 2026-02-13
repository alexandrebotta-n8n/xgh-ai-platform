import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Importações da Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 2. Importação do Google Analytics (Nativo do Next.js 14+)
import { GoogleAnalytics } from '@next/third-parties/google';

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "XGH-AI | Go Horse Process + AI",
  description: "Onde a Inteligência Artificial encontra o Caos Escalável.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${jetbrains.variable}`}>
      <body className="font-mono bg-dark-bg text-white antialiased">
        {children}
        
        {/* Vercel Analytics: Monitora visitantes e acessos */}
        <Analytics />
        
        {/* Vercel Speed Insights: Monitora performance real (Core Web Vitals) */}
        <SpeedInsights />

        {/* Google Analytics: Tag G-SZJLK28667 do seu index.html original */}
        <GoogleAnalytics gaId="G-SZJLK28667" />
      </body>
    </html>
  );
}