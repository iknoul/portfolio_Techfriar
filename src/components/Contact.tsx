"use client";

import React, { useState } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle, AlertTriangle, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please check your network connection.");
    }
  };

  return (
    <section id="contact" className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Info Column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              Let's Connect
            </h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Share your product brief, technical challenge, or collaboration idea and I’ll respond with concise next steps.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="mailto:shamil.rahman@example.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-accent/40 hover:bg-card transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-xs text-muted-foreground block uppercase tracking-wider">Email Me</span>
                <span className="text-sm font-semibold text-foreground">shamil.rahman@example.com</span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <span className="text-xs text-muted-foreground block uppercase tracking-wider">Call Me</span>
                <span className="text-sm font-semibold text-foreground">+91 95447 91040</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Find me on</span>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/iknoul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border bg-card/80 hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 focus:ring-2 focus:ring-accent"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/shamilrahman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border bg-card/80 hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-300 focus:ring-2 focus:ring-accent"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-border/40">
            <p className="text-md italic text-muted-foreground font-heading">
              "Product-led engineering with polished UX, fast performance, and measurable outcomes."
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="Shamil Rahman"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="shamil@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                placeholder="Your project details or inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
              {status === "submitting" ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Status alerts */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex items-center gap-2 text-xs text-accent"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message was sent successfully.</span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-xs text-red-400"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
