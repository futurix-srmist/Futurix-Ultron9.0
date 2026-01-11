"use client"

import { ReactNode } from "react"

interface MagneticImageProps {
    children: ReactNode
    className?: string
}

export default function MagneticImage({ children, className = "" }: MagneticImageProps) {
    return (
        <div className={`magnetic-image group relative overflow-hidden rounded-xl ${className}`}>
            <div className="magnetic-content transition-transform duration-500 ease-out group-hover:scale-110">
                {children}
            </div>

            {/* Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
            </div>

            {/* Border glow */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#00f0ff]/50 transition-colors duration-300" />

            <style jsx>{`
        .magnetic-image:hover .magnetic-content {
          filter: brightness(1.1);
        }
      `}</style>
        </div>
    )
}
