"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail, MapPin, ArrowUp, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "#team" },
  { name: "Register", href: "#register" },
  { name: "Contact", href: "#contact" },
  { name: "Feeling bored?", href: "/game" },
]

const eventLinks = [
  { name: "Ultron 9.0", href: "#events" },
  { name: "Tech Mesh 2025", href: "https://unstop.com/o/q0l1N4u?lb=8ppDWExF", external: true },
  { name: "Lens Lumina", href: "#events" },
  { name: "Past Events", href: "#events" },
]

// Official Futurix social media handles
const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/futurix.ctech",
    color: "#E1306C",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/futurix-srmist",
    color: "#0A66C2",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:contact@futurix.org",
    color: "#00f0ff",
  },
]

// Animated Social Icon Component
function AnimatedSocialLink({ social }: { social: typeof socialLinks[0] }) {
  return (
    <motion.a
      href={social.href}
      target={social.href.startsWith('http') ? "_blank" : undefined}
      rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
      className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 overflow-hidden group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={social.name}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${social.color}30 0%, transparent 70%)`,
        }}
      />

      {/* Border animation */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          border: `1px solid ${social.color}`,
          boxShadow: `0 0 20px ${social.color}40`,
        }}
      />

      {/* Icon with bounce */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative z-10"
      >
        <social.icon
          size={20}
          className="transition-colors duration-300 group-hover:text-white"
        />
      </motion.div>
    </motion.a>
  )
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer id="contact" className="relative bg-[#0a0a0f] border-t border-[#00f0ff]/10">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="#home" className="flex items-center gap-3 group">
              <motion.div
                className="w-12 h-12 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Image
                  src="/images/futurix-logo.jpg"
                  alt="Futurix Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </motion.div>
              <div>
                <span className="text-xl font-bold block">
                  <span className="text-[#00f0ff] group-hover:text-white transition-colors">FUTURIX</span>
                </span>
                <span className="text-[#ff0080] font-bold text-sm">Student Technology Association</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              A student-run technology association exploring cutting-edge tech, building impactful projects, and inspiring innovation.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <AnimatedSocialLink key={social.name} social={social} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#00f0ff] transition-colors duration-300 text-sm inline-flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/50" />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Events</h3>
            <ul className="space-y-3">
              {eventLinks.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-white/60 hover:text-[#00f0ff] transition-colors duration-300 text-sm inline-flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]/50" />
                      {link.name}
                      {link.external && <ExternalLink size={12} className="ml-1" />}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <motion.a
                  href="mailto:contact@futurix.org"
                  className="flex items-center gap-3 text-white/60 hover:text-[#00f0ff] transition-colors duration-300 text-sm group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center group-hover:bg-[#00f0ff]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[#00f0ff]" />
                  </div>
                  contact@futurix.org
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.instagram.com/futurix.ctech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#E1306C] transition-colors duration-300 text-sm group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E1306C]/10 flex items-center justify-center group-hover:bg-[#E1306C]/20 transition-colors">
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                  </div>
                  @futurix.ctech
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://www.linkedin.com/company/futurix-srmist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#0A66C2] transition-colors duration-300 text-sm group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  </div>
                  futurix-srmist
                </motion.a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <span>
                    SRM Institute of Science
                    <br />
                    and Technology
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2025 Futurix - Student Technology Association. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff0080] flex items-center justify-center text-black z-40"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  )
}
