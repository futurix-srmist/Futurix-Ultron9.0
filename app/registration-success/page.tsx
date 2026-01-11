"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, CheckCircle, QrCode, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Cyberpunk floating images data
const cyberpunkImages = [
    { src: "/images/events/ultron-8-poster.jpg", size: 120 },
    { src: "/images/events/lens-lumina-2025-poster.jpg", size: 100 },
    { src: "/images/futurix-logo.jpg", size: 80 },
]

// Floating cyberpunk image component
function FloatingImage({
                           src,
                           size,
                           delay
                       }: {
    src: string
    size: number
    delay: number
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const showImage = () => {
            setPosition({
                x: Math.random() * (window.innerWidth - size),
                y: Math.random() * (window.innerHeight - size),
            })
            setIsVisible(true)

            // Hide after 3-5 seconds
            setTimeout(() => {
                setIsVisible(false)
            }, 3000 + Math.random() * 2000)
        }

        // Initial delay
        const initialTimeout = setTimeout(showImage, delay)

        // Repeat every 5-8 seconds
        const interval = setInterval(showImage, 5000 + Math.random() * 3000)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [delay, size])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed pointer-events-none z-10"
                    style={{ left: position.x, top: position.y }}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{
                        opacity: [0, 0.7, 0.7, 0],
                        scale: [0.5, 1, 1, 0.8],
                        rotate: [-10, 0, 5, -5],
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 4, times: [0, 0.2, 0.8, 1] }}
                >
                    <div
                        className="relative rounded-xl overflow-hidden border-2 border-[#00f0ff]/50"
                        style={{
                            width: size,
                            height: size,
                            boxShadow: "0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(255, 0, 128, 0.2)",
                        }}
                    >
                        <Image
                            src={src}
                            alt="Cyberpunk decoration"
                            fill
                            className="object-cover"
                            sizes={`${size}px`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/20 to-transparent" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Glitch text effect
function GlitchText({ children }: { children: string }) {
    return (
        <motion.span
            className="relative inline-block"
            animate={{
                textShadow: [
                    "0 0 10px #00f0ff, 0 0 20px #00f0ff",
                    "2px 0 10px #ff0080, -2px 0 20px #00f0ff",
                    "0 0 10px #00f0ff, 0 0 20px #00f0ff",
                ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {children}
        </motion.span>
    )
}

// Particle effect
function Particles() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${(i * 3.33) % 100}%`,
                        top: `${(i * 7) % 100}%`,
                        background: i % 2 === 0 ? "#00f0ff" : "#ff0080",
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.sin(i) * 50, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

// Scanning line effect
function ScanLine() {
    return (
        <motion.div
            className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent pointer-events-none z-20"
            animate={{
                top: ["-10%", "110%"],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    )
}

export default function RegistrationSuccessPage() {
    const [mounted, setMounted] = useState(false)
    const qrRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const downloadQR = () => {
        // Create a canvas to draw the QR code
        const svg = qrRef.current?.querySelector("svg")
        if (!svg) return

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 400
        canvas.height = 400

        // Draw background
        ctx.fillStyle = "#0a0a0f"
        ctx.fillRect(0, 0, 400, 400)

        // Convert SVG to image and draw
        const svgData = new XMLSerializer().serializeToString(svg)
        const img = new window.Image()
        img.onload = () => {
            ctx.drawImage(img, 50, 50, 300, 300)

            // Download
            const link = document.createElement("a")
            link.download = "futurix-ultron-9-registration-qr.png"
            link.href = canvas.toDataURL("image/png")
            link.click()
        }
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0a0a15] to-[#0a0a0f]" />

            {/* Grid pattern */}
            <div
                className="fixed inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Scan line effect */}
            <ScanLine />

            {/* Particles */}
            {mounted && <Particles />}

            {/* Floating cyberpunk images */}
            {mounted && cyberpunkImages.map((img, i) => (
                <FloatingImage
                    key={i}
                    src={img.src}
                    size={img.size}
                    delay={i * 2000}
                />
            ))}

            {/* Corner decorations */}
            <div className="fixed top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-[#00f0ff]/50" />
            <div className="fixed top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-[#ff0080]/50" />
            <div className="fixed bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-[#ff0080]/50" />
            <div className="fixed bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-[#00f0ff]/50" />

            {/* Main content */}
            <div className="relative z-30 min-h-screen flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full"
                >
                    {/* Success Card */}
                    <div className="relative rounded-3xl border border-[#00f0ff]/30 bg-[#0a0a0f]/80 backdrop-blur-xl overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#ff0080]/10" />

                        <div className="relative p-8 md:p-12 text-center">
                            {/* Success icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="mb-6"
                            >
                                <motion.div
                                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff0080] flex items-center justify-center"
                                    animate={{
                                        boxShadow: [
                                            "0 0 20px rgba(0, 240, 255, 0.5)",
                                            "0 0 40px rgba(255, 0, 128, 0.5)",
                                            "0 0 20px rgba(0, 240, 255, 0.5)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <CheckCircle className="w-10 h-10 text-black" />
                                </motion.div>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl font-bold mb-2"
                            >
                                <GlitchText>Registration Successful!</GlitchText>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/60 mb-8"
                            >
                                Welcome to Ultron 9.0! Scan the QR code below to complete your registration.
                            </motion.p>

                            {/* QR Code */}
                            <motion.div
                                ref={qrRef}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mb-6"
                            >
                                <div className="relative inline-block p-4 rounded-2xl bg-white">
                                    {/* QR Code SVG - Replace with actual QR code library or image */}
                                    <svg
                                        width="200"
                                        height="200"
                                        viewBox="0 0 200 200"
                                        className="mx-auto"
                                    >
                                        {/* QR Code Pattern - Simplified placeholder */}
                                        <rect fill="#000" width="200" height="200" />
                                        {/* Corner squares */}
                                        <rect fill="#fff" x="10" y="10" width="50" height="50" />
                                        <rect fill="#000" x="15" y="15" width="40" height="40" />
                                        <rect fill="#fff" x="20" y="20" width="30" height="30" />

                                        <rect fill="#fff" x="140" y="10" width="50" height="50" />
                                        <rect fill="#000" x="145" y="15" width="40" height="40" />
                                        <rect fill="#fff" x="150" y="20" width="30" height="30" />

                                        <rect fill="#fff" x="10" y="140" width="50" height="50" />
                                        <rect fill="#000" x="15" y="145" width="40" height="40" />
                                        <rect fill="#fff" x="20" y="150" width="30" height="30" />

                                        {/* Data pattern - simplified */}
                                        <rect fill="#fff" x="70" y="10" width="10" height="10" />
                                        <rect fill="#fff" x="90" y="10" width="10" height="10" />
                                        <rect fill="#fff" x="110" y="10" width="10" height="10" />
                                        <rect fill="#fff" x="70" y="30" width="10" height="10" />
                                        <rect fill="#fff" x="90" y="30" width="20" height="10" />
                                        <rect fill="#fff" x="70" y="50" width="30" height="10" />

                                        {/* Center pattern */}
                                        <rect fill="#fff" x="70" y="70" width="60" height="60" />
                                        <rect fill="#000" x="80" y="80" width="40" height="40" />
                                        <text x="100" y="105" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">FU</text>

                                        {/* More data patterns */}
                                        <rect fill="#fff" x="10" y="70" width="10" height="10" />
                                        <rect fill="#fff" x="30" y="70" width="10" height="10" />
                                        <rect fill="#fff" x="10" y="90" width="20" height="10" />
                                        <rect fill="#fff" x="40" y="90" width="10" height="10" />
                                        <rect fill="#fff" x="10" y="110" width="10" height="20" />
                                        <rect fill="#fff" x="30" y="110" width="20" height="10" />

                                        <rect fill="#fff" x="140" y="70" width="20" height="10" />
                                        <rect fill="#fff" x="170" y="70" width="20" height="10" />
                                        <rect fill="#fff" x="140" y="90" width="10" height="20" />
                                        <rect fill="#fff" x="160" y="90" width="30" height="10" />
                                        <rect fill="#fff" x="150" y="110" width="10" height="10" />
                                        <rect fill="#fff" x="170" y="110" width="20" height="10" />

                                        <rect fill="#fff" x="70" y="140" width="10" height="20" />
                                        <rect fill="#fff" x="90" y="140" width="20" height="10" />
                                        <rect fill="#fff" x="120" y="140" width="10" height="20" />
                                        <rect fill="#fff" x="70" y="170" width="30" height="10" />
                                        <rect fill="#fff" x="110" y="170" width="10" height="20" />
                                        <rect fill="#fff" x="130" y="160" width="20" height="10" />

                                        <rect fill="#fff" x="140" y="140" width="50" height="10" />
                                        <rect fill="#fff" x="140" y="160" width="10" height="30" />
                                        <rect fill="#fff" x="160" y="170" width="30" height="10" />
                                        <rect fill="#fff" x="180" y="150" width="10" height="20" />
                                    </svg>

                                    {/* Animated border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-2xl border-2 border-[#00f0ff]"
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(0, 240, 255, 0.5)",
                                                "0 0 30px rgba(0, 240, 255, 0.8)",
                                                "0 0 10px rgba(0, 240, 255, 0.5)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </motion.div>

                            <div className="mb-6">
                                <a
                                    href="https://example.org"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-white/60 hover:text-[#00f0ff] hover:underline transition-colors break-all"
                                >
                                    In case the QR didn't work, click here.
                                </a>
                            </div>

                            {/* Scan instruction */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center justify-center gap-2 mb-6 text-[#00f0ff]"
                            >
                                <QrCode className="w-5 h-5" />
                                <span className="font-mono text-sm uppercase tracking-wider">Scan to Register</span>
                                <Sparkles className="w-5 h-5" />
                            </motion.div>

                            {/* Download button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                onClick={downloadQR}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black font-bold"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)",
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download className="w-5 h-5" />
                                Download QR Code
                            </motion.button>

                            {/* Back to home link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 text-white/50 hover:text-[#00f0ff] transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Home</span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Bottom accent */}
                        <div className="h-1 bg-gradient-to-r from-[#00f0ff] via-[#ff0080] to-[#00f0ff]" />
                    </div>

                    {/* Event info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center mt-6"
                    >
                        <p className="text-white/40 text-sm">
                            Ultron 9.0 • January 28-30, 2025 • SRM Institute of Science and Technology
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
