import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Futurix | Student Technology Association",
  description:
    "Futurix is a student-driven technology association where curiosity fuels innovation. Join us for Ultron 9.0 - our flagship tech fest featuring hackathons, workshops, and competitions.",
  keywords: ["tech fest", "hackathon", "coding competition", "Futurix", "Ultron 9.0", "student association", "technology"],
  authors: [{ name: "Futurix Team" }],
  openGraph: {
    title: "Futurix | Student Technology Association",
    description: "Where Ideas Ignite. Futures Take Shape. Join Futurix for innovation, creativity, and technology.",
    type: "website",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
