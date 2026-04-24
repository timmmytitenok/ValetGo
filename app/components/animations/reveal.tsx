"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { makeFadeUp, viewportOnce } from "../../../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  blur?: number;
  duration?: number;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  blur = 6,
  duration,
  amount,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = makeFadeUp(distance, blur);
  const resolvedDuration = duration ?? 0.78;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount: amount ?? viewportOnce.amount }}
      variants={variants}
      transition={{ delay, duration: resolvedDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
