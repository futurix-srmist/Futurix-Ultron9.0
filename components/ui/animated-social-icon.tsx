"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface AnimatedSocialIconProps {
    icon: LucideIcon
    href: string
    label: string
    color?: string
    size?: number
}

export default function AnimatedSocialIcon({
    icon: Icon,
    href,
    label,
    color = "#00f0ff",
    size = 20,
}: AnimatedSocialIconProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 overflow-hidden group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={label}
        >
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
                }}
            />

            {/* Border glow */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    boxShadow: `0 0 20px ${color}50, inset 0 0 10px ${color}20`,
                }}
            />

            {/* Icon */}
            <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Icon
                    size={size}
                    className="relative z-10 transition-colors duration-300 group-hover:text-white"
                    style={{
                        filter: `drop-shadow(0 0 0px ${color})`,
                    }}
                />
            </motion.div>

            {/* Hover border color */}
            <style jsx>{`
        a:hover {
          border-color: ${color};
        }
      `}</style>
        </motion.a>
    )
}
