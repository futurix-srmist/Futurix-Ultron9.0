"use client"

import { Code2, Bot, Gamepad2, Lightbulb, Palette, Cpu } from "lucide-react"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import GlowingCard from "@/components/ui/glowing-card"
import HoverText from "@/components/ui/hover-text"
import AnimatedBackground from "@/components/ui/animated-background"

const highlights = [
  {
    icon: Code2,
    title: "Hackathon",
    description: "24-hour coding marathon to build innovative solutions for real-world problems.",
    color: "#00f0ff",
  },
  {
    icon: Bot,
    title: "Robotics",
    description: "Build and program robots to complete challenging tasks and obstacles.",
    color: "#ff0080",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "Compete in esports tournaments featuring popular titles and win big prizes.",
    color: "#8b5cf6",
  },
  {
    icon: Lightbulb,
    title: "Workshops",
    description: "Learn from industry experts in hands-on sessions on cutting-edge technologies.",
    color: "#00f0ff",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Showcase your creative skills in design competitions and challenges.",
    color: "#ff0080",
  },
  {
    icon: Cpu,
    title: "AI/ML Challenge",
    description: "Develop intelligent solutions using machine learning and artificial intelligence.",
    color: "#8b5cf6",
  },
]

export default function Highlights() {
  return (
    <section id="events" className="py-24 px-4 bg-gradient-to-b from-black via-[#0a0a15] to-black relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="dots" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Event Highlights"
          title="What Awaits You"
          description="Explore our diverse range of competitions, workshops, and activities designed to challenge and inspire."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <GlowingCard glowColor={item.color} className="h-full cursor-pointer">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 hover:scale-110 hover:rotate-3"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  <HoverText variant="underline">{item.title}</HoverText>
                </h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </GlowingCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
