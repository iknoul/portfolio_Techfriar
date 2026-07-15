"use client";

import { motion } from "framer-motion";
import { Code, BrainCircuit } from "lucide-react";

interface RoleSwitcherProps {
  role: "fullstack" | "aiml";
  onChange: (role: "fullstack" | "aiml") => void;
}

export default function RoleSwitcher({ role, onChange }: RoleSwitcherProps) {
  return (
    <div className="sticky top-4 z-40 flex justify-center px-4 mb-8">
      <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-glass backdrop-blur-md shadow-lg shadow-black/5 max-w-sm w-full">
        {/* Full-Stack Tab */}
        <button
          onClick={() => onChange("fullstack")}
          className={`relative flex items-center justify-center gap-2 flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer focus:outline-hidden ${
            role === "fullstack" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {role === "fullstack" && (
            <motion.span
              layoutId="active-role"
              className="absolute inset-0 bg-accent rounded-full -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Code className="w-3.5 h-3.5" />
          <span>Full-Stack Dev</span>
        </button>

        {/* AI/ML Tab */}
        <button
          onClick={() => onChange("aiml")}
          className={`relative flex items-center justify-center gap-2 flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer focus:outline-hidden ${
            role === "aiml" ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {role === "aiml" && (
            <motion.span
              layoutId="active-role"
              className="absolute inset-0 bg-accent rounded-full -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>AI/ML Engineer</span>
        </button>
      </div>
    </div>
  );
}
