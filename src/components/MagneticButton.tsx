"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set up motion values for x and y translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply smooth spring physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate mouse position relative to the button center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Small radius pulling effect (maximum 20px translation)
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const ButtonContent = () => (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block transition-shadow duration-300 ${
        isHovered ? "shadow-lg shadow-accent/20" : ""
      }`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (href.startsWith("http") || href.endsWith(".pdf")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          <ButtonContent />
        </a>
      );
    }
    return (
      <a href={href} className={className}>
        <ButtonContent />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <ButtonContent />
    </button>
  );
}
