"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Phone, Building, BookOpen, Users, Send, CheckCircle, AlertCircle } from "lucide-react"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import GlassCard from "@/components/ui/glass-card"

const competitions = [
  "Hackathon",
  "Code Wars",
  "Robo Race",
  "Battle Royale (Gaming)",
  "Design Sprint",
  "ML Challenge",
  "CTF Challenge",
]

interface FormData {
  name: string
  email: string
  phone: string
  college: string
  branch: string
  teamName: string
  teamSize: string
  competition: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  college?: string
  competition?: string
}

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    teamName: "",
    teamSize: "1",
    competition: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.college.trim()) {
      newErrors.college = "College name is required"
    }

    if (!formData.competition) {
      newErrors.competition = "Please select a competition"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitStatus("success")
    setIsSubmitting(false)

    setTimeout(() => {
      router.push("/registration-success")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
      <section id="register" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#ff0080]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader
              subtitle="Join Us"
              title="Register Now"
              description="Secure your spot at the biggest tech fest of the year. Limited seats available!"
          />

          <ScrollReveal>
            <div className="space-y-4">
              <GlassCard className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-[#00f0ff]" />
                        Full Name *
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.name ? "border-red-500" : "border-white/10"
                          } text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors`}
                          placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#00f0ff]" />
                        Email Address *
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.email ? "border-red-500" : "border-white/10"
                          } text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors`}
                          placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#00f0ff]" />
                        Phone Number *
                      </label>
                      <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.phone ? "border-red-500" : "border-white/10"
                          } text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors`}
                          placeholder="10-digit phone number"
                      />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="college" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#00f0ff]" />
                        College/University *
                      </label>
                      <input
                          type="text"
                          id="college"
                          name="college"
                          value={formData.college}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.college ? "border-red-500" : "border-white/10"
                          } text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors`}
                          placeholder="Your college name"
                      />
                      {errors.college && <p className="text-red-500 text-xs">{errors.college}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="branch" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#00f0ff]" />
                        Branch/Department
                      </label>
                      <input
                          type="text"
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                          placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="teamName" className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#00f0ff]" />
                        Team Name (if applicable)
                      </label>
                      <input
                          type="text"
                          id="teamName"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                          placeholder="Your team name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="teamSize" className="text-white/80 text-sm font-medium">
                        Team Size
                      </label>
                      <select
                          id="teamSize"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                      >
                        {[1, 2, 3, 4, 5].map((size) => (
                            <option key={size} value={size} className="bg-[#0a0a15]">
                              {size} {size === 1 ? "member" : "members"}
                            </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="competition" className="text-white/80 text-sm font-medium">
                        Select Competition *
                      </label>
                      <select
                          id="competition"
                          name="competition"
                          value={formData.competition}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                              errors.competition ? "border-red-500" : "border-white/10"
                          } text-white focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff] transition-colors`}
                      >
                        <option value="" className="bg-[#0a0a15]">
                          Select a competition
                        </option>
                        {competitions.map((comp) => (
                            <option key={comp} value={comp} className="bg-[#0a0a15]">
                              {comp}
                            </option>
                        ))}
                      </select>
                      {errors.competition && <p className="text-red-500 text-xs">{errors.competition}</p>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || submitStatus === "success"}
                        className={`w-full py-4 rounded-full font-bold text-lg tracking-wider flex items-center justify-center gap-3 transition-all duration-300 ${
                            submitStatus === "success"
                                ? "bg-green-500 text-white"
                                : submitStatus === "error"
                                    ? "bg-red-500 text-white"
                                    : "bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                      ) : submitStatus === "success" ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Registration Successful!
                          </>
                      ) : submitStatus === "error" ? (
                          <>
                            <AlertCircle className="w-5 h-5" />
                            Something went wrong
                          </>
                      ) : (
                          <>
                            <Send className="w-5 h-5" />
                            REGISTER NOW
                          </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-white/50 text-sm">
                    By registering, you agree to our{" "}
                    <a href="#" className="text-[#00f0ff] hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#00f0ff] hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </GlassCard>

              <p className="text-center text-white/60 text-sm">
                 Meanwhile, check this{" "}
                <Link href="/game" className="text-[#00f0ff] hover:underline">
                  out!
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
  )
}
