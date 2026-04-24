import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { MotionHover } from "./animations/motion-hover";
import { Reveal } from "./animations/reveal";

export function FinalCTASection() {
  return (
    <section
      id="quote"
      className="relative flex min-h-[56vh] w-full items-center overflow-hidden border-t border-white/10 bg-transparent py-16 sm:min-h-[68vh] sm:py-28 lg:min-h-[72vh] lg:py-32"
      aria-labelledby="final-cta-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.2)_0%,rgba(127,29,29,0.08)_44%,rgba(0,0,0,0)_80%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-48 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.16)_0%,rgba(127,29,29,0.05)_46%,rgba(0,0,0,0)_82%)] blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <Reveal amount={0.35}>
          <p className="text-xs font-semibold tracking-[0.28em] text-red-200/82">
            READY TO BOOK
          </p>
        </Reveal>
        <Reveal delay={0.08} amount={0.35}>
          <h2
            id="final-cta-title"
            className="mx-auto mt-5 max-w-4xl text-balance text-3xl font-bold leading-[1.07] tracking-tight text-zinc-50 sm:mt-6 sm:text-5xl lg:text-6xl"
          >
            Make Your Event Effortless From the Start
          </h2>
        </Reveal>
        <Reveal delay={0.16} amount={0.35}>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed tracking-[0.01em] text-zinc-200/82 sm:mt-6 sm:text-base">
            Tell us about your event — we&apos;ll handle the rest.
          </p>
        </Reveal>

        <Reveal delay={0.24} amount={0.35}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
              <Link
                href="#quote"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-[0_12px_34px_rgba(220,38,38,0.45)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_18px_44px_rgba(220,38,38,0.56)] sm:min-h-14 sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
              >
                Request a Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </MotionHover>
            <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
              <Link
                href="tel:6142181599"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/24 bg-black/38 px-6 py-3 text-base font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-white/42 hover:bg-white/10 sm:min-h-14 sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
              >
                <Phone className="h-5 w-5 text-red-300" />
                Call Now
              </Link>
            </MotionHover>
          </div>
        </Reveal>

        <Reveal delay={0.32} amount={0.35}>
          <p className="mt-5 text-xs font-medium tracking-[0.08em] text-red-200/74 sm:mt-7">
            Limited availability for peak event dates
          </p>
        </Reveal>
      </div>
    </section>
  );
}
