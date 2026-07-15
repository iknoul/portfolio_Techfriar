"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface TimelineEvent {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experienceData: TimelineEvent[] = [
  {
    title: "Junior Developer",
    company: "TechFriar Technologies",
    location: "Kochi, Kerala (On-site)",
    period: "Oct 2024 - Present",
    description: [
      "Ship high-performance Next.js and TypeScript experiences with refined interactions and pixel-perfect execution.",
      "Build scalable API contracts, GraphQL schemas, and resilient server logic for modern product teams.",
      "Own end-to-end deliverables across design handoff, implementation, code review, and production deployments."
    ],
  },
  {
    title: "MERN Stack Intern & Team Lead",
    company: "TechMindz Carnival-InfoPark",
    location: "Kochi, Kerala (On-site)",
    period: "May 2024 - Oct 2024",
    description: [
      "Led a product-focused engineering pod to deliver responsive React interfaces and performance optimizations.",
      "Implemented secure auth flows and offline-capable Progressive Web App patterns for better user reliability.",
      "Delivered backend services with clean REST contracts, validation, and maintainable Node.js architecture."
    ],
  },
  {
    title: "MERN Stack Trainee",
    company: "TechMindz Carnival-InfoPark",
    location: "Kochi, Kerala (On-site)",
    period: "Dec 2023 - May 2024",
    description: [
      "Refined end-to-end MERN workflows, building robust REST APIs and polished frontend interfaces.",
      "Applied clean architecture principles, reusable components, and disciplined Git collaboration.",
      "Delivered challenge solutions with strong correctness and maintainability under production-style review."
    ],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2021 - Present",
    description: [
      "Design and deploy custom web products using Next.js, React, and Python for local and global clients.",
      "Embed lightweight machine learning models into production experiences for better business outcomes.",
      "Maintain a delivery-first approach with polished product quality and responsive client communication."
    ],
  }
];

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 w-full ${
      isEven ? "md:justify-start" : "md:justify-end"
    }`}>
      {/* Connector Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1.5 z-10" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`w-full md:w-[45%] ml-10 md:ml-0 p-6 rounded-2xl bg-card border border-border/80 hover:border-accent/40 shadow-sm transition-all duration-300 ${
          isEven ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            {event.company}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {event.period}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground font-heading mb-1">{event.title}</h3>
        <span className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {event.location}
        </span>

        <ul className="space-y-2.5">
          {event.description.map((desc, idx) => (
            <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth scroll spring animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-16">
      <div className="mb-12 md:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
          Professional Journey
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg md:mx-auto">
          A curated timeline of software craftsmanship, product delivery, and technical leadership.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-4">
        {/* Background line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/40 -translate-x-[0.5px]" />

        {/* Animated Drawing Line */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent origin-top -translate-x-[0.5px]"
        />

        <div className="space-y-2">
          {experienceData.map((event, index) => (
            <TimelineCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
