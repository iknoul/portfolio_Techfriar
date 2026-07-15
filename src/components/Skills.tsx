"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  isFSPrimary: boolean; // Primary highlight for Full-Stack Developer
  isMLPrimary: boolean; // Primary highlight for AI/ML Engineer
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Frontend Stack",
    skills: [
      { name: "Next.js 14", isFSPrimary: true, isMLPrimary: false },
      { name: "React.js", isFSPrimary: true, isMLPrimary: false },
      { name: "TypeScript", isFSPrimary: true, isMLPrimary: true },
      { name: "JavaScript", isFSPrimary: true, isMLPrimary: false },
      { name: "Tailwind CSS", isFSPrimary: true, isMLPrimary: false },
      { name: "HTML5 / CSS3", isFSPrimary: true, isMLPrimary: false },
      { name: "Framer Motion", isFSPrimary: true, isMLPrimary: false },
    ],
  },
  {
    title: "Backend Stacks & APIs",
    skills: [
      { name: "Node.js", isFSPrimary: true, isMLPrimary: false },
      { name: "Express.js", isFSPrimary: true, isMLPrimary: false },
      { name: "GraphQL", isFSPrimary: true, isMLPrimary: false },
      { name: "RESTful APIs", isFSPrimary: true, isMLPrimary: false },
      { name: "Apollo Server", isFSPrimary: true, isMLPrimary: false },
    ],
  },
  {
    title: "AI / ML Specialization",
    skills: [
      { name: "Python", isFSPrimary: false, isMLPrimary: true },
      { name: "TensorFlow", isFSPrimary: false, isMLPrimary: true },
      { name: "PyTorch", isFSPrimary: false, isMLPrimary: true },
      { name: "OpenCV", isFSPrimary: false, isMLPrimary: true },
      { name: "Scikit-Learn", isFSPrimary: false, isMLPrimary: true },
      { name: "XGBoost", isFSPrimary: false, isMLPrimary: true },
      { name: "Pandas / NumPy", isFSPrimary: false, isMLPrimary: true },
      { name: "ConvNeXt / DenseNet", isFSPrimary: false, isMLPrimary: true },
    ],
  },
  {
    title: "Databases & Caching",
    skills: [
      { name: "MongoDB", isFSPrimary: true, isMLPrimary: true },
      { name: "PostgreSQL", isFSPrimary: true, isMLPrimary: true },
      { name: "MySQL", isFSPrimary: false, isMLPrimary: false },
      { name: "Redis", isFSPrimary: true, isMLPrimary: false },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git / GitHub", isFSPrimary: true, isMLPrimary: true },
      { name: "Docker", isFSPrimary: true, isMLPrimary: true },
      { name: "Vercel", isFSPrimary: true, isMLPrimary: false },
      { name: "AWS (EC2, S3)", isFSPrimary: true, isMLPrimary: true },
    ],
  },
];

export default function Skills({ role }: { role: "fullstack" | "aiml" }) {
  return (
    <section id="skills" className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
          Technical Expertise
        </h2>
        <p className="text-muted-foreground mt-2">
          Layered expertise with role-aware emphasis across frontend systems and AI/ML engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category) => {
          // Check if category contains any primary skills for the active role
          const isCategoryPrimary = category.skills.some((skill) =>
            role === "fullstack" ? skill.isFSPrimary : skill.isMLPrimary
          );

          return (
            <div
              key={category.title}
              className={`p-6 rounded-2xl border bg-card transition-all duration-300 ${
                isCategoryPrimary
                  ? "border-border hover:border-accent/40"
                  : "border-border/40 opacity-70"
              }`}
            >
              <h3 className="text-lg font-bold text-foreground font-heading mb-4 flex items-center justify-between">
                <span>{category.title}</span>
                {isCategoryPrimary && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const isHighlighted =
                    role === "fullstack" ? skill.isFSPrimary : skill.isMLPrimary;

                  return (
                    <span
                      key={skill.name}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                        isHighlighted
                          ? "bg-accent text-accent-foreground border-accent font-semibold shadow-xs shadow-accent/10"
                          : "bg-muted/40 text-muted-foreground border-border/20"
                      }`}
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
