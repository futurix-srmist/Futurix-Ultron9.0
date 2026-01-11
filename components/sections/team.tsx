"use client"

import { useState } from "react"
import { Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import GlassCard from "@/components/ui/glass-card"
import AnimatedBackground from "@/components/ui/animated-background"

// Official Futurix Core Team with real images
const teamMembers = [
  {
    name: "Abhi Kharel",
    role: "President",
    initials: "AK",
    color: "#00f0ff",
    image: "/images/team/core-Abhi.jpg",
    backContent: "Leading Futurix with vision and passion for technology innovation.",
    linkedin: "https://np.linkedin.com/in/abhikharel",
  },
  {
    name: "Debosmita Paul",
    role: "Vice President",
    initials: "DP",
    color: "#ff0080",
    image: "/images/team/core-Debosmita.jpg",
    backContent: "Supporting leadership and driving strategic initiatives.",
    linkedin: "https://www.linkedin.com/in/debosmita-paul-746121222?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Raunak Raj",
    role: "Secretary",
    initials: "RR",
    color: "#8b5cf6",
    image: "/images/team/core-Raunak.jpg",
    backContent: "Managing communications and administrative excellence.",
    linkedin: "https://www.linkedin.com/in/raunak-raj-034403290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Varshini Myadam",
    role: "Vice Secretary",
    initials: "VM",
    color: "#00f0ff",
    image: "/images/team/core-Varshini.jpg",
    backContent: "Coordinating team activities and member engagement.",
    linkedin: "https://www.linkedin.com/in/varshini-myadam-b71641287?",
  },
  {
    name: "Aayush Mishra",
    role: "Treasurer",
    initials: "AM",
    color: "#ff0080",
    image: "/images/team/core-Aayush.jpg",
    backContent: "Managing finances and ensuring fiscal responsibility.",
    linkedin: "https://Linkedin.com/in/iamaayushmishra",
  },
  {
    name: "Iraa Jaykumar",
    role: "Tech Head",
    initials: "IJ",
    color: "#8b5cf6",
    image: "/images/team/core-Iraa.jpeg",
    backContent: "Driving technical excellence and innovation at Futurix.",
    linkedin: "https://www.linkedin.com/in/iraa-jayakumar",
  },
]

// 3D Flip Team Card Component with real images
function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative h-96 cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Photo and Name */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: `0 0 30px ${member.color}15`,
          }}
        >
          {/* Photo */}
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              loading="lazy"
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, 33vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

            {/* Decorative corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2" style={{ borderColor: `${member.color}60` }} />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2" style={{ borderColor: `${member.color}60` }} />
          </div>

          <div className="p-5 text-center">
            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
            <p className="text-sm font-medium" style={{ color: member.color }}>{member.role}</p>
          </div>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, transparent, ${member.color}50, transparent)` }}
          />
        </div>

        {/* Back - Role Description and Social */}
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${member.color}20, #0a0a0f)`,
            boxShadow: `0 0 40px ${member.color}25`,
          }}
        >
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
            {/* Small avatar circle */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 relative"
              style={{
                borderColor: `${member.color}60`,
                boxShadow: `0 0 18px ${member.color}35`
              }}
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="80px"
                quality={70}
              />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
            <p className="text-sm font-semibold mb-3" style={{ color: member.color }}>{member.role}</p>

            <p className="text-white/70 text-center text-sm leading-relaxed mb-5">
              {member.backContent}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60"
                whileHover={{
                  scale: 1.1,
                  borderColor: "#0A66C2",
                  color: "#0A66C2",
                  boxShadow: "0 0 20px rgba(10, 102, 194, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: `${member.color}50` }} />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: `${member.color}50` }} />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: `${member.color}50` }} />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: `${member.color}50` }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" className="py-18 px-4 bg-gradient-to-b from-black via-[#0a0a15] to-black relative overflow-hidden">
      {/* Animated Background - simplified */}
      <AnimatedBackground variant="waves" />

      {/* Static decorative elements instead of animated particles */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-[#ff0080]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Core Team"
          title="Meet the Minds Behind Futurix"
          description="The passionate individuals working tirelessly to bring you an unforgettable experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 mb-6">
              Want to be part of Team Futurix? We&apos;re always looking for passionate individuals!
            </p>
            <motion.a
              href="mailto:contact@futurix.org"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#00f0ff]/50 text-[#00f0ff] font-medium"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)",
                borderColor: "rgba(0, 240, 255, 0.8)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={18} />
              Get in Touch
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
