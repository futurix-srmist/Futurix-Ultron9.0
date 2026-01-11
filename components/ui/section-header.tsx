"use client"

import ScrollReveal from "@/components/animation/scroll-reveal"
import HoverText from "@/components/ui/hover-text"

interface SectionHeaderProps {
  subtitle: string
  title: string
  description?: string
}

export default function SectionHeader({ subtitle, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <ScrollReveal>
        <span className="inline-block text-[#00f0ff] text-sm font-mono tracking-[0.3em] uppercase mb-4 animate-pulse-glow px-4 py-1 rounded-full border border-[#00f0ff]/30">
          {subtitle}
        </span>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-gradient-text text-balance">
          <HoverText variant="scale">{title}</HoverText>
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.2}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto text-pretty">{description}</p>
        </ScrollReveal>
      )}
    </div>
  )
}
