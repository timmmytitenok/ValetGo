"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./animations/reveal";
import { cardHover } from "../../lib/motion";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How many valet attendants will I need?",
    answer:
      "The number of attendants depends on your event size, guest count, and parking layout. We'll recommend the right setup to keep arrivals smooth and efficient.",
  },
  {
    question: "What if my event has limited parking?",
    answer:
      "We work with a wide range of parking situations and will create a plan that makes the most of your available space while keeping traffic flowing smoothly.",
  },
  {
    question: "Are you fully insured?",
    answer:
      "Yes. ValetGo is fully insured, and our attendants are trained to handle vehicles professionally and safely.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking as early as possible to secure your date, especially during wedding season and other peak event times.",
  },
  {
    question: "Do you handle both arrivals and departures?",
    answer:
      "Yes. We manage the full valet experience, from guest arrival to final vehicle retrieval, so everything feels seamless from start to finish.",
  },
  {
    question: "What types of events do you serve?",
    answer:
      "We provide valet services for weddings, private parties, corporate events, and other premium gatherings across Columbus and surrounding areas.",
  },
];

const CONTACT_EMAIL = "valetgoohio@gmail.com";
const CONTACT_SUBJECT = "ValetGo Contact Us";
const contactUsHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`;

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  idPrefix,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
}) {
  const answerId = `${idPrefix}-answer-${index}`;
  const triggerId = `${idPrefix}-trigger-${index}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={prefersReducedMotion ? undefined : cardHover}
      className={`group relative overflow-hidden border transition-colors duration-200 sm:backdrop-blur-sm sm:transition-all sm:duration-500 ${
        isOpen
          ? "rounded-3xl border-red-300/36 bg-gradient-to-b from-[#161616]/96 via-[#0f0f0f]/93 to-[#0a0a0a]/95 shadow-[0_10px_26px_rgba(0,0,0,0.44)] sm:shadow-[0_24px_56px_rgba(0,0,0,0.6)]"
          : "rounded-2xl border-white/10 bg-gradient-to-b from-white/[0.04] via-white/[0.025] to-white/[0.015] shadow-[0_8px_20px_rgba(0,0,0,0.34)] sm:shadow-[0_12px_30px_rgba(0,0,0,0.4)] sm:hover:-translate-y-0.5 sm:hover:border-white/20 sm:hover:bg-gradient-to-b sm:hover:from-white/[0.05] sm:hover:via-white/[0.03] sm:hover:to-white/[0.018] sm:hover:shadow-[0_18px_42px_rgba(0,0,0,0.48)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-200 sm:duration-500 ${
          isOpen
            ? "opacity-100 bg-[radial-gradient(circle_at_12%_8%,rgba(239,68,68,0.2)_0%,rgba(127,29,29,0.07)_35%,rgba(0,0,0,0)_74%)]"
            : "opacity-0 sm:group-hover:opacity-100 bg-[radial-gradient(circle_at_12%_8%,rgba(239,68,68,0.12)_0%,rgba(127,29,29,0.04)_35%,rgba(0,0,0,0)_74%)]"
        }`}
        aria-hidden
      />
      <h3>
        <button
          id={triggerId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className={`relative flex w-full items-center justify-between gap-4 text-left ${
            isOpen ? "px-5 py-5 sm:px-8 sm:py-7" : "px-4 py-4 sm:px-6 sm:py-5"
          }`}
        >
          <span
            className={`leading-relaxed tracking-[0.01em] transition-colors duration-300 ${
              isOpen
                ? "text-[0.98rem] font-semibold text-zinc-50 sm:text-[1.2rem]"
                : "text-[0.9rem] font-medium text-zinc-100/90 sm:group-hover:text-zinc-50 sm:text-[1.07rem]"
            }`}
          >
            {faq.question}
          </span>
          <span
            className={`inline-flex shrink-0 items-center justify-center rounded-xl border transition-all duration-200 sm:duration-500 ${
              isOpen
                ? "h-10 w-10 border-red-300/45 bg-red-500/18 text-red-100 shadow-[0_0_26px_rgba(220,38,38,0.34)] sm:h-11 sm:w-11"
                : "h-9 w-9 border-white/14 bg-black/35 text-zinc-200/78 sm:h-10 sm:w-10 sm:group-hover:border-white/26 sm:group-hover:text-zinc-50"
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 sm:duration-500 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out sm:duration-500 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div
          id={answerId}
          role="region"
          aria-labelledby={triggerId}
          className="overflow-hidden"
        >
          <p
            className={`px-4 pb-5 text-[0.92rem] leading-relaxed tracking-[0.01em] transition-opacity duration-200 sm:px-8 sm:pb-7 sm:text-base sm:transition-all sm:duration-500 ${
              isOpen
                ? "translate-y-0 text-zinc-200/86 opacity-100"
                : "translate-y-0 text-zinc-200/74 opacity-0 sm:-translate-y-1"
            }`}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  return (
    <section
      className="relative w-full overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#060606] via-[#050505] to-[#040404] py-14 sm:py-28 lg:py-32"
      aria-labelledby="faq-title"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[52%] h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.14)_0%,rgba(127,29,29,0.05)_42%,rgba(0,0,0,0)_78%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[36%] h-56 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.11)_0%,rgba(127,29,29,0.04)_45%,rgba(0,0,0,0)_80%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-12 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.14)_0%,rgba(127,29,29,0.05)_44%,rgba(0,0,0,0)_82%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-44 top-[36%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(248,113,113,0.12)_0%,rgba(127,29,29,0.045)_46%,rgba(0,0,0,0)_84%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-28 bottom-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.11)_0%,rgba(127,29,29,0.04)_48%,rgba(0,0,0,0)_84%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-[-5rem] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.1)_0%,rgba(127,29,29,0.035)_48%,rgba(0,0,0,0)_84%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.26)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.28em] text-red-200/84">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="faq-title"
              className="mt-4 text-balance text-[2.3rem] font-bold leading-[1.06] tracking-tight text-zinc-50 sm:mt-5 sm:text-4xl lg:text-5xl"
            >
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mb-6 mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed tracking-[0.01em] text-zinc-200/78 sm:mb-0 sm:mt-6 sm:text-lg">
              <span className="sm:hidden">
                Everything you need to know before booking.
              </span>
              <span className="hidden sm:inline">
                Everything you need to know before booking ValetGo for your
                event.
              </span>
            </p>
          </Reveal>
        </header>

        <div className="mt-9 space-y-3 sm:mt-14 sm:space-y-5">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={0.14 + index * 0.07} distance={18} blur={5}>
              <FAQItem
                faq={faq}
                index={index}
                idPrefix={idPrefix}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(index)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.26}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed tracking-[0.01em] text-zinc-300/62">
            <span className="block sm:hidden">Still have questions?</span>
            <span className="mb-6 mt-2 block sm:hidden">
              <Link
                href={contactUsHref}
                className="text-zinc-200/84 underline decoration-white/26 underline-offset-4 transition-colors duration-300 hover:text-zinc-50 hover:decoration-red-300/52"
              >
                Contact Us
              </Link>{" "}
              and we&apos;ll walk you through it.
            </span>
            <span className="hidden sm:inline">
              Still have questions?{" "}
              <Link
                href={contactUsHref}
                className="text-zinc-200/84 underline decoration-white/26 underline-offset-4 transition-colors duration-300 hover:text-zinc-50 hover:decoration-red-300/52"
              >
                Contact Us
              </Link>{" "}
              and we&apos;ll walk you through it.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
