"use client"

import { useEffect, useState, useRef } from "react"

export default function CyberCursor() {
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(true) // Default to mobile (don't render)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = useState(false)
    const rafRef = useRef<number>()
    const targetRef = useRef({ x: 0, y: 0 })
    const currentRef = useRef({ x: 0, y: 0 })
    const ringRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        // Check if mobile/tablet - disable cursor for better performance
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth < 1024 || 
                'ontouchstart' in window ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(isMobileDevice)
        }
        
        checkMobile()
        setMounted(true)

        // Don't run animation loop on mobile
        if (window.innerWidth < 1024 || 'ontouchstart' in window) {
            return
        }

        const updateMousePosition = (e: MouseEvent) => {
            targetRef.current = { x: e.clientX, y: e.clientY }

            // Check if hovering over a clickable element
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer"
            setIsPointer(!!isClickable)
        }

        // Smooth animation loop using requestAnimationFrame
        const animate = () => {
            // Smoother lerp for main cursor
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12

            // Even smoother lerp for outer ring (creates parallax effect)
            ringRef.current.x += (targetRef.current.x - ringRef.current.x) * 0.09
            ringRef.current.y += (targetRef.current.y - ringRef.current.y) * 0.09

            setMousePosition({ x: currentRef.current.x, y: currentRef.current.y })
            setRingPosition({ x: ringRef.current.x, y: ringRef.current.y })
            rafRef.current = requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", updateMousePosition, { passive: true })
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    // Don't render on server or mobile devices
    if (!mounted || isMobile) return null

    return (
        <>
            {/* Main cursor dot */}
            <div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: mousePosition.x - 6,
                    top: mousePosition.y - 6,
                    transform: `scale(${isPointer ? 1.5 : 1})`,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <div className="w-3 h-3 rounded-full bg-[#00f0ff]" />
            </div>

            {/* Outer ring - uses separate position for parallax */}
            <div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    left: ringPosition.x - 20,
                    top: ringPosition.y - 20,
                    transform: `scale(${isPointer ? 1.3 : 1})`,
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <div className={`w-10 h-10 rounded-full border ${isPointer ? "border-[#ff0080]" : "border-[#00f0ff]/40"}`} />
            </div>

            <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
        </>
    )
}

