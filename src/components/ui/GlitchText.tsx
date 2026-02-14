"use client";

interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
}

export default function GlitchText({ text, as: Tag = "span", className = "" }: GlitchTextProps) {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-purple opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px] translate-y-[1px]">
        {text}
      </span>
    </Tag>
  );
}