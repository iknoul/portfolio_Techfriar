"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";
import { ArrowRight, Download } from "lucide-react";

interface HeroProps {
  role: "fullstack" | "aiml";
}

export default function Hero({ role }: HeroProps) {
  // Staggered children container parameters
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 max-w-[1100px] mx-auto w-full overflow-hidden">
      {/* Background Animated Gradient Mesh */}
      <div className="mesh-bg">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mesh-circle-1"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mesh-circle-2"
        />
      </div>

      {/* Floating Theme Switcher & Header */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <ThemeToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-center"
      >
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-glass backdrop-blur-md text-xs font-medium text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Available Immediately | Kerala, India (Open to Relocation)</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground font-heading"
          >
            Shamil Rahman
          </motion.h1>

          <motion.h2
            key={role}
            variants={itemVariants}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground"
          >
            {role === "fullstack" ? (
              <>
                Full Stack Developer{" "}
                <span className="text-accent font-semibold">(Next.js / TypeScript / GraphQL)</span>
              </>
            ) : (
              <>
                AI/ML Engineer{" "}
                <span className="text-accent font-semibold">(Deep Learning / Computer Vision / NLP)</span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Building premium digital products with crisp interactions, fast performance, and machine learning workflows that scale.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <MagneticButton href="#projects" className="focus:outline-hidden">
              <span className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-300">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <MagneticButton href="/shamil_rahman_resume.pdf" className="focus:outline-hidden">
              <span className="flex items-center gap-2 bg-glass border border-border text-foreground hover:border-accent hover:text-accent px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300">
                Download Resume
                <Download className="w-4 h-4" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="group relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-[0_40px_200px_-100px_rgba(16,185,129,0.35)] backdrop-blur-xl"
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-accent/20 to-transparent blur-3xl opacity-80" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Profile preview</p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">Interactive hero card</h3>
              </div>
              <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-accent/20 shadow-lg shadow-accent/20" />
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-[1.5rem] border border-border bg-[#06101f] shadow-[0_20px_80px_-40px_rgba(0,0,0,0.7)]"
            >
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                alt="Sample portrait placeholder"
                className="h-72 w-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 z-10 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-accent">Sample photo</p>
                <p className="mt-1 text-lg font-semibold">Replace with your own premium portrait</p>
              </div>
            </motion.div>

            <div className="grid gap-3 rounded-[1.5rem] border border-border bg-background/10 p-4 text-sm text-muted-foreground">
              <p className="text-sm text-foreground font-medium">What's interactive here?</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-accent">Mouse trail</span>
                <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-accent">Animated skill tags</span>
                <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-accent">Hover lift card</span>
                <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-accent">Sample photo placeholder</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
