"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface GlowingButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    variant?: "primary" | "secondary" | "rainbow"
    className?: string
}

export default function GlowingButton({
    children,
    onClick,
    href,
    variant = "primary",
    className = ""
}: GlowingButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-wider uppercase overflow-hidden rounded-lg transition-all duration-300 group"

    const variantStyles = {
        primary: "bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] hover:text-black hover:bg-[#00f0ff]",
        secondary: "bg-transparent border-2 border-[#ff0080] text-[#ff0080] hover:text-white hover:bg-[#ff0080]",
        rainbow: "bg-black text-white border-0",
    }

    const content = (
        <>
            {/* Glow effect */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                    className="absolute inset-0 blur-xl"
                    style={{
                        background: variant === "rainbow"
                            ? "linear-gradient(90deg, #00f0ff, #ff0080, #8b5cf6, #00f0ff)"
                            : variant === "primary"
                                ? "rgba(0, 240, 255, 0.4)"
                                : "rgba(255, 0, 128, 0.4)",
                        backgroundSize: variant === "rainbow" ? "300% 100%" : "100% 100%",
                        animation: variant === "rainbow" ? "rainbow-shift 3s linear infinite" : "none",
                    }}
                />
            </span>

            {/* Rainbow border for rainbow variant */}
            {variant === "rainbow" && (
                <span
                    className="absolute inset-0 rounded-lg p-[2px]"
                    style={{
                        background: "linear-gradient(90deg, #00f0ff, #ff0080, #8b5cf6, #00f0ff)",
                        backgroundSize: "300% 100%",
                        animation: "rainbow-shift 3s linear infinite",
                    }}
                >
                    <span className="absolute inset-[2px] bg-black rounded-md" />
                </span>
            )}

            {/* Button text */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
                <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                >
                    →
                </motion.span>
            </span>

            {/* Shine effect on hover */}
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />

            <style jsx>{`
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
        </>
    )

    if (href) {
        return (
            <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
                {content}
            </a>
        )
    }

    return (
        <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
            {content}
        </button>
    )
}
