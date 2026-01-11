"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function ScrollReveal({ children, delay = 0, direction = "up", className = "" }: ScrollRevealProps) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      viewport={{ once: false, margin: "-60px", amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

