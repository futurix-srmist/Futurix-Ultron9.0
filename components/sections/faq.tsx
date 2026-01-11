"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import AnimatedBackground from "@/components/ui/animated-background"

const faqs = [
  {
    question: "Who can participate in Futurix Ultron 9.0?",
    answer:
      "Any college student from any branch or year can participate. Some events are open to high school students as well. Check individual event requirements for specific eligibility criteria.",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "Early bird registration is ₹199 per person. Regular registration is ₹299. Group discounts are available for teams of 5 or more members registering together.",
  },
  {
    question: "Can I participate in multiple events?",
    answer:
      "Yes! You can register for multiple events as long as their timings don't overlap. We recommend checking the schedule carefully before registering for multiple competitions.",
  },
  {
    question: "What should I bring to the event?",
    answer:
      "Bring your college ID, laptop (for coding events), and any specific equipment mentioned in your event details. Food and refreshments will be provided at the venue.",
  },
  {
    question: "Is accommodation provided?",
    answer:
      "Yes, accommodation is available for outstation participants at a nominal cost. Please mention your accommodation requirements during registration.",
  },
  {
    question: "How will winners be announced?",
    answer:
      "Winners will be announced during the closing ceremony on Day 3. Results will also be published on our website and social media channels.",
  },
  {
    question: "Can I get a refund if I cancel my registration?",
    answer:
      "Full refunds are available until 7 days before the event. After that, 50% refund is applicable until 3 days before. No refunds within 3 days of the event.",
  },
  {
    question: "Will certificates be provided?",
    answer:
      "Yes, all participants will receive digital participation certificates. Winners will receive special winner certificates along with their prizes.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-white/70 border-t border-white/10 pt-4">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-4 bg-gradient-to-b from-black via-[#0a0a15] to-black relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="waves" />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeader
          subtitle="FAQ"
          title="Got Questions?"
          description="Find answers to commonly asked questions about the event."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
