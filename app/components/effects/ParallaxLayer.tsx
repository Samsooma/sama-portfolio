"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offset = prefersReduced ? 0 : 120;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${(1 - speed) * offset}px`, `${(speed - 1) * offset}px`]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
