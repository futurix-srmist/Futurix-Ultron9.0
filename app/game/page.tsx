"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Preloader from "@/components/layout/preloader"
import ScrollToTop from "@/components/ui/scroll-to-top"
import { StrangerPacman } from "@/components/games/StrangerPacman"

const HeroBackground = dynamic(() => import("@/components/three/hero-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#0a0a0f]" />,
})

export default function GamePage() {
  return (
      <>
        <Preloader />
        <main className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <HeroBackground />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          </div>

          <Header />

          <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60">Game Arcade</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
                    Stranger Pacman
                  </h1>
                  <p className="mt-3 text-white/70 max-w-2xl">
                    A neon reimagining of classic arcade action. Choose your hero, clear the maze, and
                    outsmart the Demogorgon.
                  </p>
                </div>

                <Link href="/" className="stranger-button w-fit">
                  Back to Menu
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/70 shadow-[0_0_45px_rgba(0,240,255,0.15)] overflow-hidden">
                <StrangerPacman />
              </div>
            </div>
          </section>

          <Footer />
        </main>
        <ScrollToTop />
      </>
  )
}
