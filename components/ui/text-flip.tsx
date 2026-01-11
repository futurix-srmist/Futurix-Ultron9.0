"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TextFlipProps {
    words: string[]
    className?: string
}

export default function TextFlip({ words, className = "" }: TextFlipProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [words.length])

    return (
        <span className={`inline-flex overflow-hidden ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                    }}
                    className="text-[#00f0ff] inline-block"
                    style={{
                        textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
                    }}
                >
                    {words[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
