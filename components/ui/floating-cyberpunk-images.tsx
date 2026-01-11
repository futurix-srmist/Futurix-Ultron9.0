"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Reduced number of floating images for better performance
const cyberpunkImages = [
    { src: "/images/futurix-logo.jpg", size: 80 },
    { src: "/images/events/ultron-8-poster.jpg", size: 100 },
]

// Floating cyberpunk image component
function FloatingImage({
    src,
    size,
    delay,
    index,
}: {
    src: string
    size: number
    delay: number
    index: number
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const showImage = () => {
            // Random position avoiding the center area
            const side = Math.random() > 0.5 ? 'left' : 'right'
            const x = side === 'left'
                ? Math.random() * (window.innerWidth * 0.25)
                : window.innerWidth * 0.75 + Math.random() * (window.innerWidth * 0.2)
            const y = Math.random() * (window.innerHeight - size)

            setPosition({ x: Math.max(0, Math.min(x, window.innerWidth - size)), y })
            setIsVisible(true)

            // Hide after 4-6 seconds
            setTimeout(() => {
                setIsVisible(false)
            }, 4000 + Math.random() * 2000)
        }

        // Initial delay based on index
        const initialTimeout = setTimeout(showImage, delay + index * 3000)

        // Repeat every 8-12 seconds (staggered by index)
        const interval = setInterval(showImage, 8000 + Math.random() * 4000 + index * 2000)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [delay, size, mounted, index])

    if (!mounted) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed pointer-events-none z-[5]"
                    style={{ left: position.x, top: position.y }}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{
                        opacity: [0, 0.85, 0.85, 0],
                        scale: [0.5, 1, 1, 0.7],
                        rotate: [-10, 0, 3, -5],
                        y: [0, -15, -8, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        duration: 6,
                        times: [0, 0.12, 0.88, 1],
                        ease: "easeInOut"
                    }}
                >
                    <div
                        className="relative rounded-xl overflow-hidden"
                        style={{
                            width: size,
                            height: size,
                            border: `2px solid rgba(0, 240, 255, 0.4)`,
                            boxShadow: "0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(255, 0, 128, 0.15)",
                        }}
                    >
                        <Image
                            src={src}
                            alt="Cyberpunk decoration"
                            fill
                            className="object-cover"
                            sizes={`${size}px`}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/20 via-transparent to-[#ff0080]/10" />

                        {/* Scan line effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Corner accents */}
                        <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-[#00f0ff]/60" />
                        <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-[#ff0080]/60" />
                        <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-[#ff0080]/60" />
                        <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-[#00f0ff]/60" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function FloatingCyberpunkImages() {
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(true) // Default to mobile (don't render)

    useEffect(() => {
        setMounted(true)
        // Disable on mobile/tablet for performance
        const checkDevice = () => {
            const isMobileDevice = window.innerWidth < 1024 || 
                'ontouchstart' in window ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(isMobileDevice)
        }
        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    // Don't render on mobile or until mounted
    if (!mounted || isMobile) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {cyberpunkImages.map((img, i) => (
                <FloatingImage
                    key={i}
                    src={img.src}
                    size={img.size}
                    delay={3000 + i * 2000}
                    index={i}
                />
            ))}
        </div>
    )
}
