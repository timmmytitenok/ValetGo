"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionHover } from "./animations/motion-hover";
import SoftAurora from "./soft-aurora";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  eventType: string;
  estimatedGuests: string;
  parkingSituation: string;
  parkingLayout: string;
  paymentCoverage: string;
  onSiteContactName: string;
  onSiteContactPhone: string;
  invoiceRecipientName: string;
  invoiceRecipientEmail: string;
};

type Field = {
  key: keyof FormValues;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "tel" | "date" | "time" | "number" | "textarea" | "select";
  options?: Array<{ value: string; label: string }>;
};

type Section = {
  title: string;
  fields: Field[];
};

const sections: Section[] = [
  {
    title: "Basic Info",
    fields: [
      { key: "name", label: "Name", type: "text", placeholder: "Full name" },
      { key: "email", label: "Email", type: "email", placeholder: "you@email.com" },
      { key: "phone", label: "Phone", type: "tel", placeholder: "(614) 000-0000" },
    ],
  },
  {
    title: "Event Details",
    fields: [
      { key: "eventDate", label: "Date of Event", type: "date" },
      { key: "eventStartTime", label: "Event Start Time", type: "time" },
      { key: "eventEndTime", label: "Event End Time", type: "time" },
      {
        key: "eventLocation",
        label: "Location of Event",
        type: "text",
        placeholder: "Venue name + address",
      },
      {
        key: "eventType",
        label: "Type of Event",
        type: "select",
        options: [
          { value: "Wedding", label: "Wedding" },
          { value: "Private Party", label: "Private Party" },
          { value: "Corporate Event", label: "Corporate Event" },
          { value: "Special Occasion", label: "Special Occasion" },
          { value: "Other", label: "Other" },
        ],
      },
    ],
  },
  {
    title: "Parking & Logistics",
    fields: [
      {
        key: "estimatedGuests",
        label: "Estimated Number of Guests",
        type: "number",
        placeholder: "Estimated guest count",
      },
      {
        key: "parkingSituation",
        label: "Parking Situation",
        type: "select",
        options: [
          { value: "Existing parking available", label: "Existing parking available" },
          { value: "Need parking sourced", label: "Needs parking sourcing" },
          { value: "Not sure yet", label: "Not sure yet" },
        ],
      },
      {
        key: "parkingLayout",
        label: "Parking Layout Description",
        type: "textarea",
        placeholder: "Lot size, entry points, curb flow, etc.",
      },
    ],
  },
  {
    title: "Service Details",
    fields: [
      {
        key: "paymentCoverage",
        label: "Are guests paying or is host covering valet?",
        type: "select",
        options: [
          { value: "Host covering valet", label: "Host covering valet" },
          { value: "Guests paying valet", label: "Guests paying valet" },
        ],
      },
    ],
  },
  {
    title: "Coordination",
    fields: [
      { key: "onSiteContactName", label: "On-site contact name", type: "text", placeholder: "Full name" },
      { key: "onSiteContactPhone", label: "On-site contact phone", type: "tel", placeholder: "(614) 000-0000" },
      {
        key: "invoiceRecipientName",
        label: "Invoice recipient name",
        type: "text",
        placeholder: "Full name",
      },
      {
        key: "invoiceRecipientEmail",
        label: "Invoice recipient email",
        type: "email",
        placeholder: "billing@email.com",
      },
    ],
  },
];

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  eventStartTime: "",
  eventEndTime: "",
  eventLocation: "",
  eventType: "",
  estimatedGuests: "",
  parkingSituation: "",
  parkingLayout: "",
  paymentCoverage: "",
  onSiteContactName: "",
  onSiteContactPhone: "",
  invoiceRecipientName: "",
  invoiceRecipientEmail: "",
};

function formatCountdown(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function RequestQuoteWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [attemptedNext, setAttemptedNext] = useState(false);

  const currentSection = sections[step];

  useEffect(() => {
    if (!submitted) return;
    setTimeLeft(24 * 60 * 60);
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [submitted]);

  const progress = useMemo(() => {
    if (submitted) return 100;
    return (step / sections.length) * 100;
  }, [step, submitted]);

  const setAnswer = (key: keyof FormValues, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const setPhoneAnswer = (key: keyof FormValues, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: formatPhone(value) }));
  };

  const currentValid = useMemo(() => {
    return currentSection.fields.every((field) => {
      const value = answers[field.key];
      if (!value.trim()) return false;
      if (field.type === "email") return isValidEmail(value);
      if (field.type === "tel") return isValidPhone(value);
      if (field.type === "number") return Number(value) > 0;
      return true;
    });
  }, [answers, currentSection.fields]);

  const goNext = () => {
    setAttemptedNext(true);
    if (!currentValid) return;
    setAttemptedNext(false);
    if (step === sections.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    setAttemptedNext(false);
    setStep((prev) => Math.max(0, prev - 1));
  };

  const showError = attemptedNext && !currentValid;

  return (
    <section className="relative min-h-dvh overflow-x-hidden px-4 pb-24 pt-8 text-white sm:px-6 sm:pb-12 sm:pt-12">
      <div className="pointer-events-none absolute inset-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#fb7185"
          color2="#ef4444"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/72 via-black/58 to-black/76" />
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-black/45 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs tracking-[0.18em] text-zinc-300/80">
              <span>{submitted ? "COMPLETE" : `STEP ${step + 1} OF ${sections.length}`}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-600"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <CheckCircle2 className="mx-auto h-14 w-14 text-red-300" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight">Thank You!</h1>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Your request is in. We will reply within 24 hours.
                </p>
                <p className="mt-6 text-xs tracking-[0.2em] text-red-200/80">RESPONSE COUNTDOWN</p>
                <p className="mt-2 text-6xl font-semibold tracking-tight text-zinc-100 sm:text-7xl">
                  {formatCountdown(timeLeft)}
                </p>
                <div className="mb-1 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <MotionHover type="button" className="inline-flex">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                    >
                      Back to Home
                    </Link>
                  </MotionHover>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentSection.title}
                initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs tracking-[0.2em] text-red-200/80">{`SECTION ${step + 1}`}</p>
                <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {currentSection.title}
                </h1>
                <p className="mt-2 text-sm text-zinc-300/82">
                  Fill out all fields below to continue.
                </p>

                <div className="mt-6 space-y-4">
                  {currentSection.fields.map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-200/90">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          value={answers[field.key]}
                          onChange={(event) => setAnswer(field.key, event.target.value)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full max-w-full min-w-0 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-zinc-100 outline-none transition-colors placeholder:text-zinc-400/70 focus:border-red-300/55"
                        />
                      ) : null}
                      {field.type === "select" ? (
                        <select
                          value={answers[field.key]}
                          onChange={(event) => setAnswer(field.key, event.target.value)}
                          className="w-full max-w-full min-w-0 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-zinc-100 outline-none transition-colors focus:border-red-300/55"
                        >
                          <option value="">Select one</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value} className="text-black">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : null}
                      {field.type !== "textarea" && field.type !== "select" ? (
                        <input
                          type={field.type}
                          value={answers[field.key]}
                          onChange={(event) => {
                            if (field.type === "tel") {
                              setPhoneAnswer(field.key, event.target.value);
                              return;
                            }
                            setAnswer(field.key, event.target.value);
                          }}
                          placeholder={field.placeholder}
                          inputMode={
                            field.type === "tel" || field.type === "number"
                              ? "numeric"
                              : undefined
                          }
                          maxLength={field.type === "tel" ? 14 : undefined}
                          min={field.type === "number" ? 1 : undefined}
                          pattern={field.type === "number" ? "[0-9]*" : undefined}
                          className={`w-full max-w-full min-w-0 rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-zinc-100 outline-none transition-colors placeholder:text-zinc-400/70 focus:border-red-300/55 ${
                            field.type === "date" || field.type === "time"
                              ? "pr-10"
                              : ""
                          }`}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>

                <p
                  className={`mt-3 text-sm text-red-200 transition-opacity ${
                    showError ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Please fill this out to continue.
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!currentValid}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(220,38,38,0.4)] transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-red-600"
                  >
                    {step === sections.length - 1 ? "Submit Request" : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
