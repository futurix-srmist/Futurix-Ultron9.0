"use client"

import { Trophy, GraduationCap } from "lucide-react"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import GlassCard from "@/components/ui/glass-card"
import AnimatedBackground from "@/components/ui/animated-background"

export default function Prizes() {
  return (
    <section className="py-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="particles" />

      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Rewards"
          title="Prize Pool & Recognition"
          description="Celebrating innovation, effort, and excellence at ULTRON 9.0."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Prize Pool */}
          <ScrollReveal delay={0.1}>
            <GlassCard className="text-center">
              <Trophy className="w-12 h-12 text-[#00f0ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Total Prize Pool
              </h3>
              <div className="text-3xl font-bold gradient-text mb-2">
                ₹30,000
              </div>
              <p className="text-white/60 text-sm">
                A total prize pool of ₹30,000 for ULTRON 9.0.
              </p>
            </GlassCard>
          </ScrollReveal>

          {/* Awards & Certificates */}
          <ScrollReveal delay={0.2}>
            <GlassCard className="text-center">
              <GraduationCap className="w-12 h-12 text-[#00f0ff] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">
                Awards & Certificates
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Awards, certificates, and special recognitions will be presented
                to the winning teams and finalists during the valedictory ceremony.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
