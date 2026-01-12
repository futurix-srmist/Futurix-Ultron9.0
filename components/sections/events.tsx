"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Clock,
  MapPin,
  FileText,
  Mic,
  Flag,
  Code,
  Rocket,
  Trophy,
  Award,
} from "lucide-react"
import SectionHeader from "@/components/ui/section-header"
import AnimatedBackground from "@/components/ui/animated-background"

/* =======================
   Timeline Data
======================= */

interface TimelineEvent {
  day: string
  date: string
  time: string
  title: string
  description: string
  icon: React.ElementType
}

const timelineEvents: TimelineEvent[] = [
  {
    day: "Pre-Event",
    date: "23 Jan 2026",
    time: "11:59 PM",
    title: "Registration Deadline",
    description:
      "Registered teams submit their idea proposals using the standardized PPT template. Submissions are evaluated on innovation, feasibility, relevance, and clarity. Top 100 teams are shortlisted.",
    icon: FileText,
  },
  {
    day: "Day 1",
    date: "29 Jan 2026",
    time: "8:00 AM",
    title: "Reporting & Registration",
    description:
      "Shortlisted teams report to Tech Park 2 for registration and verification before the offline rounds begin.",
    icon: MapPin,
  },
  {
    day: "Day 1",
    date: "29 Jan 2026",
    time: "9:00 AM – 5:00 PM",
    title: "Offline Idea Pitching",
    description:
      "Teams present their ideas in a structured 3-minute pitch format. Judges evaluate ideas using a transparent and unbiased marking scheme.",
    icon: Mic,
  },
  {
    day: "Day 1",
    date: "29 Jan 2026",
    time: "6:00 PM",
    title: "Shortlisting Announcement",
    description:
      "25–30 teams are shortlisted to proceed to the hackathon development phase.",
    icon: Flag,
  },
  {
    day: "Day 1–2",
    date: "29–30 Jan 2026",
    time: "7:00 PM – 7:00 AM",
    title: "Overnight Hackathon",
    description:
      "Shortlisted teams move to Mini Hall 2 for overnight development. Teams work continuously on building and refining their solutions.",
    icon: Code,
  },
  {
    day: "Day 2",
    date: "30 Jan 2026",
    time: "7:00 AM",
    title: "Final Submission",
    description:
      "Teams submit their working prototype, GitHub repository link, and brief documentation explaining their solution.",
    icon: Rocket,
  },
  {
    day: "Day 2",
    date: "30 Jan 2026",
    time: "Post Lunch",
    title: "Top 10 Teams Announcement",
    description:
      "Top 10 teams are shortlisted based on technical strength, innovation, impact, and track alignment.",
    icon: Trophy,
  },
  {
    day: "Day 2",
    date: "30 Jan 2026",
    time: "10:00 AM – 2:00 PM",
    title: "Final Demonstration & Presentation",
    description:
      "Top 10 teams present and demonstrate their projects live to the judging panel.",
    icon: Mic,
  },
  {
    day: "Day 2",
    date: "30 Jan 2026",
    time: "Afternoon",
    title: "Valedictory & Results",
    description:
      "Final results are announced. Winners (1st, 2nd, and 3rd place) receive awards, certificates, and recognitions.",
    icon: Award,
  },
]

/* =======================
   Timeline Card
======================= */

function TimelineCard({
  event,
  index,
}: {
  event: TimelineEvent
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#0a0a0f] border-2 border-[#00f0ff] rounded-full flex items-center justify-center -translate-x-1/2 z-10">
        <event.icon className="w-4 h-4 text-[#00f0ff]" />
      </div>

      {/* Card */}
      <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)]">
        <div className="p-4 sm:p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-bold bg-[#00f0ff]/20 text-[#00f0ff] rounded-full">
              {event.day}
            </span>
            <span className="text-white/50 text-sm">{event.date}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            {event.title}
          </h3>

          <p className="text-white/60 text-sm flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" />
            {event.time}
          </p>

          <p className="text-white/70 text-sm leading-relaxed break-words">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* =======================
   Main Component
======================= */

export default function Events() {
  return (
    <section id="timeline" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground variant="grid" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          subtitle="ULTRON 9.0"
          title="Flow of Ultron"
          description="A structured journey from idea submission to final victory."
        />

        <div className="relative mt-16">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f0ff]/60 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {timelineEvents.map((event, index) => (
              <TimelineCard key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
