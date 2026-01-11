"use client"

import { useState } from "react"
import { Code2, Bot, Gamepad2, Palette, Brain, Shield, Users, Clock, Trophy } from "lucide-react"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import GlassCard from "@/components/ui/glass-card"

const categories = ["All", "Coding", "Robotics", "Gaming", "Design", "AI/ML"]

const competitions = [
  {
    title: "Code Wars",
    category: "Coding",
    icon: Code2,
    description: "Battle it out in algorithmic challenges and DSA problems.",
    teamSize: "Individual",
    duration: "3 hours",
    prize: "₹50,000",
    difficulty: "Advanced",
    color: "#00f0ff",
  },
  {
    title: "Robo Race",
    category: "Robotics",
    icon: Bot,
    description: "Design and race autonomous robots through obstacle courses.",
    teamSize: "2-4 members",
    duration: "Full day",
    prize: "₹75,000",
    difficulty: "Intermediate",
    color: "#ff0080",
  },
  {
    title: "Battle Royale",
    category: "Gaming",
    icon: Gamepad2,
    description: "Esports tournament featuring BGMI, Valorant, and more.",
    teamSize: "4-5 members",
    duration: "2 days",
    prize: "₹40,000",
    difficulty: "All levels",
    color: "#8b5cf6",
  },
  {
    title: "Design Sprint",
    category: "Design",
    icon: Palette,
    description: "Create stunning UI/UX designs for real-world problems.",
    teamSize: "Individual/Duo",
    duration: "6 hours",
    prize: "₹30,000",
    difficulty: "Intermediate",
    color: "#00f0ff",
  },
  {
    title: "ML Challenge",
    category: "AI/ML",
    icon: Brain,
    description: "Build and train models to solve complex prediction tasks.",
    teamSize: "2-3 members",
    duration: "24 hours",
    prize: "₹60,000",
    difficulty: "Advanced",
    color: "#ff0080",
  },
  {
    title: "CTF Challenge",
    category: "Coding",
    icon: Shield,
    description: "Capture the flag cybersecurity competition.",
    teamSize: "2-4 members",
    duration: "8 hours",
    prize: "₹45,000",
    difficulty: "Advanced",
    color: "#8b5cf6",
  },
]

export default function Competitions() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredCompetitions =
    activeCategory === "All" ? competitions : competitions.filter((comp) => comp.category === activeCategory)

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black via-[#0a0a15] to-black">
      
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Competitions"
          title="Test Your Skills"
          description="Choose from a variety of competitions across different domains and skill levels."
        /> 

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black"
                    : "border border-white/20 text-white/70 hover:border-[#00f0ff]/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp, index) => (
            <ScrollReveal key={comp.title} delay={index * 0.1}>
              <GlassCard className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${comp.color}20` }}
                  >
                    <comp.icon className="w-6 h-6" style={{ color: comp.color }} />
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${comp.color}20`,
                      color: comp.color,
                    }}
                  >
                    {comp.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{comp.title}</h3>
                <p className="text-white/60 text-sm mb-6 flex-grow">{comp.description}</p>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Users className="w-4 h-4 text-[#00f0ff]" />
                    <span>{comp.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Clock className="w-4 h-4 text-[#ff0080]" />
                    <span>{comp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-white">{comp.prize}</span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
      */
    </section> 
  )
}
