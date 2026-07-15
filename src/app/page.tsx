"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import RoleSwitcher from "@/components/RoleSwitcher";
import StatsBar from "@/components/StatsBar";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import MouseTrail from "@/components/MouseTrail";

export default function Home() {
  const [role, setRole] = useState<"fullstack" | "aiml">("fullstack");

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic interactive mouse trail */}
      <MouseTrail />
      
      <div>
        {/* Hero Section */}
        <Hero role={role} />

        {/* Dynamic Role Switcher (Sticky navigation toggler) */}
        <RoleSwitcher role={role} onChange={setRole} />

        {/* Stats Count Up Metrics */}
        <StatsBar />

        {/* Case Studies / Projects */}
        <Projects role={role} />

        {/* Professional Experience Timeline */}
        <Timeline />

        {/* Tech Skills Tag Grid */}
        <Skills role={role} />

        {/* Academic Education & Certifications */}
        <Education />

        {/* Connect & Contact Forms */}
        <Contact />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 py-8 px-6 md:px-12 bg-card/20">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Shamil Rahman. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#experience" className="hover:text-accent transition-colors">Experience</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
