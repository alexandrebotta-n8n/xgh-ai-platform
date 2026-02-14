import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Importações da Vercel
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Importação do Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google';

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

// AQUI ESTAVA O ERRO: Agora temos apenas UMA declaração de metadata
export const metadata: Metadata = {
  title: "XGH-AI | Go Horse Process",
  description: "A evolução da gambiarra com inteligência artificial.",
  icons: {
    icon: "/icon.png", // Certifique-se que o icon.png está na pasta public
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
        {/* Adicionando FontAwesome para os ícones funcionarem */}
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
        
        {/* Componentes de Monitoramento */}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-SZJLK28667" />
      </body>
    </html>
  );
}