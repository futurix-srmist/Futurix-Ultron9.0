"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export default function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6",
        hoverEffect &&
          "transition-all duration-300 hover:border-[#00f0ff]/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
