"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Fixed positions for particles to avoid hydration mismatch
const particlePositions = [
  { x: 10, y: 5 }, { x: 25, y: 15 }, { x: 40, y: 8 }, { x: 55, y: 20 },
  { x: 70, y: 12 }, { x: 85, y: 25 }, { x: 15, y: 35 }, { x: 30, y: 45 },
  { x: 45, y: 38 }, { x: 60, y: 50 }, { x: 75, y: 42 }, { x: 90, y: 55 },
  { x: 20, y: 65 }, { x: 35, y: 75 }, { x: 50, y: 68 }, { x: 65, y: 80 },
  { x: 80, y: 72 }, { x: 95, y: 85 }, { x: 5, y: 90 }, { x: 45, y: 95 },
]

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 8 + (prev < 50 ? 5 : 2) // Deterministic progress
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-6 relative">
                <Image
                  src="/images/futurix-logo.jpg"
                  alt="Futurix Logo"
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-[#00f0ff]"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: [0.45, 0, 0.55, 1],
                  }}
                />
              </div>
              <h1 className="text-3xl font-bold">
                <span className="text-[#00f0ff]">FUTURIX</span>
              </h1>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff0080]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-white/50 text-sm mt-4 font-mono">{Math.min(Math.round(progress), 100)}% Loading...</p>
            </div>

            <motion.p
              className="text-white/30 text-xs mt-8 tracking-widest uppercase"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.45, 0, 0.55, 1] }}
            >
              Initializing Future Tech
            </motion.p>
          </div>

          {/* Background particles - only render after mount */}
          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[#00f0ff]/30"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  animate={{
                    y: [0, -18, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2.5 + (i % 3),
                    delay: i * 0.12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: [0.45, 0, 0.55, 1],
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
