import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "XGH-AI | Go Horse Process",
  description: "A evolução da gambiarra com inteligência artificial.",
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
      <head>
        {/* --- AQUI ESTÁ A CORREÇÃO: FONTAWESOME 6.4.0 --- */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
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