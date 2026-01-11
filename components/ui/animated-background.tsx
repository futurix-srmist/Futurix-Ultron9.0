"use client"

import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
    variant?: "dots" | "grid" | "particles" | "waves"
    className?: string
}

// Reduced number of dots for better performance
const dotPositions = [
    { left: "10%", top: "20%" },
    { left: "30%", top: "50%" },
    { left: "50%", top: "30%" },
    { left: "70%", top: "60%" },
    { left: "85%", top: "40%" },
]

export default function AnimatedBackground({
    variant = "dots",
    className = ""
}: AnimatedBackgroundProps) {
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(true) // Default to mobile for SSR

    useEffect(() => {
        setMounted(true)
        // Reduce animations on mobile
        setIsMobile(window.innerWidth < 768)
    }, [])

    // Simplified dots variant - static on mobile
    if (variant === "dots") {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Static dots - CSS animation only on desktop */}
                {mounted && dotPositions.map((pos, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full bg-[#00f0ff]/30 ${!isMobile ? 'animate-pulse' : ''}`}
                        style={{
                            left: pos.left,
                            top: pos.top,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '4s',
                        }}
                    />
                ))}

                {/* Static glowing orbs */}
                <div
                    className="absolute w-64 h-64 rounded-full bg-[#00f0ff]/5 blur-3xl"
                    style={{ left: "10%", top: "20%" }}
                />
                <div
                    className="absolute w-48 h-48 rounded-full bg-[#ff0080]/5 blur-3xl"
                    style={{ right: "15%", bottom: "25%" }}
                />
            </div>
        )
    }

    if (variant === "grid") {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Static grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Static glowing orb */}
                <div
                    className="absolute w-96 h-96 rounded-full bg-[#00f0ff]/3 blur-3xl"
                    style={{ left: "-10%", top: "30%" }}
                />
            </div>
        )
    }

    // Simplified particles - static gradient on mobile
    if (variant === "particles") {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Only render moving particles on desktop */}
                {mounted && !isMobile && Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-0.5 h-0.5 rounded-full animate-float-up"
                        style={{
                            left: `${15 + i * 25}%`,
                            bottom: "-5%",
                            background: i % 2 === 0 ? "#00f0ff" : "#ff0080",
                            animationDelay: `${i * 2}s`,
                            animationDuration: '15s',
                        }}
                    />
                ))}

                {/* Ambient glow - always show */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/3 via-transparent to-[#ff0080]/3" />
            </div>
        )
    }

    if (variant === "waves") {
        return (
            <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
                {/* Static wave lines with CSS animation */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute left-0 right-0 h-[1px] ${!isMobile ? 'animate-pulse' : ''}`}
                        style={{
                            top: `${30 + i * 20}%`,
                            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 0, 128, 0.15)"}, transparent)`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s',
                        }}
                    />
                ))}

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#00f0ff]/10" />
                <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#00f0ff]/10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-[#ff0080]/10" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-[#ff0080]/10" />
            </div>
        )
    }

    return null
}
