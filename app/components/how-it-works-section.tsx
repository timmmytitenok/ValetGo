import BorderGlow from "./border-glow";
import { MotionHover } from "./animations/motion-hover";
import { Reveal } from "./animations/reveal";

const steps = [
  {
    step: "STEP 01",
    number: "01",
    title: "Request a Quote",
    description:
      "Tell us your event date, location, and guest count, and we'll put together the right valet plan for you.",
  },
  {
    step: "STEP 02",
    number: "02",
    title: "We Plan the Setup",
    description:
      "We handle the staffing, valet flow, and event setup so everything is ready before your guests arrive.",
  },
  {
    step: "STEP 03",
    number: "03",
    title: "You Enjoy the Event",
    description:
      "On event day, our team manages the arrivals and departures so you can focus on hosting and enjoying the night.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative flex w-full items-center overflow-hidden border-t border-white/10 bg-[#040404] py-16 sm:min-h-[49rem] sm:py-28 lg:min-h-[55rem] lg:py-32"
      aria-labelledby="how-it-works-title"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/how-it-works-background.png')" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/88"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-black/22" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,rgba(127,29,29,0.08)_44%,rgba(0,0,0,0)_78%)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:-translate-y-6 sm:px-6 lg:-translate-y-7">
        <header className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] text-red-200/82">
              HOW IT WORKS
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="how-it-works-title"
              className="mx-auto mt-5 max-w-4xl text-balance text-2xl font-bold tracking-tight text-zinc-50 sm:mt-6 sm:text-4xl lg:text-5xl"
            >
              Simple Setup. Smooth Arrival.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed tracking-[0.01em] text-zinc-200/80 sm:text-lg">
              Tell us about your event. We&apos;ll handle the rest.
            </p>
          </Reveal>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={0.16 + index * 0.1}
              distance={22}
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
                    className="h-full"
                  >
                    <div className="relative flex h-full flex-col p-6 sm:p-7">
                      <span className="pointer-events-none absolute right-4 top-3 text-5xl font-semibold tracking-tight text-red-500/18 sm:right-5 sm:top-4 sm:text-6xl">
                        {step.number}
                      </span>
                      <p className="relative text-xs font-semibold tracking-[0.22em] text-red-200/80">
                        {step.step}
                      </p>
                      <h3 className="relative mt-5 max-w-[16ch] text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="relative mt-4 text-sm leading-relaxed tracking-[0.01em] text-zinc-200/78">
                        {step.description}
                      </p>
                    </div>
                  </BorderGlow>
                </article>
              </MotionHover>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
