"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Mobile uses a shorter travel distance and a cleaner blur-in to reduce jitter.
  const resolvedDistance = isMobile ? Math.min(distance, 14) : distance;
  const resolvedBlur = isMobile ? Math.max(blur, 7) : blur;
  const variants = useMemo(
    () => makeFadeUp(resolvedDistance, resolvedBlur),
    [resolvedBlur, resolvedDistance],
  );
  const resolvedDuration = duration ?? (isMobile ? 0.62 : 0.78);
  const resolvedAmount = amount ?? (isMobile ? 0.16 : viewportOnce.amount);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount: resolvedAmount }}
      variants={variants}
      transition={{ delay, duration: resolvedDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
