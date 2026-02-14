import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 1. Importações da Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 2. Importação do Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google';

// 3. Importação do Easter Egg (Tela Azul)
// Se der erro aqui, verifique se você criou o arquivo em src/components/ui/BSOD.tsx
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
        {/* FontAwesome para os ícones funcionarem */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="font-mono bg-dark-bg text-white antialiased">
        {children}
        
        {/* Monitoramento */}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-SZJLK28667" />
        
        {/* Easter Eggs */}
        <BSOD />
      </body>
    </html>
  );
}