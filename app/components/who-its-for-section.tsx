import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  HeartHandshake,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import BorderGlow from "./border-glow";
import { MotionHover } from "./animations/motion-hover";
import { Reveal } from "./animations/reveal";

const eventCards = [
  {
    title: "Weddings",
    description:
      "Create a polished, stress-free arrival experience that makes your big day feel elevated from the moment guests arrive.",
    icon: HeartHandshake,
  },
  {
    title: "Private Parties",
    description:
      "Give your guests a seamless welcome with professional valet service that removes parking stress and keeps the evening flowing smoothly.",
    icon: Users,
  },
  {
    title: "Corporate Events",
    description:
      "Deliver an organized, professional first impression for clients, teams, and guests attending high-level business events.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Special Occasions",
    description:
      "Perfect for galas, celebrations, and private gatherings where presentation, convenience, and guest experience matter.",
    icon: Sparkles,
  },
];

export function WhoItsForSection() {
  return (
    <section
      id="section-2"
      className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#090909] to-[#070707] pb-12 pt-16 sm:pb-14 sm:pt-24 lg:pb-20 lg:pt-24"
      aria-labelledby="who-its-for-title"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-20 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.2)_0%,rgba(127,29,29,0.08)_45%,rgba(0,0,0,0)_78%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.14)_0%,rgba(127,29,29,0.06)_48%,rgba(0,0,0,0)_80%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-14 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.13)_0%,rgba(153,27,27,0.06)_50%,rgba(0,0,0,0)_82%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl text-center">
          <Reveal>
            <h2
              id="who-its-for-title"
              className="text-balance text-[clamp(2.1rem,8.2vw,3.25rem)] font-bold leading-tight tracking-tight text-zinc-50"
            >
              Perfect for Any Event That Matters
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mb-4 mt-5 max-w-2xl text-pretty text-sm leading-relaxed tracking-[0.01em] text-zinc-200/82 sm:mb-0 sm:mt-6 sm:text-lg">
              <span className="sm:hidden">
                From intimate gatherings to large-scale events, ValetGo delivers
                smooth, professional arrivals.
              </span>
              <span className="hidden sm:inline">
                From intimate gatherings to large-scale events, ValetGo delivers
                a smooth, professional arrival experience that sets the tone
                from the very beginning.
              </span>
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {eventCards.map(({ title, description, icon: Icon }, index) => (
            <Reveal
              key={title}
              delay={0.1 + index * 0.1}
              distance={20}
              blur={5}
              className="h-full"
            >
              <MotionHover type="card" className="h-full">
                <article className="group relative h-full overflow-visible transition-all duration-300">
                  <BorderGlow
                    edgeSensitivity={30}
                    glowColor="0 80 68"
                    backgroundColor="#110c0c"
                    borderRadius={16}
                    glowRadius={36}
                    glowIntensity={1}
                    coneSpread={25}
                    animated={false}
                    colors={["#fb7185", "#ef4444", "#f97316"]}
                    fillOpacity={0.42}
                    scrollReactivePoints={[
                      { x: 1, y: 0.5 },
                    ]}
                    scrollReactiveOnMobileOnly
                    disablePointerTrackingOnMobileOnly
                    className="h-full"
                  >
                    <div className="flex h-full flex-col p-5 sm:p-6">
                      <div className="inline-flex self-start rounded-xl border border-red-400/30 bg-red-500/10 p-2.5 shadow-[0_0_24px_rgba(127,29,29,0.2)] transition-all duration-300 group-hover:border-red-300/45 group-hover:bg-red-500/15 group-hover:shadow-[0_0_28px_rgba(220,38,38,0.28)]">
                        <Icon className="h-5 w-5 text-red-300/90 transition-colors duration-300 group-hover:text-red-200" />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                        {title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed tracking-[0.01em] text-zinc-200/78">
                        {description}
                      </p>
                    </div>
                  </BorderGlow>
                </article>
              </MotionHover>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:mt-20">
            <div className="flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
              <Link
                href="/request-quote"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(220,38,38,0.42)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_18px_44px_rgba(220,38,38,0.5)] sm:w-auto sm:px-7 sm:py-4 sm:text-base"
              >
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </MotionHover>
            <MotionHover type="button" className="w-full sm:inline-flex sm:w-auto">
              <Link
                href="tel:6142181599"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-black/35 px-6 py-3.5 text-sm font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-white/45 hover:bg-white/12 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
              >
                <Phone className="h-4 w-4 text-red-300" />
                Call Now
              </Link>
            </MotionHover>
            </div>
          <p className="mb-4 max-w-2xl text-center text-sm tracking-[0.02em] text-zinc-300/72 sm:mb-6">
            From first impression to final departure.
          </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
