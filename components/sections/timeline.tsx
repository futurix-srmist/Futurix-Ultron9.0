"use client"

import ScrollReveal from "@/components/animation/scroll-reveal"
import SectionHeader from "@/components/ui/section-header"
import AnimatedBackground from "@/components/ui/animated-background"

const timelineEvents = [
  {
    date: "March 15, 2025",
    day: "Day 1",
    title: "Opening Ceremony & Workshops",
    events: [
      "9:00 AM - Registration Opens",
      "10:00 AM - Grand Opening Ceremony",
      "11:30 AM - Keynote: Future of AI",
      "2:00 PM - Workshop: Web3 Development",
      "5:00 PM - Hackathon Kickoff",
    ],
  },
  {
    date: "March 16, 2025",
    day: "Day 2",
    title: "Competitions & Challenges",
    events: [
      "9:00 AM - Coding Competition Begins",
      "11:00 AM - Robotics Challenge",
      "2:00 PM - UI/UX Design Sprint",
      "4:00 PM - Gaming Tournament",
      "8:00 PM - Hackathon Continues",
    ],
  },
  {
    date: "March 17, 2025",
    day: "Day 3",
    title: "Finals & Closing",
    events: [
      "9:00 AM - Final Presentations",
      "12:00 PM - Project Demos",
      "3:00 PM - Award Ceremony",
      "5:00 PM - Prize Distribution",
      "7:00 PM - Closing Celebration",
    ],
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="grid" />

      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00f0ff]/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          subtitle="Event Schedule"
          title="Three Days of Innovation"
          description="A packed schedule of events, competitions, and workshops across three exciting days."
        />

        <div className="space-y-12">
          {timelineEvents.map((day, dayIndex) => (
            <ScrollReveal key={day.day} delay={dayIndex * 0.15}>
              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-black border-2 border-[#00f0ff] flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-[#00f0ff]" />
                </div>

                <div
                  className={`glass-card p-8 md:p-10 ${dayIndex % 2 === 0 ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"} md:w-[calc(50%-2rem)]`}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff0080] text-black">
                      {day.day}
                    </span>
                    <span className="text-[#00f0ff] font-mono text-sm">{day.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-6">{day.title}</h3>

                  <ul className="space-y-3">
                    {day.events.map((event, eventIndex) => (
                      <li key={eventIndex} className="flex items-start gap-3 text-white/70">
                        <span className="w-2 h-2 rounded-full bg-[#ff0080] mt-2 flex-shrink-0" />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
