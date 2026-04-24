"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionHover } from "./animations/motion-hover";
import { navbarIntro } from "../../lib/motion";

const SCROLL_TOP_SHOW = 24;
const DIRECTION_THRESHOLD = 6;

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        const prev = lastYRef.current;
        setScrolled(y > 18);

        if (y < SCROLL_TOP_SHOW) {
          setHidden(false);
          lastYRef.current = y;
          return;
        }

        const delta = y - prev;
        if (delta > DIRECTION_THRESHOLD) {
          setHidden(true);
        } else if (delta < -DIRECTION_THRESHOLD) {
          setHidden(false);
        }
        lastYRef.current = y;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={navbarIntro}
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10",
        scrolled
          ? "bg-zinc-950/90 shadow-[0_10px_26px_rgba(0,0,0,0.35)] backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/78"
          : "bg-zinc-950/84 backdrop-blur-sm supports-[backdrop-filter]:bg-zinc-950/72",
        "transition-transform duration-300 ease-out will-change-transform",
        "[backface-visibility:hidden] [transform:translate3d(0,0,0)]",
        hidden ? "pointer-events-none -translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <nav className="relative flex w-full items-center justify-between py-3.5 sm:py-4">
          <Link
            href="/"
            className="group relative inline-flex shrink-0 items-center text-xl font-bold tracking-tight text-white transition-all duration-300 ease-out hover:-translate-y-px hover:scale-[1.015] hover:[text-shadow:0_6px_18px_rgba(239,68,68,0.25)] sm:text-2xl"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-zinc-100">
              Valet
            </span>
            <span className="relative z-10 inline-block text-red-500 transition-all duration-300 ease-out group-hover:-translate-y-px group-hover:text-red-300">
              Go
            </span>
            <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 z-0 rounded-lg bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-400 to-transparent transition-all duration-300 group-hover:w-[105%]" />
          </Link>

          <div className="ml-auto hidden shrink-0 items-center gap-1.5 sm:flex sm:gap-3">
            <MotionHover type="button" className="inline-flex">
              <Link
                href="tel:6142181599"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-2.5 py-2 text-xs font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <Phone className="h-4 w-4 text-red-300" />
                Call
              </Link>
            </MotionHover>
            <MotionHover type="button" className="inline-flex">
              <button
                type="button"
                aria-disabled="true"
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(220,38,38,0.42)] transition-all duration-300 hover:bg-red-500 sm:gap-2 sm:px-5 sm:text-sm"
              >
                <span className="sm:hidden">Quote</span>
                <span className="hidden sm:inline">Request Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </MotionHover>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
