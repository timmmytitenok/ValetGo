"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonHover, buttonTap, cardHover } from "../../../lib/motion";

type MotionHoverProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "card";
};

export function MotionHover({
  children,
  className,
  type = "button",
}: MotionHoverProps) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={type === "button" ? buttonHover : cardHover}
      whileTap={type === "button" ? buttonTap : undefined}
    >
      {children}
    </motion.div>
  );
}
