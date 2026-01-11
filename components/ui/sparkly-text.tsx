"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SparklyTextProps {
    children: ReactNode
    className?: string
}

export default function SparklyText({ children, className = "" }: SparklyTextProps) {
    return (
        <span className={`sparkly-text relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>

            {/* Sparkle elements */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <style jsx>{`
        .sparkly-text {
          background: linear-gradient(
            90deg,
            #00f0ff 0%,
            #fff 25%,
            #ff0080 50%,
            #fff 75%,
            #00f0ff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
        </span>
    )
}
