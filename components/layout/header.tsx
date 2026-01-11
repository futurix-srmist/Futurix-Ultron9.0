"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Timeline", href: "/#timeline" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Team", href: "/#team" },

  // { name: "Game", href: "/game" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-[#00f0ff]/20" : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/#home" className="flex items-center group">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/futurixtech-logo-new.png"
                  alt="FuturixTech Logo"
                  width={200}
                  height={56}
                  className="object-contain drop-shadow-[0_0_15px_rgba(138,43,226,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(138,43,226,0.8)] transition-all duration-300"
                  priority
                />
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-[#00f0ff] transition-colors duration-300 text-sm tracking-wider uppercase font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <a
              href="https://konfhub.com/checkout/high-impact-zonal-event-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black font-bold text-sm tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300"
            >
              REGISTER NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-[#00f0ff]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-white/80 hover:text-[#00f0ff] transition-colors duration-300 text-lg tracking-wider uppercase font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="https://konfhub.com/checkout/high-impact-zonal-event-2026"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black font-bold text-sm tracking-wider rounded-full mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                REGISTER NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
