"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// HUD Corner Brackets
export function HUDCorners() {
    return (
        <>
            {/* Top Left */}
            <div className="absolute top-4 left-4 w-16 h-16 pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-transparent" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#00f0ff] to-transparent" />
            </div>

            {/* Top Right */}
            <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none z-30">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#00f0ff] to-transparent" />
                <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-[#00f0ff] to-transparent" />
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-4 left-4 w-16 h-16 pointer-events-none z-30">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff0080] to-transparent" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-[#ff0080] to-transparent" />
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none z-30">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#ff0080] to-transparent" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-[#ff0080] to-transparent" />
            </div>
        </>
    )
}

// Dot Grid Pattern
export function DotGrid() {
    return (
        <div className="absolute top-1/4 left-8 pointer-events-none z-20 opacity-30">
            <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

// Crosshair Element
export function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none ${className}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                {/* Horizontal line */}
                <line x1="0" y1="20" x2="15" y2="20" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
                <line x1="25" y1="20" x2="40" y2="20" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
                {/* Vertical line */}
                <line x1="20" y1="0" x2="20" y2="15" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
                <line x1="20" y1="25" x2="20" y2="40" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
                {/* Center dot */}
                <circle cx="20" cy="20" r="3" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.8" />
                {/* Outer circle */}
                <circle cx="20" cy="20" r="10" stroke="#ff0080" strokeWidth="0.5" fill="none" opacity="0.4" />
            </svg>
        </div>
    )
}

// Rotating Circle Indicator
export function RotatingIndicator({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`pointer-events-none ${className}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" stroke="#00f0ff" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="4 4" />
                <circle cx="30" cy="30" r="24" stroke="#ff0080" strokeWidth="0.5" fill="none" opacity="0.2" />
                {/* Markers */}
                <circle cx="30" cy="2" r="2" fill="#00f0ff" opacity="0.8" />
                <circle cx="58" cy="30" r="1.5" fill="#ff0080" opacity="0.6" />
            </svg>
        </motion.div>
    )
}

// Scanning Line
export function ScanLine() {
    return (
        <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-30 pointer-events-none z-20"
            animate={{
                top: ["0%", "100%", "0%"],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    )
}

// Side Info Panel
export function SideInfo({ position = "left" }: { position?: "left" | "right" }) {
    const isLeft = position === "left"

    return (
        <div className={`absolute ${isLeft ? "left-8" : "right-8"} top-1/2 -translate-y-1/2 pointer-events-none z-20 hidden lg:block`}>
            <div className={`flex flex-col gap-4 ${isLeft ? "items-start" : "items-end"}`}>
                <motion.div
                    className="text-[#00f0ff]/50 text-xs font-mono tracking-widest"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {isLeft ? "SYS.ONLINE" : "v9.0.0"}
                </motion.div>
                <div className="w-[1px] h-20 bg-gradient-to-b from-[#00f0ff]/50 to-transparent" />
                <div className={`text-xs font-mono text-white/30 ${isLeft ? "text-left" : "text-right"}`}>
                    {isLeft ? (
                        <>
                            <div>LAT: 18.5204</div>
                            <div>LNG: 73.8567</div>
                        </>
                    ) : (
                        <>
                            <div>STATUS: ACTIVE</div>
                            <div>CORE: STABLE</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

// Glitch Text Effect
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
    const [displayText, setDisplayText] = useState(text)
    const [isGlitching, setIsGlitching] = useState(false)

    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setIsGlitching(true)

            let iterations = 0
            const maxIterations = 3

            const scrambleInterval = setInterval(() => {
                setDisplayText(
                    text.split("").map((char, index) => {
                        if (char === " ") return " "
                        if (iterations > index) return text[index]
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    }).join("")
                )

                iterations++

                if (iterations > text.length + maxIterations) {
                    clearInterval(scrambleInterval)
                    setDisplayText(text)
                    setIsGlitching(false)
                }
            }, 30)

        }, 5000)

        return () => clearInterval(glitchInterval)
    }, [text])

    return (
        <span className={`relative ${className}`}>
            <span className="relative z-10">{displayText}</span>
            {isGlitching && (
                <>
                    <span className="absolute top-0 left-0 text-[#00f0ff] animate-pulse z-0 translate-x-[2px]" style={{ clipPath: "inset(0 0 50% 0)" }}>
                        {displayText}
                    </span>
                    <span className="absolute top-0 left-0 text-[#ff0080] animate-pulse z-0 -translate-x-[2px]" style={{ clipPath: "inset(50% 0 0 0)" }}>
                        {displayText}
                    </span>
                </>
            )}
        </span>
    )
}

// Background Large Text
export function BackgroundText({ text }: { text: string }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-5">
            <div className="text-[15vw] font-bold text-white/[0.03] tracking-widest whitespace-nowrap select-none">
                {text}
            </div>
        </div>
    )
}

// Pulsing Scroll Indicator
export function ScrollIndicator() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <motion.div
                className="text-[#00f0ff] text-xs font-mono tracking-[0.3em]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                SCROLL
            </motion.div>
            <motion.div
                className="w-[1px] h-8 bg-gradient-to-b from-[#00f0ff] to-transparent"
                animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    )
}

// Status Bar
export function StatusBar() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }))
        }
        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-8 text-xs font-mono">
            <div className="text-white/40">{time}</div>
            <div className="flex items-center gap-2">
                <motion.div
                    className="w-2 h-2 rounded-full bg-[#00ff00]"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-white/40">SYSTEM ACTIVE</span>
            </div>
        </div>
    )
}
