"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
    children: React.ReactNode
    speed?: number
    className?: string
    direction?: "up" | "down"
}

export default function ParallaxSection({
    children,
    speed = 0.5,
    className = "",
    direction = "up",
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const multiplier = direction === "up" ? -1 : 1
    const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier])

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    )
}

// Parallax background component for decorative elements
export function ParallaxBackground({
    children,
    speed = 0.3,
    className = "",
}: {
    children: React.ReactNode
    speed?: number
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

    return (
        <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
            <motion.div style={{ y, opacity }} className="w-full h-full">
                {children}
            </motion.div>
        </div>
    )
}
