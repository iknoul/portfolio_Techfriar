"use client";

import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Pondicherry University",
      period: "2021 - 2023",
      details: "Focus on Object-Oriented Programming, Data Structures & Algorithms, Machine Learning, and Data Analysis using Python.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University of Calicut",
      period: "2018 - 2021",
      details: "Database Management Systems, Discrete Mathematics, and serving as a Teacher's Assistant for programming courses.",
    },
  ];

  const certifications = [
    {
      title: "MERN Stack Developer Certification",
      provider: "TechMindz, InfoPark Kochi",
      period: "2023",
      details: "Rigorous training on React, Node.js, Express.js, MongoDB, RESTful architectures, and software engineering practices.",
    },
    {
      title: "NPTEL Academic Courses",
      provider: "SWAYAM / IIT",
      period: "Various",
      details: "Specialized study tracks in Software Engineering and Database Design.",
    },
  ];

  return (
    <section id="education" className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              Education
            </h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground font-heading">{edu.degree}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                </div>
                <div className="text-sm font-semibold text-accent mb-3">{edu.institution}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Award className="w-6 h-6 text-accent" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              Certifications & Training
            </h2>
          </div>

          <div className="space-y-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground font-heading">{cert.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.period}
                  </span>
                </div>
                <div className="text-sm font-semibold text-accent mb-3">{cert.provider}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
