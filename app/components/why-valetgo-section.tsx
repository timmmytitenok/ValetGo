"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import BorderGlow from "./border-glow";
import { MotionHover } from "./animations/motion-hover";
import { Reveal } from "./animations/reveal";
import { premiumEase } from "../../lib/motion";

const valuePoints = [
  {
    title: "Professional, Uniformed Staff",
    description:
      "Polished attendants who represent your event with professionalism, courtesy, and attention to detail.",
    icon: UserCheck,
  },
  {
    title: "Seamless Guest Experience",
    description:
      "Guests arrive smoothly without confusion, delays, or the stress of handling parking on their own.",
    icon: CarFront,
  },
  {
    title: "Fully Managed Setup",
    description:
      "We coordinate valet flow, staffing, and on-site logistics so everything feels organized from the start.",
    icon: ShieldCheck,
  },
  {
    title: "Stress-Free Hosting",
    description:
      "You stay focused on your event while we handle the arrival experience from first car to final guest.",
    icon: Sparkles,
  },
];

export function WhyValetGoSection() {
  const prefersReducedMotion = useReducedMotion();
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="section-3"
      className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#070707] via-[#050505] to-[#040404] py-16 sm:py-24 lg:py-28"
      aria-labelledby="why-valetgo-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,rgba(0,0,0,0)_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-[28rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.20)_0%,rgba(127,29,29,0.10)_35%,rgba(0,0,0,0)_72%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-32 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.18)_0%,rgba(127,29,29,0.10)_35%,rgba(0,0,0,0)_74%)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-red-400/30 to-red-400/80" />
            <p className="text-xs font-semibold tracking-[0.28em] text-red-300/95">
              WHY VALETGO
            </p>
            <span className="h-px w-10 bg-gradient-to-r from-red-400/80 to-red-400/30" />
          </div>

          <h2
            id="why-valetgo-title"
            className="mt-5 text-balance text-2xl font-bold leading-[1.08] tracking-tight text-zinc-50 sm:mt-6 sm:text-4xl lg:text-5xl"
          >
            More Than Parking — It&apos;s Your Event&apos;s First Impression
          </h2>
          </Reveal>
          <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-200/80 sm:mt-6 sm:text-lg">
            ValetGo creates a smooth, polished arrival experience for everyone.
          </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {valuePoints.map(({ title, description, icon: Icon }, index) => (
                <motion.li
                  key={title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.06 + index * 0.08, duration: 0.72, ease: premiumEase }}
                  className="group py-5 transition-all duration-300 first:pt-6 last:pb-6"
                >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/35 bg-black/45 shadow-[0_0_0_1px_rgba(248,113,113,0.1),0_0_22px_rgba(220,38,38,0.22)] transition-all duration-300 group-hover:border-red-300/55 group-hover:bg-red-500/10 group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.15),0_0_30px_rgba(220,38,38,0.30)]">
                        <Icon className="h-5 w-5 text-red-200/95 transition-colors duration-300 group-hover:text-red-100" />
                      </div>
                      <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-0.5">
                        <h3 className="text-lg font-semibold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-white">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-300/78 sm:text-[0.95rem]">
                          {description}
                        </p>
                      </div>
                    </div>
                </motion.li>
              ))}
            </ul>

            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row sm:flex-wrap">
                <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
                  <Link
                    href="#quote"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(220,38,38,0.42)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_16px_32px_rgba(220,38,38,0.52)] sm:w-auto"
                  >
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MotionHover>
                <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
                  <button
                    type="button"
                    onClick={scrollToHowItWorks}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/22 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-100/92 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/[0.07] hover:text-white sm:w-auto"
                  >
                    See How It Works
                  </button>
                </MotionHover>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} distance={26} blur={6} className="relative lg:pl-8 xl:pl-12">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,rgba(220,38,38,0.12)_0%,rgba(127,29,29,0.05)_38%,rgba(0,0,0,0)_74%)] blur-2xl"
              aria-hidden
            />
            <BorderGlow
              edgeSensitivity={38}
              glowColor="0 80 68"
              backgroundColor="#110c0c"
              borderRadius={24}
              glowRadius={34}
              glowIntensity={0.7}
              coneSpread={25}
              animated={false}
              colors={["#fda4af", "#f87171", "#fb7185"]}
              fillOpacity={0.22}
              className="relative mx-auto w-full max-w-[30rem] transition-transform duration-300 hover:-translate-y-0.5 sm:max-w-[32rem] lg:ml-auto lg:max-w-[30rem] xl:max-w-[31rem]"
            >
              <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-white/[0.01] p-3 shadow-[0_24px_62px_rgba(0,0,0,0.56)] backdrop-blur-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                  <Image
                    src="/why-valetgo-photo.png"
                    alt="Valet attendant welcoming guests at an upscale event"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 36vw, (min-width: 768px) 70vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/8"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(239,68,68,0.16)_0%,rgba(0,0,0,0)_56%)]"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0)_20%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0.42)_100%)]"
                    aria-hidden
                  />

                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/12 bg-black/45 p-3 backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                    <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-red-200/92">
                      SIGNATURE SERVICE
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-100/90">
                      Elevated service from first arrival to final key return.
                    </p>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
