"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff0080] p-[2px] group"
                    aria-label="Scroll to top"
                >
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronUp className="w-6 h-6 text-[#00f0ff] group-hover:text-black transition-colors duration-300" />
                        </motion.div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-[#00f0ff]/20 blur-lg -z-10 group-hover:bg-[#00f0ff]/40 transition-colors duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
