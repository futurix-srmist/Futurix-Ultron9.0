"use client"

import { ReactNode } from "react"

interface HoverTextProps {
    children: ReactNode
    className?: string
    variant?: "underline" | "glitch" | "bounce" | "scale"
}

export default function HoverText({
    children,
    className = "",
    variant = "underline"
}: HoverTextProps) {
    const variants = {
        underline: "hover-underline",
        glitch: "hover-glitch",
        bounce: "hover-bounce",
        scale: "hover-scale",
    }

    return (
        <span className={`${variants[variant]} ${className}`}>
            {children}

            <style jsx>{`
        /* Underline effect */
        .hover-underline {
          position: relative;
          display: inline-block;
        }
        
        .hover-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00f0ff, #ff0080);
          transition: width 0.3s ease;
        }
        
        .hover-underline:hover::after {
          width: 100%;
        }
        
        /* Glitch effect */
        .hover-glitch {
          position: relative;
          display: inline-block;
        }
        
        .hover-glitch:hover {
          animation: glitch 0.3s ease;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
        
        /* Bounce effect */
        .hover-bounce {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .hover-bounce:hover {
          animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        /* Scale effect */
        .hover-scale {
          display: inline-block;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.1);
          color: #00f0ff;
        }
      `}</style>
        </span>
    )
}
