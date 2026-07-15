"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, CheckCircle2, AlertCircle, Cpu, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  built: string;
  tradeoff: string;
  metric: string;
  tech: string[];
  github: string;
  live?: string;
  roleEmphasis: {
    fullstack: number; // Order index for fullstack role
    aiml: number; // Order index for aiml role
  };
}

const projectsData: Project[] = [
  {
    id: "sportykle",
    title: "Sportykle",
    subtitle: "Sports Hub Management System",
    problem: "Booking and managing sports facilities manually led to conflicts, double bookings, and low venue utilization.",
    built: "Designed a full-featured web dashboard with interactive calendar slot selections, real-time availability tracking, and admin configuration panels.",
    tradeoff: "Chose custom slot allocation algorithms on MongoDB instead of heavy SQL database transactions, reducing latency by 40% under concurrent booking loads while accepting the trade-off of application-level validation.",
    metric: "Achieved 99.9% booking system uptime and zero slot double-booking issues post-launch.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/iknoul",
    roleEmphasis: {
      fullstack: 1,
      aiml: 3,
    },
  },
  {
    id: "valuelens",
    title: "Value-Lens",
    subtitle: "Car Value Prediction System",
    problem: "Car pricing is highly subjective, causing customers and dealerships to lose margin due to a lack of data-driven valuation models.",
    built: "An end-to-end predictive application connecting a responsive React user interface with a Flask machine learning engine.",
    tradeoff: "Chose a Python Flask backend over Next.js serverless handlers for the ML inference engine because the XGBoost model files are large (~80MB) and benefit from hot memory residency, avoiding cold starts on Vercel.",
    metric: "Delivered accurate price valuations within 200ms with a Mean Absolute Error (MAE) under $450.",
    tech: ["React.js", "Python", "Flask", "XGBoost", "Scikit-Learn", "Pandas", "Tailwind CSS"],
    github: "https://github.com/iknoul/Injury-Guard", // Using Injury-Guard repo link context
    roleEmphasis: {
      fullstack: 3,
      aiml: 2,
    },
  },
  {
    id: "carrental",
    title: "Car Rental Application",
    subtitle: "On-demand Vehicle Booking",
    problem: "Renting vehicles online usually requires complex paperwork and lacks transparent, live availability tracking.",
    built: "A responsive car rental portal featuring dynamic vehicle inventories, secure booking checkouts, and clean admin controls.",
    tradeoff: "Leveraged JSON Web Tokens (JWT) stored in HTTP-only cookies for authentication to protect sessions from XSS attacks, sacrificing stateless simplicity for enhanced enterprise security.",
    metric: "Resulted in a 40% increase in registration-to-checkout conversions through streamlined UI flow.",
    tech: ["React.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "CSS Modules"],
    github: "https://github.com/iknoul",
    roleEmphasis: {
      fullstack: 2,
      aiml: 4,
    },
  },
  {
    id: "isl",
    title: "Indian Sign Language Detection",
    subtitle: "Computer Vision Gestures Interpreter",
    problem: "Lack of standardized datasets and translator software for Indian Sign Language (ISL), causing a communication gap for deaf and hard-of-hearing communities.",
    built: "A real-time sign language interpreter leveraging computer vision models to convert hand gestures into text outputs.",
    tradeoff: "Manually constructed the custom gesture image dataset. Compared ConvNeXtSmall and DenseNet121 architectures; chose ConvNeXtSmall for better accuracy (~94.5%) and lower parameter size, optimizing for live webcam frames.",
    metric: "Achieved 94.5% classification accuracy on custom gesture frames with real-time feedback.",
    tech: ["Python", "TensorFlow", "OpenCV", "ConvNeXt", "DenseNet121", "Pandas", "Matplotlib"],
    github: "https://github.com/iknoul/Indian-sign-language-detection-using-images-",
    roleEmphasis: {
      fullstack: 4,
      aiml: 1,
    },
  },
];

function TiltCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    // Tilt between -7 and 7 degrees
    const rY = ((mX / width) - 0.5) * 14;
    const rX = ((mY / height) - 0.5) * -14;
    
    setRotateX(rX);
    setRotateY(rY);
    setMouseX(mX);
    setMouseY(mY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      layout
      className="relative overflow-hidden bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent/40 transition-all duration-300 shadow-md flex flex-col justify-between"
    >
      {/* Dynamic Hover Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.08), transparent 80%)`,
        }}
      />
      <div style={{ transform: "translateZ(30px)" }} className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            <span>{project.subtitle}</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground font-heading">
            {project.title}
          </h3>
        </div>

        {/* Case Study Details */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <span className="flex items-start gap-2 text-foreground font-semibold mb-1">
              <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              Problem
            </span>
            <p className="pl-6 text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <span className="flex items-start gap-2 text-foreground font-semibold mb-1">
              <Layers className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              What I Built
            </span>
            <p className="pl-6 text-muted-foreground leading-relaxed">{project.built}</p>
          </div>

          <div>
            <span className="flex items-start gap-2 text-foreground font-semibold mb-1">
              <Cpu className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              Key Technical Decision / Tradeoff
            </span>
            <p className="pl-6 text-muted-foreground leading-relaxed italic">{project.tradeoff}</p>
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-lg p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="text-foreground font-semibold block text-xs uppercase tracking-wide">Result / Metric</span>
              <p className="text-xs text-foreground/80 mt-0.5">{project.metric}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Tech Tags & Links */}
      <div style={{ transform: "translateZ(20px)" }} className="mt-8 pt-6 border-t border-border/40 space-y-4">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Deployment</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ role }: { role: "fullstack" | "aiml" }) {
  // Sort projects depending on active role priority index
  const sortedProjects = [...projectsData].sort((a, b) => {
    return a.roleEmphasis[role] - b.roleEmphasis[role];
  });

  return (
    <section id="projects" className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
          Signature Case Studies
        </h2>
        <p className="text-muted-foreground mt-2">
          Select work built for polished product impact, fast delivery, and technical depth.
        </p>
      </div>

      {/* Grid container with crossfade layout transition */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
