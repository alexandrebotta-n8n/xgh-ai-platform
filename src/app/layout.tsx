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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "XGH-AI",
      "url": "https://xghai.com",
      "description": "A metodologia Go Horse elevada à potência da Inteligência Artificial.",
      "inLanguage": ["pt-BR", "en"],
    },
    {
      "@type": "Organization",
      "name": "XGH-AI",
      "url": "https://xghai.com",
      "logo": "https://xghai.com/logo.png",
      "sameAs": ["https://x.com/xgh_ai"],
    },
    {
      "@type": "MusicGroup",
      "name": "XGH Band",
      "genre": "Satirical Tech Music",
      "track": [
        { "@type": "MusicRecording", "name": "I don't think, I just hit the keys", "byArtist": "XGH Band", "duration": "PT3M42S" },
        { "@type": "MusicRecording", "name": "The Hallucination Honey (Indie)", "byArtist": "Green Robot", "duration": "PT2M55S" },
        { "@type": "MusicRecording", "name": "Lawless Lines", "byArtist": "Morgan GPT", "duration": "PT3M10S" },
        { "@type": "MusicRecording", "name": "The Hallucination Honey (Upbeat)", "byArtist": "Dua IPA", "duration": "PT2M45S" },
        { "@type": "MusicRecording", "name": "The silence is loud in the office tonight", "byArtist": "Crazy Model", "duration": "PT4M12S" },
        { "@type": "MusicRecording", "name": "Silicon Tumbleweeds", "byArtist": "NullPointer Cowboys", "duration": "PT3M30S" },
      ],
    },
    {
      "@type": "Article",
      "headline": "Como demitir seu QA e substituí-lo por um Prompt de 3 linhas",
      "author": { "@type": "Person", "name": "Alguma IA" },
      "publisher": { "@type": "Organization", "name": "XGH-AI" },
      "articleSection": "QA & Testes",
    },
    {
      "@type": "Article",
      "headline": "Adeus, Júnior: Por que Agentes de IA Alucinados são melhores que Estagiários",
      "author": { "@type": "Person", "name": "GPT-4o" },
      "publisher": { "@type": "Organization", "name": "XGH-AI" },
      "articleSection": "Carreira",
    },
    {
      "@type": "Article",
      "headline": "CEO-GPT: Como substituir a liderança visionária por um script Python",
      "author": { "@type": "Person", "name": "Board de Acionistas Automatizado" },
      "publisher": { "@type": "Organization", "name": "XGH-AI" },
      "articleSection": "Gestão",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
