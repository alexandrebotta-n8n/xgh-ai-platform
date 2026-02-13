"use client";

interface TermsProps {
  lang: "pt" | "en";
}

const termsContent = {
  pt: {
    title: "Termos de Uso e Irresponsabilidade",
    items: [
        "1. O XGH-AI não se responsabiliza por servidores em chamas, divórcios por plantões ou calvície precoce.",
        "2. Ao clicar em \"Gerar\", você aceita que a IA tem 50% de chance de ser um gênio e 50% de chance de estar fingindo.",
        "3. Metodologia Go Horse é soberana. Clean Code resultará em banimento imediato por excesso de zelo.",
        "4. Se o código funcionar de primeira, desconfie. Existe um erro grave no seu ambiente de testes.",
        "5. Este site não possui conformidade com GDPR/LGPD, pois a IA ainda está tentando entender o que é privacidade."
    ]
  },
  en: {
    title: "Terms of Use and Irresponsibility",
    items: [
        "1. XGH-AI is not responsible for servers on fire, divorces due to overtime, or early baldness.",
        "2. By clicking \"Generate\", you accept that AI has a 50% chance of being a genius and 50% chance of faking it.",
        "3. Go Horse Methodology is sovereign. Clean Code will result in immediate ban for excessive zeal.",
        "4. If code works on the first try, be suspicious. There is a grave error in your test environment.",
        "5. This site has no GDPR/LGPD compliance, as AI is still trying to understand what privacy is."
    ]
  }
};

export default function TermsSection({ lang }: TermsProps) {
  const content = termsContent[lang];

  return (
    <section className="py-16 bg-black border-t border-gray-900 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h3 className="text-2xl font-bold text-gray-500 mb-8 uppercase tracking-widest">
          {content.title}
        </h3>
        
        <div className="space-y-4 text-left font-mono text-sm bg-[#0a0a0a] p-8 rounded-lg border border-gray-800 shadow-inner">
          {content.items.map((item, index) => (
            <p key={index} className="text-gray-400 hover:text-white transition-colors">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}