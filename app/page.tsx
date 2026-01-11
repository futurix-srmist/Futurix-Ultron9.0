"use client"

import dynamic from "next/dynamic"
import Header from "@/components/layout/header"
import Preloader from "@/components/layout/preloader"
import Hero from "@/components/sections/hero"
import Footer from "@/components/layout/footer"
import ScrollToTop from "@/components/ui/scroll-to-top"

// Lazy load sections below the fold for better initial performance
const About = dynamic(() => import("@/components/sections/about"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Highlights = dynamic(() => import("@/components/sections/highlights"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Events = dynamic(() => import("@/components/sections/events"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Competitions = dynamic(() => import("@/components/sections/competitions"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Gallery = dynamic(() => import("@/components/sections/gallery"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Team = dynamic(() => import("@/components/sections/team"), {
  ssr: true,
  loading: () => <SectionLoader />
})
const Prizes = dynamic(() => import("@/components/sections/prizes"), {
  ssr: true,
  loading: () => <SectionLoader />
})


// Load cyber cursor only on client side (desktop only)
const CyberCursor = dynamic(() => import("@/components/ui/cyber-cursor"), {
  ssr: false,
})

// Load floating images only on client side - disable for performance
const FloatingCyberpunkImages = dynamic(
  () => import("@/components/ui/floating-cyberpunk-images"),
  { ssr: false }
)

// Lightweight section loader placeholder
function SectionLoader() {
  return (
    <div className="py-24 px-4 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Preloader />
      <CyberCursor />
      <FloatingCyberpunkImages />
      <main className="bg-black min-h-screen">
        <Header />
        <Hero />
        <About />
        {/* <Highlights /> */}
        <Events />
        {/* <Competitions /> */}
        <Gallery />
        <Prizes />
        <Team />

        {/* <FAQ /> */}
        {/*<Registration />*/}
        <Footer />
      </main>
      <ScrollToTop />
    </>
  )
}
