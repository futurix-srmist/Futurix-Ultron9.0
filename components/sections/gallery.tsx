"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import AnimatedBackground from "@/components/ui/animated-background"

const galleryCategories = ["All", "Ultron 8.0", "Lens Lumina 2025", "Lens Lumina 2024"]

const galleryImages = [
 
  /* =====================
     Ultron 8.0 (5 images)
  ====================== */
  
  {
    id: 1,
    category: "Ultron 8.0",
    src: "/images/gallery/ultron 8.0/U8-2.jpg",
    title: "Open Mic",
    color: "#ff0080",
  },
  {
    id: 2,
    category: "Ultron 8.0",
    src: "/images/gallery/ultron 8.0/U8-1.jpg",
    title: "Participants",
    color: "#00f0ff",
  },
  {
    id: 3,
    category: "Ultron 8.0",
    src: "/images/gallery/ultron 8.0/U8-5.jpg",
    title: "Hackathon",
    color: "#ff0080",
  },

  {
    id: 4,
    category: "Ultron 8.0",
    src: "/images/gallery/ultron 8.0/U8-3.JPG",
    title: "Organizing Team",
    color: "#8b5cf6",
  },
  {
    id: 5,
    category: "Ultron 8.0",
    src: "/images/gallery/ultron 8.0/U8-4.jpg",
    title: "Winners",
    color: "#00f0ff",
  },
  
  /* =========================
     Lens Lumina 2024 (5)
  ========================== */
  {
    id: 6,
    category: "Lens Lumina 2024",
    src: "/images/gallery/Lens lumina - 2024/LL24-2.jpg",
    title: "Participants",
    color: "#ff0080",
  },
  {
    id: 7,
    category: "Lens Lumina 2024",
    src: "/images/gallery/Lens lumina - 2024/LL24-5.jpg",
    title: "Event highlights",
    color: "#ff0080",
  },
  {
    id: 8,
    category: "Lens Lumina 2024",
    src: "/images/gallery/Lens lumina - 2024/LL24-3.jpg",
    title: "Lens Lumina 2024",
    color: "#8b5cf6",
  },
  {
    id: 9,
    category: "Lens Lumina 2024",
    src: "/images/gallery/Lens lumina - 2024/ll24-1.jpg",
    title: "Organizing Team",
    color: "#00f0ff",
  },
  {
    id: 10,
    category: "Lens Lumina 2024",
    src: "/images/gallery/Lens lumina - 2024/LL24-4.jpg",
    title: "Winners",
    color: "#00f0ff",
  },
  

  /* =========================
     Lens Lumina 2025 (5)
  ========================== */
  {
    id: 11,
    category: "Lens Lumina 2025",
    src: "/images/gallery/Lens Lumina - 2025/LL25-1.JPG",
    title: "Participants",
    color: "#00f0ff",
  },
  {
    id: 12,
    category: "Lens Lumina 2025",
    src: "/images/gallery/Lens Lumina - 2025/LL25-2.JPG",
    title: "Participants",
    color: "#ff0080",
  },
  {
    id: 13,
    category: "Lens Lumina 2025",
    src: "/images/gallery/Lens Lumina - 2025/LL25-3.JPG",
    title: "Winners",
    color: "#8b5cf6",
  },
  {
    id: 14,
    category: "Lens Lumina 2025",
    src: "/images/gallery/Lens Lumina - 2025/LL25-4.JPG",
    title: "Organizing Team",
    color: "#00f0ff",
  },
  {
    id: 15,
    category: "Lens Lumina 2025",
    src: "/images/gallery/Lens Lumina - 2025/LL25-5.jpg",
    title: "Organizing Team",
    color: "#ff0080",
  },




]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
      activeCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage)

  useEffect(() => {
    if (!selectedImage) return
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
    }
  }, [selectedImage])

  useEffect(() => {
    if (!selectedImage) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selectedImage])

  return (
      <section id="gallery" className="py-24 px-4 relative overflow-hidden">
        <AnimatedBackground variant="particles" />

        <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#ff0080]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader
              subtitle="Gallery"
              title="Past Memories"
              description="Relive the excitement from previous editions of Futurix events."
          />

          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {galleryCategories.map((category) => (
                  <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          activeCategory === category
                              ? "bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black"
                              : "border border-white/20 text-white/70 hover:border-[#00f0ff]/50 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <motion.div layout className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#00f0ff]/20 scrollbar-track-transparent hover:scrollbar-thumb-[#00f0ff]/40">
            <div className="flex gap-4 min-w-max">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, index) => (
                    <ScrollReveal key={img.id} delay={index * 0.05}>
                      <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
                          onClick={() => setSelectedImage(img.id)}
                          whileHover={{ scale: 1.015 }}
                          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                      <Image
                          src={img.src}
                          alt={img.title}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          quality={75}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-sm font-medium" style={{ color: img.color }}>{img.category}</span>
                        <p className="text-white text-xs mt-1">{img.title}</p>
                      </div>

                      <motion.div
                          className="absolute inset-0 rounded-xl transition-all duration-300"
                          style={{
                            border: `2px solid transparent`,
                          }}
                          whileHover={{
                            borderColor: `${img.color}80`,
                            boxShadow: `0 0 20px ${img.color}30`,
                          }}
                      />

                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: img.color }} />
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: img.color }} />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: img.color }} />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: img.color }} />
                    </motion.div>
                  </ScrollReveal>
              ))}
            </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence>
            {selectedImage && selectedImageData && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                    onMouseDown={() => setSelectedImage(null)}
                >
                  <motion.button
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#00f0ff] transition-colors z-10 backdrop-blur"
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        setSelectedImage(null)
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close"
                  >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </motion.button>

                  <motion.div
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.92, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                      className="relative max-w-5xl w-full max-h-[80vh] rounded-xl overflow-hidden"
                      onMouseDown={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-full h-[80vh]">
                      <Image
                          src={selectedImageData.src}
                          alt={selectedImageData.title}
                          fill
                          className="object-contain"
                          sizes="100vw"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="text-sm font-medium" style={{ color: selectedImageData.color }}>
                    {selectedImageData.category}
                  </span>
                      <h3 className="text-xl font-bold text-white mt-1">{selectedImageData.title}</h3>
                    </div>

                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          border: `2px solid ${selectedImageData.color}40`,
                          boxShadow: `0 0 40px ${selectedImageData.color}20`,
                        }}
                    />
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
  )
}
