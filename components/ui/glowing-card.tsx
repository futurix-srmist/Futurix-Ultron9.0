"use client"

import { ReactNode, useState } from "react"
import { motion } from "framer-motion"

interface GlowingCardProps {
    children: ReactNode
    className?: string
    glowColor?: string
}

export default function GlowingCard({
    children,
    className = "",
    glowColor = "#00f0ff"
}: GlowingCardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <motion.div
            className={`relative rounded-xl overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glow effect following mouse */}
            {isHovered && (
                <div
                    className="absolute pointer-events-none transition-opacity duration-300"
                    style={{
                        left: mousePosition.x - 100,
                        top: mousePosition.y - 100,
                        width: 200,
                        height: 200,
                        background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
                        filter: "blur(20px)",
                    }}
                />
            )}

            {/* Border glow */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    boxShadow: `0 0 30px ${glowColor}30, inset 0 0 30px ${glowColor}10`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 bg-[rgba(10,10,20,0.8)] backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-[#00f0ff]/50 transition-colors duration-300">
                {children}
            </div>
        </motion.div>
    )
}
