"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix?: string;
  decimals?: boolean;
  label: string;
}

function StatCounter({ value, suffix = "", decimals = false, label }: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    if (decimals) {
      return Math.round(latest * 10) / 10;
    }
    return Math.round(latest);
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals ? 1 : 0) + suffix;
      }
    });
  }, [rounded, suffix, decimals]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center border-r last:border-0 border-border/50 md:flex-1">
      <span
        ref={ref}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight text-accent font-heading"
      >
        0{suffix}
      </span>
      <span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground max-w-[180px]">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="px-6 md:px-12 max-w-[1100px] mx-auto w-full py-8 my-12">
      <div className="grid grid-cols-2 md:flex md:flex-row rounded-2xl border border-border bg-glass backdrop-blur-md overflow-hidden">
        <StatCounter value={95} suffix="%" label="Performance and responsiveness" />
        <StatCounter value={1.5} suffix="+" decimals={true} label="Years shipping polished products" />
        <StatCounter value={99.9} suffix="%" decimals={true} label="Uptime on flagship systems" />
        <StatCounter value={0} suffix="" label="Post-launch critical issues" />
      </div>
    </section>
  );
}
