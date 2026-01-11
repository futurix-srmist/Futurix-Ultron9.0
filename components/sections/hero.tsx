"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import SparklyText from "@/components/ui/sparkly-text"
import TextFlip from "@/components/ui/text-flip"
import GlowingButton from "@/components/ui/glowing-button"

const HeroBackground = dynamic(() => import("@/components/three/hero-background"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0a0a0f]" />,
})

// Large Background Text (like "FORGE" in VRTX)
function BackgroundText() {
    return (
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
            <div className="text-[20vw] font-black text-white/[0.02] tracking-[0.1em] select-none translate-x-[10%]">
                ULTRON
            </div>
        </div>
    )
}

// Dot Grid Pattern (left side)
function DotGridPattern() {
    return (
        <div className="absolute left-12 top-[20%] pointer-events-none z-20">
            <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 42 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-white/20"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 0.45, 0.2] }}
                        transition={{
                            duration: 4,
                            delay: i * 0.06,
                            repeat: Infinity,
                            ease: [0.45, 0, 0.55, 1],
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

// Crosshair Element
function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none ${className}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="0" x2="12" y2="8" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="12" y1="16" x2="12" y2="24" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="0" y1="12" x2="8" y2="12" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="16" y1="12" x2="24" y2="12" stroke="white" strokeWidth="1" opacity="0.4" />
            </svg>
        </div>
    )
}

// Circle with target markers
function TargetCircle({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none ${className}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1" opacity="0.3" />
                <circle cx="10" cy="10" r="3" fill="white" opacity="0.5" />
            </svg>
        </div>
    )
}

// Large Ring Component (like around the robot in VRTX)
function LargeRing() {
    return (
        <motion.div
            className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.5
            }}
        >
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]">
                <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="2" opacity="0.8" />
                <circle cx="300" cy="300" r="275" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </svg>
        </motion.div>
    )
}

// HUD Corner Brackets
function HUDCorners() {
    return (
        <>
            {/* Top Left */}
            <div className="absolute top-6 left-6 w-12 h-12 pointer-events-none z-30">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-white/30" />
            </div>

            {/* Top Right */}
            <div className="absolute top-6 right-6 w-12 h-12 pointer-events-none z-30">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-white/30" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-white/30" />
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-6 left-6 w-12 h-12 pointer-events-none z-30">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/30" />
                <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white/30" />
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-6 right-6 w-12 h-12 pointer-events-none z-30">
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/30" />
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white/30" />
            </div>
        </>
    )
}

// HUD Lines (like the ones in VRTX)
function HUDLines() {
    return (
        <>
            {/* Top right area lines */}
            <div className="absolute top-24 right-48 pointer-events-none z-20 hidden lg:block">
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-[1px] bg-white/20" />
                    <div className="w-16 h-[1px] bg-white/10" />
                    <div className="w-20 h-[1px] bg-white/15" />
                </div>
            </div>

            {/* Right side vertical line with text */}
            <div className="absolute right-[15%] top-32 pointer-events-none z-20 hidden lg:flex flex-col items-center gap-2">
                <span className="text-[10px] text-white/40 font-mono tracking-wider">ULTRON</span>
                <div className="w-[1px] h-20 bg-white/20" />
                <div className="w-4 h-4 rounded-full border border-white/30" />
            </div>
        </>
    )
}

// Scroll Indicator
function ScrollIndicator() {
    return (
        <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            <motion.span
                className="text-white/40 text-[10px] font-mono tracking-[0.3em]"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            >
                SCROLL
            </motion.span>
            <Crosshair />
        </motion.div>
    )
}

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
            {/* 3D Background - positioned to the right */}
            <div className="absolute inset-0 z-0">
                <HeroBackground />
            </div>

            {/* Background large text */}
            <BackgroundText />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/50 z-10" />

            {/* HUD Elements */}
            <HUDCorners />
            <HUDLines />
            <DotGridPattern />

            {/* Crosshairs scattered */}
            <Crosshair className="absolute left-[8%] top-[45%] z-20 hidden lg:block" />
            <Crosshair className="absolute left-[12%] bottom-[30%] z-20 hidden lg:block" />
            <TargetCircle className="absolute left-[5%] top-[55%] z-20 hidden lg:block" />
            <TargetCircle className="absolute left-[15%] top-[35%] z-20 hidden lg:block" />

            {/* Main Content - Left Aligned */}
            <div className="relative z-20 px-4 sm:px-8 md:px-16 lg:px-24 max-w-4xl">
                {/* Main Title - Large and Bold */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-6"
                >
                    {/* ULTRON 9.0 Logo - Clean and Sharp */}
                    <div className="mb-4 mt-2">
                        <Image
                            src="/images/ultron-hero-logo.png"
                            alt="ULTRON 9.0"
                            width={600}
                            height={150}
                            className="w-full max-w-[280px] sm:max-w-md md:max-w-xl h-auto"
                            priority
                            quality={100}
                            style={{ imageRendering: 'crisp-edges' }}
                        />
                        <div className="mt-3 w-full max-w-[280px] sm:max-w-md md:max-w-xl text-center text-white/60 text-xs sm:text-sm font-mono tracking-[0.25em]">
                            24 hour hackathon @TP2 7th Floor
                        </div>
                    </div>

                    {/* Student Technology Association label */}
                    <motion.div
                        className="flex items-center gap-3 mt-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <motion.div
                            className="h-[2px] w-8 bg-gradient-to-r from-[#00f0ff] to-transparent"
                            animate={{ width: [32, 48, 32] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                        />
                        <span className="text-[#00f0ff] text-sm font-mono tracking-[0.3em] uppercase">
              Student Technology Association
            </span>
                    </motion.div>
                </motion.div>

                {/* Taglines */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-6"
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/90 tracking-wide mb-2">
                        <span className="text-[#00f0ff]">Innovators Today.</span>{" "}
                        <span className="text-[#ff0080]">Leaders Tomorrow.</span>
                    </h2>
                </motion.div>





                {/* CTA Button with glow effect */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 mt-6"
                >
                    <a
                        href="https://konfhub.com/checkout/high-impact-zonal-event-2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <GlowingButton variant="rainbow" className="w-full sm:w-auto">
                            Register Now
                        </GlowingButton>
                    </a>

                </motion.div>
            </div>

            {/* Side Info - like VRTX coordinates */}
            <div className="absolute left-8 bottom-24 z-20 hidden lg:block">
                <div className="text-[10px] font-mono text-white/30 space-y-1">
                    <div>LAT: 18.5204°</div>
                    <div>LNG: 73.8567°</div>
                </div>
            </div>

            {/* Right side info */}
            <div className="absolute right-8 top-1/3 z-20 hidden lg:block">
                <div className="text-[10px] font-mono text-white/30 text-right space-y-1">
                    <div>STATUS: ACTIVE</div>
                    <div>CORE: STABLE</div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <ScrollIndicator />
        </section>
    )
}
