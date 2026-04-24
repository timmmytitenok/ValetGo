import type { Metadata } from "next";
import { RequestQuoteWizard } from "../components/request-quote-wizard";

export const metadata: Metadata = {
  title: "Request Quote | ValetGo",
  description:
    "Request a custom valet service quote from ValetGo for your upcoming event.",
};

export default function RequestQuotePage() {
  return (
    <div className="min-h-dvh bg-[#050505] text-white">
      <RequestQuoteWizard />
    </div>
  );
}
