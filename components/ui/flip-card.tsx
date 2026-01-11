"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FlipCardProps {
    front: React.ReactNode
    back: React.ReactNode
    className?: string
    frontClassName?: string
    backClassName?: string
}

export default function FlipCard({
    front,
    back,
    className = "",
    frontClassName = "",
    backClassName = "",
}: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div
            className={`relative cursor-pointer perspective-1000 ${className}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div
                    className={`absolute inset-0 backface-hidden ${frontClassName}`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {front}
                </div>

                {/* Back */}
                <div
                    className={`absolute inset-0 backface-hidden ${backClassName}`}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {back}
                </div>
            </motion.div>
        </div>
    )
}
