"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import LightRays from "./light-rays";
import { MotionHover } from "./animations/motion-hover";
import { Reveal } from "./animations/reveal";
import { premiumEase } from "../../lib/motion";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-svh overflow-hidden sm:min-h-dvh">
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : { filter: "blur(12px)", scale: 1.03, opacity: 0.84 }
        }
        animate={
          prefersReducedMotion
            ? { filter: "blur(0px)", scale: 1, opacity: 1 }
            : { filter: "blur(0px)", scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.15, ease: premiumEase, delay: 0.03 }}
        className="absolute inset-0 bg-[url('/hero-background-mobile.png')] bg-cover bg-center bg-no-repeat sm:bg-[url('/hero-background.png')]"
        aria-hidden
      />

      <div className="absolute inset-0 bg-black/1" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] hidden opacity-30 md:block" aria-hidden>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ef4444"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="h-full w-full"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-36 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(190,24,24,0.44)_0%,rgba(127,29,29,0.26)_38%,rgba(0,0,0,0)_78%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-28 h-44 w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.32)_0%,rgba(127,29,29,0.16)_45%,rgba(0,0,0,0)_82%)] blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-8%] top-[12%] h-[430px] w-[430px] rounded-full bg-[radial-gradient(circle,rgba(153,27,27,0.25)_0%,rgba(0,0,0,0)_72%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[56%] h-48 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.18)_0%,rgba(0,0,0,0)_72%)] blur-2xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-start justify-center px-4 pb-16 pt-[6.5rem] sm:px-6 sm:pb-20 sm:pt-[10.5rem]">
        <div className="flex w-full flex-col items-center text-center">
          <Reveal delay={0.06} distance={30} blur={8}>
            <div className="mb-6 mt-6 inline-flex max-w-full items-center rounded-full border border-red-400/50 bg-black/35 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-red-100 shadow-[0_0_40px_rgba(220,38,38,0.24)] backdrop-blur-sm sm:mb-7 sm:mt-0 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
              PREMIUM EVENT VALET SERVICE
            </div>
          </Reveal>

          <Reveal delay={0.16} distance={34} blur={9}>
            <h1 className="max-w-4xl text-balance text-3xl font-bold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Make Your Event&apos;s First Impression Count
            </h1>
          </Reveal>

          <Reveal delay={0.28} distance={28} blur={7}>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-200/90 sm:mt-7 sm:text-lg">
              Professional valet service for weddings, private parties, and
              events across Columbus. We handle the parking so your guests
              arrive stress-free.
            </p>
          </Reveal>

          <Reveal delay={0.38} distance={26} blur={6}>
            <div className="relative left-1/2 mt-8 flex w-screen -translate-x-1/2 flex-col justify-center gap-3 px-10 sm:left-auto sm:mt-9 sm:w-full sm:max-w-xl sm:translate-x-0 sm:flex-row sm:items-center sm:gap-4 sm:p-3 sm:px-0">
              <MotionHover type="button" className="order-2 w-full sm:order-1 sm:inline-flex sm:w-auto">
                <Link
                  href="#quote"
                  className="inline-flex min-h-16 w-full items-center justify-center gap-2.5 rounded-2xl bg-red-600 px-7 py-4 text-lg font-semibold text-white shadow-[0_12px_34px_rgba(220,38,38,0.45)] transition-all duration-300 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:min-h-0 sm:w-auto sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  Request Quote
                  <ArrowRight className="h-5 w-5 sm:h-4 sm:w-4" />
                </Link>
              </MotionHover>
              <MotionHover type="button" className="order-1 mt-4 w-full sm:order-2 sm:mt-0 sm:inline-flex sm:w-auto">
                <Link
                  href="tel:6142181599"
                  className="inline-flex min-h-16 w-full items-center justify-center gap-2.5 rounded-2xl border border-white/25 bg-black/35 px-7 py-4 text-lg font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-0 sm:w-auto sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
                >
                  <Phone className="h-5 w-5 text-red-300 sm:h-4 sm:w-4" />
                  Call Now
                </Link>
              </MotionHover>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
